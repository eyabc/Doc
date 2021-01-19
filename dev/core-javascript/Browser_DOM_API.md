---

sidebarDepth: 2

---

# DOM API
- 정적인 웹페이지를 동적으로 변경하기 위한 방법
- 메모리 상에 존재하는 DOM 을 변경하는 것
- DOM 의 객체에 접근하고 수정할 수 있는 메서드와 프로퍼티
---
API(web or XML page) = DOM + JS(scripting language)
- DOM 은 프로그래밍 언어와 독립적으로 디자인 되었음

## attribute 와 property 의 차이

### attribute
**html 문서**에서 elements 에 추가적인 정보를 넣을 때 사용되는 요소
- 정적임
`<div class= ‘my-class’>`


### property
**HTML DOM** 안에서 attribute 를 가리키는 표현
- 동적임

user 가 체크박스에 체크를 하면 attribute 는 변하지 않지만 property 는 checked 로 변한다.

> 지금까지 속성과 프로퍼티를 같다고 생각했었는데, 다른 맥락인 것을 처음 알게 되었습니다.

## data types
node 의 표현
- nodes -> `element`s
- node 의 arrays -> `nodeList`s (`element`s)
- attribute 노드들 -> `attribute`s

### document 
브라우저가 불러온 웹 페이지를 나타냄.

- 페이지 콘텐츠(DOM tree)의 기본 진입점
- 페이지 내 무엇이든 변경/추가 가능
- 자바스크립트로 제어 가능

