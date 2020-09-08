# async Iterable

## generator Iterator
Symbol.iterator 는 next() 가 구현된 일반 객체보다, 제너레이터를 반환하도록 구현하는 경우가 더 많다.
```javascript
let range = {
 from: 1,
 to: 5,

 *[Symbol.iterator]() { // [Symbol.iterator]: function*()를 짧게 줄임
   for(let value = this.from; value <= this.to; value++) {
     yield value;
   }
 }
};
```
## 비동기 동작을 추가한 generator
```javascript
let range = {
 from: 1,
 to: 5,

 async *[Symbol.asyncIterator]() { // [Symbol.asyncIterator]: async function*()와 동일
   for(let value = this.from; value <= this.to; value++) {

     // 값 사이 사이에 약간의 공백을 줌
     await new Promise(resolve => setTimeout(resolve, 1000));

     yield value;
   }
 }
};
```

## Pagination
많은 온라인 서비스가 Pagination 을 구현해 데이터를 전송한다.
사용자 목록이 필요해서 서버에 요청을 보내면, 서버는 일정 숫자 단위로 사용자를 끊어 정보를 한 페이지로 구성한 후 다음페이지를 볼 수 있는 url 과 함께 응답한다.

```javascript
async function* fetchCommits(repo) {
 let url = `https://api.github.com/repos/${repo}/commits`;

 while (url) {
   const response = await fetch(url, { // (1)
     headers: {'User-Agent': 'Our script'}, // GitHub는 모든 요청에 user-agent헤더를 강제 합니다.
   });

   const body = await response.json(); // (2) 응답은 JSON 형태로 옵니다(커밋이 담긴 배열).

   // (3) 헤더에 담긴 다음 페이지를 나타내는 URL을 추출합니다.
   let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
   nextPage = nextPage?.[1];

   url = nextPage;

   for(let commit of body) { // (4) 페이지가 끝날 때까지 커밋을 하나씩 반환(yield)합니다.
     yield commit;
   }
 }
}
(async () => {
 let count = 0;
 for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
   console.log(commit.author.login);
   if (++count == 100) { // 100번째 커밋에서 멈춥니다.
     break;
   }
 }
})();
```

## co 라이브러리
generator 를 비동기식으로 작동시킬 수 있는 co 라이브러리

- Github에서 데이터를 불러오는 예제를 다시 작성
```javascript
const co = require('co');
const axios = require('axios');
const API_URL = 'https://api.github.com';

function* fetchStarCount() {
 const starCount = {};

 // 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript 이고 별표를 가장 많이 받은 저장소를 불러온다.
 const topRepoRes = yield axios.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`);

 // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
 const topMemberRes = yield axios.get(`${API_URL}/repos/${topRepoRes.data.items[0].full_name}/contributors?per_page=5`);

 // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각각 10개씩 불러온다.
 const ps = topMemberRes.data.map(user => axios.get(`${API_URL}/users/${user.login}/starred?per_page=10`));
 const starredReposRess = yield Promise.all(ps);
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

co(fetchStarCount).then(console.log);
```

```javascript
const infinity = async function* (category) {
    let page = -1;
    do {
        try {
            const { nextPage, items} = await api(`/list/${category}/${page === -1 ? "": page}`);
            page = nextPage;
            yield items;
        } catch(e) {
            return;
        }
    } while(page !== -1);
};
const notice = infinity('notice');
(async () => {
    const { value, done } = await notice.next();
    if (!done) console.log(value);  // 페이지 렌더링
});
document.querySelector('#next').onclick = async() => {
    const { value, done } = await notice.next();
    if (!done) console.log(value);
}
```

## iterable & generator 요약
| | iterable | async iterable | 
| --- | --- | --- |
| iterator 를 반환하는 메서드 | Symbol.iterator | Symbol.asyncIterator |
| next() 가 반환하는 값 | { value:..., done: true/false } | { value:..., done: true/false } 를 감싸는 Promise |
 
| | generator | async generator | 
| --- | --- | --- |
| 선언 | function* | async function* |
| next() 가 반환하는 값 | { value:..., done: true/false } | { value:..., done: true/false } 를 감싸는 Promise |

웹개발을 하다보면 띄엄띄엄 들어오는 데이터 스트림을 다루어야 할 때가 자주 생긴다.
- 용량이 큰 파일 다운로드&업로드

이런 데이터를 처리할 때, async generator 를 사용할 수 있다.

몇몇 브라우저 및 호스트 환경에서는 데이터스트림을 처리해주는 API 를 제공하기도 한다.
- 한쪽에서 받은 데이터를 다른 쪽에 즉각 전달하는게 가능해진다.
(TODO)

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