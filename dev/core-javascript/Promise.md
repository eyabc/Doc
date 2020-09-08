## Promise 
언젠가 끝나는 작업의 결과값을 담는 객체

## Promise 객체 생성
정적 메서드 `Promise.resolve`
```javascript
const p = Promise.resolve(1);
```
Promise 객체의 프로퍼티
```text
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: 1
```

## 비동기 작업을 하는 Promise 객체 생성
```javascript
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('2초가 지났습니다. ');
        resolve('hello');
    }, 2000);
})
```

## Promise 생성자
- Promise 생성자의 인수 "**콜백**"
    - executor(실행자, 실행 함수)
    - new Promise 생성자로 프로미스가 만들어 질 때 자동으로 실행됨
- 콜백(Executor) 의 인수
    - 자바스크립트 엔진이 미리 정의한 함수
    1. `resolve(value)`
        - 일이 성공적으로 끝난 경우 Executor 안에서 resolve(value) 를 호출
        - (value)이 Promise 객체의 [[PromiseResult]] 값
    2. `reject(error)`
        - 에러 발생 시 에러 객체를 나타내는 error 와 함께 호출

## Promise 객체의 내부 프로퍼티
- state `[[PromiseState]]`
    - **pending** (대기) : 처음 값
    - settled : 처리된 Promise
        1. **fulfilled** (이행) : resolve 가 호출 될 때
        1. **rejected** (거부됨) : reject 가 호출 될 때
- result `[[PromiseResult]]`
    1. **undefined** : 처음 값
    2. **value** : `resolve(value)` 가 호출 될 때
    3. **error** : `reject(error)` 가 호출될 때
    
