# const let var
## const let
### 차이
- let
    - `변수` 선언
    - 재대입 가능. 
- const
    - `상수` 선언
    - 재대입 불가능
    - 규칙 : 선언과 동시에 대입 
        - nor `Reference Error`

### 공통점
#### 같은 이름을 갖는 변수의 재선언을 허용하지 않는다.
- Q: 같은 이름을 갖는 변수를 재선언 했을때의 문제점은 무엇인가요?
    - 일반적으로 같은 스코프에 같은 이름의 변수를 선언하는 것은 실수일 가능성이 높기 때문에 미리 검출해준다. 
    [:link:](https://books.google.co.kr/books?id=QeUlDwAAQBAJ&pg=PA75&lpg=PA75&dq=%EA%B0%99%EC%9D%80+%EC%9D%B4%EB%A6%84%EC%9C%BC%EB%A1%9C+%EC%9E%AC%EC%84%A0%EC%96%B8+%EB%AC%B8%EC%A0%9C%EC%A0%90&source=bl&ots=vOAlIAFtnS&sig=ACfU3U3cB0rAGAmv-3u4LjxiL9GyC2MGDg&hl=ko&sa=X&ved=2ahUKEwjTst6Qy7jqAhWCA4gKHbfSDw4Q6AEwAHoECAoQAQ#v=onepage&q=%EA%B0%99%EC%9D%80%20%EC%9D%B4%EB%A6%84%EC%9C%BC%EB%A1%9C%20%EC%9E%AC%EC%84%A0%EC%96%B8%20%EB%AC%B8%EC%A0%9C%EC%A0%90&f=false)
    - 같은 스코프 내의 변수는 다시 재선언 할 필요 없이, 값을 재할당 하여 쓰면 된다.
- Q: 같은 이름을 let으로 선언하고, var로 재선언 할 수 있나요?  
    - A: Uncaught SyntaxError: Identifier 'hi' has already been declared
- Q: 같은 이름을 var으로 선언하고, let로 재선언 할 수 있나요? 
    - A: Uncaught SyntaxError: Identifier 'a' has already been declared

#### 블록 스코프
- if, for, while { ... }
- 자세한 내용은 아래에있다.
 
#### 변수가 선언되기 전에 참조하려고 하면 에러가 난다.
- let과 const는 변수가 선언되기 전에 참조할 수 없는 규칙이 있다.
- Q: 왜 이런 규칙을 만들었을까요? 
    - A : 변수를 선언하지 않았는데 사용한게 프로그래밍 적 오류 이다.
    - 이 문제는 런타임 환경(서비스 도중)에서 발견할 수 있다는 문제점
        
## var vs let, const
### var
- 재선언 가능
- 선언 전에 참조 가능(undefined)
    - var 를 지양해야된다.
- 함수 스코프 function () {}
### let, const
- 재선언 불가능
- 블록 스코프
- 선언 전에 참조 불가(Reference Error)