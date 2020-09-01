# this 
* KoJS[:link:](https://ko.javascript.info/object-methods)
* MDN[:link:](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

`현재 실행 문맥`을 가리킴
- 실행 문맥은 함수 `호출` 방법에 의해 결정된다.

## 런타임에 결정되는 this 의 장단점
장점
- `함수(메서드)`를 하나만 만들어 `여러 객체`에서 `재사용`할 수 있다.

단점
- this 의 유연함이 실수로 이어질 수 있다.

## 전역 문맥
엄격 모드 여부에 관계없이 전역 객체를 참조한다.
```javascript
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b)  // "MDN"
console.log(b)         // "MDN"
```
 
## 함수 문맥
함수 내부에서 this 는 함수 호출 방법에 결정된다.

### 함수 단순 호출
#### 비엄격모드
```javascript
function f1() { return this; }
// browser
f1() === window;

// Node.js
f1() === global;
```
#### 엄격모드
즉 함수를 객체의 메서드나 속성(window.f2())이 아닌 직접 호출했기 때문에 `undefined` 이다.
```javascript
function f2() {
    'use strict';
    return this;
}
f2() === undefined;
```

#### call(), apply()
`this 의 대상 변경`, this 값을 한 문맥에서 다른 문맥으로 넘길때 사용한다. 
- `첫 번째 인자`로 `객체`가 전달 될 수 있으며 `this 가 그 객체에 묶임`.

```javascript
var obj = { a: 'Custom' };

var a = 'Global'; // 전역
function whatsThis() {
    return this.a;  // 호출 방식에 따라 값이 달라짐
}
whatsThis();            // 초기 값을 global/window 객체로 초기값 설정
whatsThis.call(obj);    // 함수 내에서 obj 로 설정
whatsThis.apply(obj);   // 함수 내에서 obj 로 설정
```

##### 함수호출 인수
- call 의 두번째 인수 부터 `이어지는 인자`
- apply 의 `두 번째 배열 인자`
```javascript
function add(c, d) {
    return this.a + this.b + c + d;
}
var o = {a: 1, b: 3};
add.call(o, 5, 7);
add.apply(o, [10, 20]);
```

`비엄격 모드`에서 `this` 로 전달된 값이 `객체가 아닌 경우`, `call apply 는 이를 객체로 변환`합니다.
- `null` `undefined` 값은 `전역 객체`가 된다.
- `원시 값`은 관련 `생성자`를 사용해 `객체로 변환`된다.
```javascript
function bar() {
  console.log(Object.prototype.toString.call(this))
}
function far() {
    console.log(this)
}
bar.call(7);            // [object Number] when far() Number {7}
bar.call('foo');        // [object String] when far() String {"foo"}
bar.call(undefined);    // [object global] when far() Window {parent: Window, opener: null, top: Window, length: 1, frames: Window, …}
```

### bind 메서드
`Function.prototype.bind`

- f.bind(someObject) 호출하면 this 는 `원본 함수를 가진 새로운 함수를 생성`한다.
- `새 함수의 this` 는 `호출방식과 상관없이 영구적인 bind()의 첫번째 매개변수로 고정`된다.
즉, bind 는 `한번만 동작`한다.
```javascript
function f() {
    return this.a;
}
var g = f.bind({a: 'azerty'});
console.log(g());   // azerty

var h = g.bind({a: 'yoo' });    // bind는 한번만 동작한다.
console.log(h());   // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty
``` 

### 함수 빌림
함수는 객체를 바탕으로 작동한다.

`빌릴함수.call(현재 객체)`

#### 함수.arguments
유사 배열이므로 배열 메서드를 사용할 수 없다.

대신

`Array.prototype.join.call(arguments))` 처럼 배열 메서드를 빌려쓸 수 있다.

### 프로퍼티 빌림
자식 생성자 안에서 부모생성자의 프로퍼티를 가져오는것.

부모 생성자의 프로퍼티 실행 `부모생성자.call(this, 부모 프로퍼티)`
- 부모 생성자를 호출하는 동시에 객체를 자식 생성자의 객체의 this 로 설정




### 화살표 함수
화살표 함수에서 this 는 자신을 `감싼 정적 범위(lexical context)` 이며, (생성시점)
전역 코드에서는 전역 객체를 가리킨다.
```javascript
var globalObject = this;
var foo = (() => this);
console.log(foo() === globalObject); // true;
```
---
화살표 함수를 `call, bind, apply` 를 사용해 호출해도 `무시`된다.
```javascript
var obj = { func: foo };
console.log(obj.func() === globalObject); // true;

console.log(foo.call(obj) === globalObject);    // true;

foo = foo.bind(obj);
console.log(foo() === globalObject);    // true
```
---
`this 를 반환하는 화살표 메서드 bar` 로 갖는 `obj 객체`.  
`obj.bar 에 할당된 익명함수 A` 와, `화살표 함수로 생성된 익명함수 B`가 있다면  
`B 함수가 호출될 때` `B의 this 는 영구적으로 함수 A의 this 로 설정`된다.

```javascript
var obj = {
    bar: function() {
        var x = (() => this);
        return x;
    }
};
```
---
bar() 의 this 는 obj
```javascript
var fn = obj.bar();
console.log(fn() === obj);  // true
```
---
호출 없이 obj 메소드 참조
```javascript
var fn2 = obj.bar;
```


화살표 함수의 this 를 bar 메서드 내부에서 호출하면 fn2의 this 를 따르므로 window 를 반환한다.
```javascript
console.log(fn2()() === window); // true
```

### 객체의 메서드로서 함수
익명함수는 o 객체의 프로퍼티에 할당된 메서드
```javascript
var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
};
```
`객체의 메서드로 함수를 호출`하면 `함수의 this 값은 그 객체`를 사용한다.
```javascript
console.log(o.f()); // 37
```
---
```javascript
var o = { prop: 37 };
function independent() {
    return this.prop;
}
o.f = independent;
console.log(o.f())  // 37
```
---
`가장 즉각적인 멤버 대상의 영향을 받는다`. 실행동안 this 는 o.b 이다. o.b 의 prop 은 42.
```javascript
o.b = {g: independent, prop: 42};
console.log(o.b.g())    // 42
```

#### 객체의 프로토타입 체인에서의 this
`메서드를 가짐 x, 프로토 타입으로 상속 받음 o`  

메서드가 어떤 객체의 프로토타입 체인 위에 존재하면, 
this 의 값은 그 객체가 메서드를 가진 것 마냥 설정된다.

```javascript
var o = {
    f: function() { return this.a + this.b; }
}
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
변수 p에 할당된 객체는, f 속성을 가지고 있지 않지만, 프로토타입으로 부터 상속 받는다.
p.f 를 찾아 참조하기 시작하므로, 함수 내부의 this 는 p 처럼 나타내는 객체 값을 취한다.

#### 접근자와 설정자의 this
[함수의 접근자와 설정자](./객체.html#객체-프로퍼티-설정) 로 사용될 함수 sum 의 this
```javascript
function sum() {
  return this.a + this.b + this.c;
}
```
---
접근자 프로퍼티 설명자 get 사용된 average 함수
```javascript
var o = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
        return (this.a + this.b + this.c) / 3;
    }
};
```
---
접근자 프로퍼티 설명자 get 으로 사용된 sum 함수
```javascript
Object.defineProperties(o, 'sum', {
    get: sum, enumerable: true, configurable: true
});
```
---
`접근자 프로퍼티 설명자(get, set) 의 함수의 this` 는, `접근하거나 설정하는 속성을 가진 객체로 묶인다.`
```javascript
console.log(o.average, o.sum);  // 2, 6
```

### 생성자로서 함수
`함수를 new 키워드`와 함께 `생성자`로 사용하면 `this` 는 `새로 생긴 객체`에 묶인다.  

#### 생성자의 반환 값
1. `객체가 아닌 경우`에는, `기본값에 의해 참조되는 객체를 반환`한다.  
```javascript
function C() {
    this.a = 37;
}
var o = new C();
console.log(o.a);   // 36
```
2. `객체일 때`, `다른 객체를 반환` 할 수 있습니다.
```javascript
function C2() {
    this.a = 37;
    return { a: 38 };
}
o = new C2();
console.log(o.a);   // 38
```

### DOM 이벤트 처리기로서 함수
`this` 는 `이벤트를 발사한(시작된, 유발된) 요소`로 설정된다.
- `addEventListener()` 에서만 따르는 규칙.

```javascript
// 처리기로 호출하면 관련 객체를 파랗게 만듦.
function bluify(e) {
    // 항상 true
    console.log(this === e.currentTarget);
    // currentTarget과 target이 같은 객체면 true
    console.log(this === e.target);
    this.style.backgroundColor = '#A5D9F3';
}
// 문서 내 모든 요소의 목록
var elements = document.getElementsByTagName('*');

