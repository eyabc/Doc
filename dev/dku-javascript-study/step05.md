# Step05

## Iterator
Iterator 과 Iterable 의 구분에 대해 더 잘 알필요가 있다고 생각합니다.

### by 정웅
- NodeLists 도 iterable 이다.
```javascript
const nodeLists = document.querySelectorAll('*'); 

[...nodeLists];

for (const v of nodeLists) {
    console.log(v)
}
```

- 생성자 함수는 yield 키워드를 만날때 까지 실행된다. 
```text
Generator 는 next 메소드를 통해 호출되면 어떤 값이 소비되고 생성자 함수는 yield 키워드를 만날때 까지 실행된다.
```

### to 정웅
Q. 'value 값과 done 값이 모두 참이 되면' 문구가 애매 한 것 같습니다. value 가 참인 것을 어떻게 무슨기준으로 확인할까요? 
```
Iterator 란 Arrays, Strings, Maps, Sets, NodeLists 에 포함된 built-in Object 이다. 
Iterator 는 두 개의 속성 (value, done) 을 반환하는 next() 메소드를 사용하여 객체의 Iterator protocol 을 구현한다. 
마지막 값에 done 이 true 로 되는데 value 값과 done 값이 모두 참이 되면 Iterator 의 리턴 값이 된다.
```

Q. `done: false;` -> ; 객체 문법 오류가 있습니다
```javascript
let count = -1;
let movieIter = {
    // 이 객체 안에는 1개의 Symbol.iterator 프로퍼티가 있다.
    // Symbol 을 통해 iterator 의 Unique함을 보장할 수 있다.
    [Symbol.iterator]: function(movie){
        return {
            // next () 함수를 통해 순회하므로 next 를 구현 해준다.
            next: () => {
                count++;
                switch (count) {
                    case 0:
                        return {
                            value: movie.title,
                            done: false,
                        }
                    case 1:
                        return {
                            value: movie.year,
                            done: false,
                        }
                    case 2:
                        return {
                            value: movie.director,
                            done: false,
                        }
                    case 3:
                        return {
                            value: undefined, done: true
                        }
                    default:
                        return {
                            value: undefined, done: true
                        }
                }
            }
        }
    }
}

```
 

## Generator
### by 형욱
- 함수 표현식을 익명으로 하지 않아도 되는 것을 알게 되었습니다.
`let P=function* Problem() {... } `
    - [MDN 함수표현식](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/function)
       - 유명(named) 함수 표현식
           - 함수 몸통 안 쪽에서 현재 함수를 참고하고 싶을 때
           - name 속성을 가진다.
       - 익명 함수 표현식
### to 형욱
- 
```javascript
/*제너레이터 정리
function* 선언 (끝에 별표가 있는 function keyword) 은 generator function 을 정의하는데, 이 함수는 Generator 객체를 반환합니다.
 함수를 정의하는 방법은 함수 선언과 함수 표현식 2가지가 있다. => 함수를 정의하려면 2가지 방법을 써야한다.
 쓴이는 함수선언식으로도 시도를 해봤으나 이는 제대로 결과가 나오지않는것을 알수있다.
*/

function* NoProblem() {
    let i = 10;
    while (i<13) {
        yield i++;
    }
}
let NP =NoProblem();

let P=function* Problem() {
    let i = 10;
    while (i<13) {
        yield i++;
    }
}

console.log(typeof NP, typeof P());     //object object

console.log(NP.next()); //{ value: 10, done: false }
console.log(NP.next()); //{ value: 11, done: false }
console.log(P().next()); //{ value: 10, done: false }
console.log(P().next()); //{ value: 11, done: false }

console.log(NP);
console.log(P());

/* 맨아래 NP,P()의 결과를 보면
NoProblem {<suspended>}
__proto__: Generator
[[GeneratorLocation]]: example.js:4
[[GeneratorStatus]]: "suspended"
[[GeneratorFunction]]: ƒ* NoProblem()
[[GeneratorReceiver]]: Window
[[Scopes]]: Scopes[3]
0: Local (NoProblem) {i: 12}
1: Script {NP: NoProblem, P: ƒ}
2: Global {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
Problem {<suspended>}
__proto__: Generator
[[GeneratorLocation]]: example.js:9
[[GeneratorStatus]]: "suspended"
[[GeneratorFunction]]: ƒ* Problem()
[[GeneratorReceiver]]: Window
[[Scopes]]: Scopes[3]
0: Local (Problem) {i: undefined}
1: Script {NP: NoProblem, P: ƒ}
2: Global {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
이를 통해 i의 값이 NP는 12로 되어있고 P()는 undefined로 결과가 나오는 것을 통해 함수선언문으로는 불가능하다는 것을 알수있다. (비슷해보이지만)
따라서 Generator함수를 쓰기위해서는 함수 선언과 함수 표현식 2가지를 사용해야한다. (함수선언식으로는 정상적 next()사용이 어렵다 생각)
 */
```
      
