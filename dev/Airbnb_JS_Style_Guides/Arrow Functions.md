## Arrow Functions

### prefer-arrow-callback, arrow-spacing : 익명 함수, 화살표함수 사용 
- 익명 함수를 사용해야 할 때 중 하나는 인라인 콜백(inline callback)을 사용할 때 이다. 
- 화살표 함수의 함수의 실행 문맥(this)은 함수를 호출한 곳의 컨텍스트(this) 를 이어받을 수 있다.
    - 만약 function 키워드를 사용한 익명함수를 인라인 콜백에서 썼을 경우의 this 는 실행컨텍스트를 예측하기가 어렵다.   
- 화살표 함수는 간결하다.
- 만약 인라인 콜백이 복잡하여 졌을 때, 콜백의 로직을 함수 외부에 선언하는 작업이 필요해 질 것이다.
    - 이 때 외부에서, reference 에 함수 표현식을 할당하면, 인라인 콜백 대신 reference 로 대신할 수 있다.
    
```javascript
// bad
[1, 2, 3].map(function (x) {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

### 명령문이 1개인 화살표 함수 : 중괄호 생략 -> 암시적 반환
- 중괄호를 사용해야 하는경우 반환을 하기 위해선 return 문을 써야 한다.
- Syntactic sugar : 가독성
```javascript
// bad
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  `A string containing the ${nextNumber}.`;
});

// good
[1, 2, 3].map((number) => `A string containing the ${number + 1}.`);

// good
[1, 2, 3].map((number) => {
  const nextNumber = number + 1;
  return `A string containing the ${nextNumber}.`;
});

// good : obj 를 중괄호 없이 리턴하고 싶을땐, obj 를 () 으로 감싼다. 
[1, 2, 3].map((number, index) => ({
  [index]: number,
}));

// 일반함수는 암시적 리턴이 없다. side effect 가 있을 수 있다? 
function foo(callback) {
  const val = callback();
  if (val === true) {
    // Do something if callback returns true
  }
}

let bool = false;

// bad , 'bool = true' 명령문의 결과값을 반환할 의도가 없기 때문에 중괄호 생략으로 한줄로 작성하는 것은 부적절 하다. 
foo(() => bool = true);

// good
foo(() => {
  bool = true;
});
```

### 여러줄로 이뤄진 1개의 명령문의 암시적 반환: () 으로 감싼다.
- 함수의 시작과 끝을 명확히 할 수 있다.
```javascript
// bad
['get', 'post', 'put'].map((httpMethod) => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
);

// good
['get', 'post', 'put'].map((httpMethod) => (
  Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
  )
));
```

### 화살표 함수의 인자: 항상 () 로 감싸기  
- 명확성, 일관성
- 새로운 인자를 첨삭할 때 () 의 변동을 줄여준다.
    - `x` -> `(x, y)` , 혹은 그 반대를 하면 () 의 변동이 있다.  
```javascript
// bad
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].map((x) => x * x);

// bad
[1, 2, 3].map(number => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// good
[1, 2, 3].map((number) => (
  `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));

// bad
[1, 2, 3].map(x => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});
```

### 화살표함수의 (=>) 와 비교 연산자 (<=, >=) 의 혼동 : 명령문을 () 로 감싼다.
```javascript
// bad
const itemHeight = (item) => item.height <= 256 ? item.largeSize : item.smallSize;

// bad
const itemHeight = (item) => item.height >= 256 ? item.largeSize : item.smallSize;

// good
const itemHeight = (item) => (item.height <= 256 ? item.largeSize : item.smallSize);

// good
const itemHeight = (item) => {
  const { height, largeSize, smallSize } = item;
  return height <= 256 ? largeSize : smallSize;
};
```

### 암시적 반환할 때, body 의 위치 
```javascript
// bad
(foo) =>
  bar;

(foo) =>
  (bar);

// good
(foo) => bar;
(foo) => (bar);
(foo) => (
   bar
)
```
