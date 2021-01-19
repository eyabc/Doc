---

sidebarDepth: 2

---

# Mouse Event

## 마우스 이벤트 종류

### [mousedown](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event)
Pointing Device Button 이 Element 내부에서 press 되었을 때 Element 에서 발생하는 이벤트

- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `onmousedown`

#### `click` 이벤트와의 차이점
Pointer 가 Element 안에 존재하는 시간의 차이 
- click
    - pressed ~ released 되는 동안에 존재할 때
- mousedown 
    - press 되는 순간
    
    
### [mouseup](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event)
- `mousedown` 과 counterpoint event 이다.
- Pointing Device Button 이 Element 내에서 released 될 때 Element 에서 발생하는 이벤트

- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `onmouseup`

#### 예시
HTML5 의 [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 에서 사용자의 draw
- mousedown, mousemove, and mouseup events

### [mouseover](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event)
- Pointing Device 가 
- **Cursor 를 (Element 나 Element 의 Child) 으로 move onto(progress) 할 때**
- Element 에서 발생하는 이벤트

- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `onmouseover`

#### 차이점 mouseover / mouseenter
```html
<ul id="test">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
</ul>
```

```javascript
let test = document.getElementById("test");

// mouseenter 는 오직 한번 발생한다. 커서가 ul 으로 move over 할 때 
test.addEventListener("mouseenter", function( event ) {
  // highlight the mouseenter target
  event.target.style.color = "purple";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);

// mouseover 는 매번 발생한다. 커서가 li 들로 move over 할 때마다.  
// mouseover 의 타겟은 (Element 나 Element 의 Child) 이 될 수 있기 때문이다.
test.addEventListener("mouseover", function( event ) {
  // highlight the mouseover target
  event.target.style.color = "orange";

  // reset the color after a short delay
  setTimeout(function() {
    event.target.style.color = "";
  }, 500);
}, false);
```

### [mouseout](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event)
- Pointing Device 가 Cursor 를 
- **더 이상 (Element 나 Element 의 children) 안에 존재하지 않도록 move 할 때** Element 안에서 발생하는 이벤트.
- 자식 요소 사이를 move 할 때도 발생한다는 뜻. 
- Cursor 가 Child Element 안에 들어갔을 때, Child Element 가 Element 의 Visible Area 를 가리기 때문.
- 아래 예시를 보면 이해 가능.
---
- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `onmouseout`

 

#### mouseout / mouseleave
mouseover / mouseenter 의 차이점을 비교하면 알 수 있다. 링크에서 예제를 실행해 볼 수 있음.


### [mousemove](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)
- Pointing Device 가 **커서의 핫스팟을 Element 내부에서 이동하는 동안** 
Element 안에서 발생하는 이벤트

- mousedown, mousemove, and mouseup 예시를 링크에서 확인할 수 있음
---
- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `onmousemove`

### [click](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
- Pointing Device Button 이 Element 안에서 pressed and released 되었을 때 
- Element 는 click 를 받는다.
- 한 요소에서 버튼을 누르고 버튼을 놓기 전에 포인터를 요소 외부로 이동하면
    - 두 요소를 모두 포함한 상위요소에서 이벤트가 발생한다.
    
---
- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `onclick`

### [dblclick](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event)
Pointing Device Button 을 두번 클릭할 때 발생
- 하나의 Element 를 짧은 시간에 클릭을 두번 할 때
- after two pairs of mousedown and mouseup events
---
- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `ondblclick`
 
### [contextmenu](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event)
- 유저가 Context Menu 를 열고자 할 때 발생함
- 보통 마우스 우클릭을 하거나, context menu key 를 눌렀을 때 발생함.
    
---
- Bubbles `YES`
- Cancelable `YES`
- Interface `MouseEvent`
- Event Handler property `oncontextmenu`
 
## [마우스 이벤트 순서](https://ko.javascript.info/mouse-events-basics#ref-202)
사용자가 단 하나의 동작을 했어도 여러 이벤트가 실행 될 수 있다.

단순하게 마우스 왼쪽 버튼을 클릭하더라도 mousedown, mouseup, 마지막으로 click 이벤트가 발생하죠.

동작은 하나지만 여러 이벤트가 실행될 때 실행 순서는 내부 규칙에 따라 결정됩니다.

## 마우스 버튼
### button 프로퍼티
- 클릭과 연관 된 이벤트에서, 어떤버튼에서 이벤트가 발생했는지 알려주는 프로퍼티

| 버튼 | event.button |
| --- | --- |
| 왼쪽(주요 버튼) | 0 |
| 가운데(보조 버튼) | 1 |
| 오른쪽 (두 번째 버튼) | 2 |
| X1 (뒤로 가기 버튼) | 3 | 
| X2 (앞으로 가기 버튼) | 4 |


### [buttons 프로퍼티](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
여러개의 버튼을 한꺼번에 눌렀을 때, 해당 버튼들에 대한 정보를 정수 형태로 저장함.

### [event.which](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which) Deprecated
어떤 버튼을 클릭했는지 알려주는 비표준 프로퍼티

### shift, alt, ctrl, meta 프로퍼티
마우스 이벤트는 이벤트가 발생할 때, 함께 누른 보조키가 무엇인지를 알려주는 프로퍼티를 알려줌

- `shiftKey` Shift 키
- `altKey` Alt (MacOS에선 Opt 키)
- `ctrlKey` Ctrl 키
- `metaKey` MacOS 에서 Cmd 키

```html
<button id="button">Alt, Shift 키를 누른 상태에서 클릭해주세요!</button>

<script>
  button.onclick = function(event) {
    if (event.altKey && event.shiftKey) {
      alert('야호!');
    }
  };
</script>
```

#### MacOS에선 Ctrl 대신 Cmd를 사용하세요!
운영체제 종류에 상관없이 동일한 경험을 하게 하려면 ctrlKey 프로퍼티를 사용하는 코드엔 metaKey 도 함께 넣어주세요.
`if (event.ctrlKey || event.metaKey)` 같이 말이죠.

#### 모바일 장치
모바일 장치같이 기기에 키보드가 없는 경우도 많기 때문에 

사용자 경험을 해치지 않으려면 보조 키가 없는 사용자를 위한 지원하는 방법도 고려하며 프로그램을 만들어야 합니다.

## 마우스 이벤트의 좌표

- 클라이언트 좌표 : clientX, clientY
    - 웹 문서를 기준으로 각각 왼쪽에서 얼마나 떨어져 있는지, 위에서 얼마나 떨어져 있는지를 나타냄
    - 페이지가 스크롤 되어도 변하지 않음
    
- 페이지 좌표 : pageX, pageY
    - 창 왼쪽 위를 기준으로 얼마나 떨어져 있는지를 나타내며 페이지를 스크롤하면 값도 변합니다.

## mousedown 이벤트와 선택 막기
1. 글자 위에서 마우스를 더블클릭하면 글자가 선택되는데, 기본 동작이 사용자 경험을 해칠 때가 있습니다.
    
    dblclick 이벤트가 발생하면 얼럿창을 띄우고 싶다고 가정해봅시다. 
    제대로 코드를 작성했음에도 불구하고 핸들러가 실행되는 동시에 글자가 선택되는 불필요한 부수효과가 발생하였습니다.

2. 마우스 왼쪽 버튼을 누른 채 커서를 이리저리 움직이면 글자가 선택되는 부수효과 역시 사용자 경험을 해칠 수 있습니다.

    [글자가 선택되는 것을 막아주는 방법은 다양](https://ko.javascript.info/selection-range)
    ```html
   ...
    <b ondblclick="alert('클릭!')" onmousedown="return false">
      여기를 더블클릭해주세요.
    </b>
   ...
    ```
   ...이 있는 부분부터 시작해 드래그를 시작하면 굵은 글씨를 선택할 수 있죠.
   

3. 복사 막기

    ```html
    <div oncopy="alert('불법 복제를 예방하기 복사 기능을 막아놓았습니다!');return false">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent convallis ultrices lacus ut dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    </div>
    ```


## mouseover / mouseout
![image](https://user-images.githubusercontent.com/31977543/105037907-06c97580-5aa2-11eb-9247-0ce432bd3904.png)

### relatedTarget
- mouseover / mouseout 이 가지는 특별한 프로퍼티
- `target` 과 보수 관계
    - mouseover 
        - `relatedTarget` elem → `target` elem 으로 마우스가 이동
    - mouseout 
        - `target` elem → `relatedTarget` elem 으로 마우스가 이동
- `null` 이 될 수 있다.
    - 마우스가 다른 elem 으로 이동하지 않고, 
    - window 밖으로 이동하거나, window 에서 벗어났을 때
    - relatedTarget 가 null 일 때를 고려하여 코딩해야 한다.
    
### Skipping elements
마우스 이벤트는 
- 마우스가 움직일 때마다(픽셀을 움직일 때마다) 발생하지 않는다.
- 브라우저가 Time to Time, 마우스 이벤트를 체크하고 변화를 알리면, 이벤트를 유발한다.
- 마우스가 매우 빠르게 이동할 때 몇몇의 DOM-events 는 skip 된다. 

![image](https://user-images.githubusercontent.com/31977543/105040860-b3592680-5aa5-11eb-8b91-844e5a040a0e.png)
- `mouseout` 은 `#FROM` 에서 발생한다
- 즉시 `#TO` 에서 `mouseover` 이벤트가 발생한다.

장점
- 성능에 좋음
    - 모든 elem 마다 처리를 하지 않음

![image](https://user-images.githubusercontent.com/31977543/105041677-9f61f480-5aa6-11eb-83f0-3b10567c6bcf.png)
- 마우스가 window 밖에서 빠르게 `#TO` 으로 이동하면 
`relatedTarget` 가 `body` 가 아닌  `null` 이 될 수 있다.

[예시](https://ko.javascript.info/article/mousemove-mouseover-mouseout-mouseenter-mouseleave/mouseoverout-fast/)

- If `mouseover` triggered, there must be `mouseout`
    - 마우스가 매우 빠르게 이동한다면 중간의 elem 들은 무시될 수 있지만
    - 공식적으로, 포인터가 elem 으로 `mouseover` 이벤트가 발생하면, 
    - 반드시, elem 를 떠날 때 `mouseout` 이 발생한다.

### parent → child, mouseout
```html
<div id="parent">
  <div id="child">...</div>
</div>
```
![image](https://user-images.githubusercontent.com/31977543/105043112-6a56a180-5aa8-11eb-896f-8c2c81d50101.png)

`mouseout` 
- 포인터가 elem 에서 elem 의 자손으로 이동할 때(#parent to #child), 발생한다.
- 브라우저 로직에 따르면, 마우스 커서는 한 순간에 하나의 elem 위에만 있을 수 있다.
    - 중첩된 요소 중 가장 상위 요소, top z-index
    - 포인터가 자손으로 이동할 때에도 이전 elem 를 떠난 것임
    
![image](https://user-images.githubusercontent.com/31977543/105044253-db4a8900-5aa9-11eb-9355-96d97ed12e9c.png)

mouseover 이벤트는 자손 elem 에서 버블링 된다.
- `#parent` 가 가지고 있는 mouseover handler 도 발생한다.
- `#parent` 가 mouseover/out 핸들러를 모두 가짐 +  마우스가 `#parent` → `#child` 로 이동, 두 개의 이벤트가 존재한다.
    - mouseout [target: parent] parent 안에서 나올 때 
    - mouseover [target: child] child 로 이동할 때, (버블링 발생)
    - 핸들러 둘다 발생함.
    ```javascript
    parent.onmouseout = function(event) {
      /* event.target: parent element */
    };
    parent.onmouseover = function(event) {
      /* event.target: child element (bubbled) */
    };
    ```
- 이와 같은 동작을 알지 못했으면 
    - 마우스 포인터가 #parent 를 떠난 것처럼(mouseout 핸들러 발생)보이다가 
    - 즉시 다시 돌아오는 것 처럼(child 의 mouseover bubbling 으로 유발된 parent 의 mouseover 핸들러 발생) 보일 것임
    - 착시현상을 피하기 위해선, 
        - 핸들러 내부에서 `relatedTarget` 을 체크하고 이벤트를 무시해 버릴 수 있다.
        - mouseenter / mouseleave 이벤트를 사용한다.

## mouseenter / mouseleave
mouseover/mouseout 과의 차이점은 앞서 mdn 의 내용을 서술하였습니다.

- 자손 element 간의 이동은 count 하지 않음.
- bubbling 없음

## Event delegation
mouseenter/leave 는 버블링이 일어나지 않기 때문에 이벤트 위임을 사용할 수 없으므로 
mouseover/out 을 사용해야 한다.

## 예제
- [Bagua Chart](https://plnkr.co/edit/DC40nmTWsWFOlSyd?p=preview&preview)
- [Tooltip 만들기](https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave#ref-1325)

Reference
--
- https://ko.javascript.info/mouse-events-basics
- https://ko.javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave
