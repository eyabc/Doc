# Browser
2012 년 [D2](https://d2.naver.com/helloworld/59361) 의 내용을 토대로 작성한 내용이므로
최신의 내용을 반영하고 있지 않을 수 있습니다.

## [W3C](https://ko.wikipedia.org/wiki/W3C) World Wide Web Consortium
- 웹 표준화 기구
- W3C 명세 표준

CSS,
CGI,
DOM,
HTML,
RDF,
SVG,
SOAP,
SMIL,
WSDL,
XHTML,
XML,
XML 정보 집합,
XPath,
XQuery,
XSLT


## 브라우저 주요 기능
사용자가 선택한 자원을 서버에 요청하고 브라우저에 표시함
- **HTML / CSS 명세**에 따라 해석하고 표시함.

브라우저가 표현하는 문서에는 HTML XML SVG 등 여러가지가 있는데, 여기서는 **HTML 문서**에 대해서만 다루고 있습니다.

## 호스트와 호스트 환경
호스트
- 자바스크립트가 돌아가는 플랫폼
- 브라우저, 웹서버, 커피머신..

호스트 환경
- 각 호스트에서 제공되는 특정한 기능들
- Language Core(ECMAScript) + 플랫폼에 특정되는 객체와 함수 제공

## 브라우저 호스트 
호스트 환경이 브라우저 → window 전역 객체
- 브라우저 창(browser window) 를 대변하고 이를 제어할 수 있는 메서드 제공
![image](https://user-images.githubusercontent.com/31977543/96440387-dd027780-1242-11eb-96f2-3789b35e2386.png)


## 브라우저 구조

![image](https://user-images.githubusercontent.com/31977543/97276717-eb701500-187a-11eb-9a39-a7467832a33b.png)

- URI(Uniform Resource Identifier) 자원의 주소


### 1. 사용자 인터페이스 User Interface
웹 페이지(document)를 보는 창을 제외 한 브라우저 디스플레이의 모든 부분

표준 명세가 없음에도 불구하고, 수 년간 서로의 장점을 모방하면서 현재에 이르렀다.
    
- URI 를 입력할 수 있는 주소 표시 줄
- 이전 버튼과 다음 버튼
- 북마크
- 새로 고침 버튼
- 현재 문서의 로드를 중단할 수 있는 정지 버튼
- 홈 버튼
    
    
### 2. 브라우저 엔진 Browser Engine
- 사용자 인터페이스와 렌더링 엔진 사이의 상호작용을 다룬다.
- 렌더링 엔진에 질의를 보내며, 조작하는 인터페이스
    
### 3. 렌더링 엔진 Rendering Engine
- **HTML 과 CSS 를 파싱**하고 브라우저 **화면에 파싱된 내용을 표시**
- Gecko, Webkit, blink

웹킷 동작 과정
![웹킷 동작 과정](https://user-images.githubusercontent.com/31977543/98688038-c5379280-23ad-11eb-8bb2-b3ba6c48f732.png)

모질라의 게코 렌더링 엔진 동작 과정(3.6)
![모질라의 게코 렌더링 엔진 동작 과정(3.6)](https://user-images.githubusercontent.com/31977543/98688128-e26c6100-23ad-11eb-852b-92b0ea9a5c87.png)

#### 렌더링 엔진의 기본 동작
#####  **통신**으로부터 요청한 **문서를 로드**함.
#####  **HTML 파싱** → DOM 트리 구축
![image](https://user-images.githubusercontent.com/31977543/99140713-8cd2d580-2687-11eb-948e-f6e619d204fb.png)

##### CSSOM 트리 구성
외부 스타일시트 파일이나 내부 스타일시트가 포함되어 있을 경우, CSS 를 해석해 CSSOM 트리를 구성
![image](https://user-images.githubusercontent.com/31977543/99140738-cdcaea00-2687-11eb-9c2c-67471c0e44e9.png)

##### 스타일 : 렌더 트리 구축 (attachment )
![image](https://user-images.githubusercontent.com/31977543/99140746-dcb19c80-2687-11eb-9b7a-820782d2420e.png)

##### layout : 렌더 트리 배치 (reflow) 
노드가 화면 내에 위치되어야 할 좌표값 계산 (화면 내 position과 size)
![image](https://user-images.githubusercontent.com/31977543/99140758-fce15b80-2687-11eb-9204-4d178809e5d6.png)
![image](https://user-images.githubusercontent.com/31977543/99140760-feab1f00-2687-11eb-8d17-58e65064c1ae.png)

##### 페인트 : 렌더 트리 그리기 (repaint)
레이아웃 단계에서 계산된 값을 이용해 렌더트리의 각 노드를 화면상의 실제 픽셀로 변환
- 위치와 관계없는 CSS 속성(색상, 투명도 등)을 적용
- 픽셀로 변환된 결과는 포토샵의 레이어처럼 생성되어 개별 레이어로 관리
- [transform](https://developer.mozilla.org/ko/docs/Web/CSS/transform) 속성 등을 사용하면 엘리먼트가 레이어화 된다.

##### 합성 & 렌더
- repaint 에서 생성된 레이어를 합성하여 스크린을 업데이트
- 합성과 렌더 단계가 끝나면 화면에서 웹 페이지를 볼 수 있다.


위 과정이 점진적으로 진행된다. 즉, 렌더링 엔진은 사용자 경험을 위해 
- 모든 HTML 파싱을 기다리지 않고 reflow / repaint 를 시작한다.
- 네트워크로부터 나머지 내용이 전송되기를 기다리는 동시에 받은 내용의 일부를 화면에 표시한다.

| 웹킷 | 게코 |
|---|---|
|렌더트리|형상트리(frame tree) |
|배치(layout)|reflow|
|attachment | 

#### 렌더링
브라우저 로딩 과정 중 스타일 이후의 과정
- 스타일 → 레이아웃 → 페인트 → 합성


### 4. 통신
HTTP 요청과 같은 네트워크 호출에 사용됨. 
- 플랫폼 독립적인 인터페이스
- 각 플랫폼 하부에서 실행됨.

### 5. UI 백엔드
- 브라우처 창의 형태나 셀렉트버튼, 체크박스 등을 표현함. 
- OS의 UI 메소드에 의존함. 
    - **OS 사용자 인터페이스 체계**를 사용.
    - XP 에서의 셀렉트박스와 윈도우7에서의 셀렉트박스가 다름
    

### 6. 자바스크립트 해석기
- 자바스크립트 코드의 파싱과 실행에 사용 
- Chrome 의 V8 엔진


### 7. 자료 저장소
- 자료를 저장하는 계층
- HTML5 명세, 웹DB
- 지속적인 계층(쿠키 등을 위한 저장공간)

## DOM (Document Object Model)
- HTML / XML 문서의 프로그래밍 interface

문서의 구조화 된 표현(structured representation) 을 제공

→ 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공함.

→ 프로그래밍 언어는 문서 구조, 스타일, 내용 들을 변경할 수 있다.

웹 페이지 내의 모든 콘텐츠 -> 객체

`document` 객체 
- 페이지의 기본 진입점
- 페이지 내 무엇이든 변경/추가 가능
- 자바스크립트로 제어 가능

## BOM Browser Object Model
- 브라우저(호스트 환경)가 제공하는 추가 객체
- 문서 이외의 모든 것을 제어
- 자바스크립트가 브라우저에게 'talk' 할 수 있게 해줌.

- `navigator` 객체
    - `navigator.userAgent` 브라우저 정보
    - `navigator.platform` 운영체제에 대한 정보
- `location` 객체
    - 현재 URL
    - 새로운 URL 로 redirect 가능 한 동작
    ```javascript
      alert(location.href); // 현재 URL을 보여줌
      if (confirm("위키피디아 페이지로 가시겠습니까?")) {
        location.href = "https://wikipedia.org"; // 새로운 페이지로 넘어감
      }
  ```
- 사용자와 브라우저 사이의 커뮤니케이션을 도와주는 메서드
    - `alert/confirm/prompt`

- BOM 는 HTML 명세서의 일부이므로 관련 명세가 따로 있지는 않음.

    

Reference
--
- https://gitlab.com/siots-study/topics/-/wikis/JavascriptEngine
- https://d2.naver.com/helloworld/59361 (2012.05.18)
- [MDN web docs DOM 소개](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/%EC%86%8C%EA%B0%9C)
- https://lists.w3.org/Archives/Public/public-html-ig-ko/2011Sep/att-0031/Reflow_____________________________Tip.pdf
