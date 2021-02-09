# mouse-drag-and-drop

모던 HTML 표준에서는 [드래그 앤 드롭](https://html.spec.whatwg.org/multipage/dnd.html#dnd) 내용이 있습니다. 
- `dragstart` `dragend` 이벤트 
    - 운영체제의 파일 관리 애플리케이션으로 부터 파일을 드래그하여 브라우저 화면에 드롭하는 기능을 제공함.
    - 한계
        - 특정 영역에서 드래그 하는 것을 막을 수 없음
        - 수평 / 수직으로만 드래그 할 수 없다.
        - 모바일 환경 지원 부족
    - 한계를 극복하기 위해 마우스 이벤트를 이용하여 drag&drop 기능을 구현해봅니다.

DragZone, Droppable, Draggable 및 기타 클래스 등 아키텍처를 구축하는 프레임워크가 있습니다. 대부분은 앞서 드래그와 드롭에 대한 설명과 유사한 작업을 하므로 이해하기 쉽습니다. 때로는 제3의 솔루션 적용보다 쉽게 수행할 수 있습니다.

## drag & drop 알고리즘

1. `mousedown`
    - 움직임이 필요한 요소를 준비함.
2. `mousemove` 
    - `position: absolute` 의 `left, top` 을 변경
3. `mouseup`
    - 드래그 앤 드롭 완료와 관련된 모든 작업 수행
    
### 공을 드래그 하는 구현
- [HTMLElement.offsetWidth](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth)
![image](https://user-images.githubusercontent.com/31977543/106386980-f35fc800-641a-11eb-9b85-ac70c55fb6f8.png)
- [MouseEvent.pageX](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    - 전체 문서의 왼쪽 가장자리를 기준으로 마우스를 클릭 한 지점의 X (수평) 좌표 (픽셀)를 반환합니다
    
```html
<html>
  <img id="ball" src="https://avatars.githubusercontent.com/u/31977543?s=88&u=abc3f0443f4c82f349f3103cd9010f272db55fe6&v=4"/>
</html>
<script>
  ball.onmousedown = (event) => {
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;

    // 현재 위치한 부모에서 body 로 직접 이동하여 body 기준으로 위치를 지정함
    document.body.append(ball);

    // 공을 pageX, pageY 좌표 중앙에 위치하게 합니다.
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
      ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
    }

    // 포인터 아래로 공을 이동시킨다.
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
    ball.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    }

    ball.ondragstart = function() {
      return false;
    };
  }
</script>
```

브라우저 자체적으로 이미지나 요소에 대한 드래그 앤 드롭을 지원한다면.
- drag 를 할 때, 복사된 공을 드래그 하는 동작이 나타날 수 있다.
- 이럴 때 다음 코드를 추가해 준다.
```javascript
ball.ondragstart = function() {
  return false;
};
```

이미지 내의 어떤 좌표를 클릭하면 이미지가 움직여버리는 문제점이 있습니다.      
```
function moveAt(pageX, pageY) {
  ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
  ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
}
```

- [MouseEvent.clientX](https://developer.mozilla.org/ko/docs/Web/API/MouseEvent/clientX)
    - 이벤트가 발생한 애플리케이션 viewport 내에 수평 좌표를 제공한다
- [Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
    -  DOMRect 요소의 크기 및 뷰포트를 기준으로 한 위치에 대한 정보를 제공 하는 객체를 반환합니다.
    ![image](https://user-images.githubusercontent.com/31977543/106388318-49d00500-6421-11eb-879c-8f96b1203b18.png)

- [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)
    - 직사각형의 크기와 위치를 나타냅니다.
    
```javascript
ball.onmousedown = (event) => {
    // pointer 에서 공의 왼쪽 위 모서리까지의 거리를 저장합니다.
    // 공을 드래그 하는 동안 이 거리를 유지한다.
    const shiftX = event.clientX - ball.getBoundingClientRect().left;
    const shiftY = event.clientY - ball.getBoundingClientRect().top;
    
    ball.style.position = 'absolute';
    ball.style.zIndex = 1000;
    document.body.append(ball);
    
    // 초기 이동을 고려한 좌표 (pageX, pageY)에서
    // 공을 이동합니다.
    function moveAt(pageX, pageY) {
      ball.style.left = pageX - shiftX + 'px';
      ball.style.top = pageY - shiftY + 'px';
    }
    
    // 포인터 아래로 공을 이동시킨다.
    moveAt(event.pageX, event.pageY);
    
    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }
    
    document.addEventListener('mousemove', onMouseMove);
    ball.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      ball.onmouseup = null;
    }
}

ball.ondragstart = function() {
  return false;
}
```

## 잠재적 드롭 대상

### 마우스 이벤트의 맨 위 요소에서만 이벤트가 발생하는 문제
[실행예시](https://ko.javascript.info/mouse-drag-and-drop#ref-246)

`blue` 에서는 이벤트 핸들러가 동작하지 않습니다. red 가 만약 다른 곳으로 이동하게 된다면 blue 가 
디스플레이에 보이게 되고, blue 의 이벤트 핸들러가 동작하는 것을 기대해야 합니다. 
```html
<style>
  div {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
  }
</style>
<div style="background:blue" onmouseover="alert('never works')"></div>
<div style="background:red" onmouseover="alert('over red!')"></div>
```
`document.elementFromPoint` 
- 윈도우 기준 좌표에서 가장 많이 중첩된 요소를 반환한다.

다음과 같이 구현 합니다.
- [소스 코드](https://plnkr.co/edit/K61wCEXyquEWUPyO?p=preview&preview)

```html
<html>
  <img src="https://en.js.cx/clipart/soccer-gate.svg" id="gate" class="droppable">
  <img src="https://en.js.cx/clipart/ball.svg" id="ball">
</html>
<script>

// 잠재적 드롭 가능한 요소
let currentDroppable = null;

ball.onmousedown = function (event) {

  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

      ball.hidden = true;
      // elemBelow : 드롭할 수 있는 공의 아래 요소, 축구골대
      const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      ball.hidden = false;
    
      // 공을 윈도우 밖으로 드래그 했을 때,
      // clientX, clientY 가 윈도우 밖에 있으면, elementFromPoint 는 null 반환
      if (!elemBelow) return;
      
      // 잠재적으로 드롭할 수 있는 요소를 'droppable' 클래스로 지정한다.  축구 골대
      const droppableBelow = elemBelow.closest('.droppable');

      // 둘다 null 일 수 있다. 들어오거나, 나가거나에 해당할 때,
      // currentDroppale = null : 축구 골대 밖에 있을 때,
      // droppableBelow = null : 이벤트 동안 축구 골대 안에 없을 때,  
      if (currentDroppable !== droppableBelow) {
        if (currentDroppable) {
          // 축구 골대 밖에 있을 때 강조 제거
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // 축구 골대 안으로 들어오는 것을 처리하는 로직
          enterDroppable(currentDroppable);
        }
      }
      document.addEventListener('mousemove', onMouseMove);
      ball.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        ball.onmouseup = null;
      };
  }
  function enterDroppable(elem) {
    elem.style.background = 'pink';
  }
  
  function leaveDroppable(elem) {
    elem.style.background = '';
  }

  ball.ondragstart = function() {
    return false;
  };
}

</script>
```

## 예시 2
```html
<html>
<body>
  <div id="slider" class="slider">
    <div class="thumb"></div>
  </div>

  <script>
    const thumb = slider.querySelector('.thumb');

    thumb.onmousedown = function(event) {
      event.preventDefault(); // prevent selection start (browser action)

      let shiftX = event.clientX - thumb.getBoundingClientRect().left;
      // shiftY not needed, the thumb moves only horizontally

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        // the pointer is out of slider => lock the thumb within the bounaries
        if (newLeft < 0) {
          newLeft = 0;
        }
        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        thumb.style.left = newLeft + 'px';
      }

      function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }

    };

    thumb.ondragstart = function() {
      return false;
    };

  </script>

</body>
</html>
<style>
.slider {
  border-radius: 5px;
  background: #E0E0E0;
  background: linear-gradient(left top, #E0E0E0, #EEEEEE);
  width: 310px;
  height: 15px;
  margin: 5px;
}

.thumb {
  width: 10px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  left: 10px;
  top: -5px;
  background: blue;
  cursor: pointer;
}
</style>
```

Reference
--
https://ko.javascript.info/mouse-drag-and-drop#ref-246
