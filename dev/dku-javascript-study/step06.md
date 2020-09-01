# Step06 Class

## To 정웅
Q. 첫 줄은 호이스팅이 발생한다고 하였는데 두번째 줄인 호이스팅이 일어나지 않는다 라고 되어 있습니다. 
그 이유는 무엇인가요 ?
```
- 일반적으로 클래스 선언문도 호이스팅이 발생한다. 모든 선언문은 런타임 이전에 실행됨을 기억하자.
- 클래스 선언은 let 과 const 처럼 블록 스코프에 선언되면 호이스팅 이 일어나지 않는다
```

## To 노원
Q. `Person.prototype.eatLunch = function () { .. } ` 구문은 
![](https://user-images.githubusercontent.com/31977543/91142062-245d0380-e6eb-11ea-842d-4cfe6bf4a0b3.png)
```javascript
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} 은/는 속도 ${this.speed}로 달립니다.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} 이/가 멈췄습니다.`);
  }
}

let animal = new Animal("동물");
```
다음 처럼 Person 생성자 메서드는 Person.prototype.constructor 속성의 값이 되고,
eatLunch 함수는 Person.prototype.eatLunch 의 메서드가 된다는 표현이 더 정확하지 않을까요? 

```
Person.prototype.eatLunch = function () {
  console.log(this.name + " ate the lunch");
}; // Prototype 문을 이용하여 Person 생성자의 메소드를 추가할 수 있다. 추가된 메소드는 모든 인스턴스에 적용된다.
kim.eatLunch(); // kim ate the lunch
chi.eatLunch(); // bap ate the lunch
```

Q. 클래스도 호이스팅이 발생합니다.
`블록 스코프로 취급되어 var로 변수를 선언하지 않는 한 호이스팅이 발생하지 않는다.`
![image](https://user-images.githubusercontent.com/31977543/91269517-3bb2f400-e7b2-11ea-86ae-19a56433a701.png)
블록스코프 내의 class A 가 호이스팅이 되지 않았다면 console.log(A); 는 class A 를 출력해야 합니다.

Q. 클래스 `생성자를 호출할 때에는 반드시 new 연산자를 사용해야 한다.`
그 이유는, class 로 만든 함수에는 특수 내부 프로퍼티 `[[FunctionKind]]:"classConstructor" 가 붙습니다.
JS 엔진은 함수에 `[[FunctionKind]]:"classConstructor"`가 있을 때 new 와 함께 호출하지 않으면 에러를 발생시키게 합니다.

Q. 프로퍼티 people, grade 는 클래스 필드가 아닌 인스턴스의 프로퍼티 이기 때문에 상속되지 않습니다.
```javascript
class Babo {}
const babo = new Babo();
babo.people = Infinity;
babo.grade = function () {
  return "F";
};
```
originalBabo 는 배열입니다. 따라서 식의 대입은 잘못되었습니다. 
```javascript
this.people = originalBabo.people;
this.grade = originalBabo.grade;
``` 
![image](https://user-images.githubusercontent.com/31977543/91271262-dc0a1800-e7b4-11ea-865e-0a89b8a2abb7.png)

```javascript
class moreBabo extends Babo {
  constructor(speed, books,  ...originalBabo ) {
    super(originalBabo);
    this.speed = speed;
    this.books = books;
    this.people = originalBabo.people;
    this.grade = originalBabo.grade;  // grade와 people은 undefined로 뜬다. 아마도 생성자가 선언된 이후 동적으로 생성된 속성(프로퍼티)는 super로 상속받을 수 없는 것으로 보인다.
    console.log({originalBabo});
  }
   //...
}
```
생성자의 인자를 객체로 받는 받는 대안이 있습니다.

Q. super 문으로 메소드를 정상적으로 상속받기 위해서는 함수 선언문을 사용해야 한다. 이유는 아직 알지 못했다.

[super 의 내부 동작](https://eyabc.github.io/Doc/dev/core-javascript/%ED%81%B4%EB%9E%98%EC%8A%A4.html#super-%EC%9D%98-%EB%82%B4%EB%B6%80-%EB%8F%99%EC%9E%91)
을 보시면 조금 이해가 더 될거라고 생각합니다.

`[[HomeObject]]` 라는 `클래스 혹은 객체 메서드 함수` 가 가지고 있는 특수 내부 프로퍼티가 있습니다.
이 프로퍼티에는, 해당 객체가 저장이 됩니다.
```javascript
let animal = {
  name: "동물",
  eat() {         // animal.eat.[[HomeObject]] == animal
    alert(`${this.name} 이/가 먹이를 먹습니다.`);
  }
};

let rabbit = {
  __proto__: animal,
  name: "토끼",
  eat() {         // rabbit.eat.[[HomeObject]] == rabbit
    super.eat();
  }
};

let longEar = {
  __proto__: rabbit,
  name: "귀가 긴 토끼",
  eat() {         // longEar.eat.[[HomeObject]] == longEar
    super.eat();
  }
};

// 이제 제대로 동작합니다
longEar.eat();  // 귀가 긴 토끼 이/가 먹이를 먹습니다.
```
super를 호출하면 `[[HomeObject]]` 프로퍼티를 통해 프로토타입 부모 메서드를 가져올 수 있게 됩니다. 

따라서,  `[[HomeObject]]` 는 메서드로 정의해야 가질 수 있기 때문에 
- method() O -> es6 의 shorthand method 입니다. function 에서 많은 기능이 제한되어 오직 method 로서 사용할 수 있는 특수 함수라고 합니다.
- method: function() X



## to 형욱
```
class overwatch{        //부모클래스 overwatch
    static shift_cooltime=12;
    static shift(){
        console.log("shift키 누르기");
    }
    e(){
        console.log("e키 누르기");
    }
    static leftbar(){console.log("좌클릭누르기");}
    static rightbar(){console.log("우클릭누르기");}
}

class mei extends overwatch{        //자식클래스 mei

}
```
개발 공부를 실생활에 적용하여 재미있게 하는군요. 바람직합니다
