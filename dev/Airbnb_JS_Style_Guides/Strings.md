# Strings

## quotes : 문자열 single quotes ''
- 일관된 방식으로 정의되는 문자열 사용
```javascript
// bad
const name = "Capt. Janeway";

// bad - template literals:  줄바꿈, interpolation 일때 사용
const name = `Capt. Janeway`;

// good
const name = 'Capt. Janeway';
```

## 100 자가 넘는 문자열: \\,+ 으로 끊지 말것.
- 끊어진 문자열 : 작업하기가 힘들고 코드를 검색하기 어렵게 만든다.

```javascript
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';

// bad
const errorMessage = 'This is a super long error that was thrown because ' +
  'of Batman. When you stop to think about how Batman had anything to do ' +
  'with this, you would get nowhere fast.';

// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

## prefer-template, template-curly-spacing : 계산된 문자열을 만들 때 : 탬플릿 스트링  >  +
- Template 스트링
    - 가독성
    - 줄 바꿈 -> 엔터
    - interpolation `{something}` ( 블록이 아님)
```javascript
// bad
function sayHi(name) {
  return 'How are you, ' + name + '?';
}

// bad
function sayHi(name) {
  return ['How are you, ', name, '?'].join();
}

// bad
function sayHi(name) {
  return `How are you, ${ name }?`;
}

// good
function sayHi(name) {
  return `How are you, ${name}?`;
}
```

## no-eval : 문자열 eval() 사용 말것 : 많은 취약점
- 신뢰할 수없는 코드를 사용하면 여러 가지 주입 공격에 대해 프로그램을 열 수 있습니다
    
## no-useless-escape : 문자열 escape characters : Backslashes -> template string
- Backslashes 은 가독성 저하
- template string 으로 backslash 를 줄일 수 있다.

```javascript
// bad
const foo = '\'this\' \i\s \"quoted\"';

// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

- 문자열, 템플릿 리터럴 및 정규식에서 일반 문자 이스케이프 -> 효과없음
```javascript
let foo = "hol\a"; // > foo = "hola"
let bar = `${foo}\!`; // > bar = "hola!"
let baz = /\:/ // same functionality with /:/
```
