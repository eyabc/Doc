Reference
--
- https://gitlab.com/siots-study/topics/-/wikis/home
- https://www.zerocho.com/category/JavaScript?page=7
- https://ko.javascript.info/closure#ref-1330

# JavaScript 기초

## Intro
### 자바스크립트의 역사
- 창시자: 넷스케이프에서 브렌던 아이크

### 자바스크립트의 장점  
- 한 언어로 여러가지 프로그래밍 기법을 배울 수 있다.
    - 절차형, 객체 지향형, 함수형 언어..`TODO`
- 웹에 정보가 제일 많다.
- 텍스트 에디터, IDE 같은 것을 설치할 필요없이 브라우저에서 실행할 수 있다.
- 결과를 인터넷 브라우저 화면으로 볼 수 있어 편리하다.

## 심화1

### 값

프로그래밍 언어마다 값을 저장하는 Type 의 형태가 다양합니다.
- Java 
    - int, long, string 등의 타입과 일치하는 값을 저장
    - 해당 변수/상수의 타입과 일치하는 값들만 저장 가능합니다.
- JavaScript
    - const(상수), let(변수), var(변수) 세가지 형태로 값 저장
    - 타입이 없다 
        - 타입에 관계없이 변수/상수 에 값을 저장할 수 있다. 
        - 장점: 자유도가 높습니다
        - 단점: 개발 시 타입에러에 대한 리스크가 크다.
            - 타입이 헷갈림, 배열에만 할 수 있는 행위를 object 에서 쓰는경우. 등
            - 보완: 타입스트립트를 사용

### const와 let의 차이
- let
    - 변수를 담을 수 있는 공간의 특성.
        - 재대입 가능. 
- const
    - 상수를 담을 수 있는 공간의 특성.
        - 재대입 불가능
    - 선언과 동시에 대입을 해줘야 하는 규칙이 있다.
        - 그렇지 않을 경우 Reference Error

### const와 let의 공통점
- 같은 이름을 갖는 변수의 재선언을 허용하지 않는다.
    - Q: 같은 이름을 갖는 변수를 재선언 했을때의 문제점은 무엇인가요?
        - 일반적으로 같은 스코프에 같은 이름의 변수를 선언하는 것은 실수일 가능성이 높기 때문에 미리 검출해준다.
        - [출처](https://books.google.co.kr/books?id=QeUlDwAAQBAJ&pg=PA75&lpg=PA75&dq=%EA%B0%99%EC%9D%80+%EC%9D%B4%EB%A6%84%EC%9C%BC%EB%A1%9C+%EC%9E%AC%EC%84%A0%EC%96%B8+%EB%AC%B8%EC%A0%9C%EC%A0%90&source=bl&ots=vOAlIAFtnS&sig=ACfU3U3cB0rAGAmv-3u4LjxiL9GyC2MGDg&hl=ko&sa=X&ved=2ahUKEwjTst6Qy7jqAhWCA4gKHbfSDw4Q6AEwAHoECAoQAQ#v=onepage&q=%EA%B0%99%EC%9D%80%20%EC%9D%B4%EB%A6%84%EC%9C%BC%EB%A1%9C%20%EC%9E%AC%EC%84%A0%EC%96%B8%20%EB%AC%B8%EC%A0%9C%EC%A0%90&f=false)
        - 같은 스코프 내의 변수는 다시 재선언 할 필요 없이, 값을 재할당 하여 쓰면 된다.
    - Q: 같은 이름을 let으로 선언하고, var로 재선언 할 수 있나요?  
        - A: Uncaught SyntaxError: Identifier 'hi' has already been declared
    - Q: 같은 이름을 var으로 선언하고, let로 재선언 할 수 있나요? 
        - A: Uncaught SyntaxError: Identifier 'a' has already been declared
- 블록 스코프
    - if, for, while { ... }
    - 자세한 내용은 아래에있다.
 
- 변수가 선언되기 전에 참조하려고 하면 에러가 난다.
    - let과 const는 변수가 선언되기 전에 참조할 수 없는 규칙이 있다.
    - Q: 왜 이런 규칙을 만들었을까요? 
        - A : 변수를 선언하지 않았는데 사용한게 프로그래밍 적 오류 이다.
        - 이 문제는 런타임 환경(서비스 도중)에서 발견할 수 있다는 문제점
        
### var vs let, const
- var
    - 재선언 가능
    - 선언 전에 참조 가능(undefined)
        - var 를 지양해야된다.
    - 함수 스코프 function () {}
- let, const
    - 재선언 불가능
    - 블록 스코프
    - 선언 전에 참조 불가(Reference Error)
    
### scope
- 현재 접근할 수 있는 변수의 범위
- 어떠한 변수가 스코프 안에 선언됐을때, 
해당 스코프 안에서는 변수에 접근해서 읽거나 쓸 수 있고, 스코프 밖에서는 해당 변수에 접근할 수 없다.

### 함수 scope, 블록 scope
- 함수 스코프
    - function() {...}

- 블록 scope
    - if, while, for { ... }
    - [switch](Switch안에서의 let과 const)

### 렉시컬 환경(Lexical Environment) 
- === 내부 숨김 연관 객체(Internal Hidden Associated Object) 

- 실행중인 함수
- 코드 블록 {...}
- 스크립트 전체

는 내부 숨김 연관 객체를 갖는다.

#### 렉시컬 환경 객체의 구성
1. 환경 레코드(Environment Record) 
    - 모든 지역변수를 프로퍼티로 저장하고 있는 객체
    - this 값과 같은 기타 정보도 저장된다.
    - 변수는 특수 내부 객체인 환경 레코드의 프로퍼티일 뿐이다.
    - 변수를 가져오거나 변경하는 것 === 환경 레코드의 프로퍼티를 가져오거나 변경하는 것.
        
1. 외부 렉시컬 환경(Outer Lexical Environment)에 대한 참조
    - 외부 코드와 연결됨.

       
#### 전역 렉시컬 환경(Global Lexical Environment) : 스크립트 전체와 관련된 렉시컬 환경
- `let phrase = 'hello';` 
- lexical environment : phrase: 'hello'
- outer Lexical Environment 참조: null
    - 전역 렉시컬 환경은 외부 참조를 갖지 않는다.
    
#### let 변수의 렉시컬 환경
```text
                          Lexical Environment
1. execution ------------>  phrase: <uninitialized>
2. let phrase ----------->  phrase: undefined
3. phrase = 'hello' ----->  phrase: 'hello'
4. phrase = 'bye' ------->  phrase: 'bye'
```
1. 스크립트가 시작
    - 스크립트 내 선언된 변수 전체가 렉시컬 환경에 올라간다.
    - 변수의 상태는 특수 내부상태(Special Internal State)인 'uninitialized' 
        - JS 엔진은 uninitialized 상태의 변수를 인지하지만, let 을 만나기 전까지는 이 변수를 참조할 수 없다.
            
> 렉시컬 환경은 명세서에만 존재한다.  
    - 자바스크립트가 어떻게 동작하는지 설명하는데 쓰이는 이론상의 객체  
    - 코드를 사용해 직접 렉시컬 환경을 얻거나 조작하는 것은 불가능
   

#### 함수 선언문의 렉시컬 환경
- 일반 변수와는 달리 바로 초기화 된다.
- 렉시컬 환경이 만들어지는 즉시 사용 가능
- 선언 되기전에도 함수를 사용할 수 있는 이유.
```text
                           Lexical Environment
execution start -------->  phrase: <uninitialized>
                           say: function
let phrase = 'hello'                ...
function say(name) {                ...
    alert(...)                      ...
}
```

#### 내부와 외부 렉시컬 환경
- 함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어 진다.
    - 매개변수
    - 함수의 지역변수

```text
let phrase = 'hello';
                                           Lexical Environment          outer Lexical Environment
function say(name) {                  ---  
    alert(`${phrase}`, ${name}`);       |-  name: "John"    -------->   say: function
}                                     ---                               phrase: 'hello'

