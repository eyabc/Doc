---
sidebarDepth: 2
---
# Browser Rendering CSS Parsing
| | [문맥 자유 문법](https://d2.naver.com/helloworld/59361)| |
|---|---|---|
| HTML | X | |
| CSS | O| 파서 유형을 이용하여 파싱 가능

- [CSS 명세: CSS 어휘와 문법 정의](https://www.w3.org/TR/CSS2/grammar.html)

원문에는 아래와 같이 정의되어 있는데... 지금은 파싱을 위한 명세와 문법들이 있다 라는 것만 알면 될 것 같다.
```
몇 가지 예제를 보자. 어휘 문법은 각 토큰을 위한 정규 표현식으로 정의되어 있다.

omment   \/*[^]*+([^/][^]*+)\/
num        [0-9]+|[0-9]"."[0-9]+
nonascii    [\200-\377]
nmstart    [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name        {nmchar}+
ident        {nmstart}{nmchar}

"ident"는 클래스 이름처럼 식별자(identifier)를 줄인 것이다. "name"은 요소의 아이디("#"으로 참조하는) 이다.

구문 문법은 BNF로 설명되어 있다.

Ruleset  
   : selector [ ',' S* selector ]*
       '{' S* declaration [ ';' S* declaration ]* '}' S*
   ;
Selector  
   : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
   ;
simple_selector  
   : element_name [ HASH | class | attrib | pseudo ]*
   | [ HASH | class | attrib | pseudo ]+
   ;
Class  
   : '.' IDENT
   ;
element_name  
   : IDENT | '*'
   ;
Attrib  
   : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
       [ IDENT | STRING ] S* ] ']'
   ;
Pseudo  
   : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
   ;
룰셋(ruleset)은 다음과 같은 구조를 나타낸다.

div.error, a.error {  
   color: red;
   font-weight: bold;
}
div.error와 a.error 는 선택자(selector)이다. 중괄호 안쪽에는 이 룰셋에 적용된 규칙이 포함되어 있다. 이 구조는 공식적으로 다음과 같이 정의되어 있다.

Ruleset  
   : selector [ ',' S* selector ]*
       '{' S* declaration [ ';' S* declaration ]* '}' S*
   ;
룰셋은 쉼표와 공백(S가 공백을 의미함)으로 구분된 하나 또는 여러 개의 선택자라는 것을 의미한다. 룰셋은 중괄호 내부에 하나 또는 세미 콜론으로 구분된 여러 개의 선언을 포함한다. "선언"과 "선택자"는 이어지는 BNF에 정의되어 있다.
```
![image](https://user-images.githubusercontent.com/31977543/98691688-a3d8a580-23b1-11eb-9564-fd8daed5561a.png)

- CSS 파일 --파싱--> 스타일 시트 객체
- 스타일 시트 객체
    - CSS 규칙 객체
        - 선택자 객체 + 선언 객체
            - CSS 문법과 일치하는 다른 객체를 포함
            
## 스크립트와 스타일 시트의 진행 순서

### 스크립트

#### 방법1 고전적
파서가 `<script>` 를 만나면 
- 스타일 시트가 즉시 파싱하고 실행된다.
- 스크립트가 실행되는 동안 문서의 파싱은 중단된다. 

스크립트가 외부에 있는 경우 
- 네트워크로부터 자원을 가져오면서 실시간으로 처리되고 자원을 받을 때까지 파싱(?HTML 파싱?)은 중단된다. 

#### 방법2 defer
스크립트 "지연(defer)"
- 문서 파싱이 중단되지 않음
- 문서 파싱이 완료된 이후에 스크립트가 실행됨

#### 방법3
HTML5, 스크립트를 비동기(asynchronous)로 처리하는 속성
- 스크립트가 별도의 맥락에 의해 파싱되고 실행됨

### 예측 파싱 최적화
- 브라우저와 버전을 확인하세요 TODO
- 병렬적 방법
    - 스레드1: 스크립트를 실행
    - 스레드2: 네트워크로부터 다른 자원을 내려받고 문서의 나머지 부분을 파싱  
- DOM 트리 수정은 예측파서가 아닌 메인 파서에서 하게 된다.
- 예측 파서는 외부 스크립트, 외부 스타일 시트와 외부 이미지와 같이 참조된 외부 자원을 파싱한다.

### 스타일 시트
#### 이론적으로...
스타일 시트는 DOM 트리를 변경하지 않음
- 문서 파싱을 기다리거나 중단할 이유가 없다. 

#### 그러나...
스크립트가 문서를 파싱하는 동안 스타일 정보를 요청하는 경우
 
- 스타일 파싱 전 → 스크립트의 잘못된 결과...

브라우저마다, 아직 로드 중이거나 파싱 중인 스타일 시트가 있는 경우 
- 모든 스크립트의 실행을 중단한다. 
- 로드되지 않은 스타일 시트 가운데, 문제가 될만한 속성이 있을 때에만 스크립트를 중단한다.


Reference
--
- https://d2.naver.com/helloworld/59361
