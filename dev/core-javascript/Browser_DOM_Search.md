---

Date: 2020-10-24

sidebarDepth: 2

---

# DOM Search

| Node | Element |
|---|---|
| 태그노드 + 텍스트노트 | 태그 노드 |
| childNodes | children |
| parentNode | parentElement |
| previousSibling | previousElementSibling |
| nextSibling | nextElementSibling |
| firstChild | firstElementChild |
| lastChild | lastElementChild |

![image](https://user-images.githubusercontent.com/31977543/97265395-ed7da800-1869-11eb-8e66-e44e37ee39cb.png)
![image](https://user-images.githubusercontent.com/31977543/97270463-8f08f780-1872-11eb-912d-c5c783e40bdf.png)

- `<html>` = `document.documentElement` 
- `<head>` = `document.head`
- `<body>` = `document.body`

## 자식 노드 탐색
- 자식노드 (child node, children) 
    - 바로 아래의 자식 요소
- 후손 노드 (descendants)
    - 중첩 관계에 있는 모든 요소
   
   
## DOM 컬렉션 : NodeList
- 배열이 아닌 iterable 유사 배열 객체 컬렉션이다.
- 읽기 전용
- DOM 을 변경하려면 메서드를 사용해야 한다.
- `for..of` 으로 순회한다.
- `for..in` 은 모든 열거가능한 프로퍼티를 순회하여 불필요한 프로퍼티까지 순회하게 된다.
- `node.hasChildNodes()` 자식 노드의 존재 여부 확인


```html
for (let i = 0; i < document.body.childNodes.length; i++) {
  alert( document.body.childNodes[i] ); // Text, DIV, Text, UL, ... , SCRIPT
}

elem.childNodes[0] === elem.firstChild;
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;

// <body>의 부모 노드는 <html>입니다
alert( document.body.parentNode === document.documentElement ); // true

// <head>의 다음 형제 노드는 <body>입니다.
alert( document.head.nextSibling ); // HTMLBodyElement

// <body>의 이전 형제 노드는 <head>입니다.
alert( document.body.previousSibling ); // HTMLHeadElement
```

## 테이블 탐색
- `table.rows` -> `<tr>` 컬렉션
- `table.caption` -> `<caption>`
- `table.tHead` -> `<thead>`
- `table.tFoot` -> `<tfoot>`
- `table.tBodies` -> `<tbody>` 컬렉션
    - 테이블에 최소 1개의 `<tbody>` 를 담고 있다.
- `<thead> <tfoot> <tbody>` 는 `rows` 프로퍼티를 지원함
- `<tr>` 의 프로퍼티
    - `tr.cells` -> `<td>` `<th>` 컬렉션
    - `tr.sectionRowIndex` -> `<tr>`의 thead / tbody / tfoot 안에서의 인덱스
- `<td>` `<th>` 프로퍼티
    - `td.cellIndex` -> td / th 가 속한 `<tr>` 에서의 인덱스

```html
<table id="table">
  <tr>
    <td>일</td><td>이</td>
  </tr>
  <tr>
    <td>삼</td><td>사</td>
  </tr>
</table>

<script>
  // '이'가 적힌 td를 가져옴(첫 번째 줄, 두 번째 칸)
  let td = table.rows[0].cells[1];
  td.style.backgroundColor = "red"; // 강조
</script>
```

     


Reference
--
- https://gitlab.com/siots-study/topics/-/wikis/dom
- [DOM Search](https://ko.javascript.info/dom-navigation)
- https://www.zerocho.com/category/JavaScript/post/573b4165a54b5e8427432948
