---
sidebarDepth: 2
---

# 이벤트
사용자의 입력에 따라 추가 동작을 구현할 수 있는 방법

## DOM 이벤트
### 마우스 이벤트 
- click
    - 요소 위에서 마우스 왼쪽 버튼을 눌렀을 때(터치스크린이 있는 장치에선 탭 했을 때) 발생합니다.
- contextmenu 
    - 요소 위에서 마우스 오른쪽 버튼을 눌렀을 때 발생합니다.
- mouseover / mouseout 
    – 마우스 커서를 요소 위로 움직였을 때, 커서가 요소 밖으로 움직였을 때 발생합니다.
- mousedown / mouseup 
    - 요소 위에서 마우스 왼쪽 버튼을 누르고 있을 때, 마우스 버튼을 뗄 때 발생합니다.
- mousemove 
    – 마우스를 움직일 때 발생합니다.
    
### 폼 요소 이벤트
- submit 
    – 사용자가 `<form>`을 제출할 때 발생합니다.
- focus
    – 사용자가 `<input>`과 같은 요소에 포커스 할 때 발생합니다.
    
### 키보드 이벤트
- keydown / keyup 
    – 사용자가 키보드 버튼을 누르거나 뗄 때 발생합니다.

### 문서 이벤트
- DOMContentLoaded 
    – HTML 이 전부 로드 및 처리되어 DOM 생성이 완료되었을 때 발생합니다.

### CSS 이벤트
- transitionend 
    – CSS 애니메이션이 종료되었을 때 발생합니다.

## 이벤트 핸들러
- 이벤트에 반응하는 함수 
- 이벤트에 이벤트가 발생했을 때 실행되는 함수인 핸들러(handler) 를 할당해야 한다.
- 사용자의 행동에 어떻게 반응할지를 자바스크립트 코드로 표현한 것

### HTML 속성
HTML 안의 `on<event>` 속성에 핸들러를 할당할 수 있습니다.
    
버튼을 클릭하면 onclick 안의 코드가 실행됩니다.
```html
<input value="클릭해 주세요." onclick="alert('클릭!')" type="button">
```

핸들러 내부에 쓰인 this 의 값 → 핸들러가 할당된 **요소**
```html
<button onclick="alert(this.innerHTML)">클릭해 주세요.</button> 
```
this 는 `button`   

---

- HTML 태그 중간에 자바스크립트가 들어가 있으면 어색
- 긴 코드

함수를 만들어서 이를 호출하는 방법 사용

- 이벤트 핸들러는 함수로 호출 → 핸들러 내부의 this 는 전역객체 혹은 undefined 
```html
<script>
  function countRabbits() {
    for(let i=1; i<=3; i++) {
      alert(`토끼 ${i}마리`);
    }
  }
</script>

<input type="button" onclick="countRabbits()" value="토끼를 세봅시다!">
```
HTML 속성은 대·소문자를 구분하지 않음
- `ONCLICK` 은 `onClick`이나 `onCLICK` 과 동일하게 작동 
- 속성값은 대개 onclick 같이 소문자로 작성

### DOM 프로퍼티
`elem.onclick`
```html
<input id="elem" type="button" value="클릭해 주세요.">
<script>
elem.onclick = function() {
  alert('감사합니다.'); 
};
</script>
```
HTML 속성 과 동일하게 동작합니다. 따라서
- onclick 프로퍼티는 단 하나 → 복수의 이벤트 핸들러를 할당 불가능
- 핸들러를 하나 더 추가하면, 기존 핸들러는 덮어씌워 집니다.

핸들러 제거
-`elem.onclick = null`

#### setAttribute 로 핸들러를 할당 X
- `<body>` 를 클릭하면 에러가 발생합니다.
- 속성은 항상 문자열이기 때문에, 함수가 문자열로 됨.
```javascript
document.body.setAttribute('onclick', function() { alert(1) });
```

#### DOM 프로퍼티는 대·소문자를 구분
핸들러 할당 시 `elem.onclick` 을 써야한다.

`elem.ONCLICK` 은 쓸 수 없다.

### 함수를 핸들러에 직접 할당할 때 주의점

#### 1 프로퍼티 할당
```javascript
function sayThanks() {
  alert('감사합니다!');
}

elem.onclick = sayThanks; // sayThanks()를 할당하면 동작하지 않습니다.
```

#### 2 속성 할당 
괄호가 있어야함.
- 브라우저는 속성값을 읽고, 속성값을 함수 본문으로 하는 핸들러 함수를 만들기 때문
```html
<input type="button" id="button" onclick="sayThanks()">
```

### addEventListener
HTML 속성 / DOM 프로퍼티 이벤트 핸들러 할당 방식의 문제
- 하나의 이벤트에 복수의 핸들러 할당 불가

#### 핸들러 추가
```javascript
element.addEventListener(event, handler, [options]);
```

- `event` 이벤트 이름(예: "click")
- `handler` 핸들러 함수
- `options` 아래 프로퍼티를 갖는 객체
    - `once` : true, 이벤트가 트리거 될 때 리스너가 자동으로 삭제됩니다.
    - `capture` 
        -  (버블링/캡처링)어느 단계에서 이벤트를 다뤄야 하는지를 알려주는 프로퍼티
    - 호환성 유지
        - `options` 를 객체가 아닌 `false` / `true` 로 할당 가능
        - `{capture: false/true}` 와 동일
    - `passive`: true, 리스너에서 지정한 함수가 preventDefault() 를 호출하지 않습니다.
    
#### 핸들러 삭제
```javascript
element.removeEventListener(event, handler, [options]);
```

