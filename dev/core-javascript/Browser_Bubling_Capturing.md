# 버블링과 캡쳐링

## 버블링 Bubbling
1. 한 요소에 이벤트 발생 → 요소에 할당된 핸들러 동작
2. 부모 요소의 핸들러 동작 
3. 가장 최상단의 조상요소를 만날 때 까지 반복되면서 요소 각각에 할당된 핸들러 동작.

- 타깃 이벤트에서 시작해서 `<html>` 요소를 거쳐 `document` 객체를 만날 때까지 각 노드에서 모두 발생함.
- `window` 객체까지 거슬러 올라가는 이벤트도 존재함.

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

1. 가장 안쪽의 `<p>`를 클릭
2. `<p>` 에 할당된 `onclick` 핸들러 동작
3. 바깥의 `<div>`에 할당된 핸들러 동작
4. 그 바깥의 `<form>` 에 할당된 핸들러 동작
5. `document` 객체를 만날 때까지, 각 요소에 할당된 `onclick` 핸들러 동작

![image](https://user-images.githubusercontent.com/31977543/100100889-d64fcb80-2ea4-11eb-9bdd-7a69f112fcb3.png)

거의 모든 이벤트는 버블링 된다.
- `focus` 이벤트는 버블링 되지 않는다.
 
## target
### event.target
- 실제 이벤트가 시작된 ‘타깃’ 요소
- 버블링이 진행되어도 변하지 않음

### event.currentTarget(this)
- 현재 요소
- 현재 **실행중인 핸들러가 할당된 요소**를 참조

- `event.target` – form 안쪽에 실제 클릭한 요소를 가리킴
- `event.currentTarget` - form
```html
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="example.css">
</head>

<body>
  <form id="form">FORM
    <div>DIV
      <p>P</p>
    </div>
  </form>
</body>
<script>
form.onclick = function(event) {
  event.target.style.backgroundColor = 'yellow';

  // chrome needs some time to paint yellow
  setTimeout(() => {
    alert("target = " + event.target.tagName + ", this=" + this.tagName);
    event.target.style.backgroundColor = ''
  }, 0);
};
</script>
</html>
```

## event.stopPropagation 버블링 중단하기
```html
<body onclick="alert(`버블링은 여기까지 도달하지 못합니다.`)">
  <button onclick="event.stopPropagation()">클릭해 주세요.</button>
</body>
```

### [event.stopImmediatePropagation()](https://developer.mozilla.org/ko/docs/Web/API/Event/stopImmediatePropagation)
한 요소의 핸들러가 여러 개일 때, 
- `event.stopPropagation()` 으로 핸들러 중 하나가 버블링을 멈추더라도, 나머지 핸들러는 여전히 동작한다.

다른 핸들러의 동작도 막으려면 
- `event.stopImmediatePropagation()` 사용
- 요소에 할당된 핸들러 모두가 동작하지 않음

## 꼭 필요한 경우를 제외하곤 버블링을 막지 마세요!
버블링은 유용합니다. 아키텍처를 잘 고려해 진짜 막아야 하는 상황에서만 버블링을 막으세요.

`event.stopPropagation()`  → 추후에 문제 유발 가능

이벤트 버블링을 막아야 하는 경우는 거의 없습니다. 
버블링을 막아야 해결되는 문제라면 커스텀 이벤트 등을 사용해 문제를 해결할 수 있습니다.

### 행동 패턴 분석
사람들이 페이지에서 어디를 클릭했는지 등의 행동 패턴을 분석하기 위해, 
window 내에서 발생하는 클릭 이벤트 전부를 감지하기로 결정합니다. 

클릭 이벤트를 감지하기 위해 document.addEventListener('click'…)을 사용합니다.

stopPropagation 로 버블링을 막아놓은 영역에선 분석 시스템의 코드가 동작하지 않기 때문에, 
분석이 제대로 되지 않습니다.
 
안타깝게도 stopPropagation을 사용한 영역은 '죽은 영역(dead zone)'이 되어버립니다.

## 이벤트의 흐름
![image](https://user-images.githubusercontent.com/31977543/100105281-8542d600-2eaa-11eb-9b68-9b59c0e70f63.png)

1. 캡처링 단계 – 이벤트가 하위 요소로 전파되는 단계
2. 타깃 단계 – 이벤트가 실제 타깃 요소에 전달되는 단계
3. 버블링 단계 – 이벤트가 상위 요소로 전파되는 단계

캡처링과 버블링 단계의 핸들러는 타깃 단계에서 트리거됩니다.

## 캡처링
이벤트 캡처링 단계를 이용하는 경우는 흔치 않다.

```javascript
elem.addEventListener(..., {capture: true})
elem.addEventListener(..., true)
```

capture 옵션
- false(default 값) 핸들러는 버블링 단계에서 동작합니다.
- true 핸들러는 캡처링 단계에서 동작합니다.


```html
<form>FORM
  <div>DIV
    <p>P</p>
  </div>
</form>

<script>
  for(let elem of document.querySelectorAll('*')) {
    elem.addEventListener("click", e => alert(`캡쳐링: ${elem.tagName}`), true);
    elem.addEventListener("click", e => alert(`버블링: ${elem.tagName}`));
  }
</script>
```

`<p>`를 클릭하면 다음과 같은 순서로 이벤트가 전달됩니다.

1. HTML → BODY → FORM → DIV (캡처링 단계, 첫 번째 리스너)
2. P (타깃 단계, 캡쳐링과 버블링 둘 다에 리스너를 설정했기 때문에 두 번 호출됩니다.)
3. DIV → FORM → BODY → HTML (버블링 단계, 두 번째 리스너)

## event.eventPhase
현재 발생 중인 이벤트 흐름의 단계를 알 수 있음 (캡처링=1, 타깃=2, 버블링=3)


Reference
--
- https://ko.javascript.info/bubbling-and-capturing
