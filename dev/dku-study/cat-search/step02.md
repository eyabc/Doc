---
sidebarDepth: 2

---
공부한 내용들은 
[step02 wiki](https://github.com/DKU-STUDY/CatSearch/wiki/Step02)
에 markdown 으로 다같이 정리해 주세요!
 
# Step02

## 목표
바닐라 스크립트에서 모듈을 로드한다.


## 공부할 내용 (힌트)
- html5, 와 html 의 역사
- 바닐라스크립트에서 모듈을 로드해 오는 방법 [:link:](https://www.youtube.com/watch?v=WHAfp-1JPMg)
- head 태그에 쓰인 meta 태그의 프로퍼티`name, content ...`의 의미
- html 에서 `<script>` 를 어디에다 두면 좋은지 그리고 그 이유
    - defer, async, 코드내의 script 태그 위치 등
- script 태그로 여러 js 파일들을 로드해올 것이다. script 파일들의 순서가 영향이 있는지 정리하기
- javascript 의 모듈시스템  
- SPA
- body 태그 안에 왜 div 태그를 하나만 생성하였는지 정리하기

## 수정할 파일
### index.html
- html5을 사용한다.
- `<title>` 생성하기.
- head 태그의 자식으로 
    ```html
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ```
    을 추가한다.
- `<script>` 에 사용할 js 파일들 추가하기
- body 태그의 자식으로 div 태그를 생성하고, div 태그의 id 를 App 으로 지정하기.




    
## 아직 진행하지 않을 내용 step03~

    
     
- App.js
    - App 모듈을 export 해보기. (es6 이전 모듈 사용)
    - 클래스형 모듈 사용해 보기.
- main.js
    - App.js 모듈을 import 하기 (es6 이전 모듈 사용)
    - id 가 App 인 DOM 요소를 변수에 저장하기 
    - App 객체를 생성하기 
        - 이떄, 생성자의 인자는 위에 저장한 dom 요소 

- javascript 의 class 에 대해 정리하기
- class 객체를 생성하는 방법 정리하기
- 브라우저 document 요소에는 무엇이 있는지 훑어보기
- 인텔리제이에서 파일 단위로 나눠서 commit 해보기
- 각 파일들이 무슨역할을 하는지 정리하기.
- babel에 대해, 간단하게 사용법을 정리해보세요.