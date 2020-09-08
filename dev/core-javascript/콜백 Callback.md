## 콜백 (Callback)
다른 함수의 인수로 넘기는 함수

예시) Github 의 create-react-app 프로젝트에 등록되어 있는 이슈 목록을 가져와서 출력하는 코드
- $.get 메소드
    - 비동기식 동작
    - Github API 서버 통신 태스크를 브라우저에 위임한 후 종료된다.
    - 통신이 끝난 후 그 결과를 첫번째 인수로 해서 콜백을 호출한다.
   
```javascript
const $ = require('jquery');
const API_URL = 'https://api.github.com/repos/facebookincubator/create-react-app/issues?per_page=10';

$.ajaxSetup({
  dataType: 'json'
});

$.get(API_URL, issues => {
  console.log('최근 10개의 이슈:');
  issues
    .map(issue => issue.title)
    .forEach(title => console.log(title));
  console.log('출력이 끝났습니다.');
});

console.log('받아오는 중...');
```

더 복잡한 예시) 
1. Github 에 공개되어있는 저장소 중, 언어가 JavaScript 이고 별표를 가장 많이 받은 저장소를 불러온다.
1. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
1. 해당 기여자들이 최근에 Github 에서 별표를 한 저장소를 각각 10개씩 불러온다.
1. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.

데이터 흐름이 조금만 복잡해져도 코드가 복잡해지는 문제가 생긴다.

```javascript
const $ = require('jquery');
const API_URL = 'https://api.github.com';
const starCount = {};

$.ajaxSetup({
  dataType: 'json'
});

// 1. Github에 공개되어있는 저장소 중, 언어가 JavaScript이고 별표를 가장 많이 받은 저장소를 불러온다.
$.get(`${API_URL}/search/repositories?q=language:javascript&sort=stars&per_page=1`, result => {
  // 2. 위 저장소에 가장 많이 기여한 기여자 5명의 정보를 불러온다.
  $.get(`${API_URL}/repos/${result.items[0].full_name}/contributors?per_page=5`, users => {
    let repoArrs = [];
    for (let user of users) {
      // 3. 해당 기여자들이 최근에 Github에서 별표를 한 저장소를 각 기여자마다 10개씩 불러온다.
      $.get(`${API_URL}/users/${user.login}/starred?per_page=10`, repos => {
        repoArrs.push(repos);
        // 4. 불러온 저장소를 모두 모아, 개수를 센 후 저장소의 이름을 개수와 함께 출력한다.
        if (repoArrs.length === 5) {
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
        }
      });
    }
  });
});

console.log('fetching...');
```

## 콜백의 에러 처리
```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}

loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
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