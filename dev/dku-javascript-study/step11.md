## To 형욱
```text
constructor : 객체가 만들어지기 직전에 실행되기로 약속된 함수

case 1) class를 이용한 생성자함수 사용법

class Person{
    constructor(name, first, second){
        this.name = name;
        this.first = first;
        this.second = second;
    }
}

var kim = new Person('kim', 10, 20);        //kim 객체가 만들어지기 전에 constructor가 실행이 되어 값들이 저장된다.
console.log('kim', kim);
```
생성자 함수는 new 와 함께 실행이 될 때 
1. { } 빈 객체가 만들어진다.
2. 생성자 함수가 실행되어 빈 객체를 초기화 한다.
3. 빈 객체를 반환한다. 

step04 에서 정웅님 포스팅을 참고하자면 순서는 다음과 같습니다. 
- new Person()
    - 새로운 Object 객체 생성
    - `obj.__proto__` 를 `Person.prototype` 으로 설정
    - return Person.call(obj) || obj

일반적으로 obj 가 반환되지만 JS의 생성자 명시적으로 다른 값을 반환 할 수 있습니다.

```text
bind()는 어떤함수의 내부적으로 this의 값을 영구적으로 바꾸는 새로운 함수를 만든다.
```
bind()는 어떤함수의 내부적으로 this의 값을 영구적으로 바꾸는 새로운 함수를 만들어 반환한다

로 표현하면 더 명확할 것 같습니다. 

## To 유림
유림님이 형욱님에게 질문한 내용
```text
function Ultra(){}  //생성자
Ultra.prototype.ultraProp = true;
 
function Super(){}
Super.prototype = new Ultra();
 
function Sub(){}
Sub.prototype = new Super();
 
var o = new Sub();
console.log(o.ultraProp);
본문의 프로토타입 내용 중 위의 코드에서
Super.prototype=new Ultra();를 예로 들면 Ultra생성자를 이용함으로써 Super의 상위 프로토타입이 Ultra가 된다고 제가 이해했는데
이게 맞는지 궁금합니다!

o.ultraProp 에서 ultraProp이란 속성을 찾아 프로토타입 체이닝을 타고 올라가 값을 찾는거죠?
```
실행 결과 o 의 `__proto__:Ultra` 임을 확인할 수 있습니다.

