---
sidebarDepth: 2
---


## 최적화

### 블록 리소스와 주요 렌더링 경로

#### HTML 파싱 블록
브라우저 로딩 초기 단계에서 HTML 파싱이 일어날 때 CSS 또는 JS 로 인해 파싱이 중단될 수 있다.

#### 블록 리소스
HTML 블록 상태의 원인이 되는 리소스

- 페인트 과정을 지연시킨다.

#### [주요 렌더링 경로(Critical Rendering Path)](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/?hl=ko)
- 구글에서 렌더링 경로를 최적화 하는 방법
- 현재 사용자 작업과 관련된 콘텐츠 표시의 우선순위를 지정하는 것.

![image](https://user-images.githubusercontent.com/31977543/99141395-55b3f280-268e-11eb-9acf-5b33ebfaadb5.png)

### 성능 개선 지표
- 브라우저 입장
- 사용자 입장

#### 브라우저 기준의 성능 측정

##### 전통적인 성능 측정 방식
웹 페이지가 로딩될 때 `DOMContentLoaded`, `load` 이벤트가 발생하며, 각 이벤트가 발생하는 시점으로 성능을 측정

###### 내비게이션 타이밍(Navigation Timing) 모델
![image](https://user-images.githubusercontent.com/31977543/99141470-f99d9e00-268e-11eb-82fb-30dae33f0975.png)

- `DOMContentlLoaded` 이벤트(파란색 표시), `load` 이벤트(빨간색 표시) 
    - 두 이벤트의 발생 시점이 빠를수록
    - 두 이벤트 발생 구간의 폭이 좁을수록 
성능이 좋다

###### DOMContentLoaded 이벤트
- HTML 과 CSS **파싱이 끝나는 시점**
- 렌더 트리를 구성할 준비가 된(DOM 및 CSSOM 구성이 끝난) 상황

###### load 이벤트
- HTML 상에 필요한 모든 리소스가 로드된 시점

##### DOMContentLoaded, load 의 시점 확인 방법

###### 내비게이션 타이밍 API 사용
- 브라우저에서는 웹 페이지 성능을 측정할 수 있도록 내비게이션 타이밍 API 를 제공
- PerformanceNavigationTiming 의
- `DOMContentLoaded` 이벤트
    -  domContentLoadedEventStart 속성
- `load` 이벤트
    - loadEventStart 속성
    
    
###### 크롬 개발자 도구 사용
- 브라우저에서 이벤트 발생 시점을 확인할 수 있도록 UI를 제공하고 다양한 측정 방법을 제공

![image](https://user-images.githubusercontent.com/31977543/99141613-5cdc0000-2690-11eb-9e02-45ba7c335e6f.png)

###### 한계점
개발 패러다임이 변화 SPA(Single Page Application)
- DOMContentLoaded, load 이벤트 발생 시점만 가지고 성능을 판단이 어려움
- SPA의 웹 페이지에 포함된 적은 양의 HTML 로 DOMContentLoaded, load 이벤트가 일찍 발생할 수 있으나, 이벤트가 발생한 이후에도 수많은 스크립트 실행으로 인해 여전히 "느린 로딩"이 존재한다

##### 사용자 기준의 성능 측정
사용자에게 콘텐츠를 보여주는 여러 시점을 기반
- 의미 있는 콘텐츠가 처음 보이는 시점이 빠를수록 성능이 좋다
![image](https://user-images.githubusercontent.com/31977543/99141395-55b3f280-268e-11eb-9acf-5b33ebfaadb5.png)

###### FP(First Paint)
흰 화면에서 화면에 무언가가 처음으로 그려지기 시작하는 순간

###### FCP(First Contentful Paint)
텍스트나 이미지가 출력되기 시작하는 순간

###### FMP(First Meaningful Paint)
사용자에게 의미 있는 콘텐츠가 그려지기 시작하는 첫 순간 
- 콘텐츠를 노출하는데 필요한 CSS, 자바스크립트 로드가 시작되고 스타일이 적용되어 주요 콘텐츠를 읽을 수 있다.

###### TTI(Time to Interactive)
자바스크립트의 초기 실행이 완료되어서 사용자가 직접 행동을 취할 수 있는 순간이다.

![image](https://user-images.githubusercontent.com/31977543/99141861-ab8a9980-2692-11eb-9084-b6966dbc89ee.png)

## 성능 측정 도구 (크롬 86 버전)
크롬 브라우저 개발자 도구의 성능과 관련 패널
- Network, Performance, Audits

### Performance 패널
웹 페이지 **로딩 단계**를 차트 형태로 살펴볼 수 있다. 
웹 페이지가 로드되는 과정을 레코딩하고 단계마다 걸리는 시간을 확인할 수 있다. 로딩 과정에서 최적화가 필요한 부분을 찾을 때 사용한다.

![image](https://user-images.githubusercontent.com/31977543/99187952-e8db4e00-279c-11eb-8269-3ee3cb7b861d.png)

#### 영역 정보
![image](https://user-images.githubusercontent.com/31977543/99188115-9a7a7f00-279d-11eb-8d0e-46e6e88104f1.png)

##### (1) Controls
레코딩을 시작하고 중단하는 영역
- 레코딩 시작, 중단 버튼(첫 번째 버튼)
    - 수동으로 레코딩을 제어한다.
- 페이지 로드 레코딩(두 번째 버튼)
    - 레코드를 시작하면서 페이지를 리로드하고 완료되면 자동 중단한다.
    
##### (2) Capture
- Screenshots
    - 시간의 흐름에 따른 렌더링 상태를 확인할 수 있다.
    ![image](https://user-images.githubusercontent.com/31977543/99188277-8420f300-279e-11eb-8b4f-af03466cda1b.png)
    ![image](https://user-images.githubusercontent.com/31977543/99188281-8be09780-279e-11eb-90d3-c4ecb512c720.png)

- Memory
    - Heap Memory 상태를 확인할 수 있다.
    ![image](https://user-images.githubusercontent.com/31977543/99188314-bc283600-279e-11eb-9e24-c483a1f837a8.png)

- GC(가비지 컬렉션) 버튼 
    - 강제 GC 수행

##### (3) Overview
전체적인 흐름을 보여주는 영역

##### (4) Main
Overview 에서 선택한 구간의 상세 내용을 보여주는 영역
![performance](https://user-images.githubusercontent.com/31977543/99188455-6738ef80-279f-11eb-98f7-fbbcebd70e38.gif)


##### (5) Details
Main 에서 선택한 특정 항목의 상세 내용를 보여주는 영역
![details](https://user-images.githubusercontent.com/31977543/99188579-f3e3ad80-279f-11eb-9315-0e42e40f7e66.gif)

#### 웹 페이지 로딩 과정
웹 페이지가 로드될 때 Controls 를 사용해 레코딩한 다음 Main 영역에서 다음과 같이 로딩 과정을 확인할 수 있다.

![test](https://user-images.githubusercontent.com/31977543/99188677-913ee180-27a0-11eb-8c59-3cf75bd6dfe0.gif)

### Network 패널
웹 페이지가 로딩되는 동안 **요청된 리소스의 상태**를 차트 형태로 확인할 수 있다.
- 리소스 최적화 상태를 비교 가능
- Performance 패널과 같이 레코딩한다. 

![image](https://user-images.githubusercontent.com/31977543/99188890-a405e600-27a1-11eb-9ff3-eb6ac967629e.png)

#### (1) Controls
네트워크 패널의 모양과 기능을 제어

#### (2) Filters
보여줄 리소스를 선택

#### (3) Overview
전체적인 요청과 다운로드 흐름을 보여줌

#### (4) Request Table
검색 된 모든 리소스의 요청과 다운로드 상황을 보여줌
- 리소스 목록은 시간순 정렬 

#### (5) Summary
- 총 요청 수
- 전송된 데이터 양
- DOMContentLoaded, load 이벤트 발생 시간

#### 리소스의 서버 요청 대기 시간
![image](https://user-images.githubusercontent.com/31977543/99189266-baad3c80-27a3-11eb-954d-94ec6cab914b.png)

##### (1) Queuing
대기열에 쌓아두는 시간
- 자바스크립트, CSS 보다 우선순위가 낮아서 대기한다.
- TCP 소켓 대기 
- TCP 연결 초과 대기
- 디스크 캐시 항목 작성 소요 시간

##### (2) Stalled
요청을 보내기 전의 대기 시간

- Queuing 에서 쌓인 대기 시간 소모 (?) 
    - Queuing 시간도 포함한다는 뜻인가?
- 프락시 협상에 드는 시간

##### (3) DNS Lookup
DNS 조회에 소비된 시간

##### (4) Initial connection
TCP 핸드셰이크/재시도 및 SSL 을 포함한 연결을 설정하는 데 걸린 시간

##### (5) Waiting(TTFB)
초기 응답(Time To First Byte)을 기다리는 데 소비한 시간 (서버 왕복 시간)

##### (6) Content Download
리소스 실제 다운로드 시간

### Audits 패널
(chrome 84 에서의 기능이름은 lightHouse 으로 추정)
사용자 기준의 성능 측정 지표

## 웹 페이지 로딩 최적화
브라우저 로딩 과정의, 파싱 중 블록 리소스(CSS/JS)가 발생할 수 있다. 

## CSS 최적화
렌더 트리
- DOM 트리 + CSSOM 트리
- DOM 트리
    - 파싱 중에 태그를 발견할 때마다 순차적으로 구성
- CSSOM 트리
    - CSS 를 모두 해석해야 구성 가능
- CSSOM 트리가 구성되지 않으면 렌더 트리를 만들지 못함 → 렌더링 차단
- CSS 는 렌더링 차단 리소스이다
- 렌더링이 차단되지 않도록 CSS 는 항상 HTML 문서 최상단(`<head>` 아래)에 배치
```html
 <head>
   <link href="style.css" rel="stylesheet" />
 </head>
```

### 미디어 쿼리
특정 조건에서 필요한 CSS 만 로드하여, 불필요한 블로킹 방지 

- 페이지를 인쇄(print.css) 
- 화면 세로 모드(portrait.css)

해당 스타일을 사용하는 경우에만 로드할 수 있도록 `<script>` 태그에 media 속성을 명시
     
미디어 쿼리를 사용하지 않는 경우 (최적화 전)
```html
<link href="style.css" rel="stylesheet" />
<link href="print.css" rel="stylesheet" />
<link href="portrait.css" rel="stylesheet" />
```
미디어 쿼리를 사용하는 경우 (최적화 후)
```html
<link href="style.css" rel="stylesheet" />
<link href="print.css" rel="stylesheet" media="print" />
<link href="portrait.css" rel="stylesheet" media="orientation:portrait" />
```

### 외부 스타일시트 , @import 사용은 피한다
 
@import 는,
- 브라우저는 스타일시트를 병렬 다운 불가 → 로드 시간 증가
```
/* foo.css */
@import url("bar.css")
```
## 자바스크립트 최적화
> 아래 관련 내용은 브라우저과 버전별로 동작이 달라 절대적인 내용이 아니므로 유의하자!
> 구 브라우저의 지원을 하는 어플리케이션을 만들기 위해서는 아래 내용을 고려할 필요가 있다!

### 자바스크립트
- DOM 트리와 CSSOM 트리를 동적으로 변경할 수 있다. 
- → HTML 파싱을 차단하는 블록 리소스

### HTML 파싱 중, `<script>` 태그를 만나면 스크립트가 실행
- 이전까지 생성된 DOM 에만 접근 가능 
- 스크립트 실행이 완료될 때까지 DOM 트리 생성이 중단됨 

### 외부에서 가져오는 자바스크립트
- 모든 스크립트가 다운로드 & 실행될 때까지 DOM 트리 생성이 중단됨 
- HTML 문서 최하단(`</body>` 직전)에 배치해야 한다.
```html
<body>
   <div>...</div>
   <div>...</div>
   <script src="app.js" type="text/javascript"></script>
</body>
```
이외 HTML 파싱을 블록하지 않는 방법
 
### `script`에 `defer`나 `async` 속성
- 스크립트가 DOM 트리와 CSSOM 트리를 변경하지 않겠다는 의미
- 브라우저가 파싱을 멈추지 않음
- 이 속성들은 브라우저 지원 범위가 한정적이므로 사용에 유의한다.
```html
 <html>
   <head>
     <script async src="https://google.com/analatics.js" type="text/javascript"></script>
   </head>
   <body>
     <div>...</div>
     <div>...</div>
   </body>
 </html>    
```

추가적으로 이 전에 공부한 내용 중 `type=module` 을 하면 `defer` 와 같이 동작한다 라고 기록했었음

  
### 크롬 개발자 도구로 블록 리소스 최적화 전/후 비교
Performance 패널에서 블록 리소스를 최적화하기 전과 후를 비교해본다. 


#### 최적화 전
HTML 을 파싱하던 중에 블록 리소스가 실행되고 실행이 끝나면 다시 HTML 을 파싱한다.
파싱이 중단되어 'Parse HTML'이 2번 발생 
  
- `<head />`가 아닌 곳에서 CSS 파일 로드
- `<head />`에서 자바스크립트 파일 로드

![image](https://user-images.githubusercontent.com/31977543/99256433-bee76180-2858-11eb-9d83-b540df3c6715.png)

#### 최적화 후
CSS 나 자바스크립트에 의해 'Parse HTML' 이 중단되지 않았다.

- `<head />` 에서 CSS 파일 로드
- `</body>` 직전에 자바스크립트 파일 로드
- 내부 스타일시트 사용

![image](https://user-images.githubusercontent.com/31977543/99256500-d6bee580-2858-11eb-95eb-175951973bfa.png)

## 리소스 요청 수 줄이기
리소스(CSS, 자바스크립트, 이미지 등)는 서버 요청 후 다운로드 된다. 

개발자 도구 네트워크 패널, 1개 리소스 파일을 요청했을 때 걸리는 시간 
![image](https://user-images.githubusercontent.com/31977543/99264627-0f17f100-2864-11eb-9d4a-fe031913175a.png)

- 실제 다운로드 시간은 1.03ms
- 그 외 대기 시간(전체 소요 시간 - 실제 다운로드 시간) 127.45ms
 
리소스 파일 하나를 요청하는 데 많은 시간  → 필요한 요청만 하는 최적화 필요
 
### 이미지 스프라이트
(chrome 60)
여러 개 이미지를 하나로 만들고, CSS 의 background-position 속성을 사용해 부분 이미지를 사용하는 방법

![image](https://user-images.githubusercontent.com/31977543/99264961-7e8de080-2864-11eb-8633-7c2e069ae02b.png)

아이콘마다 다른 이미지 파일을 사용할 경우 리소스 요청이 7번 이상 발생
- 이미지 스프라이트 기법 → 1번 요청

```
<button class="btn">확인</button>
.btn {
  background-image: url(../images/icon-sprite.png); // 스프라이트 이미지
  background-position: 10px 10px;
  width: 20px;
  height: 20px;
}
```

#### 여러 개의 이미지 파일을 사용한 경우 (최적화 전)
![image](https://user-images.githubusercontent.com/31977543/99265769-69fe1800-2865-11eb-9d08-f27dd032519f.png)

#### 이미지 스프라이트를 사용한 경우 (최적화 후) 
![image](https://user-images.githubusercontent.com/31977543/99265838-7d10e800-2865-11eb-8ac0-b11d9312b26e.png)

### CSS, 자바스크립트 번들
모듈 기반의 개발 방식이 등장하기 이전
- 분리된 여러 개의 리소스 파일을 가져와 사용

#### 분리된 리소스를 사용하는 경우 (최적화 전)
5번 이상의 리소스 요청(CSS 파일 2번, 자바스크립트 파일 3번) 
```html
<html>
  <head>
    <link href="foo.css" rel="stylesheet" />
    <link href="bar_baz.css" rel="stylesheet" />
  </head>
  <body>
    <div id="foo">...</div>
    <script src="foo.js" type="module"></script>
    <script src="bar.js" type="module"></script>
    <script src="baz.js" type="module"></script>
  </body>
</html>
```

#### 번들된 리소스를 사용하는 경우 (최적화 후)
webpack 과 같은 번들러를 사용하여 CSS, 자바스크립트 파일 요청을 줄일 수 있다. 
```html
<html>
  <head>
    <link href="bundle.css" rel="stylesheet" />
  </head>
  <body>
    <div class="foo">...</div>
    <script src="bundle.js" type="module"></script>
  </body>
</html>
```    

번들러
- 여러 개의 모듈 파일을 하나로 묶어서 1개 파일(번들 파일)로 생성해주는데 
- 번들 파일을 사용하여 리소스 요청 감소 
     
### 내부 스타일시트 사용하기
문서 안에서 `<style>` 태그를 사용
- 외부 스타일시트 요청 횟수 감소 
- 리소스 캐시(?)를 사용할 수 없다.
- HTML 에 CSS 가 매번 포함되므로 필요한 경우에만 사용한다.
     
#### 외부 스타일시트를 사용하는 경우 (최적화 전)
```html
 <html>
   <head>
     <link href="bundle.css" rel="stylesheet" />
   </head>
   <body>
     <div class="foo">...</div>
   </body>
 </html>
```
#### 내부 스타일시트를 사용하는 경우 (최적화 후)
```html
 <html>
   <head>
     <style type="text/css">
       .foo {
         background-color: red;
       }
     </style>
   </head>
   <body>
     <div class="foo">...</div>
   </body>
 </html>
```

## 리소스 용량 줄이기
큰 리소스 → 웹 페이지 로딩 시간 저하
 
- 불필요한 데이터를 제거
- 압축

### 중복 코드 제거하기
자바스크립트 코드 중 자주 사용되는 코드는 utils.js 파일로 정리

#### 중복 코드 사용 (최적화 전)
```javascript
// foo.js
function filter() { ... }
function map() { ... }

filter();
map();
// bar.js
function filter() { ... }
function find() { ... }

filter();
find();
```

#### 중복 코드 제거 (최적화 후)
````javascript
// utils.js
export function find() { ... }
export function filter() { ... }
export function map() { ... }
// foo.js
import {filter, map} from 'utils.js'

filter();
map();
// bar.js
import {filter, find} from 'utils.js'

filter();
find();
````

### 만능 유틸 사용 주의하기
`lodash` 와 같은 만능 유틸 라이브러리를 사용할 때 주의
- 필요한 함수만 부분적으로 가져오기 
- 사용하지 않는 기능이 많이 포함된 라이브러리 사용 지양

#### 모든 유틸 함수 가져오기 (최적화 전)
```javascript
import _ from 'lodash';

_.array(...);
_.object(...);
```

#### 필요한 함수만 가져오기 (최적화 후)
```javascript
import array from 'lodash/array';
import object from 'lodash/fp/object';

array(...);
object(...);
```

### HTML 마크업 최적화
(참조: [Excessive DOM](https://web.dev/dom-size/)) 

- HTML 태그 중첩 최소화 → 단순 구성 
- 공백, 주석 등을 제거
- 권장하는 DOM 트리의 노드 수는 전체 1500개 미만
- 최대 깊이는 32개
- 자식 노드를 가지는 부모 노드는 60개 미만

불필요한 마크업 사용으로 인해 DOM 트리가 커지는 것을 막고, 
HTML 파일 용량이 늘어나지 않도록 함.

#### 불필요한 태그, 공백, 주석 사용 (최적화 전)
```html
 <html>
   <head>
     ...
   </head>
   
   <body>
   
     <div>
     
             <div>
                 <!-- blar blar blar -->
                 <p>hello</p>
             </div>
         
     </div>
   </body>
 </html>
```

#### 간결한 마크업 사용 (최적화 후)
```html
 <html>
   <head>
     ...
   </head>
   <body>
     <p>hello</p>
   </body>
 </html>
```

#### 큰 DOM 트리의 페이지 성능 저하
##### 네트워크 효율성 및 부하 성능
큰 DOM 트리 
- 사용자가 처음 페이지를로드 할 때 표시되지 않는 많은 노드가 포함
- 사용자의 데이터 비용이 불필요하게 증가
      
##### 런타임 성능
사용자와 스크립트가 페이지와 상호 작용할 때 브라우저는 노드의 위치와 스타일을 지속적으로 다시 계산 해야합니다. 
복잡한 스타일 규칙과 결합 된 큰 DOM 트리는 렌더링 속도를 크게 저하시킬 수 있습니다.
      
##### 메모리 성능
자바 스크립트가과 같은 일반 쿼리 선택기를 사용하는 경우 `document.querySelectorAll('li')`사용자 기기의 메모리 기능을 압도 할 수있는 매우 많은 수의 노드에 대한 참조를 무의식적으로 저장할 수 있습니다.

#### DOM 크기 최적화
필요한 경우에만 DOM 노드를 생성, 더 이상 필요하지 않은 경우 노드를 파괴

##### 페이지를 로드하고 표시되는 노드를 수동으로 기록
- 처음로드 된 문서에서 표시되지 않은 노드를 제거
- 스크롤 또는 버튼 클릭과 같은 관련 사용자 상호 작용 후 노드 생성

##### 런타임에 DOM 노드를 생성하는 경우 
[하위 트리 수정 DOM 변경 중단 점])https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints#dom) 을 사용하면 노드가 생성되는시기를 정확하게 파악할 수 있습니다.

##### 큰 DOM 트리를 피할 수 없는 경우
CSS 선택기를 단순화

[Google의 스타일 계산의 범위 및 복잡성 줄이기](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations) 를 참조하세요.

### 간결한 CSS 선택자 사용
ID 대신 클래스 선택자를 사용 → 중복 스타일을 묶어서 처리 가능
- 선택자는 최소화 사용

#### 불필요한 셀렉터 사용 (최적화 전)
```html
<html>
   <head>
     <style type="text/css">
       #wrapper {
         border: 1px solid blue; 
       }
       
       #wrapper #foo {
         color: red;
         font-size: 15px;
       }
       
       #wrapper #bar {
         color: red;
         font-size: 15px;
         font-weight: bold;
       }
       
       #wrapper #bar > span {
          color: blue;
          font-weight: normal;
       }
     </style>
   </head>
   <body>
     <div id="wrapper">
       <span id="foo">hello</span>
       <span id="bar">
         javascript <span>world</span>
       </span>
     </div>
   </body>
</html>
```
#### 간결한 셀렉터 사용 (최적화 후)
```html
<html>
   <head>
     <style type="text/css">
       .wrapper {
         border: 1px solid blue; 
       }
       
       .text {
         color: red;
         font-size: 15px;
       }
       
       .strong {
         font-weight: bold;
       }
       
       .wrapper .text {
         color: blue;
         font-weight: normal;
       }
     </style>
   </head>
   <body>
     <div class="wrapper">
       <span class="text">hello</span>
       <span class="text strong">
         javascript <span class="text">world</span>
       </span>
     </div>
   </body>
</html>
```

### 압축(Minify)하여 사용하기
- HTML, 자바스크립트, CSS 모두 압축
- 불필요한 주석이나 공백 등을 제거한 다음 난독화
- webpack 플러그인과 같은 도구로 처리할 수 있다.

## 웹 페이지 렌더링 최적화
자바스크립트가 렌더링 성능에 어떤 영향을 줄까? 

- 자바스크립트는 브라우저에서 단일 스레드로 동작 
    - 자바스크립트의 실행 시간 → 렌더링 성능과 직결 
- 렌더링 시간
    - 자바스크립트의 실행 시간
    - 자바스크립트로 인한 DOM, CSS 변경을 다시 화면에 그리는 시간
- 렌더링 성능 최적화
    - 소요 시간을 단축하고 화면에 끊김 없이 그리는 것 

### 레이아웃 최적화
레이아웃
- DOM 요소들이 화면에 어느 위치에 어떤 크기로 배치될지를 결정하게 되는 계산 과정

자바스크립트로
- DOM, 스타일 변경 →  변경된 스타일을 반영, 다시 레이아웃을 해야만 화면에 렌더링할 수 있다. 

레이아웃 최적화의 목표
- 레이아웃에 걸리는 시간을 단축
- 레이아웃이 최대한 발생하지 않도록 함. 
- 레이아웃을 최대한 적게하고, 리페인트만 할 수 있도록

### 자바스크립트 실행 최적화
긴 자바스크립트 실행 시간 
- 한 프레임 처리가 오래 걸림 → 렌더링 성능 저하

#### 강제 동기 레이아웃 최적화
DOM 의 속성을 변경하면 화면 업데이트를 위해 레이아웃이 일어날 수 있다. 

- 비동기 레이아웃 → 일반적
- 동기적 레이아웃
    - (강제 동기 레이아웃) 
        - 특정 속성을 읽을 때
        - 최신 값을 계산할 때 
        - 자바스크립트 실행 시간 증가

##### 강제 동기 레이아웃 피하기
스타일을 변경한 다음 `offsetHeight`, `offsetTop` 과 같은 계산된 값을 속성으로 읽을 때 → 강제 동기 레이아웃 발생

> [offsetHeight](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight) 
> - 테두리, 패딩 및 가로 스크롤바 (렌더링 된 경우)를 포함하여 요소의 CSS 높이를 픽셀 단위로 측정 한 것
> 
> ![image](https://user-images.githubusercontent.com/31977543/99351212-7032d980-28e3-11eb-8f4f-d0ba8ebbc6dc.png)

```javascript
const tabBtn = document.getElementById('tab_btn');

tabBtn.style.fontSize = '24px';
console.log(testBlock.offsetTop); // offsetTop 호출 직전 브라우저 내부에서는 동기 레이아웃이 발생한다.
tabBtn.style.margin = '10px';
// 레이아웃
```
동기로 레이아웃 이유
- 계산된 값을 반환하기 전에, 변경된 스타일이 계산 결과에 적용되어 있지 않으면 
변경 이전 값을 반환하는 문제

#### 레이아웃 스래싱(thrashing) 피하기
##### 레이아웃 스래싱
한 프레임 내, 연속적인 강제 동기 레이아웃 → 성능이 더욱 저하됨

##### 예시
- `paragraphs[i]` 요소를 순회하면서 각 요소의 너비를 box 요소의 너비와 일치하도록 설정한다. 
    - 반복문 안에서 `style.width` 를 설정 
    - `box.offsetWidth` 를 읽어오면 `for` 문이 반복 실행될 때마다 레이아웃 발생
    
```javascript
function resizeAllParagraphs() {
  const box = document.getElementById('box');
  const paragraphs = document.querySelectorAll('.paragraph');

  for (let i = 0; i < paragraphs.length; i += 1) {
    paragraphs[i].style.width = box.offsetWidth + 'px';
  }
}
```
##### 방법 
반복문 밖에서 box 엘리먼트의 너비를 읽어온다.
```javascript
function resizeAllParagraphs() {
  const box = document.getElementById('box');
  const paragraphs = document.querySelectorAll('.paragraph');
  const width = box.offsetWidth;

  for (let i = 0; i < paragraphs.length; i += 1) {
    paragraphs[i].style.width = width + 'px';
  }
}
```

##### 이외 [동기식 계산 요소](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
    ## 요소 API
    ### 박스 matric 가져 오기
    elem.offsetLeft, elem.offsetTop, elem.offsetWidth, elem.offsetHeight,elem.offsetParent
    elem.clientLeft, elem.clientTop, elem.clientWidth,elem.clientHeight
    elem.getClientRects(), elem.getBoundingClientRect()
    
    ### 스크롤 item
    elem.scrollBy(), elem.scrollTo()
    elem.scrollIntoView(), elem.scrollIntoViewIfNeeded()
    elem.scrollWidth, elem.scrollHeight
    elem.scrollLeft, elem.scrollTop또한 설정
    
    ### 초점 설정
    elem.focus() ( 출처 )
    
    또한…
    elem.computedRole, elem.computedName
    elem.innerText( 출처 )
    
    ## 창 크기 가져 오기
    window.scrollX, window.scrollY
    window.innerHeight, window.innerWidth
    window.visualViewport.height / width / offsetTop / offsetLeft ( 소스 )
    
    ## 문서
    document.scrollingElement 힘만 스타일
    document.elementFromPoint
    
    ## 양식 : 설정 선택 + 초점
    inputElem.focus()
    inputElem.select(), textareaElem.select()
    
    ## 마우스 이벤트 : 오프셋 데이터 읽기
    mouseEvt.layerX, mouseEvt.layerY, mouseEvt.offsetX, mouseEvt.offsetY( 원 )
    getComputedStyle () 호출
    window.getComputedStyle() 일반적으로 스타일 재 계산을 강제합니다.
    
    window.getComputedStyle() 종종 레이아웃도 강제합니다.
    
    gCS ()가 레이아웃을 강제하는 조건에 대한 세부 정보
    
    ## Range치수 얻기
    range.getClientRects(), range.getBoundingClientRect()
    SVG
    상당히 많은 속성 / 방법이 강제되지만 완전한 목록을 만들지 않았습니다. 이 목록은 불완전합니다.
    
    SVG 찾기 : computeCTM(),getBBox()
    SVGTextContent : getCharNumAtPosition(), getComputedTextLength(), getEndPositionOfChar(), getExtentOfChar(), getNumberOfChars(), getRotationOfChar(), getStartPositionOfChar(), getSubStringLength(),selectSubString()
    SVG 사용 : instanceRoot
    
#### 가능한 한 하위 노드의 DOM 을 조작하고 스타일을 변경
조작이나 스타일 변경을 하는 DOM 이 상위에 있을수록 한 프레임에 드는 시간이 길어진다.

##### 체크 항목
- DOM 트리 상위 노드의 스타일을 변경하면 하위 노드에 모두 영향을 미친다.
- 변경 범위를 최소화할수록 레이아웃 범위가 줄어든다.

#### 영향받는 엘리먼트 제한
DOM 과 스타일을 변경하면 레이아웃 과정에서 주변의 엘리먼트도 영향을 받음
      
##### 체크 항목
- 부모-자식 관계
    - 부모 엘리먼트의 높이가 가변적인 상태에서, 자식 엘리먼트의 높이를 변경할 경우, 
        - 부모 엘리먼트부터 레이아웃이 다시 일어난다. 
    - 부모 엘리먼트의 높이를 고정하여 사용하면 하단에 있는 엘리먼트는 영향을 받지 않게 된다. 
    - 높이가 모두 다른 여러 개의 탭 콘텐츠가 있을 때, 부모 엘리먼트(탭 컨테이너)의 높이를 고정한다.
     
- 같은 위치에 있는 엘리먼트
    - 여러 개의 엘리먼트가 인라인`inline`으로 놓여 있을 때 
    - 첫 번째 엘리먼트의 width 값 변경으로 인해 나머지 엘리먼트의 위치 변경 발생

#### 숨겨진 엘리먼트 수정
`display: none` 
- DOM 조작과 스타일을 변경하더라도 레이아웃과 리페인트가 발생하지 않음

`visibility: hidden` 
- 리페인트는 발생하지 않지만, 공간을 차지하기 때문에 레이아웃은 발생하게 된다.
      
### HTML, CSS 최적화
DOM 트리와 CSSOM 트리를 변경하면 렌더링을 유발하고 트리가 클수록 더 많은 계산이 필요

#### CSS 규칙수 최소화
엘리먼트의 클래스를 변경하면 렌더링이 발생
- CSS 가 복잡하고 많을수록 스타일 계산과 레이아웃이 오래 걸린다.
      
##### 체크 항목
- 사용하는 규칙이 적을수록 계산이 빠르므로 최소화한다.
- 복잡한 선택자는 스타일 계산에 많은 시간이 걸리므로 사용을 피한다.

#### DOM 깊이 최소화
- DOM 트리가 깊을수록, 
- 하나의 노드에 자식 노드가 많을수록 DOM 트리는 커진다.
 
그만큼 DOM 을 변경했을 때 업데이트에 필요한 계산은 많아진다.

##### 체크 항목
- DOM 이 작고 깊이가 얕을수록 계산이 빠르다.
- 불필요한 래퍼 엘리먼트는 제거한다.

> 프론트엔드 프레임워크들이 이런 것들의 최적화를 얼마나 할 수 있는지 궁금하다.

### 애니메이션 최적화
한 프레임 처리가 16ms(60fps) 내로 완료되어야 렌더링 시 끊기는 현상 없이 자연스러운 렌더링을 만들어낼 수 있다. 

- 자바스크립트 실행 시간은 10ms 이내에 수행되어야 레이아웃, 페인트 등의 과정을 포함했을 때 16ms 이내에 프레임이 완료될 수 있다. 
- 애니메이션을 구현할 때 네이티브 자바스크립트 API 를 사용하는 것보다 CSS 사용을 권장한다.

#### requestAnimationFrame() 사용
브라우저의 프레임 속도(보통 60fps)에 맞추어 애니메이션을 실행할 수 있도록 해준다. 

- `setInterval`, `setTimeout` 과 달리 프레임을 시작할 때 호출되기 때문에 일정한 간격으로 애니메이션을 수행할 수 있는 장점이 있다. 
- 현재 페이지가 보이지 않을 때는 콜백함수가 호출되지 않기 때문에 불필요한 동작을 하지 않는다.
```javascript
function animate() {
// 애니메이션 처리 프레임 코드
requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

#### CSS 애니메이션 사용
자바스크립트를 사용한 애니메이션은 성능이 나쁠 수 있다. 

CSS3 애니메이션을 사용하면 자바스크립트를 실행할 필요가 없고,
 
브라우저가 애니메이션을 처리하는데 최적화되어 있어서 부드러운 애니메이션을 구현할 수 있다.
 
CSS 애니메이션을 구현할 때는 다음 사항을 지켜서 사용한다.

##### position: absolute 처리
애니메이션 영역이 주변 영역에 영향을 주지 않도록 주의해야 한다. 

position 을 absolute 나 fixed 로 설정하면 주변 레이아웃에 영향을 주지 않는다.

##### transform 사용
- 기하적 변화를 유발하는 속성을 변경하면 레이아웃 발생 
    - position, width, height
- transform
    - 엘리먼트는 레이어로 분리되기 때문에 영향받는 엘리먼트가 제한되어 레이아웃과 페인트를 줄일 수 있다.
    - 합성만 발생 → 애니메이션에서 사용 시 렌더링 속도가 향상 
    - 때에 따라 하드웨어가 지원될 경우 GPU 사용 가능 

```css
body {
  background-color: lime;
}

.animation-item {
  position: absolute; /* good */
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background-color: red;

  animation: move 3s ease infinite;
}

/* bad */
@keyframes move {
  50% {
    top: 100px;
    left: 100px;
  }
}

/* good */
@keyframes move {
  50% {
    transform: translate(100px, 100px);
  }
}
```

Reference
--
- https://ui.toast.com/fe-guide/ko_PERFORMANCE

