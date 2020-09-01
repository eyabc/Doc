# Symbol

- ES6 추가된 새로운 primitive type
- 객체가 아닌 값으로 인식
- typeof 로 보면 Symbol 타입이 나온다.
- primitive 이지만 객체의 키로 사용할 수 있는 특징이 있다.
- Symbol.iterator 는 이터레이터 오브젝트를 생성하면서 반환한다.
- 오브젝트의 [Symbol.iterator]를 호출하면 이터레이터 오브젝트를 생성하여 반환한다.
- 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용한다.

Symbol() 로 부터 반환되는 모든 심볼 값은 고유하다.
- 심볼 데이터 형식의 유일한 목적     
: 심볼 값은 객체 프로퍼티에 대한 식별자로 사용한다.

평소에는 거의 쓸일이 없다. 그러나 자바스크립트 내부적으로는 상당히 많이 쓰이며 알아두면 유용한 경우도 있다.

- 라이브러리를 제작할 때, 
    - 정확한 심볼이 아니면 조회가 불가능하기 때문에 다른 사용자가 악용할 여지도 없다.
    - 네이밍이 충돌해서 문제가 생길여지도 없다.
```javascript
const sb = Symbol('creator');
const obj = {
    [sb]: 'zerocho',
    a: 1,
    b: 2
}
obj.creator;    // undefined
obj[Symbol('creator')]; // undefined
obj[sb];    // 'zerocho'
```
iterator 에서 symbol 은 표시되지 않는다.
```javascript
Object.keys(obj)    // [a, b] 
```

Reference
--
* https://feel5ny.github.io/2019/02/03/JS_19/
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Zerocho](https://www.zerocho.com/category/ECMAScript/post/58ef98a6177375001892f891)
