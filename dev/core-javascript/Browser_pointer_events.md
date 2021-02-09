# Pointer events
포인터 이벤트는 다양한 Pointing Devices 를 다룰 수 있는 현대적인 방법이다.

pointing devices
- mouse 
- pen/stylus
- touchscreen
- 등.

## 간단한 역사
### 1. 아주 오래전, Mouse Events 만 존재하였음
- 터치기기들은 초기에, 마우스 이벤트를 생성하였다.
    - 터치스크린을 tap → mousedown
        - 웹페이지에서 잘 동작하였다.
- 터치기기들이 마우스보다 더 능력이 많아졌다.
    - multi-touch 가 가능해졌다.
    - 여러 포인터를 한번에 터치하는 것
    - 마우스 이벤트는 multi-touch 가 없었다.
    
### 2. 터치 이벤트들이 도입되었다.
- touchstart, touchend, touchmove
- 그러나, 이외의 여러 pointing devices 를 커버하기에는 성가신 일이었다.

### 3. 새로운 Pointer Events 표준의 등장 
- Pointer Events Level 2 specification
    - 대부분 주요 브라우저에서 지원하고 있다.
- Pointer Events Level 3 
    - Pointer Events level 2 와 호환 된다.
- 구 브라우저 (IE 10, Safari 12 이하 폴리필 사용)를 개발하는 것이 아니라면 pointer events 를 사용하라.

중요한 것은 Pointer Events 에 대해 정확히 알고 예기치 못한 상황을 피하는 것이 좋다.  
  
## Pointer event types
마우스 이벤트와 비슷하게 네이밍 되었다.

| Pointer event | Similar mouse event |
|---|---|
| pointerdown | mousedown |
| pointerup | mouseup |
| pointermove | mousemove | 
| pointerover |	mouseover |
| pointerout |	mouseout |
| pointerenter |	mouseenter |
| pointerleave |	mouseleave |
| pointercancel | 	- |
| gotpointercapture |	- |
| lostpointercapture |	- |

### `mouse<event>` 를 `pointer<event>` 으로 대체하기
- 마우스에서 잘 동작한다. 
- 터치 장치에 대해서도 마법혁인 향상이 있다.
- 하지만 CSS 에서 `touch-action: none` 을 추가해야하는 부분이 존재한다.
    - `pointercancel` part 에서 다룰 것이다.

## Pointer event properties
### 마우스 이벤트와 동일한 속성을 가지고 있다.
- clientX/Y, target, etc

### 추가적인 이벤트
#### pointerId 
이벤트로 유발된 포인터의 고유한 식별자
- 브라우저가 생성     
- multiple pointers 를 다룰 수 있게 한다. 
    - 스타일러스를 사용한 터치스크린
    - multi-touch 

#### pointerType 
포인팅 기기 타입
- String 문자열 타입
- `mouse`, `pen`, `touch` 중 하나
- 다양한 포인터 타입에 반응을 다르게 할 때 사용

#### isPrimary 
- primary pointer 일 때, 값이 `true`  
    - 멀티 터치의 첫 번째 손가락

### 접촉면적과 압력을 계산하는 pointer devices 

#### width
– 손가락을 사용한 터치 기기의 포인터 영역의 width  
- mouse 와 같이 지원되지 않을 때 속성 값은 항상 `1`  

#### height
– 손가락을 사용한 터치 기기 포인터 영역의 height 
- mouse 와 같이 지원되지 않을 때 속성 값은 항상 `1`  

#### pressure
- 포인터 끝의 압력
- 0 ~ 1 범위
- 지원하지 않는 기기의 값
    - 눌렸을 때 `0.5`
    - 안눌렸을 때 `0`

#### tangentialPressure 
> TODO 번역으로는 접선 압력인데 무엇을 뜻하는지 모르겠다 

– 정규화된 (일반적인?) 접선 압력 tangential pressure.

#### tiltX, tiltY, twist
– pen 포인터 디바이스에 특화된 속성
- relative 표면에서 펜이 어떻게 위치해 있느냐에 대한 정보

## Multi-touch
Pointer Events 는 multi-touch 를 위해 `pointerId` 와 `isPrimary` 속성을 사용한다.

한 곳에서 터치 스크린을 터치 한 다음 다른 손가락을 다른 곳에 놓을 때,

1. 첫번 째 손가락이 터치 될 때
    - pointerdown 과 함께 `isPrimary=true`, `pointerId` 값이 set 된다.
    
2. 다른 손가락들이 터치 될 때 (첫번 째 손가락이 여전히 터치 되고 있음을 가정)
    - pointerdown 과 함께 `isPrimary=false` , 모든 손가락에 대해 다른 `pointerId` 가 set 된다.

### pointerId
여러 터치 손가락을 추적 할 수 있다.
- 사용자가 이동 한 다음 손가락을 제거하면 pointerdown 에서와 동일한 pointerId를 가진 pointermove 및 pointerup 이벤트가 발생한다.

## Event: pointercancel
- 진행중인 포인터 상호 작용이있을 때 발생하고
- 상호작용을 중단되도록하는 일이 발생하여 
- 더 이상 포인터 이벤트가 생성되지 않는다.