![image](https://user-images.githubusercontent.com/31977543/91831267-d2822380-ec7e-11ea-8422-e68fc9d6787c.png)

## Promise 핸들러 .then/catch/finally

처리된 Promise 핸들러는 즉각 실행된다.

.then/catch/finally 핸들러는 Promise 가 처리되길 기다린다.

Promise 가 이미 처리된 상태라면 즉각 실행된다.
```javascript
// 아래 프라미스는 생성과 동시에 이행됩니다.
let promise = new Promise(resolve => resolve("완료!"));
promise.then(alert); // 완료! (바로 출력됨)
```

### Promise Executor 와 Handler 의 Error 처리
보이지 않는 try..catch 가 있다. 
1. 예외를 잡고 이를 reject 처럼 다룬다.
1. 제어의 흐름이 가장 가까운 에러 핸들러로 넘어간다.

```javascript
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");    //   reject(new Error("에러 발생!"));
}).catch(alert); // Error: 에러 발생!
```

### then 
- Promise 결과값에 대한 추가 작업
- Promise 객체에 then 메서드를 사용할 수 있다.

#### then 인자

- 첫번째 인수. Promise 가 이행되었을 때 실행하는 함수
- 두번째 인수. Promise 가 거부되었을 때 실행하는 함수
    
콜백의 첫번째 인수 : Promise 객체의 `[[PromiseResult]]`

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
promise.then(
  result => alert(result), // 1초 후 "done!"을 출력
  error => alert(error) // 실행되지 않음
);
```
```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// reject 함수는 .then의 두 번째 함수를 실행합니다.
promise.then(
  result => alert(result), // 실행되지 않음
  error => alert(error) // 1초 후 "Error: 에러 발생!"를 출력
);
```
```javascript
let promise = new Promise(resolve => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // 1초 뒤 "done!" 출력

promise.then(msg => {
  console.log(msg); // done!
});
```
#### then 메서드의 반환 값 
Promise 객체
```javascript
const promise = promise.then(msg => {
  return msg + ' world';
});

promise.then(msg => {
  console.log(msg); // hello world
});
```
#### then 메서드의 return 값
Promise 객체의 [[PromiseResult]] 값

```javascript
promise.then(msg => {
  return msg + ' world';
}).then(msg => {
  console.log(msg);
});
```

### catch
에러가 발생한 경우만 다루고 싶을 때

1. null 을 then 의 첫번째 인수로 전달한다.
    `.then(null, errorHandlingFunction)`
    
1. `.catch(errorHandlingFunction)`

두가지 방식은 똑같이 동작한다.

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("에러 발생!")), 1000);
});

// .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력
```

에러가 성공적으로 처리되면, 가장 가까운 곳에 있는 .then 핸들러로 제어흐름이 넘어가 실행이 이어진다.
```javascript
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(function(error) {
  alert("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.");
}).then(() => alert("다음 핸들러가 실행됩니다."));
```

에러가 성공적으로 처리되지 않았을 때, 에러를 다시 던진다.
```javascript
// 실행 순서: catch -> catch
new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
}).catch(function(error) { // (*)
  if (error instanceof URIError) {
    // 에러 처리
  } else {
    alert("처리할 수 없는 에러");
    throw error; // 에러 다시 던지기
  }
}).then(function() {
  /* 여기는 실행되지 않습니다. */
}).catch(error => { // (**)
  alert(`알 수 없는 에러가 발생함: ${error}`);
  // 반환값이 없음 => 실행이 계속됨
});
```

#### unhandledrejection
거부된 Promise 를 처리하지 못할 경우 자바스크립트 엔진은 전역 에러를 발생시킨다.
브라우저 환경에선 이런 에러를 `unhandledrejection` 이벤트로 잡을 수 있다.
- 처리되지 않은 에러 추적
- 이런 에러를 사용자(혹은 서버)에게 알려서 앱이 아무런 설명없이 '그냥 죽는걸' 방지한다.


#### setTimeout 에서의 에러
```javascript
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("에러 발생!");
  }, 1000);
}).catch(alert);
```
모든 동기적 에러는 try..catch 에서 처리되지만
setTimeout 은 Executor 가 끝난 후 발생하기 때문에 Promise 에서 에러를 처리할 수 없다.

### finally
Promise 처리가 완료되면, 결과와 상관없이 finally 문이 실행된다.
 
finally 핸들러(콜백의 이름)
- 인수가 없다.
- Promise 의 settled 상태를 알 수 없다
- 자동으로 다음 핸들러에 결과와 에러를 전달한다.
    
```javascript
new Promise((resolve, reject) => {
  setTimeout(() => resolve("결과"), 2000)
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음

new Promise((resolve, reject) => {
  throw new Error("에러 발생!");
})
  .finally(() => alert("프라미스가 준비되었습니다."))
  .catch(err => alert(err)); // <-- .catch에서 에러 객체를 다룰 수 있음
```

## HTTP 통신의 Promise
`axios.get()` 함수는 Promise 객체를 반환한다.

[콜백](./콜백%20Callback)의 비동기 프로그래밍의 예시와 코드를 비교해 보자
```javascript
$.get(API_URL, issues => {
  console.log('최근 10개의 이슈:');
  issues
    .map(issue => issue.title)
    .forEach(title => console.log(title));
  console.log('출력이 끝났습니다.');
});
```

```javascript
const axios = require('axios');
const API_URL = 'https://api.github.com';

axios.get(`${API_URL}/repos/facebookincubator/create-react-app/issues?per_page=10`)
  .then(res => {
    console.log('최근 10개의 이슈:');
    res.data
      .map(issue => issue.title)
      .forEach(title => console.log(title));
    console.log('출력이 끝났습니다.');
  });
```
---
```javascript
const API_URL = 'https://api.github.com';
const starCount = {};
const axios = require('axios');

// 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
axios.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`)
  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  .then(res => axios.get(`${API_URL}/repos/${res.data.items[0].full_name}/contributors?per_page=5`))
  // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
  .then(res => {
    const ps = res.data.map(user => axios.get(`${API_URL}/users/${user.login}/starred?per_page=10`));
    return Promise.all(ps);
  })
  .then(ress => Promise.all(ress.map(r => r.data)))
  // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
  .then(repoArrs => {
    for (let repoArr of repoArrs) {
      for (let repo of repoArr) {
        if (repo.full_name in starCount) {
          starCount[repo.full_name]++;
        } else {
          starCount[repo.full_name] = 1;
        }
      }
    }
    console.log(starCount);
  });

console.log('fetching...');
```

앞서 [콜백으로 구현된 loadScript](콜백%20Callback.html#콜백의-에러-처리) 를 Promise 로 나타내어 봅시다.
```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}
``` 
```javascript
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  });
}

