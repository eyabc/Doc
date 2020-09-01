# step04
## 함수형 프로그래밍

### by 정웅
- 함수형 언어 functional language    
함수를 일급 객체로 취급하는 언어를 함수형 언어라 한다. 이는 자바스크립트 뿐만 아니라 여러가지 함수형 언어도 해당되지만 클로저의 개념을 꼭 이해해야 한다. 
-  내부 함수에서 접근하는 변수 대부분이 스코프 체인의 첫 번째 객체가 아닌 그 이후 객체에 존재한다. 따라서 변수를 스코프 체인 끝 쪽에 까지 자주 접근하게 되므로 성능 저하와 메모리 부담 이슈가 있다. 따라서 클로저는 무차별적으로 사용되지 말고 영리하게 사용되어야 한다.
- 명령형 vs 함수형 프로그래밍  
  함수형 프로그래밍에 반대되는 개념이 명령형 프로그래밍 Imperative Programming 이다. C 언어가 이에 해당된다. 명령형은 컴퓨터가 수행할 일의 명령을 순서대로 기술하는 프로그래밍 방식이다.
  
  명령형 프로그래밍은 입력 출력을 계산하는 순수한 함수와 특정 작업을 수행하는 여러 가지 명령어로 이루어진 함수도 있다. 이를 프로시저 procedure 라 한다. 프로시저는 함수평 프로그래밍의 순수 함수와는 목적 자체가 다르다.
  
  int ret = printf("print this to screen\n");
  
  printf() 함수 역시 입력 값과 출력 값이 있지만 printf()의 목적은 화면에 출력하는게 함수의 목적이다. 결과 값은 단지 제대로 수행되었는지 여부만 따진다.
  
  이처럼 명령형 프로그래밍은 함수가 특정 작업의 순차적인 명령을 기술하는 데 중점을 둔다.
  
  반면에 함수형 프로그래밍은 함수가 순수 함수로서 외부에 아무런 영향을 주지 않는 선에서 자신의 로직을 처리하여 결과를 반환하여 함수의 목적이 결과 값 반환에 있다.
  
- 자바스크립트는 다음 두가지 덕분에 함수형 프로그래밍이 일부 구현 가능하다
  
  일급 객체로서의 함수
  클로저
  
### by 유림
- 1 급 객체인 함수의 설명이 시원하게 나와 있네요.
```text
<일급 객체>
  
  여기 x라는 것이 있다.
  
  x를 변수에 담을 수 있다.
  x를 매개변수에 넘길 수 있다.
  x를 함수에서 반환할 수 있다.
  x를 만족할 때, 이를 일급객체라고 한다.
  
  즉, 자바스크립트의 함수는 일급객체이므로
  
  함수를 변수에 담을 수 있다.
  함수를 매개변수로 넘길 수 있다.
  함수를 함수에서 반환할 수 있다.
  위의 같은 조건을 만족한다.
```

## 클로저

### by 정웅
- 클로저로 참조되는 x 같은 외부 함수의 지역변수를 (함수입장에서는) 자유변수 free variable 라고 한다.
함수가 자유변수에 갖히면 다 클로저가 된다. 
> 스코프 개념이나 이런것들은 js 3.1 버전 (?) 다 옛날거다. js 엔진은 항상 바뀐다. 그래서 cs 적인것을 아는것이 더 좋다.

- fact 는 자유 변수 cache에 접근 할 수 있는 클로저를 반환 받는다. 클로저로 숨겨지는 cache 에는 팩토리얼 연산 값을 저장한다. 즉, 연산과정에서 캐시에 저장된 값이 있으면 즉시 그 값이 반환 된다. 이를 memoization 패턴 이라 한다
    ```
    var fact = function () {
          var cache = {'0' : 1}
          var func = function (n) {
              var result = 0
              if (typeof(cache[n]) === 'number'){
                  result = cache [n]
              }
              else {
                  result = cache [n] = n * func(n - 1)
              }
              return result
          }
          return func;
      }();
      
      console.log(fact(10))
      console.log(fact(20))
    ```