// 어떤 요소를 클릭하면 파랗게 변하도록 bluify 를 클릭 처리기로 등록
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', bluify, false);
}
```
TODO 'EventListener와 target에 대한 내용은 이벤트 버블링에서 다룬다.'

---
this 는 window 객체아 가닌 body 객체가 된다.
이벤트 발생시 내부적으로 바뀌기 때문이다.
그러나 함수의 내부 함수의 this 는 다시 window 이다. 
내부 함수의 this 를 외부 함수의 this 인 body 와 같게 하려면 내부함수를 화살표함수로 표현하면 된다.
혹은 this 를 외부함수의 변수로 저장하고 내부함수에서 스코프를 사용해서 사용할 수 있다. 
```javascript
document.body.onclick = function () { this }
```


### 인라인 이벤트 핸들러에서 함수
1. 가장 바깥쪽 코드  
this 는 `처리기를 배치한 DOM 요소`로 설정된다.

경고창은 'button' 을 보여준다.
```html
<button onclick="alert(this.tagName.toLowerCase());">
    this 표시
</button>
```

2. 내부함수 this  
IIFE 으로 실행된 함수의 this 는 `전역/window 객체`를 반환한다.(비엄격모드)
```html
<button onclick="alert((function() { return this; })());">
    내부 this 표시