let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src}을 불러왔습니다!`),
  error => alert(`Error: ${error.message}`)
);

promise.then(script => alert('또다른 핸들러...'));
```


## Promise.all(iterable) 
여러 프로미스의 결과를 집계할 때 사용한다.

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

### 매개변수
`iterable` 객체
- 프로미스 생성자
- 프로미스가 아닌 값
- 이미 이행된 프로미스 객체 

### 반환 값
1. iterable 의 Promise 가 모두 처리됨
2. 새로운 Promise 를 이행 

#### 새로운 Promise 의 이행 값 `[[PromiseResult]]`
- iterable 의 Promise 들의 `[[PromiseResult]]` 을 담은 배열


#### 이미 이행된 프로미스 iterable : 비동기성
이미 이행된 프로미스로 배열 에서는 Promise.all 의 `비동기성` 이 나타난다.
```javascript
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.all(resolvedPromisesArray);
console.log(p); // (1) Promise { <state>: "pending" } 

// 호출 스택을 비운 다음 실행하기 위해 setTimeout 을 사용
setTimeout(function() {
    console.log('the stack is now empty'); // (2) the stack is now empty
    console.log(p); // (3) Promise { <state>: "fulfilled", <value>: Array[2] }
});
```

#### Promise.all() reject : 비동기성

```javascript
const mixedPromisesArray = [Promise.resolve(33), Promise.reject(44)];
const p = Promise.all(mixedPromisesArray); // (1) Promise { <state>: "pending" } 
console.log(p); // (3) Promise { <state>: "rejected", <reason>: 44 }
setTimeout(function() {
    console.log('the stack is now empty'); // (2) the stack is now empty
    console.log(p);
});
```
- reject 가 발생해도 취소되지 않고, 나머지 Promise 도 결과를 산출하지만 무시된다.
- AbortController 를 사용하면 프로미스 취소가 가능하다.

#### 빈 iterable : 동기성
이미 이행한 Promise 객체 반환

```javascript
const p = Promise.all([]); // 즉시 이행함
console.log(p); // (1) Promise { <state>: "fulfilled", <value>: Array[0] }
```
     
#### 프로미스가 없는 iterable : 비동기성
> 크롬 58 경우 이미 이행한 프로미스 반환

```javascript
const p = Promise.all([1337, "hi"]); // 프로미스가 아닌 값은 무시하지만 비동기적으로 실행됨
console.log(p); // (1) Promise { <state>: "pending" }
setTimeout(function() {
    console.log('the stack is now empty'); // (2) the stack is now empty
    console.log(p2);    //(3) Promise { <state>: "fulfilled", <value>: Array[2] }
});
```

#### 빈 || 프로미스가 없는 iterable 이 아닌 경우. 
Promise 가 모두 이행 된 후, 새 Promise 객체를 반환한다.


### 예시
복수의 URL 에 동시에 요청을 보내고, 다운로드가 모두 완료된 후에 콘텐츠를 처리할 때.
```javascript
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

// fetch를 사용해 url을 프라미스로 매핑합니다.
let requests = urls.map(url => fetch(url));

// Promise.all은 모든 작업이 이행될 때까지 기다립니다.
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

## Promise.allSettled
여러 요청 중 하나가 실패해도 다른 요청 결과는 반환한다.

- 모든 Promise 가 처리될 때까지 기다린다.

```text
[
  {status: 'fulfilled', value: ...응답...},
  {status: 'fulfilled', value: ...응답...},
  {status: 'rejected', reason: ...에러 객체...}
]
```

## Promise.race(iterable)

### 반환 값
대기중인 Promise 객체를 반환 (`[[PromiseResult]]` 를 비동기적으로 전달받음)
- `[[PromiseResult]]` iterable 에서 처음으로 이행하거나 거부한 프로미스 객체의 값


#### 이미 이행된 프로미스 객체 iterable : 비동기성
```javascript
const resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

