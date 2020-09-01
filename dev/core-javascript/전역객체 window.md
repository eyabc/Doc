# 전역 객체 window [:link:](https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)

## 전역 객체 window
브라우저 요소들, 자바스크립트 엔진(엔진 정보를 담고있는 것으로 추정) 등 모든 변수를 담고 있는 객체

### `TODO` window 객체의 자바스크립트 엔진

## BOM
브라우저의 요소

JS 엔진, 변수, 객체, 탭, 주소창, 즐겨찾기, 툴바

### BOM 객체와 메서드
screen, location, history, document

parseInt, isNaN, Number, close, open, write, encodeURI, decodeURI, 

setTimeout(clearTimeout), setInterval(clearInterval), getComputedStyle(태그)

location (주소 정보)
- host, hostname, protocol, href, pathname

history
- forward(go(1)), back(go(-1)), length(뒤로가기 페이지수)	페이지 이동	
- pushState(객체, 제목, 주소), replace(객체, 제목, 주소)	주소만 바꿈	SPA

Navigator(브라우저, 운영체제 정보)
- userAgent, Lanaguage, cookieEabled, vendor, serviceworker

screen(화면정보)
- width, height, pixcelDepth, colorDepth, orientation(화면방향)
- availWidth, availHeight(작업표시줄 제외)


 

## DOM
getElementById(), getElementByClassName(),
getElementByName(), getElementByTagName()

querySelector(css 선택자로)
querySelctorAll(Css선택자, 태그명[속성명=속성값], 부모>자식, 부모자손)

createElement(태그명), createTextNode(텍스트)

createDocumentFragment() 가짜 document
- JS로 DOM 태그를 조작하면 성능이 낮아지기 때문에 사용한다
- 여러 태그를 반목문을 사용해 동시에 추가하는 방법. body 에 단 한번 영향을 주는방법

### Node
태그노드 + 텍스트 노드

firstChild, lastChild,	parentNode,	previousSibling, nextSibling

### Element
태그 노드

firstElementChild, lastlementChild,	parentElement	
previousElementSibling, nextElementSibling

### 태그. innerHTML, outerHTML
태그.innerHTML	
- 선택 태그의 내용물을 얻어오거나 변경 (선택태그 빼고 내용물만)

태그.outerHTML	
- 현재 태그의 내용물을 얻어오거나 변경 (선택 태그 포함 내용물)

### 태그.속성
- id, className, name, value, placeholder, checked, diasbled, readonly
- attributes(해당 태그의 모든 속성)
- clientHeight, clientWidth (태그의 margin, border, scollerbar 를 제외한 높이와 너비)
- scrollHeight, scrollerWidth (스크롤 가능한 범위까지 포함한 태그 높이, 너비)
- offsetHeight, offsetWidth (태그의 margin만 제외한 높이 너비)

### 태그.메서드
- appendChild, removeChild, insertBefore (자신의 형제태그 앞에 삽입), cloneNode(자신복사)
- document.body.childNodes[document.body.childNodes.length - 1 ]

### Date
new Date(), new Date(1997, 02, 03)
getFullYear, setFullYear, 
getMonth, setMonth, 
getDate, setDate, 
getDay, setDay, 
getHour, setHour, 
getMinutes, setMinutes, 
getSeconds, setSeconds, 
toString(현재날짜), toLocaleString(보기좋은날짜), toUTCString(세계시)

