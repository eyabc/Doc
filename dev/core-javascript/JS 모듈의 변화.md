# JS Module 의 변화

## 초기 스크립트
- 작은 크기, 단순함
- 모듈 표준문법 없이 성장
- 파일스코프가 아닌 전역 객체를 공유함
    - 변수 중복의 문제
   
    
## 복잡해진 스크립트
- 모듈의 필요성 
- 기능의 라이브러리화
- 코드의 모듈 단위 작성

## 모듈 패턴
### IIFE Immediately Invoked Function Expression
함수표현식
```javascript
(function function_name_bar(){
// 
})  
```
즉시 실행 함수 표현식
```javascript
//IIFE_bar.js
(function function_name_bar(){
// 
})()  
```
- 스코프 문제 해결
- 바로 실행되어야 한다는 점은 다른 IIFE 에서 변수나 함수를 가져올 수 없다는 뜻.


### object interface 패턴
리턴값으로 Object 를 내보내 준다.

```javascript
function function_name_foo() {
  function function_inside_foo() { }
  const variable_inside_foo = 4;
  return {
    function_inside_foo: function_inside_foo,
    variable_inside_foo: variable_inside_foo
  }   
}
```
- 함수 스코프
- 다른 스코프에서 함수를 가져올 수 있다.
- 전역 객체를 침범하는 문제


## 모듈 시스템의 등장
- CommonJS
- AMD
- UMD
- ESM

## CommonJS
**로컬 디스크**에서 모듈을 로드할 때.

- ServerJS 를 설립
    - 자바스크립트를 **서버사이드**에서 사용하고자 하는 목적 
- CommonJS 이름 변경
    - 자바스크립트를 범용적으로 사용하고자 하는 목적 
---
- nodeJS 에서 CommonJS 를 차용하였다.

### JS 범용성을 위한 모듈 API 필요성
1. 모듈 시스템 부재
2. 표준 라이브러리 부재
3. 표준 인터페이스 부재
4. 패키지관리 시스템 부재

### 모듈의 정의 
1. 독립적인 실행 영역(scope)의 존재
    - 전역변수와 지역변수의 분리
2. `exports` 모듈을 외부에서 사용하는 방법
3. `require` 모듈을 이용하는 영역

## 브라우저에서의 CommonJS 문제
- 파일 스코프가 없다
- `<script>` 를 통해 JS 파일을 로드하면 여전히 전역변수가 오염됨
- require 는 Sync flow 함수다.
    - 디스크에서는 속도가 빠르기 때문에 문제가 없다. -> non blocking? 
    - 네트워크를 통해 필요한 모듈을 내려받기 전까지는 브라우저가 아무일도 할 수 없음. -> blocking? 
 
## 브라우저의 event loop 
2008 년 V8 크롬 엔진으로 non-blocking, async 환경을 쓸 수 있게 되었다.

> Sync 서브루틴이 즉시 값을 반환   
> Async 서브루틴이 다른 수단으로 값을 반환

 
## AMD Asynchronous Module Definition
- 비동기 모듈에 대한 표준안을 다룬다.
- 브라우저에서 네트워크를 통해 모듈을 내려받는데 더 간결하고 빠른 코드를 제공하기 위함
- event loop 의 non-blocking, async 를 적극 활용
- RequireJS 
    - AMD 형식의 모듈 용 로더

### 브라우저에서의 네트워크를 통한 script 로드
- 브라우저 입장에서 script 를 로드하는 동안 페이지렌더링을 멈추는 동작
    - 안정성을 위한 선택
    - 사용자경험을 악화
- script 태그를 body 가장 아래에 두는 방법
    - 결국 사용자의 첫 인터렉션의 시간을 줄일수 없다.

### 동적로딩 Dynamic Loading, Lazy Loading
- 인터렉션에 필요한 부분만 먼저 로드
- 사용자 반응에 따라 점진적 로드
- script 태그의 동적 삽입 
    - AMD 방식
    
### 사용방식
main.js
```javascript
define(['./foo.js', './bar.js'], function(foo, bar){
    // 이 안에서 foo와 bar를 통해 코드를 짤 수 있었어요.
})
```
```javascript
// *******GLOBAL NAMESPACE******
define(['./foo.js', './bar.js'], function(foo, bar){
    // *******LocaL NAMESPACE******
})
```

### 문제점
- 서버사이드에서 만든 함수를 AMD 형식으로 바꿔주어야 한다.
- 2010, npm 의 등장  
    - 대부분 CommonJS 형식으로 모듈이 업로드 됨.
    

## Browserify
- CommonJS 모듈용 번들러 (TODO)
- 브라우저에서도 CommonJS 를 쓸 수 있도록 구성해 준다.


## UMD Universal Module Definition
다양한 모듈 방식을 모두 지원하는 일종의 코드 패턴

- 조건문으로 AMD 나 CommonJS 를 지원하는지 확인하여 지원하는 모듈 방식의 코드를 사용할 수 있다.
- UMD 를 직접 작성하는 일은 드물며, 대부분 번들러에 의해 생성되는 코드를 사용한다.

## ES6 Module ESM
`export / import`

### 정적 import
ESM 은 동적으로 Import, export 할 수 없다. 

Webpack 과 같은 번들링 도구에서 정적으로 import 와 export 구문을 분석하고
사용하지 않는 코드를 제외시키는 방법으로 최적화 한다.

### 동적 import()

## System.register
ES6 모듈 문법을 ES5 에서 지원하기 위해 고안됨.

## 모듈 로더 Module Loader
- 모듈을 해석하고 로드
- 런타임에 실행된다.
1. 브라우저에서 모듈 로더를 로드
1. 로드 할 기본 앱 파일을 모듈 로더에게 알려줌
1. 모듈 로더는 기본 앱 파일을 다운로드 하고 해석
1. 모듈 로더는 필요에 따라 파일을 다운로드

- RequireJS 
    - AMD 형식의 모듈 용 로더
- SystemJS
    - AMD, CommonJS, UMD 또는 System.register 형식의 모듈용 로더
    
## 모듈 번들러 Module Bundler
- 기본적으로 js 는 빌드가 없다.
- 빌드타임(컴파일 타임) 을 만들어 내서 한개의 js 파일로 보내자는 시도

- (컴파일 시간)빌드시 실행
1. 빌드시 모듈 번들러를 실행하여 번들 파일을 생성
1. 브라우저에서 번들을 로드

- Browserify
    - CommonJS 모듈용 번들러 (TODO)
- Webpack
    - AMD, CommonJS, ES6 모듈용 번들러
     
