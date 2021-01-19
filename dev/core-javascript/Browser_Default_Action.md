# 브라우저 기본 동작

## 브라우저 기본 동작

이벤트 대부분 → 발생 즉시 브라우저에 의해 특정 동작을 자동수행
- `mousedown`  → 마우스가 움직인 곳에서 선택을 시작
- `keydown` → 텍스트 박스에 글자를 추가하거나 그 외 다른 동작 수행
- `<input type="checkbox">` click → input 을 선택/선택해제 
- 링크 클릭 → 해당 URL 로 이동
- `submit` 폼 전송 버튼 클릭/Enter  → 서버에 폼이 전송
- 마우스 버튼을 누른 채 글자 위에서 커서를 움직임 → 글자가 선택됨
- `contextmenu` → 우클릭 이벤트, 브라우저의 컨텍스트 메뉴를 보여줌

## 브라우저 기본 동작 막기
브라우저 기본 동작 대신, JS 를 이용해 동작을 직접 구현가능

1. event 객체 `event.preventDefault()`
2. `on<event>` 를 사용해 할당된 핸들러 → `false` 를 반환 해 기본 동작을 막을 수도 있음

```html
<a href="/" onclick="return false">이곳</a>
<a href="/" onclick="event.preventDefault()">이곳을</a> 클릭해주세요.
```
- 이벤트 핸들러에서 반환된 값
    - 대개 무시된다.
    - `on<event>` 에 할당된 핸들러는 false 를 반환하면 기본 동작을 막을 수 있다.
    - true, 와 이외 값들은 return 되어도 무시됨
    
### 메뉴 구현하기
```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```
button 태그가 아닌 a 태그를 이용한 이유
- 많은 경우, 우클릭하여 '새 창에서 열기' 를 사용한다.
- `<button>``span` 은 기능을 이용할 수 없다.

```javascript
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // 서버에서 데이터를 읽어오거나, UI를 새로 만든다거나 하는 등의 작업이 여기에 들어갑니다.

  return false; // 브라우저 동작을 취소합니다(URL로 넘어가지 않음).
};
```

- HTML 요소의 의미를 지키면서 동작을 바꿔야 한다.
    - 접근성에 좋음
    - 좋은코드
    
아래에서 기본 동작 취소가 동작하지 않는다.
```html
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">브라우저가 w3.org로 이동합니다.</a>
```
`onclick="handler()"` 로 생성되는 핸들러 함수는 다음과 같다.
```
function(event) {
  handler() // onclick 속성에 할당된 값이 그대로 핸들러 함수 본문이 됩니다.
}
```

따라서 동작하게 하려면
`<a href="https://w3.org" onclick="return handler()">w3.org</a>`

혹은 ` event.preventDefault();` 을 사용한다.
```html
<script>
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
</script>

<a href="https://w3.org" onclick="handler(event)">w3.org</a>
```

### 후속 이벤트
순차적으로 일어나는 이벤트가 존재함
- 첫 번째 이벤트를 막으면 두 번째 이벤트가 일어나지 않는다.

input 의 mousedown -> focus
```html
<input value="focus가 동작합니다," onfocus="this.value=''">
<input onmousedown="return false" onfocus="this.value=''" value="클릭해 주세요.">
```
단 첫번째 input 에서 Tab 키를 누르면 두번 째 input 으로 focus 가 된다.

## addEventListener 의 passive 속성
`addEventListener` 의 `passive:true` 옵션
- 브라우저에게 `preventDefault()` 를 호출하지 않겠다 라고 알리는 역할

### 속성이 필요한 이유
`touchmove` 
- 모바일 기기의 사용자가 스크린에 손가락을 대고 움직일 때 발생하는 이벤트
- 기본적으로 scrolling 이 발생함
- `preventDefault()` 는 스크롤링을 막을 수 있음
- 브라우저가 스크롤링을 발생시키는 이벤트를 감지했을 때
    1. 먼저 모든 핸들러를 처리함
    2. 핸들러에 `preventDefault` 가 어디에서도 호출되지 않았을 때 스크롤링을 진행
    3. 처리과정에서 불필요한 지연 → 화면이 덜덜 떨리는 현상 발생함
