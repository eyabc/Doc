# 이벤트 위임

![image](https://user-images.githubusercontent.com/31977543/102895049-620a4700-44a7-11eb-9230-cac69712c26c.png)

- [샘플](https://plnkr.co/edit/KC7ZGxbhhmPeznYw?p=preview&preview)

```html
<table>
  <tr>
    <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
  </tr>
  <tr>
    <td class="nw"><strong>Northwest</strong><br>Metal<br>Silver<br>Elders</td>
    <td class="n">...</td>
    <td class="ne">...</td>
  </tr>
  <tr>...2 more lines of this kind...</tr>
  <tr>...2 more lines of this kind...</tr>
</table>
```

- 목표 : `<td>` 를 클릭했을 때, 그 칸을 강조함
- 방법 : `onclick` 핸들러를 할당할 요소 결정
    1. 모든 `<td>`마다 할당 👉 비효율적
    2. 모든 이벤트를 잡아내는 핸들러를 `<table>` 요소에 할당

```javascript
let selectedTd;

table.onclick = function(event) {
  let target = event.target; // 클릭이 어디서 발생했을까요?

  if (target.tagName !== 'TD') return; // TD에서 발생한 게 아니라면 아무 작업도 하지 않습니다,

  highlight(target); // 강조 함
};

function highlight(td) {
  if (selectedTd) { // 이미 강조되어있는 칸이 있다면 원상태로 바꿔줌
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // 새로운 td를 강조 함
}
```

위 코드의 문제점
- `<td>`가 아닌 `<td>` 안 `<strong>` 에서는 동작하지 않는다.
```html
<td>
  <strong>Northwest</strong>
</td>
```

![image](https://user-images.githubusercontent.com/31977543/102898369-c24fb780-44ac-11eb-8b09-8816c2e22e3a.png)

```javascript
table.onclick = function(event) {
  const td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)

  highlight(td); // (4)
};
```
1. `elem.closest(selector)`
    - elem 의 상위 요소 중 selector 와 일치하는 **가장 근접한 조상 요소를 반환** 
2. `event.target` 이 `<td>`안에 있지 않을 때, `null` 반환
3. **중첩 테이블**이 있는 경우 event.target 은 현재 테이블 바깥에 있는 `<td>`가 될 수도 있습니다. 
4. 진짜 td를 강조

## 이벤트 위임 활용하기
```html
<div id="menu">
  <button data-action="save">저장하기</button>
  <button data-action="load">불러오기</button>
  <button data-action="search">검색하기</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      // (*) this.onClick 은 this 에 바인딩했다
      elem.onclick = this.onClick.bind(this); 
    }

    save() {
      alert('저장하기');
    }

    load() {
      alert('불러오기');
    }

    search() {
      alert('검색하기');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  new Menu(menu);
</script>
```
- (*)`elem.onclick = this.onClick.bind(this);` 
    - `this.onClick` 은 `this` 에 바인딩함.
    - class 의 객체에서의 this 는 menu 의 인스턴스 object 를 가리킵니다.
    - 바인딩 하지 않으면, onClick 메서드 안에서의 this 는 elem 이다.

## 이벤트 위임의 동작
1. 컨테이너에 하나의 핸들러를 할당합니다.
2. 핸들러의 event.target 을 사용해 이벤트가 발생한 요소가 어디인지 알아냅니다.
3. 원하는 요소에서 이벤트가 발생했다고 확인되면 이벤트를 핸들링합니다.

## 이벤트 위임의 장점
- 요소를 추가하거나 제거할 때 해당 요소에 할당된 핸들러를 추가하거나 제거할 필요가 없기 때문에 **코드가 짧아집니다.**
- 동적인 엘리먼트에 대한 이벤트 처리가 수월하다.
- **DOM 수정이 쉬워짐** : 상위 엘리먼트에서만 이벤트 리스너를 관리하기 때문에 하위 엘리먼트는 자유롭게 추가 삭제할 수 있다.
- 이벤트 핸들러 관리가 쉽다.
    - 많은 핸들러를 할당하지 않아도 되기 때문에 **초기화가 단순해지고 메모리가 절약**됩니다.
    - 메모리 누수 가능성도 줄어든다.
    
## 이벤트 위임의 단점
- 이벤트 위임을 사용하려면 **이벤트가 반드시 버블링** 되어야 합니다. 
    - 버블링 되지 않는 일부 이벤트가 존재함.
    - 낮은 레벨에 할당한 핸들러엔 event.stopPropagation()를 쓸 수 없습니다. (?TODO) 
    
- 컨테이너 수준에 할당된 핸들러가 모든 하위 컨테이너에서 발생하는 이벤트에 응답해야함 
    - CPU 작업 부하가 늘어날 수 있습니다. 
    - 이런 부하는 무시할만한 수준이므로 실제로는 잘 고려하지 않음

## 예시
- 카운터 구현하기
```
첫 번째 카운터: <input type="button" value="1" data-counter>
두 번째 카운터: <input type="button" value="2" data-counter>

<script>
  document.addEventListener('click', function(event) {

    if (event.target.dataset.counter != undefined) { // 속성이 존재할 경우
      event.target.value++;
    }

  });
</script>
```
- 토글러 구현하기
```
<button data-toggle-id="subscribe-mail">
  구독 폼 보여주기
</button>

<form id="subscribe-mail" hidden>
  메일 주소: <input type="email">
</form>

<script>
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
</script>
```

- [Hide messages with delegation](https://plnkr.co/edit/Gln3COwjRb6E7LA9?p=preview&preview)
- [Tree menu](https://plnkr.co/edit/S9Y0B68rHv8DNbJx?p=preview&preview)
- [Sortable table](https://plnkr.co/edit/44OZNPWoTdaMi1mR?p=preview&preview)
- [Tooltip behavior](https://plnkr.co/edit/QEo1yOgcLdOZrUYn?p=preview&preview)

- [React 이벤트 위임](https://reactjs.org/docs/handling-events.html)



Reference & Comments
--
- https://ko.javascript.info/event-delegation
- https://ui.toast.com/weekly-pick/ko_20160826