</button>
```

## 객체 리터럴에서 this 사용하기
this 의 값은 전체 함수가 된다. `코드 블록과 객체 리터럴은 영향을 주지 않는다.`
즉, ref: `this` 는 `함수의 현재 this 값`을 가져온다.
```javascript
function makeUser() {
    return {
        name: "John",
        ref: this,
    }      
}
```
호출시점에 this 가 undefined 로 결정 되었다.  
메서드로 호출 된 것이 아니라, 함수로써 호출 되었기 때문이다.
```javascript
let user = makeUser();
```
this 가 undefined 이므로, 에러가 발생
```javascript
alert(user.ref.name);   // Error: Cannot read property 'name' of undefined
```
객체 리터럴을 사용하지 않은 this 도 같은 결과이다.
```javascript
function makeUser() {
    return this;
}
alert(makeUser().name); // Error: Cannot read property 'name' of undefined
```
---
user.ref() 가 메서드가 되고, this 는 앞의 객체를 가리키기 때문에 에러가 발생하지 않는다.
```javascript
function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        }
    }
}
let user = makeUser();
alert(user.ref().name) // John
```

## 계산기 만들기
```javascript
let calculator = {
    sum () {
        return this.a + this.b;
    },
    mul () {
        return this.a * this.b;
    },
    read () {
        this.a = + prompt();
        this.b = + prompt();
    }
};
calculator.read();
alert(calculator.sum());
alert(calculator.mul());
```

## 체이닝
```javascript
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        alert(this.step);
        return this;
    }
}
ladder.up().up().down().up().down().showStep(); // 1
```