### by 형욱
- 2.1 상태 유지
  클로저가 가장 유용하게 사용되는 상황은 현재 상태를 기억하고 변경된 최신 상태를 유지하는 것이다. 아래 예제를 살펴보자.
  ```html

  <!DOCTYPE html>
  <html>
  <body>
    <button class="toggle">toggle</button>
    <div class="box" style="width: 100px; height: 100px; background: red;"></div>
  
    <script>
      var box = document.querySelector('.box');
      var toggleBtn = document.querySelector('.toggle');
  
      var toggle = (function () {
        var isShow = false;
  
        // ① 클로저를 반환
        return function () {
          box.style.display = isShow ? 'block' : 'none';
          // ③ 상태 변경
          isShow = !isShow;
        };
      })();
  
      // ② 이벤트 프로퍼티에 클로저를 할당
      toggleBtn.onclick = toggle;
    </script>
  </body>
  </html>
    ```
  
  ① 즉시실행함수는 함수를 반환하고 즉시 소멸한다. 즉시실행함수가 반환한 함수는 자신이 생성됐을 때의 렉시컬 환경(Lexical environment)에 속한 변수 isShow를 기억하는 클로저다. 클로저가 기억하는 변수 isShow는 box 요소의 표시 상태를 나타낸다.
  
  ② 클로저를 이벤트 핸들러로서 이벤트 프로퍼티에 할당했다. 이벤트 프로퍼티에서 이벤트 핸들러인 클로저를 제거하지 않는 한 클로저가 기억하는 렉시컬 환경의 변수 isShow는 소멸하지 않는다. 다시 말해 현재 상태를 기억한다.
  
  ③ 버튼을 클릭하면 이벤트 프로퍼티에 할당한 이벤트 핸들러인 클로저가 호출된다. 이때 .box 요소의 표시 상태를 나타내는 변수 isShow의 값이 변경된다. 변수 isShow는 클로저에 의해 참조되고 있기 때문에 유효하며 자신의 변경된 최신 상태를 게속해서 유지한다.
  
  이처럼 클로저는 현재 상태(위 예제의 경우 .box 요소의 표시 상태를 나타내는 isShow 변수)를 기억하고 이 상태가 변경되어도 최신 상태를 유지해야 하는 상황에 매우 유용하다. 만약 자바스크립트에 클로저라는 기능이 없다면 상태를 유지하기 위해 전역 변수를 사용할 수 밖에 없다. 전역 변수는 언제든지 누구나 접근할 수 있고 변경할 수 있기 때문에 많은 부작용을 유발해 오류의 원인이 되므로 사용을 억제해야 한다.

### to 노원
- 클로져 : 이미 생명주기가 끝난 외부 함수의 변수를 참조할 수 있는 `변수`(-> `함수`)라고 한다.
 가 맞는 표현 같습니다.

## 객체
### By 정웅
- 스택오버플로우 에서는 생성자와 Object.create 의 차이점을 다음과 같이 설명한다.
    - new Person()
        - 새로운 Object 객체 생성
        - obj.__proto 를 Person.prototype 으로 설정
        - return Person.call(obj) || obj
            - normally obj is returned but constructors in JS can return a value
            - 일반적으로 obj가 반환되지만 JS의 생성자는 값을 반환 할 수 있습니다.
    - Object.create(Person.prototype)
        - 새로운 Object 객체 생성
        - obj.__proto 를 Person.prototype 으로 설정
        - return obj
            - So basically Object.create doesn't execute the constructor.
          


#Symbol
### by 노원
- symbol 테이블 이라는 것을 알게되었습니다. 감사합니다. 
```
Symbol.for로 심볼을 정의하면 전역에 걸쳐 존재하는 심볼 테이블을 참조하여 생성된다.
Symbol.for(문자열)로 심볼을 정의할 때 해당 문자열로 정의된 심볼이 있다면 해당하는 심볼을 반환하게 된다.
Symbol/keyFor 전역 심볼 테이블에서 심볼의 키 문자열을 반환한다.
let token = Symbol.for("strIng")
console.log(Symbol.keyFor(token))
심볼 객체는 iterator가 아니다 그래서 for of 또는 Object.keys으로는 원하는 value를 찾을 수 없다.
JSON stringify도 작동하지 않는다.
속성을 찾기 위해서는 getOwnPropertySymbols로 찾아야 한다.
```      
  
### to 정웅
- 일급 객체로서의 함저 -> 함수 (오타)

