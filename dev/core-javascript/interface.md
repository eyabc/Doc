# Interface
ECMAScript 공식문서

JS 는 정적언어처럼 interface 를 강제하는 수단은 없지만, 기술문서에 기록되어 있다.
그리고 JS 엔진들은 기술문서를 따르기 때문에. 구속력을 가지고 있다.

## 명세
1. 인터페이스란 사양에 맞는 값과 연결된 속성 키의 세트
1. 어떤 Object 라도 인터페이스의 정의를 충족시킬 수 있다.
1. 하나의 Object 는 여러 개의 인터페이스를 충족시킬 수 있다.
1. 인터페이스의 반환값의 타입도 정할 수 있다
   
    
## 예제
1. test 라는 키를 갖고
1. 값으로 문자열인지를 1개 받아 boolean 결과를 반환하는 함수

인터페이스를 만족하는 예
```javascript
{
    test(str){ return true; }
}
```


Reference
--
* https://feel5ny.github.io/2019/02/03/JS_19/
* https://www.youtube.com/watch?v=xTaCosid1-k