const p = Promise.race(resolvedPromisesArray);
console.log(p); // (1) Promise { <state>: "pending" }

// 호출 스택을 비운 다음 실행하기 위해 setTimeout을 사용
setTimeout(function(){
    console.log('the stack is now empty'); // (2) the stack is now empty
    console.log(p); // (3) Promise { <state>: "fulfilled", <value>: 33 }
});
```    

#### 빈 iterable 
반환한 Promise 는 영원한 pending 상태

```javascript
const foreverPendingPromise = Promise.race([]);
console.log(foreverPendingPromise); // (1) Promise { <state>: "pending" }
setTimeout(function(){
    console.log('the stack is now empty'); // (2) the stack is now empty
    console.log(foreverPendingPromise); // (3) Promise { <state>: "pending" }
}); 
```
#### 프로미스가 아닌값, 이미 완료된 프로미스객체가 있는 iterable : 비동기성
이러한 값들 중 처음으로 등장하는 값을 결과값으로 이행

```javascript
const foreverPendingPromise = Promise.race([]);
const alreadyFulfilledProm = Promise.resolve(666);

const arr = [foreverPendingPromise, alreadyFulfilledProm, "프로미스 아님"];
const arr2 = [foreverPendingPromise, "프로미스 아님", Promise.resolve(666)];
const p = Promise.race(arr);
const p2 = Promise.race(arr2);

console.log(p);      // (1) Promise { <state>: "pending" } 
console.log(p2);     // (2) Promise { <state>: "pending" }  
setTimeout(function(){
    console.log('the stack is now empty'); // (3) the stack is now empty
    console.log(p);  // (4) Promise { <state>: "fulfilled", <value>: 666 }
    console.log(p2); // (5) Promise { <state>: "fulfilled", <value>: "프로미스 아님" }
});
```

## Promise.resolve(value)
result 가 value 인 이행 상태 프라미스 객체 생성

`let promise = new Promise(resolve => resolve(value));` 와 동일

`function loadCached(URL)`
- URL 을 대상으로 fetch 를 호출하고, 그 결과를 기억(cache)합니다. 
- 동일한 URL 을 대상으로 fetch 를 호출하면, Promise.resolve 를 사용해 캐시 된 내용을 Promise 로 만들어 반환 값이 항상 Promise 가 되게 합니다.
- loadCached 를 호출하면 프라미스가 반환된다는 것이 보장되기 때문에 loadCached(url).then(…)을 사용할 수 있습니다. 

```javascript
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

## Promise.reject(error)
result 가 error 인 거부상태 Promise 생성

`let promise = new Promise((resolve, reject) => reject(error));` 와 동일

## 프로미스화 Promisification
콜백을 받는 함수를 Promise 를 반환하는 함수로 바꾸는 것

- JavaScript es6 에서 promise 를 표준으로 채택하면서 대부분의 브라우저에서 Promise 를 사용하게 됨
- 콜백 보다는 Promise 가 더 편리하다.
- 콜백기반 라이브러리를 Promise 를 반환하는 함수로 바꿀 수 있다.
- Node.js 내장 함수 `util.promisify`
- 모듈 `es6-promisify`
- async await 의 장점을 이용할 수 있다. 
- 최신브라우저에서, async 를 남발해도 성능의 큰 차이가 없다. native function 과 가깝다.
- 비동기 기능이 있는 어떤함수로 만들어도 promise 로 만들어 놓는게 중요하다.


### 콜백의 setTimeout 을 Promise 로 만들기

`res(f())` 
- `f`의 리턴값을 `[[PromiseResult]]`으로 가지는 Promise 객체 
```javascript
const timeout = (f, ms) => new Promise(res => setTimeout(_ => res(f()), ms));
```


```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
delay(3000).then(() => alert('3초후 실행'));
```

```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

  document.head.append(script);
}
// usage:
loadScript('path/script.js', (err, script) => {...})
```
```javascript
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  })
};

// 사용법:
loadScriptPromise('path/script.js').then(...);
```

## 마이크로 태스크

### 마이크로태스크 큐 (PromiseJobs)
비동기 작업을 처리하기 위한 [PromiseJobs](./JOBS) 라고 불리는 내부 큐(internal queue).