say('John');
```
- 함수가 호출중인 동안, 호출중인 함수를 위한 렉시컬 환경 2가지
    - 내부 렉시컬 환경
    - 내부 렉시컬 환경이 가리키는 외부(전역) 렉시컬 환경
    
#### 스코프체인
- 식별자를 찾는 일련의 과정
- 변수가 스코프 안에 선언되지 않았다면, 
그 변수를 찾기 위해 부모 스코프로 올라가고,
거기에도 없다면 또 그 부모 스코프에 올라가서 찾는다.

- 코드에서 변수에 접근할 땐, 먼저 렉시컬 환경을 검색 범위로 잡는다.
- 내부 렉시컬 환경에서 원하는 변수를 찾기 못하면 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장한다.
- 전역 렉시컬 환경으로 확장될 때까지 반복된다.
 
- 전역렉시컬에서 변수를 프로퍼티를 찾지 못했을 때,
- 엄격모드 : 에러 발생
- 비엄격모드 : 새로운 변수가 만들어 진다.
    - 하위호환성을 위해 남아있는 기능
    
### 반환 함수
```text
function makeCounter() {
    let count = 0;
    return functi9no 8q8w
}
```

- Q: 렉시컬 이름인 이유?
- Q:  

### 호이스팅
var 변수의 선언부를 제일 위로 끌어 올린다. 선언부만!
let, const 변수는 호이스팅 기능이 없다.

함수가 함수 선언식(function declaration)으로 선언되면, 현재 스코프의 최상단으로 호이스팅(hoist) 된다.
함수 또는 var로 선언된 변수
var는 함수 스코프이기 때문에 함수 내부에서 맨 상단으로 끌어올려짐.

// This is the same as the one below
sayHello();
function sayHello() {
	console.log("Hello!");
}
// This is the same as the code above
function sayHello() {
	console.log("Hello!");
}
sayHello();

반면 함수가 함수 표현식(function expression)으로 선언되면, 함수는 현재 스코프의 최상단으로 호이스팅되지 않는다.

sayHello(); // Error, sayHello is not defined
const sayHello = function() {
	console.log(aFunction);
};

함께 읽어볼 호이스팅 심화 자료
개인 심화자료 - let과 const는 호이스팅이 될까?



네스팅된 스코프(Nested scopes)에서의 렉시컬 스코핑(lexical scoping)
함수가 다른 함수 내부에서 정의되었다면, 내부 함수는 외부 함수의 변수에 접근할 수 있다. 이런 행동을 렉시컬 스코핑(lexical scoping)이라고 부른다.
function outerFunction() {
	const outer = "I’m the outer function!";

	function innerFunction() {
		const inner = "I’m the inner function!";
		console.log(outer); // I’m the outer function!
	}

	console.log(inner); // Error, inner is not defined
}


