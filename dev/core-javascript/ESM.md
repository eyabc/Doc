# ESM

## export import
- 최상위 모듈스코프에서만 동작
    - { } 안에서는 동작하지 않는다.
- 코드가 최상위 모듈스코프의 어떤 위치에 있어도 상관 없다. 
- 정적인 방식
    - import 문에 동적 매개변수를 사용할 수 없다.
    - 모듈 경로엔 원시 문자열만 들어갈 수 있다.
    ```javascript
    import ... from getModuleName(); // 모듈 경로는 문자열만 허용되기 때문에 에러가 발생합니다.
    ```
    - 함수 호출 결과값을 경로로 쓸 수 없다.
    - 런타임이나 조건부로 모듈을 불러올 수 없다.
    ```javascript
    if(...) {
      import ...; // 모듈을 조건부로 불러올 수 없으므로 에러 발생
    }
    
    {
      import ...; // import 문은 블록 안에 올 수 없으므로 에러 발생
    }
    ```
    - 정적인 방식은 번들링 작업을 가능하게 한다.

## export
변수/함수/클래스 의 선언부 앞에 export 를 붙인다.

```javascript
// 배열 내보내기
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 상수 내보내기
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// 클래스 내보내기
export class User {
  constructor(name) {
    this.name = name;
  }
}
```

클래스나 함수선언을 export 할 땐 세미콜론을 붙이지 않는다.
- 세미콜론은 표현식에서 붙인다.
```javascript
export function sayHi(user) {
  alert(`Hello, ${user}!`);
}  // 끝에 ;(세미콜론)을 붙이지 않습니다.
```

선언부와 떨어진 곳에 export 붙이기
```javascript
// 📁 say.js
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

function sayBye(user) {
  alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // 두 함수를 내보냄
```

## import 
```javascript
import {sayHi, sayBye} from './say.js';
```
## import *
- 코드가 짧아진다.
```javascript
import * as say from './say.js';
say.sayHi('John');
say.sayBye('John');
```

가져올 땐 대상을 명시하는 것이 좋은이유
1. **웹팩**과 같은 모던 **빌드 툴** 
    - **로딩 속도**를 높이기 위해 모듈들을 모으는 **번들링** 최적화 수행
    - 빌드툴은 실제 사용되는 함수만 번들링 결과물에 포함한다. 
    ```javascript
    // 📁 say.js
    export function sayHi() { ... }
    export function sayBye() { ... }
    export function becomeSilent() { ... }
   
    // 📁 main.js
    import {sayHi} from './say.js';
    ```
1. 이름을 간결하게 써 준다.
    `say.sayHi()`보다 `sayHi()`
2. 코드 구조를 파악하기 쉬워 리팩토링, 유지보수에 도움

## as
import 'as' 
- 모듈의 이름을 바꿔서 가져옴
```javascript
import {sayHi as hi, sayBye as bye} from './say.js';
```
    
export 'as'
```javascript
export {sayHi as hi, sayBye as bye};
```

## named export 와 export default
모듈의 종류
1. 복수의 함수가 있는 라이브러리 형태 
    - 예제 `say.js`
    - `named export` 한 모듈
2. 개체 하나만 선언 되어있는 모듈  
    - `export default`

   
| | named export | export default |
|---|---|---|
|import | {} 필요 | {} 불필요 |
|export | 개체의 이름 필요 | 개체의 이름 없어도됨
| 개수 | N 개 | 1개 |
| export, import Name | 동일해야함 | 임의로 정할 수 있음 |


## export default   
export 옆에 'default' 추가
```javascript
// 📁 user.js
export default class { 
  constructor(name) {
    this.name = name;
  }
}
```
{User} 가 아닌 User 로 클래스를 가져옴
```javascript
import User from './user.js'; 

new User('John');
```
   
export, import 이름을 임의로 정할 수 있음.
```javascript
import User from './user.js'; // 동작
import MyUser from './user.js'; // 동작
```
하지만 코드의 일관성을 위해 파일이름과 동일한 것이 좋음.
- 강제 일관성을 위해서는 default 가 아닌 named export 를 사용할 수 있음.

### default 키워드
기본 내보내기를 참조하는 용도

```javascript
function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 함수 선언부 앞에 'export default'를 붙여준 것과 동일합니다.
export {sayHi as default};
```

## export default / named export 혼용 가능
```javascript
// 📁 user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 📁 main.js
import {default as User, sayHi} from './user.js';
// 혹은
import User, { sayHi } from './user.js';

new User('John');
```

* 으로 가져오기
```javascript
// 📁 main.js
import * as user from './user.js';

let User = user.default; // default export
new User('John');
```

## 모듈 다시 내보내기
```javascript
export { sayHi } from './say.js'; // sayHi를 다시 내보내기 함
export { default as User } from './user.js'; // default export를 다시 내보내기 함
```
`export User from './user.js'` 는 에러

`export * from './user.js'` 
- default export 가 무시된다.
- named export 만 다시 보내진다.

named 와 default 를 동시에 내보내기
```javascript
export * from './user.js'; // named export를 다시 내보내기
export { default } from './user.js'; // default export를 다시 내보내기
```

예시) npm 을 통해 외부에 공개할 패키지를 만드는 상황

폴더구조
```shell script
auth/
    index.js
    user.js
    helpers.js
    tests/
        login.js
    providers/
        github.js
        facebook.js
        ...
```

`auto/index.js` 
- 진입점 역할을 하는 주요 파일
- 주요 파일을 통해 외부에 패키지를 노출시킨다.

`import {login, logout} from 'auth/index.js'`
- 개발자가 패키지를 사용하는 방법

```shell script
// 📁 auth/index.js

// login과 logout을 가지고 온 후 바로 내보냅니다.
import {login, logout} from './helpers.js';
export {login, logout};

// User를 가져온 후 바로 내보냅니다.
import User from './user.js';
export {User};
...
```

## 동적으로 모듈 가져오기 import(module) 표현식
### import(module) 의 반환값 
- 이행된 프로미스 객체
- 프로미스의 값: 해당 모듈의 import, export 를 모두 포함하는 객체

### 특징
코드 어디에서나 동적으로 사용 가능
```javascript
let modulePath = prompt("어떤 모듈을 불러오고 싶으세요?");

import(modulePath)
  .then(obj => <모듈 객체>)
  .catch(err => <로딩 에러, e.g. 해당하는 모듈이 없는 경우>)
```
named export 
```javascript
(async ()=> {
  let {hi, bye} = await import('./say.js');
  
  hi();
  bye();
})()
```
default export
```javascript
(async ()=> {
    let obj = await import('./say.js');
    let say = obj.default;
    // let {default: say} = await import('./say.js');
    
    say();
})()
```

동적 import 는 일반 스크립트에서도 동작한다.
- `<script type="module"/>` 가 없어도 된다.

`import()` 는 함수 호출문법이 아니다.
- 변수에 복사할 수 없다.
- call, apply 를 쓸 수 없다.




