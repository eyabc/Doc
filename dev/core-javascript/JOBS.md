# [es2015+] 잡스(Jobs)

## 잡스와 잡큐의 개요.

`Jobs` ES6 부터, 내부적으로 개별 스크립트가 어떤 방식으로 적재되고 실행되는지를 정의하는 새로운 방법

잡큐의 동작을 이해하면 스크립트의 실행 순서를 이해하고 통제할 수 있다. 

```html
<html>
<head></head>
<body>
    <!--로그 출력-->
    <sectio id="log"></section>
    
    <!--테스트용 함수를 먼저 정의해 준다.-->
    <script>
        const $log = document.getElementById('log');
        const test = t => {
            $log.innerHTML += `<div>${t} step1 </div>`;
            
            // 두 개의 Promise 가 두 번의 then 으로 비동기 분리
            Promise.resolve()
                .then(_ => $log.innerHTML += `<div>${t} promise1 step1</div>`)
                .then(_ => $log.innerHTML += `<div>${t} promise1 step2</div>`)
            Promise.resolve()
                .then(_ => $log.innerHTML += `<div>${t} promise2 step1</div>`)
                .then(_ => $log.innerHTML += `<div>${t} promise2 step2</div>`)
            log.innerHTML += `<div>${t} step2</div>`;
        };
        
        // async false 발동
        'asyncFalse1,asyncFalse2'.split(',').forEach(v => {
            const s = document.createElement('script');
            s.src = v + '.js';
            s.async = false;
            document.body.append(s);
        });
        
        // 직접 생성한 스크립트
        test('mix1');
        {
            const s = document.createElement('script');
            s.text = "test('dynamic')";
            document.body.append(s);
        }
        test('mix2');
        
    </script>
    <!-- async 가 true 인 것과 false 인 것이 섞이면? -->
    <script src="async1.js" async></script>
    <script src="async2.js" async></script>

    <!-- 그 와중에 defer 가 끼어들면? -->
    <script src="defer1.js" defer></script>
    <script src="defer2.js" defer></script>
    
    <!-- 첫번째 스크립트 블럭과 그 안의 Promise -->
    <script >
    test('main1');
    </script>
    
    <!-- 두 번째 스크립트 블럭과 그 안의 Promise  -->
    <script >
    test('main2');
    </script>

</body>
</html>
```

콘솔 호출 순서의 설명도 어렵고, 브라우저마다 다르기도 하다.

표준적인 스크립트의 실행 순서가 어떤 스펙으로 규정되어있는지 이해하고 브라우저마다 구현 차이를 이해할 필요가 있다.

## 스크립트를 실행하려면 잡큐에 등록

### ES6 의 스크립트 실행 방식
1. 하나의 프레임 내에서도 다시 스크립트를 실행하는 큐를 갖게한다. 
1. 실행할 스크립트를 순차적으로 큐에 적재한다.
1. 큐를 비워가며 하나씩 실행한다. 

### 하나의 JOB
개별적으로 실행되는 스크립트 블럭

### 잡큐 JobQueue
Jobs 를 적재하는 FIFO

```html
<script>
//여기 전체가 첫번째 잡으로 잡큐에 등록됨
</script>
 
<script>
//여기 전체가 두번째 잡으로 잡큐에 등록됨
</script>
```

- 현재 진행중인 execution context 가 없을 때
    - Job 이 Queue 에 적재 되면 RunJobs() 에 의해 즉시 실행된다.
    - 이 코드의 결과로 또 다른 Job 이 등록될 수 있다.
    
```html
<script>
//만약 여기서 추가적인 잡을 등록하면
//등록된 잡이 다 해소된 후
</script>
 
<script>
//그 다음에 이 잡이 실행된다.
</script>

```

## 두 가지 잡스
JobQueue 에는 두가지 Job 을 등록할 수 있다.

1. ScriptJobs - 일반적인 스크립트 코드를 실행하는 잡
1. PromiseJobs - Promise 의 해소나, 예외로 분기되어 실행될 함수가 적재되는 Job
    - Promise 가 현재 프레임에서 then 으로 분기되는 경우
        - 다음프레임으로 넘어가는 건 아니지만 JobQueue 로 then 이후가 PromiseJobs 로 등록된다.
        - 현재 Execution Context 의 실행이 진행된 이후에 JobQueue 에서 꺼내 실행하게 된다.

