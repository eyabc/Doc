# 브라우저의 JS 코드 실행과정

## Motivation - 타이머 API
자바스크립트 개념이 아닌 브라우저와 node.js 에서 부터 왔다. 
      
setTimeout 
- 인자 (callback, msTime) : msTime 후에 callback 실행
- msTime : callback 이 실행의 최소 대기시간, 지연될 수 있다.

setInterval 
- msTime 을 1000ms 이하로 지정하였을 때
    - 브라우저에 따라 msTime 을 강제로 set 시킨다. 
    - 크롬의 경우, 1000ms 으로 set 한다.

여기서 왜 setTimeout 의 일정시간을 지키지 않고 지연되어 실행되는 이유가 무엇인지 알아보자.


## 브라우저의 JavaScript 코드 실행 과정
### 호출 스택 (Call Stack)
JS 엔진은 함수 호출 관련정보를 콜스택에서 관리한다.

```javascript
function add(x, y) {
  return x + y;
}

function add2(x) {
  return add(x, 2); // `add`를 호출
}

function add2AndPrint(x) {
  const result = add2(x); // `add2`를 호출
  console.log(result); // `console.log`를 호출
}

add2AndPrint(3); // `add2AndPrint`를 호출
```
위 코드의 호출스택 상태 변화는 아래와 같다.  
 
<img src="https://user-images.githubusercontent.com/31977543/91665967-54b20100-eb34-11ea-87fb-0db6b7b7b4fa.png" style="width: 200px"/>
<img src="https://user-images.githubusercontent.com/31977543/91665973-61cef000-eb34-11ea-8418-f8d9b1ca4429.png" style="width: 200px"/>
<img src="https://user-images.githubusercontent.com/31977543/91665980-70b5a280-eb34-11ea-8e4e-2c9d0f5dad78.png" style="width: 200px"/>
<img src="https://user-images.githubusercontent.com/31977543/91665973-61cef000-eb34-11ea-8418-f8d9b1ca4429.png" style="width: 200px"/>
<img src="https://user-images.githubusercontent.com/31977543/91665967-54b20100-eb34-11ea-87fb-0db6b7b7b4fa.png" style="width: 200px"/>

### 실행 맥락 (Execution context)
call stack 에 저장되는 각 항목

#### Execution Context 의 요소들
[렉시컬 환경](./렉시컬%20환경) (어휘환경)

- Environment Record
    - 함수 내부에서 사용되는 변수 
    - this 가 가리치는 객체 
- outer Lexical Environment 

### 브라우저가 JavaScript 코드를 실행할 때, 호출 스택의 변화
1. 스크립트를 로드 할 때
    - **전역실행맥락(Global Execution Context)** 을 호출 스택에 push
1. 함수가 호출 될 때
    - 함수 호출의 실행 맥락 생성
    - **함수 호출의 실행 맥락**을 호출 스택에 push
1. 함수의 실행이 끝날 때
    - 결과값 반환
    - 호출 스택의 가장 위에 있는 실행 맥락 pop
1. 스크립트의 실행이 모두 끝날 때
    - 전역 실행 맥락을 호출 스택에서 pop
    
웹 브라우저는 호출 스택에 실행 맥락이 존재하는 동안(실행 중인 함수가 존재하는 동안) 먹통이 된다.
- 먹통이 되는 시간에 따라서, blocking, nonblocking 을 구분한다.
- 브라우저의 주사율, 보통 60fps, 대략 16 ms 안에 코드 실행을 완료되지 않으면
    - 브라우저 내 애니매이션이 뚝뚝 끊기는 현상
    - 사용자 경험에 악영향

### 작업 큐 (Task Queue)
작업 큐에는 blocking 이 되어 처리하는 것이 어려운 일들이 들어간다.
- event 를 기다리는 일
- 계산이 오래걸리는 작업
- 스크립트나 모듈을 로딩하는 동작

### 브라우저의 행동 : 이벤트 루프 (Event Loop)
브라우저가 아래 행동을 끊임 없이 반복하는 것을 이벤트 루프라고 부른다.

1. 태스크 처리 위임
    - From : JS 엔진
    - To : API 를 통해(TODO)
        - 브라우저 혹은 Web Worker(message 이벤트에 이벤트 리스너 등록) 에 위임 `async`
        - 태스크가 끝나면 실행시킬 `콜백` 등록
1. 위임된 태스크가 끝남
    - 태스크의 **반환값**과 **콜백**을 작업 큐(task queue) 에 추가
1. 브라우저는 호출 스택이 비워질 때 마다
    - 작업 큐에서 가장 오래된 작업을 꺼낸다.
    - 작업에 대한 콜백을 실행 시킨다. 

<embed src="https://helloworldjavascript.net/images/eventloop.svg" onload="onKSLoad(this)" data-loop="">

### 호출 스택과 작업 큐의 성질
1. 호출 스택이 비워져야 Task Queue 의 다음 태스크가 실행된다.
1. 각 태스크 사이에 브라우저는 화면을 새로 그릴 수 있다.
    - 호출스택이 비워질 때

Reference
-- 
- https://helloworldjavascript.net/pages/285-async.html