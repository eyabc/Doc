
## Computer Science 의 loop
   
### 1. Iteration loop

### 2. Recursion 
- 어딘가로 이동하면 그 다음으로 이동할 포인터가 있을 때 
- 이미 구조가 있는 것을 순회하는 것 
     
### CoRecursion 
- recursion 의 반대
- 이미 만들어있는 구조를 순회하는 것이 아니라, 작은 힌트로부터 구조를 만들어낸다
- range(1, 10) 
- 제너레이터의 목적
 
## Async Iterator
- `Symbol.iterator` 대신, `Symbol.asyncIterator`
- `next()` 는 Promise 를 반환
- `for await (let item of iterable)` 반복문
 
```javascript
let range = {
from: 1,
to: 5,

// for await..of 최초 실행 시, Symbol.asyncIterator가 호출됩니다.
[Symbol.asyncIterator]() { // (1)
 // Symbol.asyncIterator 메서드는 이터레이터 객체를 반환합니다.
 // 이후 for await..of는 반환된 이터레이터 객체만을 대상으로 동작하는데,
 // 다음 값은 next()에서 정해집니다.
 return {
   current: this.from,
   last: this.to,

   // for await..of 반복문에 의해 각 이터레이션마다 next()가 호출됩니다.
   async next() { // (2)
     //  next()는 객체 형태의 값, {done:.., value :...}를 반환합니다.
     // (객체는 async에 의해 자동으로 프라미스로 감싸집니다.)

     // 비동기로 무언가를 하기 위해 await를 사용할 수 있습니다.
     await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

     if (this.current <= this.last) {
       return { done: false, value: this.current++ };
     } else {
       return { done: true };
     }
   }
 };
}
};

(async () => {
 // next() 는 promise 를 반환하기 때문에 result 를 얻기 위해 await 를 붙여주어야 한다.
for await (let value of range) { // (4)
 alert(value); // 1,2,3,4,5
}

})()
```

... spread operator     
`alert( [...range] ); // Symbol.iterator가 없기 때문에 에러 발생`

Reference & Comment
--
- https://gitlab.com/siots-study/topics/-/wikis/asyncronous
- https://www.youtube.com/watch?v=JaHlR1IGLN8&list=PL7jH19IHhOLMmmjrwCi7-dMFVdoU0hhgF
- https://helloworldjavascript.net/pages/285-async.html
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
- https://ko.javascript.info/async
- https://ko.javascript.info/generators-iterators
- https://www.bsidesoft.com/8325
- https://www.bsidesoft.com/6037     