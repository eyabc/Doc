# [ES2017] 비동기 함수 Async Await
동기식 코드와 거의 같은 구조의 비동기식 코드를 짤 수 있다.

* Sync 서브루틴이 즉시 값을 반환
* Async 서브루틴이 다른 수단으로 값을 반환

|  | Sync | Async 단점 |
|---|---|---|
|서브루틴의 반환 | 즉시 값 반환 | 다른 수단으로 값 반환. <br> - 즉시 반환되지 않으므로 현재의 sync flow 가 종료됨|
|현재 어휘공간 사용 | O | X (클로저나, 복잡한 스코프 사용해야함) <br> - 요청 시의 어휘공간을 별도로 결과시점에 전달할 부가장치 필요. |


## async 키워드
function 앞에 위치함 

비동기 함수
```javascript
async function func1() {
  // ...
}
```

비동기 화살표 함수
```javascript
const func2 = async () => {
  // ...
}
```
비동기 메소드
```javascript
class MyClass {
  async myMethod() {
    // ...
  }
}
```


### 항상 Promise 객체를 반환한다.
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


## await 키워드
- async 함수 안에서만 동작
- await 키워드 뒤에 오는 Promise 가 처리(settled) 될 때까지 Suspend 된다
    - Promise 가 처리되길 기다리는 동안엔 엔진이 다른일(다른 스크립트 실행, 이벤트 처리 등)을 하기 때문에 CPU 리소스가 낭비되지 않는다.
- await 연산의 결과 값
    - 뒤에 오는 Promise 객체의 `[[PromiseResult]]`

```javascript
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`${ms} 밀리초가 지났습니다.`);
      resolve()
    }, ms);
  });
}

async function main() {
  await delay(1000);
  await delay(2000);
  const result = await Promise.resolve('끝');
  console.log(result);
}

main();
//  1000 밀리초가 지났습니다.
//  2000 밀리초가 지났습니다.
//  끝
```

await 은 최상위 레벨 코드에서 동작하지 않으므로 IIFE 을 사용하자
- Deno 는 top-level await 을 지원한다.
```javascript
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  // ...
})();
```

await 은 thenable 객체를 받는다.
- resolve, reject 를 인수로 제공하는 .then 메서드를 호출한다.
```javascript
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // 1000밀리초 후에 이행됨(result는 this.num*2)
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // 1초 후, 변수 result는 2가 됨
  let result = await new Thenable(1);
  alert(result);
}

f();
```
async 가 아닌 함수에서 async 함수 호출하기
```javascript
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return 10;
}

function f() {
  // shows 10 after 1 second
  wait().then(result => alert(result));
}
f();
```

## 에러 처리
```javascript
async function f() {
  try {
    let response = await fetch('http://유효하지-않은-주소');
  } catch(err) {
    alert(err); // TypeError: failed to fetch
  }
}
f();
```
```javascript
async function f() {
  let response = await fetch('http://유효하지-않은-url');
}

// f()는 거부 상태의 프라미스가 됩니다.
f().catch(alert); // TypeError: failed to fetch // (*)
```

예외 처리를 해주지 않으면. 처리되지 않은 Promise 에러가 발생한다. 
- `unhandledrejection` 전역 이벤트 핸들러를 이용해 잡을 수 있다.


## Promise -> 비동기 함수
앞서 나오던 복잡한 예제의 Callback Promise 코드와 비교해 보자
```javascript
const axios = require('axios');
const API_URL = 'https://api.github.com';

async function fetchStarCount() {
  const starCount = {};

  // 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
  const topRepoRes = await axios.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`);

  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  const topMemberRes = await axios.get(`${API_URL}/repos/${topRepoRes.data.items[0].full_name}/contributors?per_page=5`);

  // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
  const ps = topMemberRes.data.map(user => axios.get(`${API_URL}/users/${user.login}/starred?per_page=10`));
  const starredReposRess = await Promise.all(ps);
  const starredReposData = starredReposRess.map(r => r.data);

  // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
  for (let repoArr of starredReposData) {
    for (let repo of repoArr) {
      if (repo.full_name in starCount) {
        starCount[repo.full_name]++;
      } else {
        starCount[repo.full_name] = 1;
      }
    }
  }
  return starCount;
}

fetchStarCount().then(console.log);
```

```javascript
function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json')
  .catch(alert); // Error: 404
```
```javascript
async function loadJson(url) { // (1)
  let response = await fetch(url); // (2)
  if (response.status == 200) {
    let json = await response.json(); // (3)
    return json;
  }
  throw new Error(response.status);
}
loadJson('no-such-user.json')
  .catch(alert); // Error: 404 (4)