### ScriptJobs
w3c 스펙에서는 ScriptJobs 는 코드로 생성하지 못한다고 하였지만 

다음과 같은 코드로 ScriptJobs 를 생성할 수 있다.
```javascript
const s = document.createElement('script');
s.text = '// script contents';
document.body.append(s);
```

### PromiseJobs

- promise 의 then 은 즉시 JobQueue 에 넣도록 스펙에서 규정하고 있다.
- promise 가 즉시 해소된다 하더라도 실행중인 Execution Context 가 완료된 후 다음 Job 으로 실행된다.

```javascript
Promise.resolve()   // 즉시 해소되는 Promise
    .then(_ => console.log('promise step1'));
console.log('ec running');

// ec running
// promise step1
```

```javascript
Promise.resolve()//즉시 해소되는 프라미스1
  .then(_=>console.log('promise1 step1')) //첫번째 then
  .then(_=>console.log('promise1 step2'));//두번째 then
 
Promise.resolve()//즉시 해소되는 프라미스2
  .then(_=>console.log('promise2 step1')) //첫번째 then
  .then(_=>console.log('promise2 step2'));//두번째 then
 
console.log('ec running');
```
1. 처음 등장한 프라미스1의 첫 번째 then 이 잡큐에 등록됩니다.
2. 이 시점에서 then 은 실행되지 않으므로 두 번째 then 은 무시해두죠.
3. 이어 두 번째 등장한 프라미스2의 첫 번째 then 이 잡큐에 등록됩니다. 이제 잡큐에는 두 개의 PromiseJobs 가 등록되었습니다.
4. 이제 마지막 줄의 console.log 가 실행되어 현재의 ScriptJobs 가 완료됩니다.
5. 잡큐에 있는 다음 잡인 1번에서 등록한 첫 번째 프라미스의 첫 번째 then 이 실행됩니다. 그 결과 다시 then 이 호출되어 이를 잡큐에 등록하게 됩니다.
6. 두 번째 잡큐에 들어있는 잡은 3번에서 등록한 두 번째 프라미스의 첫 번째 then 입니다. 이것도 실행하면 그 결과 잡큐에 두 번째 then 의 내용을 등록하게됩니다.
7. 이제 5번에서 등록한 첫 번째 프라미스의 두 번째 then 이 실행됩니다.
8. 이어서 6번에서 등록한 두 번째 프라미스의 두 번째 then 이 실행됩니다.

```text
ec running
promise1 step1
promise2 step1
promise1 step2
promise2 step2
``` 

같은 프레임에서 즉시 해소되는 Promise 라도 해당 프레임의 JobQueue 에 등록 순서에 따라 실행된다.

## ScriptJobs 와 PromiseJobs 를 연결지어 이해하기

```html
<script>
    Promise.resolve()
     .then(_=>console.log('block1 step1'))
     .then(_=>console.log('block1 step2'));
    console.log('block1');
</script>
 
<script>
    Promise.resolve()
     .then(_=>console.log('block2 step1'))
     .then(_=>console.log('block2 step2'));
    console.log('block2');
</script>
```

1. 우선 ScriptJobs에 첫 번째 script태그 내용이 등록됩니다.
2. 등록되었으므로 무조건 실행됩니다.
3. 실행하니 프라미스의 then이 나와 다음 잡큐에 등록됩니다.
4. 3번에서 등록된 PromiseJobs가 실행됩니다. 그 결과 다시 then이 나와 다음 잡큐에 등록됩니다.
5. 4번에서 등록된 PrmoiseJobs가 실행되며 잡큐는 비어있는 상태가 됩니다.
6. 이어서 브라우저가 다음 script태그 내용을 ScriptJobs로 잡큐에 등록합니다.
7. 6에서 등록한 스크립트가 실행됩니다.
8. 스크립트가 실행되며 3번과 마찬가지 형태로 프라미스와 then 두 번이 잡큐에 등록되며 실행됩니다.

```text
block1
block1 step1
block1 step2
block2
block2 step1
block2 step2
```