함수는 똑같게 생겼지만 그럼에도 불구하고 다른 함수이기 때문에 제거할 수 없다.
```javascript
elem.addEventListener( "click" , () => alert('감사합니다!'));
// ....
elem.removeEventListener( "click", () => alert('감사합니다!'));
```

핸들러에 할당한 함수를 사용해야 한다.
```javascript
function handler() {
  alert( '감사합니다!' );
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);
```

변수에 핸들러 함수를 저장해야 
- 지울 수 있다.
- addEventListener 로 할당한 핸들러를 불러올 수 있다

#### 어떤 이벤트는 addEventListener 를 써야만 동작
- `DOMContentLoaded`
    - 문서를 읽고 DOM 트리 생성이 완료되었을 때 트리거되는 이벤트

```javascript
// 이 얼럿창은 절대 뜨지 않습니다.
document.onDOMContentLoaded = function() {
    alert("DOM이 완성되었습니다.");
};
// 이 얼럿창은 제대로 뜹니다.
document.addEventListener("DOMContentLoaded", function() {
    alert("DOM이 완성되었습니다.");
});
```
- addEventListener 는 좀 더 범용적 

#### this
- 이벤트 핸들러는 콜백 함수이지만 
- this 는 이벤트 리스너에 바인딩된 요소를 가리킨다.
- 이벤트 객체의 currentTarget 프로퍼티와 같다.

## 이벤트 객체
- `click` 이벤트가 발생
    - 마우스 포인터 위치 필요
- `keydown` 이벤트가 발생
    - 어떤 키가 눌렸는지 등에 대한 상세한 정보가 필요

### 이벤트 발생
브라우저는 
1. *이벤트 객체(event object)* 생성
2. 이벤트 객체에 이벤트에 관한 상세한 정보를 넣은다.
3. 핸들러에 인수 형태로 전달합니다.

이벤트 객체로부터 포인터 좌표 정보를 얻어내는 예시
```html
<input type="button" value="클릭해 주세요." id="elem">

<script>
  elem.onclick = function(event) {
    // 이벤트 타입과 요소, 클릭 이벤트가 발생한 좌표를 보여줌
    alert(event.type + " 이벤트가 " + event.currentTarget + "에서 발생했습니다.");
    alert("이벤트가 발생한 곳의 좌표는 " + event.clientX + ":" + event.clientY +"입니다.");
  };
</script>
```

이벤트 객체에서 지원하는 프로퍼티
- `event.type` 이벤트 타입
    - 예시 "click"
- `event.currentTarget` 이벤트를 처리하는 요소
    - 일반적으로 콜백의 this 가 가리키는 값과 같음
    - 화살표 함수 핸들러 / 함수를 다른 곳에 바인딩한 경우 
        - this 는 currentTarget 이 아님  
        - event.currentTarget 을 직접 사용해야 함.
- `event.clientX` / `event.clientY`
    - 포인터 관련 이벤트에서, 커서의 상대 좌표(모니터 기준 좌표가 아닌, 브라우저 화면 기준 좌표 – 옮긴이)
 
이벤트 타입에 따라 이벤트 객체에서 제공하는 프로퍼티는 다르다.

### HTML 핸들러 안의 이벤트 객체
```html
<input type="button" onclick="alert(event.type)" value="이벤트 타입">
```
- 브라우저는 속성을 읽고 `function(event) { alert(event.type) }` 같은 핸들러를 만들어 내기 때문
- 생성된 핸들러 함수의 첫 번째 인수는 이벤트 객체

## 객체 형태의 핸들러와 handleEvent
addEventListener 를 사용하면 함수뿐만 아니라 객체를 이벤트 핸들러로 할당할 수 있습니다. 

```html
<button id="elem">클릭해 주세요.</button>
<script>
  let obj = {
    // 이벤트가 발생하면 객체에 구현한 handleEvent 메서드가 호출
    handleEvent(event) { 
      alert(event.type + " 이벤트가 " + event.currentTarget + "에서 발생했습니다.");
    }
  };

  elem.addEventListener('click', obj);
</script>
```
```html
<button id="elem">클릭해 주세요.</button>
<script>
  class Menu {
    handleEvent(event) {
      switch(event.type) {
        case 'mousedown':
          elem.innerHTML = "마우스 버튼을 눌렀습니다.";
          break;
        case 'mouseup':
          elem.innerHTML += " 그리고 버튼을 뗐습니다.";
          break;
      }
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```

하나의 객체에서 두 개의 이벤트를 처리하기 위해,
- addEventListener 를 사용할 때는 요소에 타입을 정확히 명시해 주어야 한다
- 위 예시에서 menu 객체는 오직 mousedown 와 mouseup 이벤트에만 응답하고, 다른 타입의 이벤트에는 응답하지 않습니다.

handleEvent 메서드가 모든 이벤트를 처리할 필요는 없습니다. 
- 이벤트 관련 메서드를 handleEvent 에서 호출해서 사용할 수도 있습니다. 
```html
<button id="elem">클릭해 주세요.</button>
<script>
  class Menu {
    handleEvent(event) {
      // mousedown -> onMousedown
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
    }

    onMousedown() {
      elem.innerHTML = "마우스 버튼을 눌렀습니다.";
    }

    onMouseup() {
      elem.innerHTML += " 그리고 버튼을 뗐습니다.";
    }
  }

  let menu = new Menu();
  elem.addEventListener('mousedown', menu);
  elem.addEventListener('mouseup', menu);
</script>
```


Reference
-- 
- https://ko.javascript.info/introduction-browser-events
- https://gitlab.com/siots-study/topics/-/wikis/dom