![image](https://user-images.githubusercontent.com/31977543/95018484-09db5a00-069b-11eb-992e-b1798688e2b2.png)


과정을 차근차근 살펴보면 

1. 처음 함수가 선언되었 때, 함수의 속성에는 `prototype` 과 `__proto__` 가 존재합니다.
    - `Ultra.prototype.contructor` 는 생성자 함수 자신을 가리킵니다. 
    - `Ultra.prototype.__proto__` 는 `Object` 를 가리킵니다.
    - `Ultra.__proto__` 는 함수를 가리키고. 이 함수의 proto(원형) 은 Object 임을 알 수 있습니다.

    ![image](https://user-images.githubusercontent.com/31977543/95018738-8a4e8a80-069c-11eb-8bb8-377fdba007ac.png)
2. 그다음 `Ultra.prototype` 에 `ultraProp: true` 프로퍼티를 추가합니다. 

    ![image](https://user-images.githubusercontent.com/31977543/95018803-e4e7e680-069c-11eb-9c02-0025b6298024.png)

3. `Super` 함수 선언은 `Ultra` 함수 선언의 초기 상태와 비슷합니다.

    ![image](https://user-images.githubusercontent.com/31977543/95018546-68083d00-069b-11eb-8d1a-f5c4f28527ce.png)
    
4. `Super.prototype = new Ultra();` 을 실행하기 전에 `const ultra = new Ultra();` 를 해서 `new Ultra()` 가 무엇을 반환하는지 관찰 할 것입니다.
    
    ![image](https://user-images.githubusercontent.com/31977543/95018556-840bde80-069b-11eb-9a06-5b3e6917bd0c.png)

    - ultra 개체는 
        - `ultra.__proto__` 프로퍼티 키를 가진다.
        - `ultra.__proto__.ultraProp: true` 를 가진다.
        - `ultra.__proto__` 는 `Ultra.prototype` 를 가지고 있네요? 
     
5. 따라서 아래 결과가 이해가 될 겁니다.
    
    ![image](https://user-images.githubusercontent.com/31977543/95019087-72780600-069e-11eb-8089-177b1b01dceb.png)

6. `Sub.prototype = new Super();` 에서 `new Super()` 의 결과는

    ![image](https://user-images.githubusercontent.com/31977543/95019195-f205d500-069e-11eb-9d2f-cc64403e4c3c.png)
    
즉 const 개체 = new 함수() 객체의 `__proto__` 가 `함수.prototype` 인 것을 반환합니다.

그래서 하위 객체의 prototype 을, 수퍼 객체의 prototype 으로 을 대체할 수 있어요. 

![image](https://user-images.githubusercontent.com/31977543/95019499-b2d88380-06a0-11eb-87cb-de5ab5591b87.png)

그 과정을 반복하게 되면 이처럼 `__proto__` 로 이어진 프로토타입 체인을 볼 수 있습니다.

형욱님이 유림님에게 남긴 댓글 

함수에도 `__proto__` 가 있습니다. 
![image](https://user-images.githubusercontent.com/31977543/95020629-385f3200-06a7-11eb-9f90-f2435f6bb0bb.png)

형욱님 리뷰에 댓글을 남겼었는데 이미 prototype 을 잘 공부 했군요! 
글도 술술 잘 읽혔고, 읽으면서 머릿속에서 정리가 되었습니다


## To 정웅
```text
Object 에서 프로퍼티가 중복되는 경우 이후에 오는 property 가 overwrite 하게 된다. 따라서 이를 원하지 않은 경우 ECMAScript 5 `strict mode` 를 사용하면 Syntax Error 로 간주 된다.
```
ES6 이상에서 중복 프로퍼티는 어떻게 되나요? 

deepCopy 내용 감사합니다.
```text
function deepFreeze(obj) {
	const props = Object.getOwnPropertyNames(obj);
	
	props.forEach((name)=> {
		const prop = obj[name];
		if (typeof prop === 'object' && prop !== null){
			deepFreeze(prop);
		}
	})
	return Object.freeze(obj);
}
```
```text
Object.assign, Object.freeze 를 이용하는 방법은 번거롭고 
성능 상 이슈가 있어 큰 객체를 대상으로 사용하는 것은 바람직 하지 않다. 
대안으로 `Immutable.js` 를 사용하는 방법이 있다. 

Immutable.js 는 List, Stack, Map, OrderedMap, Set, OrderedSet, Record 와 같은 영구 불변 (Permit Immutable) 자료구조를 제공한다.
```

Map vs Object 차이 알아보기
### Data Types

```jsx
const map = new Map();
map.set('apple', 'kiwi');
// Map(1) {"apple" => "kiwi"}

const obj = new Object
obj['3'] = true;
// {3: true}
```

`Object` 는 다음의 데이터 타입을 key 로 가질 수 있다.

- String
- Symbol

반면 `Map` 은 

- 모든 primitive data type
- Object
- function

의 데이터 타입을 key 로 가질 수 있다. (즉, 대부분의 값을 key 로 가질 수 있다)

Iterate

Map 은 `for ... of` 문을 통하여 [key, value]  값을 순회 할 수 있다. 

```jsx
const map = new Map();

map.set(1, 'one');
map.set(2, 'two');
map.set(3, 'three');

for (const num of map){
	console.log(num);
} 
// [1, "one"]
// [2, "two"]
// [3, "three"] 

// 이를 활용하여 
for (const [key, value] of map) {
 // console.log(key, value) 와 같이 활용 가능
} 
```
### Iterate

Map 은 `for ... of` 문을 통하여 [key, value]  값을 순회 할 수 있다. 

```jsx
const map = new Map();

map.set(1, 'one');
map.set(2, 'two');
map.set(3, 'three');

for (const num of map){
	console.log(num);
} 
// [1, "one"]
// [2, "two"]
// [3, "three"] 

// 이를 활용하여 
for (const [key, value] of map) {
 // console.log(key, value) 와 같이 활용 가능
} 
```

와 같이 Object.entries(), keys(), values() 로 순회가 가능한데 이는 Object 의 key, value 값을 배열 형태로 가져온다. 또한 삽입 했을 때의 order 가 보장되지 않는다 (대부분의 경우 order 가 삽입 순으로 출력 되지만 보장은 안된다고 합니다). 따라서 순서가 중요하다면 sorting 을 따로 해줘야 한다.

-> 보장이 안되는 경우는 정수를 넣었을 때 (정수가 문자열로 변환 되기는함) 정수 순으로 정렬된다고 합니다

반면 Map 은 delete 메서드가 있어 

```jsx
map.delete('a') // 삭제 여부에 따라 false, true 를 반환 (false 는 해당 값이 없는 경우)
```
```javascript
const size = Object.keys(object).length
const size = map.size
```

Map 은 잦은 key, value 삽입, 삭제에 빠른 성능을 보인다. (내부적 optimization 으로 인한)
반면 Object 는 따로 삽입 삭제에 대한 성능 향상이 없다.

-> 경험에서 우러난 조언 감사합니다 굿굿

### 추천 사용 시기 😆

Object : JSON 을 다룰때는 Object 를 사용한다. 이는 Object, Map 모두 키 값을 String 만 허용되기 때문에 더 안전하다. 

Map : 삽입 순서 ordring 보장 되어야 하거나 data-type 이 복잡한 경우 Map 을 사용한다.

