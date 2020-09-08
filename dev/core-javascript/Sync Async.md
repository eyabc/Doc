# Sync Async

## Sync

### Sync Flow
메모리에 적재된 명령이 순차적으로 실행됨
  
- 폰노이만 머신 
- 한번 발동이 되면 관여할 수 없다. 

<img src="https://user-images.githubusercontent.com/31977543/92357083-39418a00-f122-11ea-9f3b-b42c5792094a.png" style="height: 150px;"/>

### Sync Flow Control
Goto 를 통해 명령의 위치를 이동

- 제어형 언어 들에서 if 나 for 등으로 goto 를 추상화

<img src="https://user-images.githubusercontent.com/31977543/92357175-5e35fd00-f122-11ea-91d8-81b2db852a68.png" style="height: 150px; "/>

### Sub Flow
함수 등을 통해 별도의 명령셋을 여러번 실행함

<img src="https://user-images.githubusercontent.com/31977543/92357852-7fe3b400-f123-11ea-8b49-90bd6b7599c6.png" style="height: 150px; "/>
<img src="https://user-images.githubusercontent.com/31977543/92357862-8540fe80-f123-11ea-881d-56e18d0e0b5d.png" style="height: 150px; "/>
<img src="https://user-images.githubusercontent.com/31977543/92357870-8a05b280-f123-11ea-9a1d-ef778695bd10.png" style="height: 150px; "/>

## Blocking & NonBlocking
### Blocking
Sync Flow 가 실행되는 동안 다른 일을 할 수 없는 현상

폰 노이만 머신은, 명령어를 적재하고 해소하는 사이에 CPU 가 먹통이 되어 다른 일을 할 수 없다.

<img src="https://user-images.githubusercontent.com/31977543/92358452-70b13600-f124-11ea-8ecb-d2adcc79d495.png" style="height: 150px; "/>

예를 들어, 멀티 태스킹이 안되기 때문에 UI 가 응답을 안하는 현상이 생길 수 있다.

#### blocking 줄이기
1. sync flow 를 짧게 하기
    - sync flow 를 짧게 짜는 것은 바람직하지만 불가능 하다.
    - 7줄이 있는 이유가 있는 코드를 4 줄로 바꿨을 때, 기능이 동작하지 않는다면 바람직 하지 않다.
    
    <img src="https://user-images.githubusercontent.com/31977543/92358731-ee754180-f124-11ea-8fea-6190bec66e3d.png" style="height: 150px; "/>

2. 다른 쓰레드에 syncflow 를 떠넘긴다.

    <img src="https://user-images.githubusercontent.com/31977543/92359029-7eb38680-f125-11ea-9937-8a32f75942a5.png" style="height: 150px; "/>
    <img src="https://user-images.githubusercontent.com/31977543/92359037-83783a80-f125-11ea-9976-d16b379c38b5.png" style="height: 150px; "/>
    
    - 쓰레드 하나 당 Blocking 기간이 짧아진다.
    - 쓰레드는 별도로 작동하기 때문에 각각의 쓰레드가 끝나는 시간이 동기화 되지 않는다. 
    - 다른 쓰레드의 작업이 완료되면 원래 쓰레드에 보고해야 한다.
    
        <img src="https://user-images.githubusercontent.com/31977543/92359478-46f90e80-f126-11ea-886c-f1d0cc2ab2eb.png" style="height: 150px; "/>
 
### Non Blocking
Sync Flow 가 납득할 만한 시간 내에 종료되는 것

기준에 상대적이다.

예를들어, 
- 구구단의 돌아가는 코드는 81번의 루프
    - nonBlocking ? Blocking ?
    - 느린 컴퓨터에서 먹통 -> Blocking
    - 요즘 보편적으로 쓰고 있는 컴퓨터 기준 -> nonBlocking
    
- FrontEnd 
    - 60 fps 기준 : 1 프레임당 16ms 이하 -> 60 fps 가능
        - 16 ms * 60 => 960ms (약 1초)
    - 최근, 모니터 주사율 144 Hz 를 넘고 있다.
     
## Async

### Sync 와 Async 의 차이점 및 단점
멀티쓰레드, 비동기 프레임 하고도 관계가 없다.

`Sync` 서브루틴이 즉시 값을 반환

`Async` 서브루틴이 다른 수단으로 값을 반환

|  | Sync | Async 단점 |
|---|---|---|
|서브루틴의 반환 | 즉시 값 반환 | 다른 수단으로 값 반환. <br> - 즉시 반환되지 않으므로 현재의 sync flow 가 종료됨|
|현재 어휘공간 사용 | O | X (클로저나, 복잡한 스코프 사용해야함) <br> - 요청 시의 어휘공간을 별도로 결과시점에 전달할 부가장치 필요. |

### Async 장점
결과가 주어지는데 시간이 걸리더라도 
그 시간 동안 다른 작업을 할 수 있으므로 자원을 효율적으로 사용할 수 있다.

### Async 가 값을 반환하는 수단
1. Promise
    - fetch 는 값을 바로 반환하지 않고 Promise 로 반환을 한다.
2. callback function
3. iterations

## Sync 의 장점 + Async 의 장점
Sync 의 장점
- 현재 어휘공간 사용 

Async 의 장점
- 병렬처리로 자원의 효율적 사용

=> sync 로직으로 async 를 사용할 수 있게함

`Continuation` async flow 에서, sync flow 의 상태를 기억하여 이어주는 장치

`CPS (Continuation Passing Style)` 
- Continuation 을 활용하는 프로그래밍 스타일
- Generator, async, asynchronous Iterators 

### Non Blocking For
Blocking 을 줄이면서 Sync 를 이용하는 것.

### Blocking sync
sync 함수, working() 이 무거우면 blocking 이 된다.
```javascript
const working = _ => { };
for (let i = 0; i < 1000000; i++) working();
```

### NonBlocking

`nbFor`(최대반복횟수, 한 프레임 당 load 횟수, 실행 블록)

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
> [requestAnimationFrame](https://blog.eunsatio.io/develop/JavaScript-window.requestAnimationFrame-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC)
> - JavaScript의 WebAPI 비동기 함수
> - window.setTimeout 함수와 다른 점은 브라우저가 실행 시기를 결정
> - window.setInterval 함수와 다른 점은 스스로 반복해서 호출하지 않는다 
> - 재귀적으로 window.requestAnimationFrame 함수를 다시 호출해 줘야 합니다.

1. 한 프레임 내에서 10 번의 loop 를 돌게 된다. -> non blocking
    ```javascript
    nbFor(100, 10, working);    
    ```
2. working **반환값이 없다면** -> nbFor 은 **Async**   

block 서브루틴이 차지하는 리소스에 따라 blocking 이 될 수 있고, 
non blocking 이 될 수 있다. 
따라서, 성능 테스트를 하면서 load 를 조절해 나가면 된다.
 

Reference
--
- [https://private.tistory.com/24](https://private.tistory.com/24)
- 코드스피츠



    