```html
<script>
{
  const s = document.createElement('script');
  //동적 스크립트를 생성하고 이 안에도 프라미스를 넣자
  s.text = `
    Promise.resolve()
     .then(_=>console.log('dynamic step1'))
     .then(_=>console.log('dynamic step2'));
    console.log('dynamic');
  `;
  document.body.appendChild(s);
}
 
//이쪽이 현재 ScriptJobs에서 실행하고 있는 흐름 쪽의 코드
Promise.resolve()
   .then(_=>console.log('base step1'))
   .then(_=>console.log('base step2'));
console.log('base');
</script>

```
```text
dynamic
base
dynamic step1
base step1
dynamic step2
base step2
```

동적 생성된 스크립트와 현재 실행중인 스크립트가 하나의 ScriptJobs 가 되어 실행되는 결과와 같다.

- script 태그 생성, innerHTML 의 자바스크립트의 DOM 제어가 또 다른 스크립트를 만들어 내도, 새로운 Job 으로 등록되지 않고, 현재 Job 에서 계속 실행된다.
- 새로 생성한 동적 스크립트는 현재의 ScriptJobs 에서 실행되어, Execution Context 가 해소 된 후 순차적으로 Promise 가 JobQueue 에 등록되며 해소된다.



## async defer에 따른 차이

defer
- DOMLoaded 이후에 로딩된 스크립트가 순서에 맞게 실행되는 것을 보장한다.

async
- html 상에 등장한 순서와 상관없이 먼저 loading 된 스크립트가 실행된다.

### async 

`async="false"`
- HTML5.1
- 로딩은 async 하게 되지만 실행은 순서에 맞게 해준다.
- 동적 스크립트를 만든 경우에만 적용할 수 있다.

적용안됌, async 선언과 동일
```html
<script async="false" src="1.js"></script>
```

```javascript
const s = document.createElement('script');
s.src = '1.js';
s.async = false; // 효과 있음
document.body.appendChild(s);
```

async 를 적용한 script 의 경우
```html
<script async src="1.js"></script>
<script async src="2.js"></script>
```
```javascript
//1.js-------------------
Promise.resolve()
   .then(_=>console.log('1 step1'))
   .then(_=>console.log('1 step2'));
console.log('1');
//2.js-------------------
Promise.resolve()
   .then(_=>console.log('2 step1'))
   .then(_=>console.log('2 step2'));
console.log('2');
```

async=false 의 Jobs 에 대한 표준 스펙은 없기 때문에, 결과는 브라우저마다 다르다..

- 1.js 와 2.js 가 섞이지 않고 자신의 JobQueue 를 관리한다.
- 1.js 이 먼저 실행될 수도 있고 2.js 가 먼저 실행될 수도 있다. 

파이어 폭스 같은 경우 async = false 인 스크립트를 묶어서 하나의 ScriptJobs 로 등록하기도 하고 분리해서 등록하기도 한다.
오히려 파이어폭스만 한 프레임 내에서 여러개의 스크립트로딩완료 가 발생되는 진정한 병렬로더일 수 있다.

### defer
여러 개의 스크립트를 로딩해도 반드시 순서를 보장한다.

```html
<script defer src="1.js"></script>
<script defer src="2.js"></script>
```

크롬과 파이어폭스: 개별 defer 를 각각 ScriptJobs 로 등록한다.
```text
1
1 step1
1 step2
2
2 step1
2 step2
```

엣지 : 동적 스크립트를 삽입했을 때 처럼 defer 선언 스크립트들을 묶어서 하나의 ScriptJobs 로 등록한다.
```javascript
//2
//1 step1
//2 step1
//1 step2
//2 step2
```

이쪽도 어느 쪽이 맞다고는 할 수 없습니다. defer의 결과가 취합되는데 있어서 표준은 없기 때문에 제각각 구현 방식을 따릅니다.

## 결론
es2015+에 도입되어있는 잡스와 잡큐의 개념은 HTML5에도 유기적으로 반영되어있는 표준입니다. 언제 자바스크립트코드가 활성화되고 실행되는가에 대한 원리라고 할 수 있죠.       
현상보다는 스펙을 이해하고 브라우저 간의 차이점을 인식하면 혼동스러울 것은 없는 정도입니다 ^^;      
script태그의 async와 defer의 관계를 보면 결국 크롬, 파폭, 엣지는 다른 정책으로 ScriptJobs를 생성합니다. 이를 잘 이해하고 미묘한 문제를 피해야겠습니다.

Reference
---
- https://www.bsidesoft.com/5385