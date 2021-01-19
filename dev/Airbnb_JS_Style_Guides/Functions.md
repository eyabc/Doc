# Functions
## func-style : 이름있는 함수 표현식 > 함수 선언식
- 함수 선언식 
    - 함수 선언이 호이스트된다. (TODO airbnb 스타일 가이드에서의 호이스팅의 의미가 다른가?)
    - 파일에서 함수가 정의되기 전에 함수를 참조할 수 있다
    - 가독성과 유지 보수성을 해친다. 
    - 함수의 정의가 파일의 나머지 부분을 이해하는 데 방해가 될만큼 충분히 크거나 복잡하다면 -> 모듈로 추출
- 이름있는 함수 표현식 
    - This eliminates any assumptions made about the Error’s call stack.
    - 에러 콜스택에서의 가정(유추해야 하는일)을 없앤다? 에러를 더 잘찾아낼 수 있다라는 의미로 해석.
    

```javascript
// bad
function foo() {
  // ...
}

// bad
const foo = function () {
  // ...
};

// good
// lexical name distinguished from the variable-referenced invocation(s)
const short = function longUniqueMoreDescriptiveLexicalFoo() {
  // ...
};
```

## wrap-iife : IIFE: parentheses 으로 감싸기
- 모듈 시스템에서의 IIFE 는 거의 사용되지 않는다.
```javascript
// immediately-invoked function expression (IIFE)
(function () {
  console.log('Welcome to the Internet. Please follow me.');
}());
```

## no-loop-func : 비함수블럭에서 함수 선언 X -> 변수에 함수 할당.
- non-function block : `if, while`, etc
- 브라우저마다 비함수블럭에서의 함수블럭 해석을 다르게 한다.

## ECMA-262, block as statements(명령문), 함수선언 as not statements
```javascript
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}

// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
``` 

##  매개변수에 arguments 사용 X 
- 함수의 arguments 프로퍼티보다 매개변수의 arguments 가 우선시 된다.
```javascript
// bad
function foo(name, options, arguments) {
  // ...
}

// good
function foo(name, options, args) {
  // ...
}
```

## prefer-rest-params : rest syntax ... > arguments X 
- 함수에서 arguments 은 절대 사용하지 말것.
- 나머지 인수는 유사배열이 아닌 실제 배열이다.
```javascript
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}

// good
function concatenateAll(...args) {
  return args.join('');
}
```

## default parameter syntax > 함수 인자 변경
```javascript
// really bad
function handleThings(opts) {
  // 절대 함수의 인자를 변경해선 안된다.
  // opts 가 거짓이면 원하는 객체로 설정되지만 미묘한 버그가 발생할 수 있습니다.
  opts = opts || {};
  // ...
}

// still bad
function handleThings(opts) {
  if (opts === void 0) {
    opts = {};
  }
  // ...
}

// good
function handleThings(opts = {}) {
  // ...
}
```

## 사이드 이펙트를 유발하는 default parameter 사용 말것.
```javascript
var b = 1;
// bad
function count(a = b++) {
  console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

## default-param-last : default parameters 는 마지막에 적는다.
```javascript
// bad
function handleThings(opts = {}, name) {
  // ...
}

// good
function handleThings(name, opts = {}) {
  // ...
}
```

## no-new-func : 함수 객체 생성, 함수 생성자 X
- 생성자로 함수 생성
    - 문자열을 'eval()' 와 유사하게 평가한다.
    - 취약점
```javascript
// bad
var add = new Function('a', 'b', 'return a + b');

// still bad
var subtract = Function('a', 'b', 'return a - b');

// good
var x = function (a, b) {
    return a + b;
};
```

## space-before-function-paren, space-before-blocks : 함수 시그니처의 space 유지
- [함수시그니처](https://developer.mozilla.org/ko/docs/Glossary/Signature/Function)
    - functions 그리고 methods 의 입력과 출력을 정의
    - parameters와 그들의 types
    - 반환값과 타입
    - 던져지거나 콜백으로 반환되는 exceptions
    - object-oriented 프로그램에서 메소드의 접근 권한에 대한 정보 (public, static, 혹은 prototype와 같은 키워드들).

- 일관성
- 이름 추가/제거 -> 공백 추가/제거 의 동작을 안해도됨 
```javascript
// bad
const f = function(){};
const g = function (){};
const h = function() {};
const a = function a() {};

// good
const x = function () {};
const y = function a() {};
```

## no-param-reassign : 매개 변수로 전달 된 객체 조작 금지
- 함수의 (original)caller 에게 변수 부작용의 가능성.
```javascript
// bad
function f1(obj) {
  obj.key = 1;
}

// good
function f2(obj) {
  const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

## no-param-reassign : 매개변수 재할당 금지
- 매개변수 재할당
    - arguments 객체 접근 -> 예기치 않은 행동 발생 
    - 최적화 이슈, especially in V8.
```javascript
// bad
function f1(a) {
  a = 1;
  // ...
}

function f2(a) {
  if (!a) { a = 1; }
  // ...
}

// good
function f3(a) {
  const b = a || 1;
  // ...
}

function f4(a = 1) {
  // ...
}
```

## prefer-spread : 가변 함수, spread operator ... > apply 
- variadic functions (가변 함수)
    - 가변 개수의 인수 허용
- apply 메서드로 context(this) 를 제공해 줄 필요 없어 깨끗하다. 
- apply 메서드를 한번 더 적용하기 힘들다.
    
```javascript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);

// good
console.log(...x);

// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));

// good
new Date(...[2016, 8, 5]);

var args = [1, 2, 3, 4];

// bad
Math.max.apply(Math, args);

// good
Math.max(...args);
```

## function-paren-newline : 함수의 여러줄의 시그니쳐/호출, 들여쓰기, 한줄에 하나씩
```javascript
// bad
function foo(bar,
             baz,
             quux) {
  // ...
}

// good
function foo(
  bar,
  baz,
  quux,
) {
  // ...
}

// bad
console.log(foo,
  bar,
  baz);

// good
console.log(
  foo,
  bar,
  baz,
);
```
