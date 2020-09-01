# Iteration 프로토콜

Iteration 프로토콜 에는 `iterable 프로토콜과` `iterator 프로토콜` 이 있다. 

![image](https://user-images.githubusercontent.com/31977543/89755996-369c4680-db1c-11ea-8af5-d6e295e1fce9.png)

## Loop
Loop 의 의미
- ES6 이전에는 단순 루프만 지원했지만, 현대 언어들처럼 풍부한 의미를 부여하도록 확장이 되었다.

## Interface In JS

[인터페이스](./interface.md)란?
## Iterator interface 
1. 키: `next`
1. 값: `IteratorResultObject` 를 반환하는 함수
    - 인자가 없다.
    - IteratorResultObject interface
        - 키 : `value` 와 `done`
        - `done`(boolean) : 반복 가능 여부
        - `{ done: true, value: undefined }` done 이 true 일때 value: undefined 가 정의됨
1. 예시
    ```javascript
    {
        next(){
            return { value: 1, done: false }
        }
    }
    ```
   ```javascript
   {
       data: [1, 2, 3, 4],
       next() {
           return {
               done: this.data.length == 0,
               value: this.data.pop()
           }
       }
   }
    ```

## Iterable 프로토콜

### Iterable Object
- 반복 가능한 객체
- ES6
- Symbol.iterator 속성이 있다.
    - 객체 속성 Symbol.iterator 에 특별한 형태의 함수가 들어 있다.
        ```javascript
        const str = 'hello';
        str[Symbol.iterator];     // [Function] 
      
        const num = 2;
        num[Symbol.iterator];     // undefined
        ```    
    - iterable protocol 을 만족하는 객체이다.

### Iterable Interface
[Symbol](./Symbol.md)

1. 키: Symbol.iterator
    - 오브젝트의 [Symbol.iterator]를 호출하면 이터레이터 오브젝트를 생성(?)하여 반환한다.
    
1. 값: 함수
    - 인자 없음 
    - `Iterator Object` 를 반환
    
```javascript
{
  [Symbol.iterator]() {
    return {
      next(){
        return {value: 1, done: false}
      }
    }
  }
}
```
       

목표: `for(let num of range) ... num=1,2,3,4,5` 동작 
```javascript
let range = {
  from: 1,
  to: 5
};
```
1. `for..of` 가 시작되자마자 `for..of` 는 `Symbol.iterator` 를 호출한다. 
    - `Symbol.iterator` 가 없으면 에러 발생
    - iterator (메서드 `next` 가 있는 객체) 를 반환해야 한다.
1. `for..of` 는 `next()` 이터레이터 메서드를 호출하여 다음값을 사용합니다.
    - `next()` 의 반환값 의 형태 `{ done: Boolean, value: any }`
    - `done = true` 반복 종료
    - `done = false`, value 에 다음 값 저장
    
```javascript
range[Symbol.iterator] = function() {
    return {
        current: this.from,
        last: this.to,
        next() {
            if (this.current <= this.last) 
                return { done: false, value: this.current++ };
            else 
                return { done: true };
        }
    }
}
```

### 관심사의 분리 SoC, Separation of concern
- `range[Symbol.iterator]()` 를 호출해서 만든 이터레이터 객체와, 
이 객체의 메서드 `next()` 에서 반복에 사용될 값을 만들어 낸다.

```javascript
let range = {
    from: 1,
    to: 5,
    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },
    next() {
        if (this.current <= this.to) 
            return { done: false, value: this.current++ };
        else
            return { done: true };
    }
}
```
- `range[Symbol.iterator]()` 가 객체 `range` 자체를 반환한다. 

### Iterable 의 필요성
iterator 만 있으면 되지 않을까 왜 iterable 이 필요하지? 

#### 1. reset 타이밍
iterator 만 있는 경우,
```javascript
{
   data: [1, 2, 3, 4],
   next() {
       return {
           done: this.data.length == 0,
           value: this.data.pop()
       }
   }
}
```
한번 loop 를 돌고나면 done: true 일때, 다시는 못쓰는 객체가 된다.   
만약, 여기서 데이터의 사본을 만든 후, 사본에게 loop 를 돈다고 가정하면.        
reset 만 하면 여러번 돌 수 있게 된다.   
 
loop 를 돌 수 있는 reset 타이밍을 iterable 이 기능해 줄 수 있다.

- [iterator pattern](../design-pattern/iterator%20pattern.md)

#### 2. 안정적인 코딩
while, for, do..while 을 쓰지 않고 iterable 을 쓰는 이유

- statement : 문
    - 엔진한테 주는 힌트
    - 실행을 하고나면 흔적도 없이 사라진다.
- expression : 값, 식 
    - 메모리에 남는다.
    - 계속 참조가능하다.
    
while, for, do..while 은 statement 이기 때문에 사용 후 사라진다. 두번다시 반복시킬 수 없기 때문에 
for 문을 여러번 써야 한다. 

현대 언어의 패러다임은 statement 를 제거하고 expression 으로 바꿔버리는 것이다.
그 방법으로는 모든 statement 를 함수 안에 집어넣는 방법이 있다.

```javascript
let arr = [1, 2, 3, 4]; 
while (arr.length > 0) {
    console.log(arr.pop());
}
```
```javascript
while (`계속 반복할지 판단`) {
    `반복시마다 처리할 것`
}
```
iterator interface
```javascript
{
    arr: [1, 2, 3, 4],
    next() {
        return {
            done: this.arr.length == 0, // 계속 반복할 지 판단
            value: console.log(this.arr.pop())  // 반복시마다 처리할 것
        }
    }
}
```

##### self description
- 객체 메서드가 조건과 실행을 담당한다.
    1. 반복자체를 하지는 않지만
    1. 외부에서 반복을 하려고 할 때
    1. 반복에 필요한 조건과 실행을
    1. 미리 준비해 둔 객체
    
- 반복행위(next())와 반복을 위한 준비(self description)를 분리
 
객체가 안정적인 이상은 똑같은 loop 가 일어나게 될 것이다.
> 알고리즘 문제 풀때 느끼는 거지만 문제가 복잡해 질 수록 for while 문을 짜는것과 디버깅을 해도 해석하는것이 어려워 진다..

만약 3차원 방정식, 피봇테이블을 만들 때 for 문으로 여러번 계속 만들때 얼마나 정확하게 짤 수 있나? 
하지만 Iterator 라면 몇번이라도 반복해도 안정적으로 될 것이다. 

### Iterable 과 유사배열
- iterable 객체
- array-like
- iterable && array-like
    - 문자열

둘다 배열이 아니라는 공통점이 있으므로 pop, push 메서드를 쓸 수 없다.

#### Iterable
Symbol.iterator 가 구현된 객체.

#### 유사 배열 array-like
`index` 와 `length` 프로퍼티가 있어서 배열처럼 보이는 객체

#### Array.from
Iterable 이나 array-like 를 진짜 `Array` 로 만들어 준다.

Syntax `Array.from(obj[, mapFn, thisArg])`

```javascript
let arrayLike = {
  0: "Hello",
  1: "World",
  length: 2
};
let arr = Array.from(arrayLike); // (*)
```
![image](https://user-images.githubusercontent.com/31977543/89784482-b72a6980-db53-11ea-9dcf-946dad434cb8.png)

```javascript
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (배열-문자열 형 변환이 제대로 동작합니다.)
```

```javascript
let arr = Array.from(range, num => num * num);
alert(arr); // 1,4,9,16,25
```

str 를 분해해 글자가 담긴 배열로 만듦
```javascript
let str = '𝒳😂';
let chars = Array.from(str);
```
와 동일하다.
```javascript
let chars = []; // Array.from 내부에선 아래와 동일한 반복문이 돌아갑니다.
for (let char of str) {
  chars.push(char);
}
```
```javascript
alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

### Iterable 객체를 만들어 내는 내장 생성자
- String
- Array
- TypedArray
- Map
- Set


```javascript
// `for...of`
for (let c of "hello") {
  console.log(c);
}

// spread 연산자
const characters = [..."hello"];
//[ 'h', 'e', 'l', 'l', 'o' ]

// 분해대입
const [c1, c2] = "hello";
console.log(c1); // h

// `Array.from`은 iterable 혹은 array-like 객체를 인수로 받습니다.
Array.from("hello");

// split 방법
const characters1 = "hello".split("");
```

### 명시적으로 Iterator 호출하기
이 경우는 거의 없지만. 반복을 시작했다가 작업을 잠시 멈추고 다른 작업을 했다가 복귀할 수 있다.
```javascript
let str = "Hello";
let iterator = str[Symbol.iterator]();

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // 글자가 하나씩 출력됩니다.
}
```

## 사용자 반복 처리기
직접 Iterator 반복 처리기를 구현

```javascript
const loop = (iter, f) => {
    // iterable 검증 + iterator Result Object 도 검증해야 한다. in 으로 value 와 done 이 있는지 검증 
    if (typeof iter[Symbol.iterator] == 'function') {
        iter = iter[Symbol.iterator]();
    } else return;

    // IteratorObject 가 아니라면 건너뜀
    if (typeof iter.next != 'function') return; 

    // 루프 처리기 : 돌리는 행위만 할 수 있다.
    do {
        const v = iter.next();
        if (v.done) return; // 종료처리
        f(v.value); // 현재 값을 전달함
    } while(true)
}
```
```javascript
const iter = {
    arr: [1, 2, 3, 4],
    [Symbol.iterator]() {return this;},
    next() {
        return {
            done: this.arr.length == 0,
            value: this.arr.pop()
        }
    }
}
loop(iter, console.log);
```

## 내장 반복 처리기
iterable 객체를 사용하면 이런 문법적인 혜택을 누릴 수 있다.

- for ... of 루프
- spread 연산자
- 분해 대입
- 기타 iterable 을 인수로 받는 함수

```javascript
const iter = {
    arr: [1, 2, 3, 4],
    [Symbol.iterator]() {return this;},
    next() {
        return {
            done: this.arr.length == 0,
            value: this.arr.pop()
        }
    }
}
```

### 배열 해체 Array destructuring -> 변수
```javascript
const [a, ...b] = iter;
console.log(a, b);  // 4, [3, 2, 1]
```

### 펼치기 Spread -> 배열
```javascript
const a = [...iter];    // [ 4, 3, 2, 1]
```

### 나머지 인자 Rest Parameter
```javascript
const test = (...arg) => console.log(arg);
test(...iter);  // [4, 3, 2, 1]
```

### For of
```javascript
for(const v of iter) {
    console.log(v);
}
```

## 예제
브라우저에서는 frame 단위로 시간 제약(유효 blocking time)을 갖는다.
긴 루프들은 시간제약이 발생하기 때문에 loop 를 상세하게 나누어서 돌린다.
그리고 무한 루프를 돌면 브라우저가 죽을 수 있으니, max 값을 항상 설정해 주어야 한다.
(보통, OS 가 브라우저가 무한정적으로 blocking 하지 않도록 시간을 제한하기 때문에, 브라우저가 죽게 된다.)

>  참조되는 외부 함수의 지역변수를 (함수입장에서는) 자유변수 free variable 라고 한다.   
함수가 자유변수에 갖히면 다 클로저가 된다. ( ???)    
스코프 개념이나 이런것들은 js 엔진 3.1 버전 (?) 다 옛날거다. js 엔진은 항상 바뀐다. 그래서 cs 적인것을 아는것이 더 좋다.

> <자바와 자바스크립트의 자유변수 차이점>  
> 자유변수의 개념은 어떤 언어든 많이 가지고 있지만, 작동방법이 다 다르다. 심지어 자바스크립트 엔진의 버전별로도 작동방법이 다르다. 
> - 자바: readonly
> - 자바스크립트 : writable 
>   - 그래서 자바보다는 자바스크립트에서 iterator 개념이 더 쓰일 수 있는것
>   - 자바스크립트는 함수가 태어나는 순간 자유변수를 캡쳐한다. 
>   - 자유 변수의 레벨을 함수의 다단계 껍데기 에서도 인식할 수 있다.      
> 스코프 체인은 알필요 없고, 이런 내용만 알면 된다.


1. 제곱을 요소로 갖는 가상 컬렉션
```javascript
const N2 = class {
    constructor(max) {
        this.max = max;     
    }
    [Symbol.iterator] () {
        let cursor = 0, max = this.max;
        return {
            done: false,
            next() {
                if (cursor > max)
                    this.done = true;
                else {
                    this.value = cursor * cursor;
                    cursor++; 
                }
                return this;
            }       
        }
    }
}

```
```javascript
console.log([...new N2(5)]); // [0, 1, 4, 9 ,16]
for (const v of new N2(5)) {
    console.log(v);
}   // 0 // 1 // 4 // 9 // 16
```

사용하는 쪽은 단순하게 사용할 수 있지만, 공급하는 쪽이 너무 그지같이 인터페이스를 지켜야 할 것이 많아 코드량이 많다.

그것이 Generator 의 첫번째 임무!

## Generator 함수
- ES6
- 비동기 함수의 호출 차단 등에 유용하다. (TODO REDUX SAGA)

위의 코드를 generator 로 만들어 보자. 
```javascript
const generator = function* (max) {
    let cursor = 0;
    while(cursor < max) {
        yield cursor * cursor;
        cursor++;
    }
}
```

### generator 함수의 정의
`*` generator 함수를 만들어 내는 literal

> literal : {함수, 숫자, 문자열...} 를 만들어 내는 최소한의 표현. 더이상 분해되지 않는다

generator 함수 선언하기
```javascript
function* gen1() {
  // ...
}
```
표현식으로 사용하기
```javascript
const gen2 = function*() {
  // ...
};
```
메소드 문법으로 사용하기
```javascript
const obj = {
  *gen3() {
    // ...
  }
};
```

### generator 와 iterator, iterable 
#### 배열
`iterable` 이자 `iterator` 객체

- Symbol.iterator 를 호출해 보면 Array 가 나온다.
- 배열이 next() 라는 메서드를 갖고 있다.    
(배열도 object 이기 때문에 메서드를 가질 수 있다)
- 배열 자체가 iterator 이기도 한 것이다.  

#### N2 클래스
next 의 값은 `iterator` 이자 `iteratorResultObject` 이다.

#### generator `함수를 호출`할 때마다 `iterator` 가 만들어 진다. 
- 하지만 `generator` 는 iterable 이 아닌데 `iterator 객체를 반환` 할 줄 안다.
    - for..of 를 쓸 수 없다.
- 하지만 generator 가 반환한 `iterator 객체`는 `iterable` 이기도 하다.
    - for..of 을 쓸 수 있다.

---
### yield 키워드
yield 를 호출할 때마다 마치 next() 가 반환 되는 것과 똑같은 효과를 기대할 수 있다.      
위의 예제에서 `{ done: false, value: 1 }` 를 만들어서 바깥쪽에 보내주고 `정지(Suspension)`한다.
while 문이 멈추는 대단한 일이 일어난 것이다. 
다시 돌아오면 `cursor++` 에서 실행된다. 

#### Suspension
javascript 는 `statement` 를 하나를 `record` 로 만들고,  
special record 를 이용해서 제어문을 반환한다.     
그리고 `record 를 가상머신을 이용해 돌리고 있는 상태`이다.     
만약 `yield` 키워드를 만나면 `가상머신을 멈추는 Suspension` 이 일어난다.      
Suspension 이 발생할 때마다 `IteratorResultObject 를 리턴`해 준다.

- `루틴` 똑같은 문장을 여러번 시킬 수 있는 함수 블럭   
- `코루틴` generator, 여러번 한 루틴을 반복해서 사용할 수 있다.

---
### Iterator 와 Generator 문법적 차이
#### 1. go & stop 제어권
- iterator : 외부에서 결정
- generator : 내부에서 결정, 외부에서는 `요청` 만 한다.

#### 2. IteratorResultObject done & value 
- generator 는 generator 루틴을 빠져나올 때 `done: true`. 이외에는 모두 false

#### 3. Generator 의 반환값은 iterator 이자 iterable
reset 가능. 내장 문법 사용가능
```javascript
console.log([...generator(5)]); 
for (const v of generator(5)) { // reset 되어 v 의 값이 출력된다.
    console.log(v);
}
```
cf. 변수에 할당된 generator 는 reset 기능을 가질 수 없는가? 
```javascript
const iter = generator(5);

for (let n of iter) {
  // 잘 출력됩니다.
  console.log(n);
}
for (let n of iter) {
  // `iter`는 한 번 사용되었으므로, 이 코드는 실행되지 않습니다.
  console.log(n);
}
```

#### 4. 상태 관리요소
- Iterator : 자유변수 혹은 프로퍼티
- Generator : 지역변수
---
### 형태
iterable 의 기능을 사용할 때 yield 키워드 뒤에 있는 값들을 순서대로 넘겨준다.
```javascript
function* numberGen() {
  yield 1;
  yield 2;
  yield 3;
}

// 1, 2, 3이 순서대로 출력됩니다.
for (let n of numberGen()) {
  console.log(n);
}
```

`yield` 다른 generator 함수에서 넘겨준 값을 대신 넘길 수 있다.
```javascript
function* numberGen2() {
  yield* numberGen();
  yield* numberGen();
}

// 1, 2, 3, 1, 2, 3이 순서대로 출력됩니다.
for (let n of numberGen2()) {
  console.log(n);
}
```

### 사용
함수에서 할 수 있는 일이라면 generator 함수 안에서도 모두 할 수있다.
```javascript
// 등차수열 생성하기
function* range(start = 0, end = Infinity, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

// 피보나치 수열 생성하기
function* fibonacci(count = Infinity) {
  let x = 1;
  let y = 1;
  for (let i = 0; i < count; i++) {
    yield x;
    [x, y] = [y, x + y];
  }
}

// 하나의 항목을 계속 넘겨주기
function* repeat(item, count = Infinity) {
  for (let i = 0; i < count; i++) {
    yield item;
  }
}

// 여러 요소를 반복해서 넘겨주기
function* repeatMany(array) {
  while (true) {
    for (let item of array) {
      yield item;
    }
  }
}
```

### Generator 함수 내부에서 정의된 일반 함수
yield 키워드를 사용할 수 없다.

```javascript
function* gen2() {
  // 아예 문법 오류가 납니다. (Unexpected token)
  function fakeGen() {
    yield 1;
    yield 2;
    yield 3;
  }
  fakeGen();
}
```

Generator 는 끊임 없는 놈이다.
이번 시간에는 generator 의 iteration 를 배운것이다. 

Reference
---
* https://feel5ny.github.io/2019/02/03/JS_19/
* https://ko.javascript.info/iterable
* https://gitlab.com/siots-study/topics/-/wikis/Iterable
* https://www.youtube.com/watch?v=xTaCosid1-k