### 중단 원인들
- 포인터 장치 하드웨어가 물리적으로 비활성화 될 때
- 장치의 orientation (방향) 이 바뀌었을 때 (tablet 회전)
- 브라우저가 interaction 을 스스로 핸들하려고 결정할 때
    - mouse gesture ??  
    - zoom-and-pan(확대/축소) action

### [드래그 앤 드롭과 마우스 이벤트 예시](https://ko.javascript.info/mouse-drag-and-drop)
1. `pointerdown` 유저가 이미지를 누른다
2. `pointermove` 포인터를 움직이기 시작한다. 
3. 브라우저의 이미지에 대한 네이티브 드래그앤드롭이 진행된다.
    - 브라우저는 interaction 을  hijacks 하고, 따라서 `pointercancel` 이벤트를 발생시킨다.
    - `pointermove` 는 더이상 발생하지 않는다.

### 브라우저의 pointercancel 이벤트를 중단 시키는 방법
1. 기본 드래그 앤 드롭이 발생하지 않도록 방지
    ```javascript
    ball.ondragstart = function() {
      return false;
    };
    ```
2. 터치 기기에서는, 추가적인 브라우저 액션이 존재한다.
   - `#ball { touch-action: none }` in CSS 으로 기본 이벤트를 방지한다.

## Pointer capturing
### `elem.setPointerCapture(pointerId)`
주어진 pointerId를 가진 이벤트를 elem 에 바인딩합니다.

- 동일한 pointerId 를 가진 모든 포인터 이벤트는 
실제로 발생한 문서의 위치에 관계없이 대상으로 elem 을 갖게됩니다 
(elem 에서 발생한 것처럼). ??

### elem.setPointerCapture 바인딩이 제거되는 상황
- `pointerup` `pointercancel` 이벤트가 발생할 때 자동으로 제거된다.
- `elem` 이 document 에서 제거 될 때 자동으로 제거된다.
- `elem.releasePointerCapture(pointerId)` 이 호출 될 때

### Pointer capturing 의 사용처
- 드래그 앤 드롭 방식의 상호작용을 단순화 
- [슬라이더 예제](https://plnkr.co/edit/lBpFSUdqUXAgYJEO?p=preview&preview)
![image](https://user-images.githubusercontent.com/31977543/107378401-49292400-6b2f-11eb-8cdd-9185dd0c6cec.png)

1. 사용자가 slider thumb 을 누르면 `pointerdown` 가 유발 됩니다.
2. `pointermove` 를 트리거 합니다.
    - 포인터가 움직일 때, 슬라이더의 수평으로 움직여야 하지만 수평으로도 움직이기도 하고 thumb 을 떠나게 됩니다. 
    - 수평으로 움직이는 것을 감지하려면 문서 전체에 `pointermove` 이벤트를 할당해야 한다.
        - 코드가 복잡할 것이다.
        - 문서 주변의 포인터 이동이 슬라이더와 전혀 관련이없는 부작용을 일으킬 수 있다.
        - 다른 이벤트 핸들러를 트리거 할 수 있다.

#### 문제 해결
Pointer capturing 는 pointermove 를 thumb 에 바인딩하고 이러한 문제를 방지하는 수단을 제공합니다.

1. `pointerdown` 핸들러 안에서, `thumb.setPointerCapture(event.pointerId)` 를 호출한다.
2. 포인터 이벤트는 `pointerup/cancel` 가 호출되기 전까지 `thumb` 으로 `retargeted` 된다.
3. `pointerup` 이 될 때, 바인딩이 자동으로 삭제된다. 

- 사용자가 전체 문서 주위로 포인터를 이동하더라도 이벤트 핸들러는 thumb 으로 호출된다. 
- `clientX / clientY` 와 같은 이벤트 객체의 좌표 속성은 여전히 정확합니다. 
- 캡처는 `target / currentTarget`에만 영향을 줍니다.

```html
<div id="slider" class="slider">
  <div class="thumb"></div>
</div>

<script>
  let thumb = slider.querySelector('.thumb');
  let shiftX;

  thumb.onpointerdown = function(event) {
    event.preventDefault(); // prevent selection start (browser action)
    shiftX = event.clientX - thumb.getBoundingClientRect().left;

    // retarget all pointer events (until pointerup) to thumb
    thumb.setPointerCapture(event.pointerId); // (*)
  };

  thumb.onpointermove = function(event) {
    // moving the slider: listen on the thumb, 
    // as all pointer events are retargeted to it
    let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left; // (*)

    // if the pointer is out of slider => adjust left to be within the bounaries
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = slider.offsetWidth - thumb.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    thumb.style.left = newLeft + 'px';
  };

  thumb.ondragstart = () => false;

</script>
```

### Pointer capturing events
#### gotpointercapture
setPointerCapture 를 사용할 때 발생합니다.

#### lostpointercapture
캡처가 해제 될 때 발생합니다

- 명시적 `releasePointerCapture`
- 자동 `pointerup` / `pointercancel`

Reference
--
https://ko.javascript.info/pointer-events