```

---
### setTimeout 의 컨버터 timeout 함수

`res(f())` 
- `f`의 리턴값을 `[[PromiseResult]]`으로 가지는 Promise 객체 

```javascript
const timeout = (f, ms) => new Promise(res => setTimeout(_ => res(f()), ms));
const f1 = _ => 'abc';
const f2 = _ => 'def';
const start = performance.now();
```
> performance.now() 브라우저 실행시각을 기준으로 시간이 count 되며 나노세컨드의 더 정확한 시간계산이 가능해진다.


```javascript
const promise1 = new Promise(res => res(f1()));
promise1.then(console.log);
```

```javascript
const promise2 = (async () => f2())();
promise2.then(console.log);
```

이 코드의 총 실행시간은 어떻게 될까? 약 1000ms (병렬 실행)
```javascript
(() => {
    timeout(f1, 500).then(v => console.log(v, performance.now() - start));
})();
(() => {
    timeout(f2, 1000).then(v => console.log(v, performance.now() - start));
})();
```
```javascript
(async(f, ms) => {
    console.log(await timeout(f1, ms), performance.now() - start);
})(f1, 500);
(async(f, ms) => {
    console.log(await timeout(f2, ms), performance.now() - start);
})(f2, 1000);
```

<img src="https://user-images.githubusercontent.com/31977543/92399667-a4608000-f165-11ea-96fd-ab1be3e039a7.png" style="height:200px"/>


약 1500 ms 에 수행될 것이다.
```javascript
(() => {
    timeout(f1, 500)
    .then(v => {
        console.log(v, performance.now() - start);
        return timeout(f2, 1000);
    })
    .then(v => console.log(v, performance.now() - start));
})();
```
```javascript
(async () => {
    console.log(await timeout(f1, 500), performance.now() - start);
    console.log(await timeout(f2, 1000), performance.now() - start);
})();
```

```javascript
(async() => {
    console.log(
        await timeout(f1, 500), performance.now() - start,
        await timeout(f2, 1000), performance.now() - start,
    )
})();
```

<img src="https://user-images.githubusercontent.com/31977543/92400722-52b8f500-f167-11ea-842a-1cb2eeda842e.png" style="height:200px"/>

약 1000 ms 
```javascript
(async () => {
    const [v1, v2] = await Promise.all([timeout(f1, 500), timeout(f2, 1000)]);
    console.log(v1, v2, performance.now() - start);
})
```

<img src="https://user-images.githubusercontent.com/31977543/92401591-eccd6d00-f168-11ea-9ab2-c99e867a56d1.png" style="height:200px"/>

약 500 ms
```javascript
(async () => {
    const v = await Promise.race([timeout(f1, 500), timeout(f2, 1000)]);
    console.log(v, performance.now() - start);
})
```


`timeout fetch`     
timeout 이 지원되는 fetch 함수. fetch 에 timeout 이 없다. 
```javascript
const api = async(url, timeout = 5000, info = {}) => {
    // fetch 에 Throw 가 날 가능성이 있기 때문에 붙여줌. Promise 객체가 에러 결과값을 갖고 await 을 만나면 try catch 에서 감지 된다.
    try {
        let id = -1;    // setTimeout 은 어떤 경우에도 id 를 -1 로 리턴하는 경우가 없다.
        const v = await Promise.race([  // v 는 undefined 가 오든지 fetch 의 Response 객체가 올 것이다.
            new Promise(res => id = window.setTimeout(_ => res(), timeout)),
            fetch(new Request(url, info))
        ]);
        
        if (v instanceof Response) {
            clearTimeout(id);
            return v.status === 404 ? new Error('404') : await v.text();
        }
        else return new Error('timeout');   
    }
    catch (e) {
        return e;
    }
}
```

```javascript
(async() => {
    const v = await api("200.html", 1);
    if (v instanceof Error) console.log(`error: ${v}`);
    else console.log(`contents: ${v}`);
})();
```


<img src="https://user-images.githubusercontent.com/31977543/92403386-500cce80-f16c-11ea-8a95-f2555306dd45.png" style="height:200px"/>
<img src="https://user-images.githubusercontent.com/31977543/92403392-5307bf00-f16c-11ea-9220-d91f6a727b44.png" style="height:200px"/>


더 친화적인 async await 의 사용방법은 에러객체를 리턴하는 것이 아닌 `throw` 를 하는 것이다. 

api 를 사용하는 쪽에서 try catch 를 사용하면 된다.

```javascript
const api = async(url, timeout = 5000, info = {}) => {
    let id = -1;    // setTimeout 은 어떤 경우에도 id 를 -1 로 리턴하는 경우가 없다.
    const v = await Promise.race([  // v 는 undefined 가 오든지 fetch 의 Response 객체가 올 것이다.
        new Promise(res => id = window.setTimeout(_ => res(), timeout)),
        fetch(new Request(url, info))
    ]);
    
    if (v instanceof Response) {
        clearTimeout(id);
        if(v.status === 404) new Error('404');
        return await v.text()
    }
    else new Error('timeout');   
}
```

비동기 명령보다 동기 명령이 훨씬 편하다. 
- 지역변수를 사용할 수 있기 때문이다. 
- 클로저를 이용해도 외부 스코프의 변수가 가까이 있다.

```javascript
const api = async(url, timeout = 5000, info = {}) => {
    let id = -1;    // setTimeout 은 어떤 경우에도 id 를 -1 로 리턴하는 경우가 없다.
    const v = await Promise.race([  // v 는 undefined 가 오든지 fetch 의 Response 객체가 올 것이다.
        new Promise(res => id = window.setTimeout(_ => res(), timeout)),
        fetch(new Request(url, info))
    ]);
    
    if (v instanceof Response) {
        clearTimeout(id);
        if(v.status === 404) new Error('404');
        return await v.json()
    }
    else new Error('timeout');   
};

(async () => {
    try {
        const { id, nick, thumb } = await api('/member');
        const [ {name, email, sex }, friendsId] = await Promise.all([api(`/detail/${id}`), api(`/friends/${id}`)]);
        updateMember(nick, thumb, name, email, sex);
        updateFriends(
            (await Promise.all(friendsId.map(id => api(`/detail/${id}`)))).map((v, idx) => ({id: friendsId[idx], ...v}));
        );
    } catch (e) {
        console.log(e); // json parsing 에러는 throw 를 던지면 여기서 캐치 
    }
})();
const updateMember = (nick, thumb, name, email, sex) => {}
const updateFriends = (details) => details.map(({id, name, email, sex}) => {} ) 
``` 

<img src="https://user-images.githubusercontent.com/31977543/92436015-a155a600-f1de-11ea-9c33-d933c3cd1aed.png" style="height:200px"/>

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