# Arrays

## no-array-constructor " 배열 생성: 리터럴 문법 []
- 배열 생성자의 문제점
    - single-argument pitfall : 단일 인수 -> 함정 (?)   
    - Array global 이 재정의 될 수 있다. (?)
- 배열 생성자를 쓰는 예외
    - Array 생성자가 단일 숫자 인수를 제공하여 지정된 크기의 배열 만들때.
    
```javascript
// bad
const items = new Array(0, 1, 2);
Array(0, 1, 2);

// good
const items = [0, 1, 2];

Array(500);
new Array(someOtherArray.length);
```

## 배열의 items 생성 : push
```javascript
const someStack = [];

// bad
someStack[someStack.length] = 'abracadabra';

// good
someStack.push('abracadabra');
```

## 배열 복사 : ... spread operator
```javascript
// bad
const len = items.length;
const itemsCopy = [];
let i;

for (i = 0; i < len; i += 1) {
  itemsCopy[i] = items[i];
}

// good
const itemsCopy = [...items];
```

## iterable 객체 -> 배열 : spreads ... > Array.from.
```javascript
const foo = document.querySelectorAll('.foo');

// good
const nodes = Array.from(foo);

// best
const nodes = [...foo];
```
[iterable 객체](./Iteration%20프로토콜.html#iterable-프로토콜)
`document.querySelectorAll('.foo')` 의 `__proto__` 는  [NodeList](https://developer.mozilla.org/ko/docs/Web/API/NodeList)

## array-like 객체 -> 배열 : Array.from
```javascript
let arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
/*
Object
0: "foo"
1: "bar"
2: "baz"
length: 3
__proto__: Object
*/
// bad
const arr = Array.prototype.slice.call(arrLike);

// good
const arr = Array.from(arrLike); // ["foo", "bar", "baz"]
```
```javascript
let arrLike = { '0': 'foo', 1: 'bar', 2: 'baz', length: 3 };
Array.from(arrLike); // ["foo", "bar", "baz"]

arrLike = { '212': 'foo', 1: 'bar', 2: 'baz', length: 3 };
Array.from(arrLike); // [undefined, "bar", "baz"]
```

[유사 배열의 조건](https://kamang-it.tistory.com/entry/JavaScript15%EC%9C%A0%EC%82%AC%EB%B0%B0%EC%97%B4-%EA%B0%9D%EC%B2%B4Arraylike-Objects)
1. `length` 프로퍼티가 존재.
2. index 번호가 0번부터 시작해서 1씩증가.

    
## iterable map :  Array.from > spread ... 
Array.from 은 중간에 배열을 생성하는 것을 방지한다.

```javascript
const bar = (v) => v + 1;
const foo = [1, 2, 3];

// bad
const baz = [...foo].map(bar);  // [2, 3, 4]

// good
const baz = Array.from(foo, bar)  // [2, 3, 4]
```

## array-callback-return : 배열 메서드의 callback 에서 return 문을 사용해야 한다
- return 을 빼뜨린 것은 아마도 실수 일 것임.
- 반환을 사용하지 않거나 반환된 결과가 필요하지 않으면 forEach 를 사용하는 것이 좋다.


```javascript
// good
[1, 2, 3].map((x) => {
  const y = x + 1;
  return x * y;
});

// good
[1, 2, 3].map((x) => x + 1);

// bad - callback 에서 return 문을 쓰지 않으면, 첫 이터레이션 이후 `acc` 의 값은 undefined 가 된다.
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
});

// good
[[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
  const flatten = acc.concat(item);
  return flatten;
});

// bad
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  } else {
    return false;
  }
});

// good
inbox.filter((msg) => {
  const { subject, author } = msg;
  if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
  }

  return false;
});
```

- `Array.from`
- `Array.prototype.every`
- `Array.prototype.filter`
- `Array.prototype.find`
- `Array.prototype.findIndex`
- `Array.prototype.flatMap`
- `Array.prototype.forEach`(선택 사항)
- `Array.prototype.map`
- `Array.prototype.reduce`
- `Array.prototype.reduceRight`
- `Array.prototype.some`
- `Array.prototype.sort`

## 여러 줄이있는 배열의 줄바꿈: 괄호를 열때, 닫기전 사용
```javascript
// bad
const arr = [
  [0, 1], [2, 3], [4, 5],
];

const objectInArray = [{
  id: 1,
}, {
  id: 2,
}];

const numberInArray = [
  1, 2,
];

// good
const arr = [[0, 1], [2, 3], [4, 5]];

const objectInArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const numberInArray = [
  1,
  2,
];
```
