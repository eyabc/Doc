# HTML

## 태그
### form
#### 속성
- autocomplete
    - 입력 요소가 자동완성된 값을 기본으로 가질 수 있는지 나타낸다.
    - off : 브라우저가 각 항목에 자동으로 값을 채워넣지 않는다. 로그인 양식으로 의심되는 경우 무시된다. 
    - on : 사용자의 과거 입력값에 기반하여 브라우저가 자동으로 값을 채워 넣는다.

## 속성
### [autocomplete](https://developer.mozilla.org/ko/docs/Web/HTML/Attributes/autocomplete)
사용자 에이전트의 자동완성을 허용할 입력 필드를 지정할 수 있다.
- 어떤 정보에 대한 자동완성을 원하는지 안내할 수 있다.
    - 과거에 사용자가 입력했던 값
    - 신용카드 정보, 이름, 주소, 전화번호, 이메일 주소 를 브라우저에 저장할 방법을 제공
- 대상 태그 : input, textarea, select, form
- autocomplete 속성이 디폴트일 경우
    - 브라우저는 요소의 조상 `<form>` 또는 form 특성의 값을 id 특성으로 사용하는 form 요소의 autocomplete 특성을 사용?
    
- input/select/textarea 의 사용자 에이전트 자동완성의 조건
    1. name 또는 id 속성 존재
    1. form 요소의 자손
    1. 제출 버튼이 있음

#### 값
on, off, name(honorific-prefix, family-name, given-name, additional-name, honorific-suffix, nickname),

email, username, new-password, current-password,
 
one-time-code(사용자 인증할때 사용하는 1회성 코드), organization-title, organization, street-address,

address-line1, address-line2, address-line3,

address-level4. address-level3, address-level2, address-level1,

country, country-name, pastal-code, 

cc-name(신용카드 등 지불수단 소유자의 전체이름 ), cc-family-name, cc-given-name, cc-additional-name, 

cc-number, cc-exp, cc-exp, cc-exp-mont, cc-exp-year, cc-csc, cc-type,

transaction-currency, transaction-amount,

language, bday(생년월일), bday-day, bday-month, bday-year, sex,

tel(tel-country-code, tel-national, tel-area-code, tel-local), tel-extension

impp(인스턴트 메시지 프로토콜 엔드포인트의 URL. "xmpp:username@example.net" 등.)

url, photo

등 whatwg 표준 에서 볼 수 있다.



    
