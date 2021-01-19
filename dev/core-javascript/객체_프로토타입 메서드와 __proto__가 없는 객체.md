# 프로토타입 메서드와 __proto__가 없는 객체

## 프로토타입 설정 방법
- `__proto__` 
    - 브라우저를 대상으로 개발하고 있다면 다소 구식이기 때문에 더는 사용하지 않는 것이 좋다.
- `Object.create(proto, [descriptors])`
    - `[[Prototype]]` 이 `proto` 를 참조하는 빈 객체를 만듦.
- `Object.getPrototypeOf(obj)`
    - `obj` 의 `[[Prototype]]` 을 반환
- `Object.setPrototypeOf(obj, proto)`
    - `obj` 의 `[[Prototype]]` 이 `proto` 가 되도록 설정함.
    
* 프로토타입을 그때 그때 바꾸는 연산은 객체 프로퍼티 접근 관련 최적화를 망치기 때문에 매우 느리다. 

```javascript
let animal = {
  eats: true
};

// 프로토타입이 animal인 새로운 객체를 생성합니다.
let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
alert(rabbit.eats); // true

alert(Object.getPrototypeOf(rabbit) === animal); // true

Object.setPrototypeOf(rabbit, {}); // rabbit의 프로토타입을 {}으로 바꿉니다.
```
 
## '아주 단순한' 객체
`__proto__` 
- 객체에 key 로 사용할 수 없다.
- 객체의 프로퍼티가 아니라 `Object.prototype` 의 접근자 프로퍼티
    - `[[Prototype]]`을 가져오거나 설정합니다.
    ![image](https://user-images.githubusercontent.com/31977543/95867716-6d087300-0da4-11eb-8afc-9702ffb7ff9d.png)

`__proto__` 를 키로 사용하는 트릭 `Object.create(null)`
- very plain, pure dictionary 객체
- 내장 메서드가 없다.
```javascript
// __proto__ 의 getter setter 를 상속 받지 않음.
let obj = Object.create(null);

let key = prompt("입력하고자 하는 key는 무엇인가요?", "__proto__");
obj[key] = "...값...";

alert(obj[key]); // "...값..."이 제대로 출력됩니다.

alert(obj); // Error: Cannot convert object to primitive value (toString이 없음)
```
![image](https://user-images.githubusercontent.com/31977543/95868208-f455e680-0da4-11eb-9be3-21b182a6da11.png)


