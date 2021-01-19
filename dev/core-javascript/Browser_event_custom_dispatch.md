# 커스텀 이벤트(synthetic events) 디스패치
- 커스텀 이벤트 디스패치는 **테스트** 에서 매우 유용할 것 같다  

- 커스텀 이벤트의 이름은 내장 이벤트와 같게 지을 수 있지만, 대부분의 설계관점에서 나쁜 영향이 있다고 한다.
하지만 
- 서드파티 라이브러리가 제대로 동작하게 하려면 꼭 필요한 경우. 네이티브 이벤트를 만드는 것 이외에는 서드파티 라이브러리와 상호작용할 수 있는 수단이 없는 경우엔 괜찮습니다.
- 테스팅을 자동화 하려는 경우. '버튼 클릭’등의 이벤트를 사용자 동작 없이 코드만으로 유발시키고 제대로 동작하는지 그 결과를 확인하고자 할 때는 괜찮습니다.
- 네이티브 이벤트 이름과 겹치지 않게 커스텀 이벤트를 만드는 것은 설계 측면에서 자주 쓰이는 전략입니다. 커스텀 이벤트를 응용하면 메뉴나 사이드바, 캐러셀 등의 안에서 발생하는 일을 알려줄 수 있습니다.

- [내장 이벤트](https://developer.mozilla.org/en-US/docs/Web/API/Event)

## Event 의 생성자
- 내장 이벤트 클래스는 DOM 요소 클래스 같이 계층 구조임
- `Event 클래스` 내장 이벤트들의 최상위 클래스
```javascript
let event = new Event(type[, options]);
```

`type` 
- 이벤트 타입을 나타내는 문자열 
- 내장 이벤트 예시 `click`
- 커스텀 이벤트 예시 `my-event`

`options` 두 개의 선택 프로퍼티 객체
- `bubbles: true/false` true 인 경우 이벤트 버블링
- `cancelable: true/false` true 인 경우 브라우저 기본 동작이 실행되지 않음.
- options 가 없을 경우 `{ bubbles: false, cancelable: false }`

## elem.dispatchEvent(event)
`dispatch` 일을 처리하다 라는 뜻을 가진 영어 단어

요소의 이벤트를 js 로 실행 시킬 수 있다.
[실행 예제](https://ko.javascript.info/dispatch-events#ref-258)
```html
<button id="elem" onclick="alert('클릭!');">자동으로 클릭 되는 버튼</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```
버튼을 클릭하지 않았지만 이벤트 핸들러가 동작한다.

### event.isTrusted
`true` 사용자 액션을 통해 만든 이벤트

`false` 스크립트를 통해 생성된 이벤트

## 커스텀 이벤트 버블링 예시
[실행 예제](https://ko.javascript.info/dispatch-events#ref-259)
```html
<h1 id="elem">Hello from the script!</h1>
<script>
  // 버블링이 일어나면서 document에서 이벤트가 처리됨
  document.addEventListener("hello", function(event) { // (1)
    alert("Hello from " + event.target.tagName); // Hello from H1
  });

  // 이벤트(hello)를 만들고 elem에서 이벤트 디스패치
  let event = new Event("hello", { bubbles: true }); // (2)
  elem.dispatchEvent(event);

  // document 에 할당된 핸들러가 동작하고 메시지가 얼럿창에 출력됩니다.
</script>
```
- 커스텀 이벤트는 핸들러는 `addEventListener` 로 만 등록할 수 있다.
 
## MouseEvent, KeyboardEvent 등의 UI 이벤트 
- UIEvent, FocusEvent, MouseEvent, WheelEvent, KeyboardEvent ...
- 이벤트 전용 프로퍼티의 명시
    - `new Event`  X 
    - 관련 내장 클래스를 사용
```javascript
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

alert(event.clientX); // 100
```
```javascript
let event = new Event("click", {
  bubbles: true, // Event 생성자에선
  cancelable: true, // bubbles와 cancelable 프로퍼티만 동작합니다.
  clientX: 100,
  clientY: 100
});

alert(event.clientX); // undefined, 알 수 없는 프로퍼티이기 때문에 무시됩니다.
```
    
## CustomEvent

```html
<h1 id="elem">이보라님, 환영합니다!</h1>

<script>
  // 추가 정보는 이벤트와 함께 핸들러에 전달됩니다.
  elem.addEventListener("hello", function(event) {
    alert(event.detail.name);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "보라" }
  }));
</script>
```

Event 와 차이점
- 두번째 인수의 객체에 `detail` 프로퍼티를 추가해 커스텀 이벤트 관련 정보를 명시하고, 정보를 이벤트에 전달할 수 있다.
- Event 객체에도 이벤트 관련 정보를 추가할 수 있지만, `data-set` 의 특성처럼
다른 프로퍼티와의 충돌을 피할 수 있는 장점을 가지고 있다.

## Event.preventDefault
- 이벤트의 기본동작이 취소되면 `elem.dispatchEvent(event)` 가 `false` 를 반환.

```html
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<button onclick="hide()">hide()를 호출해 토끼 숨기기</button>

<script>
  // hide() will be called automatically in 2 seconds
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // cancelable를 true로 설정하지 않으면 preventDefault가 동작하지 않습니다.
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('기본 동작이 핸들러에 의해 취소되었습니다.');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("preventDefault를 호출하시겠습니까?")) {
      event.preventDefault();
    }
  });
</script>
```

## 이벤트 안 이벤트 : 이벤트 안에 `dispatchEvent` 가 있는 경우
이벤트는 대게 큐에서 처리된다.
- 브라우저가 onclick 이벤트를 처리하고 있는데, 마우스를 움직여서 새로운 이벤트를 발생시킨다.
- mousemove 핸들러는 onclick 이벤트 처리가 끝난 후 호출된다.

이벤트 안에 있는 이벤트는 즉시 처리됨.
[실행 예시](https://ko.javascript.info/dispatch-events#ref-263)
```html
<button id="menu">메뉴(클릭해주세요)</button>

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

  // 1과 2 사이에 트리거됩니다
  document.addEventListener('menu-open', () => alert('중첩 이벤트'));
</script>
```
- `alert(1)`
- `alert('중첩 이벤트')`
- `alert(2)`

1. 버블링으로 인하여 document 에 할당된 핸들러가 처리된다.
2. 중첩이벤트는 동기적으로 처리된다. 

중첩이벤트를 동기적으로 처리하지 않을 때 `setTimeout` 을 사용할 수 있다.
```javascript
menu.onclick = function() {
alert(1);

setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
  bubbles: true
})));

alert(2);
};

document.addEventListener('menu-open', () => alert('중첩 이벤트'));
```



Reference
--
- https://ko.javascript.info/dispatch-events
- https://developer.mozilla.org/ko/docs/Web/Guide/Events/Creating_and_triggering_events#%EC%BB%A4%EC%8A%A4%ED%85%80_%EC%9D%B4%EB%B2%A4%ED%8A%B8_%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0
