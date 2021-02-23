# Keyboard: keydown and keyup

`<input>` 필드에 대한 입력을 추적하려면 Keyboard 이벤트로 부족하다
- 보충 : [이벤트: change, input, cut, copy, paste](https://ko.javascript.info/events-change-input)

## event.code and event.key
- `event.code` 물리적 key code
- `event.key` 누른 문자를 표현

| Key |	event.key	| event.code |
|---|---|---|
|Z|	z (lowercase)|	KeyZ|
|Shift+Z	|Z (uppercase)|	KeyZ|

키보드 자판 Z 는 언어/OS 에 따라 z 이외에도 달라질 수 있지만, code 는 항상 KeyZ 

### other key codes
키보드의 각 키는 모두 code 를 가지고 있다.

- 문자 키
    - `Key<letter>` : KeyA, KeyB ..
- 숫자 키
    - `Digit<number>` : Digit0, Digit1
- 특수 키
    - Enter, Backspace, Tab, Quote ...

콘솔에 다음과 같이 입력하고, 웹페이지에서 아무 키나 눌러보자
```javascript
const dom = document.querySelector('body')
dom.addEventListener("keydown", e => {
    console.log(e.key, e.code)
})
```

`event.key` 가 표현하지 못하는 Shift 나 F1 같은 키는 `event.code` 와 같거나 유사한 값을 가진다.

| Key	| event.key | 	event.code |
|---|---|---|
| F1	| F1	| F1 |
|Backspace	| Backspace |	Backspace |
| Shift |	Shift |	ShiftRight or ShiftLeft |

`event.code` ctrl + z 를 os/언어 에 상관없이 인식하는 방법
```javascript
document.addEventListener('keydown', function(event) {
  if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    alert('Undo!')
  }
});
```

같은키, 다른 레이아웃

![image](https://user-images.githubusercontent.com/31977543/108058161-f43d5e80-7096-11eb-8085-93b7f4308f92.png)

- US → Z
- German → Y
- [이외](https://www.w3.org/TR/uievents-code/#key-alphanumeric-writing-system)

`event.code == 'KeyZ'` 를 체크할 때, 
- German 레이아웃에서는 Y 를 누르기 때문에 체크하지 못한다. 

- 이 경우 `event.key` 레이아웃 종속 문자가 더 안전할 수도 있다. 

## event.repeat
auto-repeat
- key 를 일정 시간 이상 계속 누르고 있을 때 
- `keydown` 이 반복적으로 일어나면 `true` 가 된다.

마지막으로 single `keyup` 으로 마무리 된다.

## 기본 동작들
- 문자가 스크린에 등장하는 것
- 문자가 `Delete` 키로 인해 삭제 되는 것
- `PageDown` 키로 인해 페이지가 스크롤 되는 것
- `Ctrl + S` 를 통해 브라우저가 '페이지 저장' dialog 를 여는 것
- 등..

### 기본 동작 취소하기
- `keydown` 의 이벤트를 prevent 하면 대부분의 기본동작을 막을 수 있다.
- OS 기반 특수키로 인한 기본 동작은 막을 수 없다
    - windows `Alt + F4`
    - 자바스크립트로 막을 수 없다
    
## Legacy
keypress, keyCode, charCode, which

- browser 호환성 문제 



Reference & Comment
--
- [https://ko.javascript.info/keyboard-events](https://ko.javascript.info/keyboard-events)