- `passive: true` 를 미리 알려, 불필요한 지연이 감소된다.
- `touchstart`, `touchmove` 이벤트의 passive 기본값이 true 인 브라우저들이 있다.

## event.defaultPrevented
value
- true : 기본 동작을 막은 경우
- false : 기본 동작을 막지 않은 경우

각 `contextmenu` 핸들러에서 `event.defaultPrevented` 를 확인할 수 있다.

```html
<button>마우스 오른쪽 버튼을 클릭하면 컨텍스트 메뉴가 뜹니다.</button>

<button oncontextmenu="alert('커스텀 메뉴가 뜨네요!'); return false">
  여기서 마우스 오른쪽 버튼을 클릭해보세요.
</button>
```
![image](https://user-images.githubusercontent.com/31977543/103291032-41ee0100-4a2e-11eb-8e8e-1f5a0bcf929a.png)
![image](https://user-images.githubusercontent.com/31977543/103291086-58945800-4a2e-11eb-8420-2ab1841fbce5.png)

```html
<p>문서 레벨 컨텍스트 메뉴</p>
<button id="elem">버튼 레벨 컨텍스트 메뉴</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("버튼 컨텍스트 메뉴");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("문서 컨텍스트 메뉴");
  };
</script>
```
위 예시에서는 button 을 클릭하였을 때 두 개의 컨텍스트 메뉴가 뜨는 문제 존재
- `alert("문서 컨텍스트 메뉴");` → `alert("버튼 컨텍스트 메뉴");`
- 이벤트가 버블링 되었기 때문
    - Q 부모 노드만 버블링 되는 줄 알았는데 상위의 형제노드도 버블링이 되나? 
    - A `document.oncontextmenu = ...` 는 p 가 아닌 전역에 등록된 핸들러 임을 주의하자. 
        - p 는 가시적으로 도움을 주기 위해 만들어졌다.
        - p 이외의 어느 곳을 눌러도 이벤트는 동작을 한다. 
        - 결국 `document.oncontextmenu` 은 전역이므로 어디를 클릭해도 버블링으로 인해 항상 이벤트가 발생한다.
    
방법1. 버튼에 구현된 마우스 우클릭 이벤트를 처리하고 나면 버블링을 멈춘다.
- stopPropagation 으로 인해 통계 자료 수집을 위한 코드가 동작하지 못함
```javascript
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    alert("버튼 컨텍스트 메뉴");
  };
```

방법2. document 핸들러에서 기본 동작이 막혀있는지 확인한다. 
- 기본 동작이 막혀있는데 이벤트를 핸들링 하는 경우, 이에 반응하지 않도록함.
- `event.defaultPrevent()` 로 이벤트가 적절히 처리되었다고 다른 이벤트에게 알릴 수 있다. 

```html
<p>문서 레벨 컨텍스트 메뉴(event.defaultPrevented를 확인함)</p>
<button id="elem">버튼 레벨 컨텍스트 메뉴</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("버튼 컨텍스트 메뉴");
  };

  document.oncontextmenu = function(event) {
    if (event.defaultPrevented) return;
    console.log(event); // (*)
    event.preventDefault();
    alert("문서 컨텍스트 메뉴");
  };
</script>
```
(*) `console.log(event);` 에서 event.target 은 
- p 를 클릭했을 때 `p`
- button 을 클릭했을 때 `button` 이다.

button 에서 버블링이 발생했을 경우, 버튼의 핸들러가 실행되고,
 
p 의 핸들러가 실행이 되는데 이 때, 전파된 p 의 핸들러의 event 는 여전히 button 을 가리키는 것을 확인하였다.

따라서 button 의 event.defaultPrevented 가 true 인 경우 if 문 아래는 실행이 되지 않게 된다.

- [섬네일(thumbnail)을 클릭하면 이미지가 바뀌는 이미지 갤러리](https://plnkr.co/edit/8C6NSjnno85FE4Be?p=preview&preview)

Reference & Comment
--
- https://ko.javascript.info/default-browser-action
