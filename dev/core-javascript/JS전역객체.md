# JS의 전역 객체 [:link:](https://poiemaweb.com/js-global-object)
- 단 하나 유일
- 어떤 컨텍스트가 실행되기 전에 먼저 생성됨
- 내부적으로 생성자가 없기 때문에, new 를 이용해서 생성자로서 이용할 수 없다.
- window 객체는 글로벌로 선언하면 모두 프로퍼티로 갖는다.

## 전역 프로퍼티 (Global property)
### Infinity
양/음 의 무한대를 나타내는 숫자값

```text
window.Infinity // Infinity
3/0             // Infinity   
-3/0            // -Infinity
Number.MAX_VALUE * 2 // 1.7976931348623157e+308 * 2
typeof Infinity // number      
```

### NaN = Number.NaN
숫자가 아님을 나타내는 숫자값

```text
window.NaN      // NaN
Number('xyz')   // NaN
1 * 'string'    // NaN
typeof NaN      // Number
```

### undefined
원시타입 undefined 를 값으로 갖는다.
```text
window.undefined   // undefined
var foo;
console.log(foo)    // undefined
typeof undefined    // undefined
```

## 전역 함수 [:link:](./문법%20사전)
전역 객체의 메서드

### eval()
매개변수에 전달된 문자열 구문 또는 표현식을 평가 또는 실행

### isFinite()

### isNaN()

### parseFloat()

### parseInt()

### encodeURI() decodeURI()

### encodeURIComponent() decodeURIComponent()


