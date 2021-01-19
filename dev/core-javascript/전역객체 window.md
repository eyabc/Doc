# 전역 객체 window [:link:](https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)

## 전역 객체 window
브라우저 요소들, 자바스크립트 엔진(엔진 정보를 담고있는 것으로 추정) 등 모든 변수를 담고 있는 객체

### `TODO` window 객체의 자바스크립트 엔진

## BOM
 

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

###
getElementById가 queryselector에 비해 상대적으로 빠르기는 하나, 프로젝트 내에서 사용하는 함수의 횟수 querySelector의 성능(대략 초당 700만건 작업처리 가능하다네요)과 코드의 가독성을 고려해봤을 때 섞어서 사용하는 것 보다 통일하는 것이 낫다고 생각했습니다!
https://hashcode.co.kr/questions/5692/%EA%B0%95%EC%9D%98-4-11-queryselector%EC%97%90-%EC%84%B1%EB%8A%A5%EB%AC%B8%EC%A0%9C%EC%97%90-%EB%8C%80%ED%95%B4-%EC%A7%88%EB%AC%B8-%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4getElementById가 queryselector에 비해 상대적으로 빠르기는 하나, 프로젝트 내에서 사용하는 함수의 횟수 querySelector의 성능(대략 초당 700만건 작업처리 가능하다네요)과 코드의 가독성을 고려해봤을 때 섞어서 사용하는 것 보다 통일하는 것이 낫다고 생각했습니다!
                                                                                                                                                                                                             https://hashcode.co.kr/questions/5692/%EA%B0%95%EC%9D%98-4-11-queryselector%EC%97%90-%EC%84%B1%EB%8A%A5%EB%AC%B8%EC%A0%9C%EC%97%90-%EB%8C%80%ED%95%B4-%EC%A7%88%EB%AC%B8-%EB%93%9C%EB%A6%BD%EB%8B%88%EB%8B%A4
https://github.com/next-step/js-todo-list-step2/pull/18/files#r492672380