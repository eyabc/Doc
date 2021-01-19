# 함수의 prototype 프로퍼티
일반 객체에 `prototype` 프로퍼티를 사용하면 아무런 일이 일어나지 않는다. 

```javascript
let animal = {
  eats: true
};

function Rabbit(name) {
  this.name = name;
}

Rabbit.prototype = animal;

let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

alert( rabbit.eats ); // true
```

![image](https://user-images.githubusercontent.com/31977543/95853133-e053ba00-0d8f-11eb-8d51-77a640d88073.png)

`Rabbit.prototype = animal` 
- `new Rabbit` 을 호출해 만든 새로운 객체의 `[[Prototype]]` 을 `animal` 로 설정하라

## F.prototype 프로퍼티
- `new F` 가 호출될 때만 사용된다.
- `new F` 를 호출해 새롭게 만든 객체의 `[[Prototype]]` 을 할당해준다.
- 새로운 객체가 만들어 진 후에 `F.prototype` 프로퍼티가 바뀌면 (`F.prototype = <another object>`)
    - `new F` 로 만들어지는 새로운 객체는 `another object` 를 `[[Prototype]]` 으로 갖게 된다.
    - 기존 객체의 `[[Prototype]]` 은 그대로 유지 된다.
    
## 함수의 prototype 프로퍼티와 constructor 프로퍼티
- 모든 함수는 `prototype` 프로퍼티를 갖는다.
- 기본 `prototype` 프로퍼티가 가리키는 객체
    - `contructor` 프로퍼티 하나만 있는 객체
    - `contructor` 프로퍼티는 함수 자신을 가리킨다.
    
```javascript
function Rabbit() {}

/* 기본 prototype
Rabbit.prototype = { constructor: Rabbit };
*/
```
![image](https://user-images.githubusercontent.com/31977543/95863049-ac33c580-0d9e-11eb-9e1e-22a5429183b5.png)

Rabbit 을 구현한 객체 모두에서 `[[Prototype]]` 을 거쳐 `contructor` 프로퍼티를 사용할 수 있다.
```javascript
function Rabbit() {}
// 기본 prototype:
// Rabbit.prototype = { constructor: Rabbit }

let rabbit = new Rabbit(); // {constructor: Rabbit}을 상속받음

alert(rabbit.constructor == Rabbit); // true (프로토타입을 거쳐 접근함)
```
![image](https://user-images.githubusercontent.com/31977543/95863371-0df42f80-0d9f-11eb-9e35-dd792e612f70.png)

### `contructor` 프로퍼티의 사용
객체를 만들 때 어떤 생성자가 사용되었는지 알 수 없는 경우 (서드 파티 라이브러리 객체인 경우) 사용한다.
```javascript
function Rabbit(name) {
  this.name = name;
  alert(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
```
 