[document 의 생성자 및 속성](https://developer.mozilla.org/ko/docs/Web/API/Document)
 
#### 인터페이스
- HTML 문서는 `HTMLDocument` 인터페이스를 구현함
- `Document` 는 `Node` 와 `EventTarget` 인터페이스를 상속함
![image](https://user-images.githubusercontent.com/31977543/97987188-357a6d00-1e1e-11eb-95b6-61f0b9f3e524.png)

흥미롭게 본 object
- Document.visibilityState
- Document.readyState

### element
DOM API 에 멤버에 의해 return 된 element 또는 element type 의 node

`document.createELement()` 의 반환값

### nodeList
elements 의 배열

- index 를 통해 접근 가능
    - `list.item(1)` nodeList 의 method
    - `list[1]` array syntax
    

### attribute
`createAttribute()`

### namedNodeMap
array 와 유사하지만 items 은 name 또는 index 에 의해 접근 가능
- `item()` method
- `namedNodeMap` 에 item 추가 / 삭제 가능

## DOM Interface

HTML FROM element 는 `HTMLFormElement` interface 로 부터 `name` property 를 얻고,
`className` property 는 `HTMLElement` interface 로 부터 얻는다.
그리고 두 property 는 모두 form object 안에 있다.

- object 는 다른 `interface`s 와 연관되어 있다.


## getElement*, querySelector* 로 요소 검색하기
상대 위치를 이용하지 않으면서 웹 페이지 내에서 원하는 요소 노드에 접근할 수 있다.

### document.getElementById(id)
- 브라우저는 스크립트의 네임스페이스와 DOM 의 네임스페이스를 공유한다.

    따라서 아래처럼, id 를 따서 만들어진 전역변수 요소 접근하고자 한다면, 스크립트의 전역변수와의 이름 충돌 가능성이 있기 때문에 
    `document.getElementById` 를 사용하는 것이 좋다.
    ```html
    <div id="elem"></div>
    
    <script>
      let elem = 5; // elem은 더이상 <div id="elem">를 참조하지 않고 5가 됩니다.
    
      alert(elem); // 5
    </script>
    ```

- 문서 내 요소의 `id` 속성값을 중복사용하면, 메서드 내 동작 예측이 불가능하여 임의 요소가 반환된다.
- `document` 객체에서만 `getElementById` 를 호출 할 수 있다.

### elem.querySelectorAll(css)
`elem` 의 자식 요소 중 주어진 **CSS 선택자**에 대응하는 요소 모두를 반환함.

```html
<ul>
  <li>1-1</li>
  <li>1-2</li>
</ul>
<ul>
  <li>2-1</li>
  <li>2-2</li>
</ul>
<script>
  let elements = document.querySelectorAll('ul > li:last-child');

  for (let elem of elements) {
    alert(elem.innerHTML); // "1-2", "2-2"
  }
</script>
```
- CSS 선택자의 가상 클래도 사용 가능
    - `document.querySelectorAll(':hover')`
    - 마우스 포인터가 hover 상태 요소들을 담은 컬렉션을 반환.
    
### elem.querySelector(css)
**CSS 선택자**에 대응하는 요소 중 첫 번째 요소 반환
 
- `elem.querySelectorAll(css)[0]` 과 동일 하지만 모든 요소를 검색하지 않는 다는 점에서 빠르다.

### elem.matches(css)
`Boolean`: `elem` 이 CSS 선택자와 일치하는지 판단.

```html
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // document.body.children가 아니더라도 컬렉션이라면 이 메서드를 적용할 수 있습니다.
  for (let elem of document.body.children) {
    if (elem.matches('a[href$="zip"]')) {
      alert("주어진 CSS 선택자와 일치하는 요소: " + elem.href );
    }
  }
</script>
```

### elem.closest(css)
`elem` 자기 자신을 포함하여 CSS 선택자와 일치하는 가장 가까운 조상 요소를 찾는다.
- DOM 트리를 한단계씩 거슬러 올라가며 찾음
- 일치하는 요소를 찾으면 검색을 중단하고 해당 요소를 반환.

```html
<h1>목차</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">1장</li>
    <li class="chapter">2장</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null(h1은 li의 조상 요소가 아님)
</script>
```

### elem.getElementsBy*
태그나 클래스 등을 이용해 원하는 노드의 컬렉션(복수)을 반환한다.

- `querySelector` 가 더 편리하고 문법도 짧기 때문에, `getElementsBy*` 는 현재 잘 쓰이지 않음

- `elem.getElementsByTagName(*)`
- `elem.getElementsByClassName(className)`
- `document.getElementsByName(name)`
    - 문서 전체를 대상으로 검색 수행
    - 검색기준은 `name` 속성 값이다.
    
### 살아있는 컬렉션
#### getElementBy* 
살아있는 컬렉션 반환
- 문서에 변경이 있을 때마다 컬렉션이 자동 갱신되어 최신의 상태를 유지한다.
```html
<div>첫 번째 div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>두 번째 div</div>

<script>
  alert(divs.length); // 2
</script>
```

#### querySelectorAll
정적인 컬렉션 반환
- 컬렉션이 한 번 확정되면 늘어나지 않는다.

```html
<div>첫 번째 div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>두 번째 div</div>

<script>
  alert(divs.length); // 1
</script>
```


- 조상(ancestor) 요소  
    부모 요소, 부모 요소의 부모 요소 등 DOM 트리에서 특정 요소의 상위에 있는 요소 

### 노드의 부모 자식 관계를 확인하는 메서드
- `elemA.contains(elemB)`
    - elemA 가 elemB 의 조상일 때
    - `elemA==elemB`
    
> TODO MDN 명세서 읽어보기 

## 주요 노드 프로퍼티
앞서 설명한 DOM Interface 에서 확장된 설명이다.

- DOM 노드는 종류에 따라 각각 다른 프로퍼티를 지원한다.
- 그런데 모든 DOM 노드는 공통조상으로 만들어지기 때문에, 공통 프로퍼티와 메서드가 존재한다.

![image](https://user-images.githubusercontent.com/31977543/98001793-face0000-1e30-11eb-9b50-216a18872a0d.png)

- `EventTarget` 루트의 **추상(abstract)** 클래스
- `Node` **추상(abstract)** 클래스
    - `parentNode`, `nextSibling`, `childNodes` 등의 주요 탐색 트리 기능 제공
    - Node 를 상속받는 클래스들
        - `Text` 클래스 → 텍스트 노드
        - `Element` 클래스 → 요소 노드
        - `Comment` 클래스 → 주석 노드
- `Element` DOM 요소를 위한 클래스
    - `nextElementSibling`, `children` 
    - `getElementsByTagName`, `querySelector`
    - `SVGElement`, `XMLElement`, `HTMLElement` 클래스의 베이스 역할
- `HTMLELement` HTML 요소 노드의 베이스 역할 클래스
    - HTMLElement 를 상속받는 클래스
        - `HTMLInputElement` input 태그 요소를 위한 클래스
        - `HTMLBobyElement` body 태그 요소를 위한 클래스
        - `HTMLAnchorElement` a 태그 요소를 위한 클래스

등.. 특정 노드에서 사용할 수 있는 프로퍼티와 메서드는 상속을 기반으로 결정된다.

```javascript
document.body.constructor.name // HTMLBodyElement

alert( document.body instanceof HTMLBodyElement ); // true
alert( document.body instanceof HTMLElement ); // true
alert( document.body instanceof Element ); // true
alert( document.body instanceof Node ); // true
alert( document.body instanceof EventTarget ); // true
```

- `conosle.log(elem)`
    - 요소의 DOM 트리 출력
- `conosle.dir(elem)`
    - 요소를 DOM 객체처럼 취급하여 출력
    - 프로퍼티를 확인하기 쉽다.
    
### 명세서에서 쓰이는 IDL (Interface Description Language)
```IDL
// HTMLInputElement 정의 시작
// 콜론(:)은 HTMLInputElement가 HTMLElement로 부터 상속되었다는 것을 의미합니다.
interface HTMLInputElement: HTMLElement {
  // <input> 요소와 관련된 프로퍼티와 메서드가 나열되기 시작합니다.

  // 'DOMString'은 프로퍼티 값이 문자열이라는 것을 의미합니다.
  attribute DOMString accept;
  attribute DOMString alt;
  attribute DOMString autocomplete;
  attribute DOMString value;

  // 불린 값(true/false)을 가지는 프로퍼티
  attribute boolean autofocus;
  ...
  // 'void'는 메서드의 리턴값이 없음을 의미합니다.
  void select();
  ...
}
```

### nodeType 프로퍼티
- DOM 노드의 타입을 알아내고자 할 때
- readonly
- `elem.nodeType == 1` 요소 노드
- `elem.nodeType == 3` 텍스트 노드
- `elem.nodeType == 9` 문서 객체
---
- 모던 자바스크립트에서는 `instanceof` 나 클래스 기반의 테스트를 이용한다.
- nodeType 이 쓸 때가 더 간단할 때 사용하곤 한다.

### nodeName 과 tagName 으로 태그 확인하기
```javascript
alert( document.body.nodeName ); // BODY
alert( document.body.tagName ); // BODY
```
- `tagName` 요소 노드에만 존재
- `nodeName` 모든 노드에 존재
    - 대상: 요소 노드 → `tagName` 역할수행
    - 대상: 텍스트노드, 주석노드 → 노드 타입을 나타내는 문자열 반환

```html
<body><!-- 주석 -->

  <script>
    // 주석 노드를 대상으로 두 프로퍼티 비교
    alert( document.body.firstChild.tagName ); // undefined (요소가 아님)
    alert( document.body.firstChild.nodeName ); // #comment

    // 문서 노드를 대상으로 두 프로퍼티 비교
    alert( document.tagName ); // undefined (요소가 아님)
    alert( document.nodeName ); // #document
  </script>
</body>
```

### innerHTML
- 요소 안의 HTML 을 문자열 형태로 가져오거나 수정가능
- innerHTML 안에 script 태그를 삽입하면 html 일부가 되긴 하지만 실행되지 않는다.

#### innerHTML += 유의점
`innerHTML += ` 은 추가가 아니라 내용을 덮어씀

```html
<body><!-- 주석 -->

  <script>
    // 주석 노드를 대상으로 두 프로퍼티 비교
    alert( document.body.firstChild.tagName ); // undefined (요소가 아님)
    alert( document.body.firstChild.nodeName ); // #comment

    // 문서 노드를 대상으로 두 프로퍼티 비교
    alert( document.tagName ); // undefined (요소가 아님)
    alert( document.nodeName ); // #document
  </script>
</body>
```
1. 기존 내용 삭제
2. 기존 내용과 새로운 내용을 합친 새로운 내용을 씀

부작용
1. 이미지나 리소스가 전부다시 불러와짐
1. input 태그에서 사용자가 입력한 값이 사라짐

### outerHTML 
요소의 전체 HTML.
```html
<div id="elem">Hello <b>World</b></div>

<script>
  alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
</script>
```

- `outerHTML` 은 DOM 안의 요소를 **교체**한다.
    - 요소를 DOM 에서 제거하고 새로운 HTML 조각을 넣는다.
```html
<div>Hello, world!</div>

<script>
  let div = document.querySelector('div');

  // div.outerHTML를 사용해 <p>...</p>로 교체
  div.outerHTML = '<p>새로운 요소</p>'; // (*)

  // 어! div는 그대로네요!
  alert(div.outerHTML); // <div>Hello, world!</div> (**)
</script>
```
1. 문서에서 `<div>` 삭제
2. 새로운 HTML 조각을 삭제한 공간에 삽입
3. div 에는 여전히 기존 값이 저장되어 있고, 새로운 HTML 조각은 저장되어 있지 않음
 
새로운 HTML 조각을 참조하려면 다시 DOM 쿼리 메서드를 사용한다.

### nodeValue / data : 텍스트 노드 내용 조작
`innerHTML` 은 요소 노드에만 사용할 수 있다.

텍스트 노드와 같은 다른 타입의 노드에는 `nodeValue`, `data` 를 사용할 수 있다.

- 두 프로퍼티는 아주 유사하고, 실무에서도 구분없이 사용한다. 그러나 명세서 상 작은 차이가 있다고 한다.

```html
<body>
  안녕하세요.
  <!-- 주석 -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // 안녕하세요.

    let comment = text.nextSibling;
    alert(comment.data); // 주석
  </script>
</body>
```

### textContent 텍스트 조작
```html
<div id="news">
  <h1>주요 뉴스!</h1>
  <p>화성인, 지구 침공!</p>
</div>

<script>
  // 주요 뉴스! 화성인, 지구 침공!
  alert(news.textContent);
</script>
```
- 사용하는 문자열에 태그를 넣어도 문자열 그대로 저장된다
```html
<div id="elem1"></div>
<div id="elem2"></div>

<script>
  let name = prompt("이름을 알려주세요.", "<b>곰돌이 푸!</b>");

  elem1.innerHTML = name; //  'HTML 형태’로 저장
  elem2.textContent = name;  //  '텍스트 형태’로 저장 "<b>곰돌이 푸!</b>"
</script>
```
- 사용자의 입력값이 HTML 에 침투하는 것을 막을 수 있다.

### hidden 
DOM 프로퍼티 요소를 보여줄지 말지를 지정
- `style="display:none"` 와 기술적으로 동일하다.
```html
<div>아래 두 div를 숨겨봅시다.</div>

<div hidden>HTML의 'hidden' 속성 사용하기</div>

<div id="elem">자바스크립트의 'hidden' 프로퍼티 사용하기</div>

<script>
  elem.hidden = true;
</script>
```
```html
<div id="elem">깜빡이는 요소</div>

<script>
  setInterval(() => elem.hidden = !elem.hidden, 1000);
</script>
```

### value
`<input>``<select>``<textarea>` 의 값이 저장됨.
- 대응되는 클래스 : `HTMLInputElement` `HTMLSelectElement`

### href
`<a href="...">` 의 값이 저장됨
- 대응되는 클래스 : `HTMLAnchorElement`

### id
`id` 속성 값이 저장됨. 모든 요소 노드에서 사용가능
- 대응되는 클래스 : `HTMLElement`

## 속성과 프로퍼티
|  |문맥| 타입 | 이름 대소문자 구분 |
|---|---|---|---|
| 속성 | HTML 문서 | 문자열 | X |
|프로퍼티 | DOM 객체| 모든타입 | O | 

### 커스텀 DOM 프로퍼티
```javascript
document.body.myData = {
  name: 'Caesar',
  title: 'Imperator'
};

alert(document.body.myData.title); // Imperator

document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName(); // BODY (sayTagName의 'this'엔 document.body가 저장됩니다.)
```

prototype 으로 모든 요소에서 사용할 수 있는 메서드를 추가할 수 있다.
```javascript
Element.prototype.sayHi = function() {
  alert(`Hello, I'm ${this.tagName}`);
};

document.documentElement.sayHi(); // Hello, I'm HTML
document.body.sayHi();            // Hello, I'm BODY
```

### HTML 속성
브라우저 HTML 파싱 : DOM 객체를 만들 때, HTML 표준 속성을 이용해 DOM 프로퍼티를 만든다.

- 대소문자를 가리지 않음
- 속성값은 항상 문자열 * 프로퍼티는 문자열이 아닐 수 있다*

요소가 
- `id` 같은 표준 속성 →  `id` 표준속성의 프로퍼티가 생성
- 비 표준 속성 → 프로퍼티 생성 🅧
```html
<body id="test" something="non-standard">
  <script>
    alert(document.body.id); // test
    // 비표준 속성은 프로퍼티로 전환되지 않습니다.
    alert(document.body.something); // undefined
  </script>
</body>
```
```html
<body id="body" type="...">
  <input id="input" type="text">
  <script>
    alert(input.type); // text
    alert(body.type); // type은 body의 표준 속성이 아니므로 DOM 프로퍼티가 생성되지 않아 undefined가 출력됩니다.
  </script>
</body>
```

#### 비표준 프로퍼티 사용
- `elem.hasAttribute(name)` 속성 존재 여부 확인
- `elem.getAttribute(name)` 속성값을 가져옴
- `elem.setAttribute(name, value)` 속성 값을 변경/추가
- `elem.removeAttribute(name)` 속성값을 지움
- `elem.attributes` 모든 속성값 읽기

```html
<body>
  <div id="elem" about="Elephant"></div>

  <script>
    alert( elem.getAttribute('About') ); // (1) 'Elephant', 속성 읽기

    elem.setAttribute('Test', 123); // (2) 속성 추가하기

    alert( elem.outerHTML ); // (3) 추가된 속성 확인하기

    for (let attr of elem.attributes) { // (4) 속성 전체 나열하기
      alert( `${attr.name} = ${attr.value}` );
    }
  </script>
</body>
```

### 프로퍼티-속성 동기화
```html
<input>

<script>
  let input = document.querySelector('input');

  // 속성 추가 => 프로퍼티 갱신
  input.setAttribute('id', 'id');
  alert(input.id); // id (갱신)

  // 프로퍼티 변경 => 속성 갱신
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (갱신)
</script>
```
- `input.value` 처럼 동기화가 **속성 → 프로퍼티** 방향으로만 일어나는 예외상황

유저의 어떤 행동 때문에 value 가 수정되었는데, 수정 전의 원래 값으로 복구하고 싶은 경우, 
속성에 저장된 값을 가지고 오면 된다.
```html
<input>

<script>
  let input = document.querySelector('input');

  // 속성 추가 => 프로퍼티 갱신
  input.setAttribute('value', 'text');
  alert(input.value); // text (갱신)

  // 프로퍼티를 변경해도 속성이 갱신되지 않음
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (갱신 안됨!)
</script>
```

### DOM 프로퍼티 값의 타입
- 속성값 → 항상 문자열
- 프로퍼티값
    - 항상 문자열이 아닐 수 있다.
    - 대부분 → 문자열

```html
<input id="input" type="checkbox" checked> checkbox

<script>
  alert(input.getAttribute('checked')); // 속성 값: 빈 문자열
  alert(input.checked); // 프로퍼티 값: true
</script>
```
```html
<div id="div" style="color:#ff0000;font-size:120%">Hello</div>

<script>
  // string
  alert(div.getAttribute('style')); // color:red;font-size:120%

  // object
  alert(div.style); // [object CSSStyleDeclaration]
  alert(div.style.color); // red
</script>
```

```html
<a id="a" href="#hello">link</a>
<script>
  // 속성
  alert(a.getAttribute('href')); // #hello

  // 프로퍼티
  alert(a.href); // 실행되는 사이트 주소에 따라 http://site.com/page#hello 형태로 값이 저장됨
</script>
```
프로퍼티값이 문자열 이더라도, 속성값과 다를 수 있다. 

### 비표준 속성, dataset
비표준 속성
- 사용자가 직접 지정한 데이터를 HTML 에서 JS 에서 사용해야 할 때

```html
<!-- 이름(name) 정보를 보여주는 div라고 표시 -->
<div show-info="name"></div>
<!-- 나이(age) 정보를 보여주는 div라고 표시 -->
<div show-info="age"></div>

<script>
  // 표시한 요소를 찾고, 그 자리에 원하는 정보를 보여주는 코드
  let user = {
    name: "Pete",
    age: 25
  };

  for(let div of document.querySelectorAll('[show-info]')) {
    // 원하는 정보를 필드 값에 입력해 줌
    let field = div.getAttribute('show-info');
    div.innerHTML = user[field]; // Pete가 'name'에, 25가 'age'에 삽입됨
  }
</script>
```

```html
<style>
  /* 스타일이 커스텀 속성 'order-state'에 따라 변합니다. */
  .order[order-state="new"] {
    color: green;
  }

  .order[order-state="pending"] {
    color: blue;
  }

  .order[order-state="canceled"] {
    color: red;
  }
</style>

<div class="order" order-state="new">
  A new order.
</div>

<div class="order" order-state="pending">
  A pending order.
</div>

<div class="order" order-state="canceled">
  A canceled order.
</div>
```
위 방식처럼 새 클래스 
`.order-state-new, .order-state-pending, order-state-canceled`
를 추가/삭제 하는 것보다   
쉽게 상태를 바꿀 수 있다.
```javascript
div.setAttribute('order-state', 'canceled');
```

#### `data-*` 속성
- 비표준 속성이 나중에 표준으로 등록되는 예기치 못한 문제가 발생할 수 있음
- data- 로 시작하는 속성 전체는 개발자가 용도에 맞게 사용하도록 예약됨.
- 커스텀 데이터를 안전하고 유효하게 전달함
- 읽기/수정 이 가능하다.
- 속성이 수정되면 CSS 가 해당 뷰를 자동으로 업데이트 해준다.

```html
<body data-about="Elephants">
<script>
  alert(document.body.dataset.about); // Elephants
</script>
```

- `data-order-state` 은 카멜 표기법을 사용해 `dataset.orderState` 으로 변환

```html
<style>
  .order[data-order-state="new"] {
    color: green;
  }

  .order[data-order-state="pending"] {
    color: blue;
  }

  .order[data-order-state="canceled"] {
    color: red;
  }
</style>

<div id="order" class="order" data-order-state="new">
  A new order.
</div>

<script>
  // 읽기
  alert(order.dataset.orderState); // new

  // 수정하기
  order.dataset.orderState = "pending"; // (*)
</script>
```

## 문서 수정하기

### 예제: 메시지 보여주기
![image](https://user-images.githubusercontent.com/31977543/98021334-8eaac680-1e47-11eb-87b0-774707dd8cf0.png)

HTML 을 이용한 메시지 창
```html
<style>
.alert {
  padding: 15px;
  border: 1px solid #d6e9c6;
  border-radius: 4px;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>

<div class="alert">
  <strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.
</div>
```

JS 를 이용해 창을 만드는 방법. 스타일은 이미 존재한다고 가정.

### 요소 생성
- Element Node → `document.createElement(tag)` 
    ```javascript
    let div = document.createElement('div');
    ```
- Text Node → `document.createTextNode(text)`
    ```javascript
    let textNode = document.createTextNode('안녕하세요.');
    ```
  
메시지 생성
```javascript
// 1. <div> 요소 만들기
let div = document.createElement('div');

// 2. 만든 요소의 클래스를 'alert'로 설정
div.className = "alert";

// 3. 내용 채워넣기
div.innerHTML = "<strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.";
```

### 삽입 메서드
```javascript
document.body.append(div);
```

JS 노드 삽입 메서드

![image](https://user-images.githubusercontent.com/31977543/98022623-2d83f280-1e49-11eb-887f-cc4a392d3751.png)
- `node.append(노드/문자열)` 
- `node.prepend(노드/문자열)` 
- `node.before(노드/문자열)` 
- `node.after(노드/문자열)`
- `node.replaceWith(노드/문자열)` node 를 새로운 노드나 문자열(TextNode 로)로 대체함

```html
<div id="div"></div>
<script>
  div.before('<p>안녕하세요</p>', document.createElement('hr'));
</script>
```
- 매개 변수: 복수의 노드/문자열 삽입 가능
- 태그가 담긴 문자열 -> `<``>` 는 **이스케이프 처리**됨 
```html
&lt;p&gt;안녕하세요&lt;/p&gt;
<hr>
<div id="div"></div>
```

### elem.insertAdjacentHTML / Text / Element (where, html)

#### where
`elem` 기준 상대위치

![image](https://user-images.githubusercontent.com/31977543/98024462-b2700b80-1e4b-11eb-88ca-a48e1b8f6c41.png)

- 두개의 단어로 구성 
    - 뒷단어 : begin → **시작태그**, end → **닫는태그**
    - 앞단어 : 뒷단어를 기준으로 before, after 
- `'beforebegin'` : elem 가 열리기 전 `html(text/Element)` 삽입
- `'afterbegin'` : elem 가 열리고, `html(text/Element)` 삽입
- `'beforeend'` : elem 가 닫히기 전, `html(text/Element)` 삽입
- `'afterend'` : elem 가 닫히고, `html(text/Element)` 삽입

#### html
HTML 문자열

```javascript
document.body.insertAdjacentHTML("afterbegin", `<div class="alert">
    <strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.
</div>`);
```

### 노드 삭제 node.remove()
```javascript
let div = document.createElement('div');
div.className = "alert";
div.innerHTML = "<strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.";

document.body.append(div);
setTimeout(() => div.remove(), 1000);
```

요소를 다른 곳으로 옮길 때
```html
<div id="first">First</div>
<div id="second">Second</div>
<script>
  // remove 메서드를 호출할 필요가 없습니다.
  second.after(first); // id가 second인 노드를 가져오고, 해당 노드의 뒤에 id가 first인 노드를 삽입
</script>
```
모든 노드 삽입 메서드는, 
- 자동으로 기존에 있던 노드를 삭제하고 새로운 곳으로 노드를 옮긴다.

### elem.cloneNode(boolean) 노드 복제
`boolean`
- `true` elem 의 속성전부와, 자손 요소 전부 복사
- `false` 후손 노드 복사 없이 elem 만 복사

기존 메시지 창과 유사한 메시지 창을 하나 더 띄우고 싶을 경우

```html
<style>/*...*/</style>

<div class="alert" id="div">
  <strong>안녕하세요!</strong> 중요 메시지를 확인하셨습니다.
</div>

<script>
  let div2 = div.cloneNode(true); // 메시지 창 복제
  div2.querySelector('strong').innerHTML = '안녕히 가세요!'; // 복제한 메시지 창 내용 수정

  div.after(div2); // 복제한 메시지 창을 기존 메시지 창 다음에 보여줌
</script>
```

### DocumentFragment
- 특별한 DOM 노드 타입
- 여러 노드로 구성된 그룹을 감싸 다른 곳으로 전달하게 하는 Wrapper 처럼 동작

1. DocumentFragment 에 다른 노드들을 추가한다.
2. DocumentFragment 를 문서 어딘가에 삽입한다.
3. DocumentFragment 는 사라짐. DocumentFragment 에 추가한 노드만 남음

```html
<ul id="ul"></ul>

<script>
function getListContent() {
  let fragment = new DocumentFragment();

  for(let i = 1; i <= 3; i++) {
    let li = document.createElement('li');
    li.append(i);
    fragment.append(li);
  }

  return fragment;
}

ul.append(getListContent()); // (*)
</script>
```

```html
<ul id="ul"></ul>

<script>
function getListContent() {
  let result = [];

  for(let i=1; i<=3; i++) {
    let li = document.createElement('li');
    li.append(i);
    result.push(li);
  }

  return result;
}

ul.append(...getListContent()); // append 메서드와 ...(전개 문법)은 궁합이 잘 맞습니다.
</script>
```
노드가 담긴 배열을 직접 만들어 반환할 수 있기 때문에 `DocumentFragment` 를 직접 사용할 일은 흔치 않다.

- [웹컴포넌트 template](https://ko.javascript.info/template-element) 요소 같이 `DocumentFragment` 기반 문법에서 다시 다룬다.

### 구식 삽입 / 삭제 메서드
아래 메서드들은 모두 삽입/삭제한 노드를 반환하지만, 그 값을 사용할 일이 거의 없다.

#### parentElem.appendChild(node)
parentElem 의 마지막 자식으로 node 추가

#### parentElem.insertBefore(node, nextSibling)
node 를 parentElem 안의 nextSibling 앞에 추가

```html
<ol id="list">
  <li>0</li>
  <li>1</li>
  <li>2</li>
</ol>
<script>
  let newLi = document.createElement('li');
  newLi.innerHTML = 'Hello, world!';

  list.insertBefore(newLi, list.children[1]); // 두 번째 <li> 앞에 추가
  list.insertBefore(newLi, list.firstChild);  // 첫 번째 <li> 앞에 추가
</script>
```

#### parentElem.replaceChild(node, oldChild)
parentElem 의 자식 노드 중 oldChild 를 node 로 교체

#### parentElem.removeChild(node)
node 가 parentElem 의 자식 노드라는 가정하에 parentElem 에서 node 를 삭제

### document.write(HTML) 에 대한 첨언
- 웹페이지에 뭔가를 더할 때 쓰는 아주 오래된 메서드
- html 형식의 문자열을 동적으로 만들어 사용할 수 있다.
- 페이지를 불러오는 도중에만 작동함
- 페이지 로드 후, 호출하면 기존 문서내용이 사라짐

- 브라우저 HTML 파싱 중 (DOM 구조가 완성되기 전)
    - `document.write(HTML)` 을 만나면 (페이지에 내용이 삽입되면, DOM 조작이 아님) 
    - 텍스트 형식의 HTML 을 마치 원래 페이지에 있었던 것 마냥 해석함 (빠름)
    



Reference & Comment
--
- https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/%EC%86%8C%EA%B0%9C
- https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model
- https://ko.javascript.info/searching-elements-dom
- https://ko.javascript.info/basic-dom-node-properties
- https://ko.javascript.info/dom-attributes-and-properties
- https://ko.javascript.info/modifying-document


--- 

- https://ko.javascript.info/styles-and-classes
- https://ko.javascript.info/size-and-scroll
- https://ko.javascript.info/size-and-scroll-window
- https://ko.javascript.info/coordinates
- https://www.bsidesoft.com/1431

- [attribute 와 property 의 차이](https://medium.com/hexlant/attribute-%EC%99%80-property-%EC%9D%98-%EC%B0%A8%EC%9D%B4-c6f1c91ba91)