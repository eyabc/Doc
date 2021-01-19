# Objects

## no-new-object : Object 생성 -> 리터럴 문법 사용 { }
- 객체 리터럴 구문은 더 간결하며 new Object() 의 성능 차이는 없다. 

```javascript
// bad
const item = new Object();

// good
const item = {};
```

## 계산된 속성명을 obj 안에서 정의해야 한다.

bad case 의 경우, 계산된 속성명을 obj 정의시 지원이 안됐던 시절 사용했던 방법이다.

지금은 obj 안에 계산된 속성명이 사용가능하기 때문에

- 가독성을 위해
- obj 에서 계산된 속성명을 한번더 검사해서 값을 할당하는 방식은 불필요

```javascript
function getKey(k) {
  return `a key named ${k}`;
}

// bad
const obj = {
  id: 5,
  name: "San Francisco"
};
obj[getKey("enabled")] = true;

// good
const obj = {
  id: 5,
  name: "San Francisco",
  [getKey("enabled")]: true
};
```

## object-shorthand : 객체 메서드는 shorthand 사용
- 객체 리터럴을 훨씬 더 깔끔하게 정의할 수 있다.
```javascript
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};
```

```javascript
// bad
var foo = {
    w: function() {},
    x: function *() {},
    [y]: function() {},
    z: z
};

// good
var foo = {
    w() {},
    *x() {},
    [y]() {},
    z
};
```
- 화살표 함수에는 eslint 플래그를 지정하지 않는다.
```javascript
var foo = {
    x: (y) => y
};
```

shorthand
- function 에서 많은 기능이 제한되어 오직 method 로서만 사용할 수 있는 특수 함수.
- shorthand 로 정의된 메서드는 현재 객체의 수퍼 프로토타입을 찾을 수 있는 `[[HomeObject]]` 메서드를 가지기 때문에 메서드 내에서 super 를 호출 할 수 있다.

## object-shorthand : 프로퍼티의 shorthand 사용
```javascript
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  lukeSkywalker: lukeSkywalker,
};

// good
const obj = {
  lukeSkywalker,
};
```

## 객체의 시작 부분에 shorthand properties 를 그룹화 한다.
```javascript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

## quote-props : 유효하지 않은 식별자 이름만 quote 프로퍼티 사용
```javascript
// bad
const bad = {
  'foo': 3,
  'bar': 4,
  'data-blah': 5,
};

// good
const good = {
  foo: 3,
  bar: 4,
  'data-blah': 5,
};
```
- 가독성
- syntax highlighting 이 잘 된다. 
- JS 엔진에서 더 쉽게 최적화 된다.

### 따옴표를 사용해야 하는 경우
- 속성 이름에 비 식별자 문자를 사용 (예 : "one two")
- 숫자 리터럴을 속성 키로 사용
    ```javascript
    var object = {
        1e2: 1,
        100: 2
    };
    ```
    - ES5 엄격 모드에서 구문 오류 발생
    - 숫자를 문자열로 강제 변환하는 과정
        - `String(1e2)` 와 `String(100)` 이 `100` 으로 같다.
        - 엄격 모드에서는 중복된 키를 허용하지 않는다.

## no-prototype-builtins : hasOwnProperty, propertyIsEnumerable, isPrototypeOf 를 Object.prototype 메서드로 직접 호출하지 않기
```javascript
// bad
console.log(object.hasOwnProperty(key));

// good
console.log(Object.prototype.hasOwnProperty.call(object, key));

// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
console.log(has.call(object, key));
/* or */
import has from 'has'; // https://www.npmjs.com/package/has
console.log(has(object, key));
```

`Object.prototype.hasOwnProperty.call` 이런식으로 쓰지 않고 `object.hasOwnProperty(key)` 으로 쓰면, 

object 가 `null` 이거나 object 의 `hasOwnProperty: false` 일 경우 메서드가 가려진다. 

-> **가려져 에러가 난다.**

```javascript
let obj = Object.create(null);
obj.hasOwnProperty('key');
/*
VM129:1 Uncaught TypeError: obj.hasOwnProperty is not a function
    at <anonymous>:1:5
(anonymous) @ VM129:1
*/
Object.prototype.hasOwnProperty.call(obj, 'keys'); // false

obj = {};
obj.hasOwnProperty('key');  // false
obj.hasOwnProperty = false;
obj.hasOwnProperty('key'); 
/*
VM129:1 Uncaught TypeError: obj.hasOwnProperty is not a function
    at <anonymous>:1:5
(anonymous) @ VM129:1
*/
Object.prototype.hasOwnProperty.call(obj, 'keys'); // false
``` 

## 얕은 복사 / 특정 프로퍼티를 제외한 오브젝트를 얻을 때
- 얕은 복사 : spread operator > Object.assign, 
- 특정 프로퍼티를 제외한 오브젝트를 얻을 때 : rest operator > delete 프로퍼티
```javascript
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
delete copy.a; // so does this

// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }

// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }

const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```