A. 해석
1. case1
    ```javascript
    function* NoProblem() {
        let i = 10;
        while (i<13) {
            yield i++;
        }
    }
    let NP = NoProblem();
    
    NP.next(); // {value: 10, done: false}
    NP.next(); //{value: 11, done: false}
    NP.next(); // {value: 12, done: false}
    NP.next(); // {value: undefined, done: true}
    ``` 

2. case2
    ```javascript
    let P = function* Problem() {
        let i = 10;
        while (i<13) {
            yield i++;
        }
    };
    
    P().next(); // {value: 10, done: false}
    P().next(); // {value: 10, done: false}
    P().next(); // {value: 10, done: false}
    ```
   
case1 는 generator 함수를 호출해 받은 iterator 객체를 변수에다 할당하여 사용하기 때문에 하나의 공간을 사용한다.  
case2 는 `P().next();` 를 호출할 때마다, 공간을 새로 만들어서 쓰기 때문에, `P().next();` 들은 각각 다른 공간을 사용하는 것이다.
그리고 함수를 호출만 했기 때문에 statement 가 끝나면 공간이 사라지게 되는 것이다. 
  
따라서 아래와 같이 사용해야 한다.
```javascript
let p = P();    // 호출 후 P 가 반환하는 iterator 객체를 p 에 할당.
p.next(); // {value: 10, done: false}
p.next(); // {value: 11, done: false}
p.next(); // {value: 12, done: false}
p.next(); // {value: undefined, done: true}
```

### to 정웅
Q. 코드스피츠 들으면서 JS 엔진이 동작하는 것은 변화하기 때문에. 스코프 체인방식도 과거의 개념이며,      
    // return undefined 👉 JS 는 반환 값이 없으면 자동으로 undefined 를 반환   
    // 5) 에서 return 값이 반환 되면 done 이 true 로 바뀐다.     
여기에 있는 동작 방식의 내용도 과거의 동작 방식 일수 도 있다는 추측이 듭니다. 혹은 같은 말을 다르게 서술한 거라고 볼 수 있는데요.

제 글을 보면 아시겠지만, 코드스피츠 맹선생님이 설명하는 바로는 `{ done: false, value: 1 }` 이런 형태의 객체를 `IteratorResultObject` 
이라고 하는데, generator 루틴을 빠져나올 때 `{ done: true, value: undefined }` 를 반환한다고 하였습니다.

```javascript
// 1) genny 라는 generator 선언
// function * 👉 Generator 로 사용됨을 의미
function* genny() {
    yield 'a';
    yield 'b';
    // return undefined 👉 JS 는 반환 값이 없으면 자동으로 undefined 를 반환
}

// 2) genny 라는 generator 로 iter 라는 iterator 생성
// iterator 는 next 라는 built-in function 제공
let iter = genny();
console.log(iter.next()); // 3) { value 'a', done : false }
console.log(iter.next()); // 4) { value 'b', done : false }
console.log(iter.next()); // 5) { value : undefined, done : true }

// 5) 에서 return 값이 반환 되면 done 이 true 로 바뀐다.
```

### to 유림
Q. 
generator 함수를 호출할 때마다 iterator 가 만들어 진다.
하지만 generator 는 iterable 이 아닌데 iterator 객체를 반환 할 줄 안다.
for..of 를 쓸 수 없다.
하지만 generator 가 반환한 iterator 객체는 iterable 이기도 하다.
for..of 을 쓸 수 있다.

`Generator 함수는 iterable 객체를 반환하는 특별한 형태의 함수이다. `,
`Generator 함수를 호출하면 iterable 객체가 반환되고 `