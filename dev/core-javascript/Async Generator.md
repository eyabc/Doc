# Async [Generator](./Iteration%20프로토콜.html)

ES2017 의 비동기함수가 도입되기 전, generator 가 비동기 프로그래밍을 위해 널리 사용되었다고한다.

일반함수
- (0, 1)개의 값만 반환

## 일반 Generator 
- await 사용 불가
- redux-saga 에서도 Generator 를 사용하고 있다.
- 동기적 문법
- 여러 개의 값을 필요에 따라 하나씩 yield 반환 한다.
- 함수를 잠수 멈춰둘 수 있는 generator 의 특징을 이용해 비동기 프로그래밍을 위해 사용되기도 한다.
    ```javascript
    const infinity = (function*() {
      let i = 0;
      while(true) yield i++;
    })();
    console.log(infinity.next());
    ```
    - generator 가 아니며 while 이 무한으로 반복되고 있을 때
        - SyncFlow 에서는 CPU 의 blocking 이 계속 일어남
    - generator 인 경우 while 문을 yield 를 통해서 탈출 가능
      
      
- 함수의 재개를 프로그래머가 직접 제어할 수 있다.
- Suspend: Sync Flow 를 중단할 수 있다.

### nbFor 함수(일반함수) 를 generator 함수로 만들기
[nbFor](./Sync%20Async.html#nonblocking): load 값 조절을 통한 nonBlocking 함수. 
```javascript
const nbFor = (max, load, block) => {
  let i = 0;
  const f = time => {
    let curr = load;
    while(curr-- && i < max) {
      block();
      i++;
    }
    if (i < max - 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
};
```
generator 를 통해 `requestAnimationFrame` 와 같은 async 함수를 없애보자     
- 재귀호출 위치를 추적하지 않아도 된다.
- syncFlow 로직이기 때문에 더 이해하기 쉽다.  
- async 함수 단점이 없어진다.
    - 어휘공간을 유지할 수 있어 복잡한 스코프를 고려하지 않아도 된다.

```javascript
const gene = function*(max, load, block) {
    let i = 0, curr = load;
    while(i < max) {
        if(curr--) {
            block();
            i++;
        } else {
            curr = load;
            yield;
        }
    }
}
```
- 외부에서 제어할 수 있는 권한이 생겼다.      
```javascript
const nbFor = (max, load, block) => {
    const iterator = gene(max, load, block);
    const f = _ => iterator.next().done || requestAnimationFrame(f);
    requestAnimationFrame(f);
}
```
정리해 보자면
1. 비동기 스타일의 콜백 loop 를 쓰는 것보다 동기적인 코드로 작성하기 편하다
1. 실행부분과 Loop 의 관심사 분리

## Promise yield
Promise 자체는 즉시 yield 된다.
```javascript
const gene2 = function*(max, load, block) {
    let i = 0;
    while (i < max) {
        yield new Promise(res => {
            let curr = load;
            while (curr-- && i < max) {
                block();
                i++;
            }
            // frame 단위로 resolve 실행
            requestAnimationFrame(res);
        })
    }
}
```
Promise 가 resolve 되는 순간에 iterator.next() 가 된다.
```javascript
const nbFor = (max, load, block) => {
    const iterator = gene2(max, load, block);
    const next = ({ value, done }) => done || value.then(v => next(iterator.next()));
    next(iterator.next());
}
```

load 를 없애 버린 다음 코드는 block 일까 non block 일까? 
```javascript
const gene2 = function*(max, block) {
    let i = 0;
    while (i++ < max) {
        yield new Promise(res => { block(); res(); })
    }
}
```
- Promise Jobs 때문에 cpu 가 멈추지는 않는다.
- [마이크로 태스크 micro task](./Promise.html#마이크로-태스크) 
    - 하나의 프레임(애니매이션) 안에서 다시 비동기 타이밍을 나누어주는 역할 
    - 한 프레임을 잡아두고 마이크로 태스크(promise job)를 실행하는데 해소될 때까지 프레임이 넘어가지 않는 현상이 발생한다.
    - script timeout 이 걸리지 않기 때문에 브라우저가 죽지 않는다.   


nb 가 10000번이 찍혀야 f 가 찍힌다. 
```javascript
nbFor(10000, _ => console.log("nb"));
const f = _ => {
    console.log('f');
    requestAnimationFrame(f);
};
requestAnimationFrame(f);
```

다음의 경우 nb 가 어느정도 찍히다가 프레임이 넘어간다.  
```javascript
const f = _ => {
    console.log('f');
    requestAnimationFrame(f);
};
requestAnimationFrame(f);
nbFor(10000, _ => console.log("nb"));
```

> requestAnimationFrame 와 같이 시간에 관련된 비동기 함수를 time 함수라고 부르겠다.

promise 안의 time 함수
```javascript
const gene2 = function* (max, block) {
    let i = 0;
    while (i++ <max) yield new Promise(res => {
        block();
        time(res);
    })
}
```

time 함수의 분리
```javascript
const gene2 = function* (max, block) {
    let i = 0;
    while (i++ <max) yield new Promise(res => {
        block();
        res();
    })
};

const nbFor = (max, block) => {
    const iterator = gene2(max, block);
    const next = ({ value, done }) => done || value.then(v => time(_ => next(iterator.next())));
    next(iterator.next());
}
```


## 제너레이터에 비동기 동작 추가
한번 콘솔로 돌려보자. 일반 제너레이터 함수와의 동작이 비교될 것이다.
> 모르겠다.
```javascript
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    // await를 사용할 수 있습니다!
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield i;
  }
}

(async () => {
  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1, 2, 3, 4, 5
  }
})();
```


Reference & Comment
--
- https://gitlab.com/siots-study/topics/-/wikis/asyncronous
- https://www.youtube.com/watch?v=JaHlR1IGLN8&list=PL7jH19IHhOLMmmjrwCi7-dMFVdoU0hhgF
- https://helloworldjavascript.net/pages/285-async.html
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
- https://ko.javascript.info/async
- https://ko.javascript.info/generators-iterators
- https://www.bsidesoft.com/8325
- https://www.bsidesoft.com/6037