V8 엔진에서는 microtask queue 라고 부른다.

- FIFO
- 실행할 것(호출 스택)이 비었을 때만 마이크로태스크큐의 작업이 실행된다.

#### Promise 핸들러 .then/catch/finally 
Promise 가 즉시 이행되더라도, 
Promise 핸들러 .then/catch/finally 는 항상 비동기적으로 실행된다.

```javascript
let promise = Promise.resolve();

promise.then(() => alert("프라미스 성공!"));  // 2

alert("코드 종료"); // 1
```

1. Promise 객체가 준비됨
2. Promise 객체의 `.then/catch/finally` 핸들러가 PromiseJobs 큐에 들어간다 (실행전)

#### PromiseJobs 큐가 실행되는 조건
- 현재 코드의 실행이 완료될 때
- 큐에 적재된 이전 핸들러의 실행이 완료될 때
  
> 브라우저/Node.js를 포함한 대부분의 자바스크립트 엔진에서, 
마이크로태스크가 '이벤트 루프(event loop)'와 '매크로태스크(macrotask)'와 깊은 연관 관계를 맺는다. 
이 부분에 대해서는 주제 브라우저 에서 다시 다룰 것이다. TODO 


### 처리되지 못한 거부 unhandledrejection
마이크로 태스크(PromiseJobs) 큐 끝에서 거부된 Promise 가 처리되지 못할 때 발생
- 자바스크립트 엔진은 전역 에러를 발생시킨다.

에러가 잘 처리되었으므로 실행되지 않습니다.
```javascript
let promise = Promise.reject(new Error("프라미스 실패!"));
promise.catch(err => alert('잡았다!'));

window.addEventListener('unhandledrejection', event => alert(event.reason));
```

setTimeout 을 이용하여 에러를 나중에 처리할 경우
```javascript
let promise = Promise.reject(new Error("프라미스 실패!")); 
setTimeout(() => promise.catch(err => alert('잡았다!')), 1000); // '잡았다!' (2) 

window.addEventListener('unhandledrejection', function(event) {
  // 이벤트엔 두 개의 특별 프로퍼티
  alert(event.promise); // [object Promise] - 에러를 생성하는 프라미스
  alert(event.reason); // Error: 에러 발생! - 처리하지 못한 에러 객체
});
```

- `unhandledrejection` 은 마이크로태스크 큐에 있는 작업 모두가 완료되었을 때 생성됨.
- `.catch` 는 `unhandledrejection` 이 발생한 이후에 트리거 된다.


[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/unhandledrejection_event)

무슨이유에서인지 브라우저 콘솔에서 실행을 해 보아도 'unhandledrejection'이벤트는 발생하고 있지 않다.
(TODO)

## Promise 장점
- `then` 콜백을 중첩하지 않고도 비동기 작업을 연이어 할 수 있다.
- 비동기 작업을 값으로 다룰 수 있다.

| Promise | Callback |
| --- | --- |
| 흐름이 자연스럽다. <br/> loadScript(script) 로 스크립트를 읽고, 결과에 따라 그 다음에 (then) 무엇을 할지에 대한 코드를 작성할 수 있다. | loadScript(script, callback) 을 호출할 때, 미리 callback 함수가 준비되어 있어야 한다. |
| 원하는 만큼 then 호출 가능. | 콜백은 하나만 가능하다. | 

## Promise 의 비판
- 여전히 콜백을 사용한다.
- 여전히 가독성이 좋지 않다.

## thenable 객체를 반환하는 핸들러
Promise 를 상속받지 않고도, 커스텀 객체를 사용해 프라미스 체이닝을 만드는 방법

### thenable 객체
.then 메서드를 가진 객체
- 서드 파티 라이브러리가 Promise 호환 가능 객체를 구현할 수 있다는 점에서 등장

```javascript
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { 네이티브 코드 }
    // 1초 후 this.num*2와 함께 이행됨
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000밀리 초 후 2를 보여줌
```

![image](https://user-images.githubusercontent.com/31977543/91840698-116aa600-ec8c-11ea-910b-94afef5e8cce.png)


