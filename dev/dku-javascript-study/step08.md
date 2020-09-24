# step08

## async await 

### 유림
```javascript
//(3) async 사용 👍
// async를 붙여주면 함수 안의 코드 블럭들이 자동으로 Promise로 바뀜
async function fetchUser() {
  // do network request in 10 secs...
  // 사용자의 정보를 받아오는데 10초가 걸리는 코드가 있다고 가정해보자
  return 'yurim';
}
```
에서 `코드 블럭들이 자동으로 Promise로 바뀜` 에 대해서 코드블록이 어떻게 Promise 로 바뀌는지에 대한 설명을 덧붙여주면 좋을것같아요 

일단은, 비동기 함수를 호출하면 반환값은 항상 Promise 객체다 라는 말이 더 명확하지 않을까요? 

function 이 Promise 가 아닌 값을 반환해도, 이행 상태의 Promise 로 감싸 반환한다.
```javascript
async function func1() {
  return 1;
}
/*
func1()
Promise {
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: 1
}
*/
```
Promise 의 명시적 반환

비동기 함수 내에서 return 한 값이, Promise 객체의 `[[PromiseResult]]` 값
```javascript
async function func2() {
  return Promise.resolve(2);
}
/*
func2()
Promise {
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: 2
}
*/

async function func4() {
  return Promise.reject(2);
}

/* 
func4()
Promise {
    [[PromiseState]]: "rejected"
    [[PromiseResult]]: 2
}
*/ 
```
비동기 함수에서 return 을 해주지 않았을 때, 
```javascript
async function func3() { }
/*
func3()
Promise {
    [[PromiseState]]: "fulfilled"
    [[PromiseResult]]: undefined
}
*/
```
비동기 함수의 반환값에 대해서 신경을 써보지 않았는데, 유림님 글 읽고 정리하면서 다시한번 공부하게 됐어요!

---
빵과 커피를 반환하는 비동기 함수의 예제가 인상깊어요!
```javascript
async function getBread() {
  await delay(1000); // 1초를 기다렸다가
  return '🥐'; //를 리턴하는 Promise가 만들어짐
}

async function getCoffee() {
  await delay(1000); // 1초를 기다렸다가
  return '☕️'; //를 리턴하는 Promise가 만들어짐
}
```
---
```
// 1) Promise.all
// Promise 배열을 전달하면, 모든 Promise들이 병렬적으로 다 담길때까지 모아주는 친구. 담길때도 배열로 담김
```
의 설명에서 추가적으로 iterable 에서 reject 가 발생해도 취소되지 않고, 나머지 Promise 도 결과를 산출하지만 무시됩니다
```javascript
const mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
const p = Promise.all(mixedPromisesArray); // (1) Promise { <state>: "pending" } 
console.log(p); // (3) Promise { <state>: "rejected", <reason>: 44 }
setTimeout(function() {
    console.log('the stack is now empty'); // (2) the stack is now empty
    console.log(p);
});
```

### 정웅
```
ES6에 등장한 Promise 를 이용한 방식은 new 연산자와 함께 호출한 Promise 의 인자로 넘겨주는 콜백 함수는 호출할 때 바로 실행되지만 
그 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 then 또는 catch 구문으로 넘어가지 않는다.
```



## 예외 처리

### 형욱

에러에는 문법 에러, 런타임 에러, 논리적 에러가 있디.
1. 문법 에러
```javascript
console.log(;
```
2. 런타임 에러
    - 배열 인덱스 범위
    - 잘못된 공간에 접근하는 경우
    - 0으로 나누는 것

3. 논리적 에러 
    - 실행시 오류x 
    - 원하는 결과가 아닐때
    
에러의 종류에 대해 공부하신 점이 잘하신것 같아요

---
constructor 를 통해서 에러를 구분하는 방법도 있군요. 
```javascript
try {
    console.log("잘 실행됩니다.");
    console.log(v);
    console.log("버려짐");
} catch (e) {
    switch (e.constructor) {
        case SyntaxError:
            console.log("안실행");
            break;
        case ReferenceError:
            console.log(e.constructor);
            console.log("실행");
            break;
    }
}
```

추가적으로 `if (e instanceof SyntaxError)` 이처럼 `instanceof` 를 사용하면 `SyntaxError` 를 상속한 에러도 잡을 수 있는 특징이 있습니다.

### 노원
```
console.dir 메소드는 명시된 자바스크립트 객체의 전반적인 정보를 트리 구조로 출력해준다.
웹에서만 정보를 볼 수 있다. NodeJS에서 실행시 log 메소드를 사용한 것과 같은 결과가 나온다.
```
node 에서 console.dir 은 console.log 과 같은 결과를 출력하는군요

### 정웅

Example 3. Async / await with Error Handler Factory

JS 의 일급함수의 특징을 이용하여 다음과 같이 에러 핸들링 할 수 있다.
```javascript
const myPromise = new Promise((resolve, reject)=> {
 setTimeout(()=> reject('ERROR 🤯'), 1000)
});

const testPromise = async () => {
    const data = await myPromise;
};

// errorHandler 는 함수를 인자로 받아온다. 
const errorHandler = function(fn) {
    return function (...params) {
        // error 를 catch 하여 반환한다. 
        return fn(...params).catch(function (err) {
            console.log(err);
        })
    }
};

// ES6 로 간결하게 표현하면
const errorHandler2 = (fn) => (...params) => 
fn(...params).catch((err)=> console.warn('ERROR', err));

errorHandler2(testPromise)();
```
디자인 패턴을 알고싶게하는 글이네요!