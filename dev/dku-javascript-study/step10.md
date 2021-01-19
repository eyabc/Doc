## TO 유림
ES6 모듈 파일의 확장자는 모듈인 것을 분명히 하기 위해 .mjs 확장자를 사용한다.

를 읽고 mjs 에 대해서 더 알아보았습니다

[mjs](https://whatext.com/ko/mjs)
- MJS 는 Node.js ES 모듈 파일입니다.
- Node.js 애플리케이션과 함께 사용할 ES 모듈 (ECMAScript 모듈)을 포함하는 소스 코드 파일입니다. 
- MJS 파일은 JavaScript 로 작성되며 Node.js 컨텍스트 외부에서 .JS 확장자를 사용할 수도 있습니다. 
- ES 모듈을 사용하면 웹 및 응용 프로그램 개발자가 코드를 재사용 가능한 작은 구성 요소로 구성 할 수 있습니다.
- ECMAScript 6 (ES6)은 ES 모듈에 대한 사양을 도입하여 JavaScript로 모듈을 구현하기위한 표준을 제공합니다. 
- 2018 년 모든 주요 웹 브라우저는 ES 모듈을 지원합니다.
- 하지만 모듈화 된 JavaScript의 인기는 ES6 이전입니다. 
    - JavaScript 런타임 환경 인 Node.js는 CommonJS를 모듈의 스펙으로 사용했습니다. 
    - CommonJS로 많은 기존 애플리케이션이 빌드되었으므로 Node.js가 기본 ES 모듈에 대한 지원을 추가했을 때 MJS 파일 확장자를 논란의 여지없이 도입하여 두 가지를 구별하고 애플리케이션이 중단되는 것을 방지했습니다.

[mjs 와 js 의 차이](https://ui.toast.com/weekly-pick/ko_20190805/) 
- mjs 확장자는 js 파일들과 비교했을 때 혼란을 가져올 수 있다. 
- 자바스크립트 명세에 따르면 mjs 와 js 사이에는 차이가 있다.
    - 예를 들어서, 모듈은 정의상 엄격(use strict 와 같이)하다. 
    - 자바스크립트 모듈을 구현할 때 많은 체크 사항이 만들어지고 "안전하지 않은" 동작은 금지된다.
- js와 mjs 싸움
    - 모듈 또는 스크립트를 다루는 경우에 자바스크립트가 알아야 할 사실까지 이어지지만 제공되는 스펙은 따로 없다. 
    - 예를 들어서 CommonJS 스크립트를 가져오는 경우에는 'import from' 을 사용할 수 없다 
    - 그래서 각 확장자 파일이 적절한 파일을 가져오도록 강제할 수 있다.
        - mjs import from mjs
        -  js require js
    - 아래 경우에는?  
        - mjs import from js
        - js require mjs
- ES 모듈은 정적(static)인 것으로 알려져 있다.
    - 즉, 런타임이 아닌 컴파일 시간에만 "이동"할 수 있다. 
    - 이것이 파일 시작 부분에서 import 를 사용해 모듈을 가져오는 이유이다.
- mjs import from js
    - mjs 파일에서 require 를 사용할 수 없다
    - 구문(import)을 사용해야만 한다.
    - 대신 기본 가져오기(module.exports)가 CommonJS 파일로 내보내진 경우에만 가능하다.
- js require mjs
    - ESM 은 require 함수를 통해서 가져올 수 없다. 
    
- 동적 import() : es 모듈을 동적으로 가져오는 방식
    ```javascript
    async function myFunc() {
      const { itsMine } = await import('./myESTest.mjs')
    }
    myFunc()
    ```
  
## To 형욱
정보 감사합니다 이런 것 까지는 생각 안해봤어요. ㅋㅋ
```javascript
1.2 import한 값을 변경하기
이런식으로 let인 months를 바꾼다면 어떻게 될까??
정답은 error가 뜹니다.
에러 내용으로는 Assignment to constant variable. 라고 하는데 이는 const를 우리가 바꾸려할때 나는 에러와 비슷한데 왜 let인 months가 이런 오류가 날까에 대한 답변은
https://stackoverflow.com/questions/53723251/javascript-modifing-an-imported-variable-causes-assignment-to-constant-varia
이곳에서 알 수 있다. (아마 모듈에서의 import하는 내용을 함부로 바꾸지 못하게 하기위해 const로 고정시킨것이지 않을까싶다.)
```

`5. 혼자 하는 정리 및 만들기 (조금 극단적(?)일수도 있다.)` 에서 불변하는 객체는 const 로 바꿔주세요~


## by 유림
import.meta 설명 부분의 코드내에 보면 import.meta.url을 쓸시에 인라인 스크립트가 위치해 있는 html 페이지의 URL 이라 작성되어 있는데 혹시 인라인 스크립트가 무엇인가요? html 내부에 있는 스크립트로 이해했는데요, 이게 맞다면 이 설명에서 가리키는 인라인스크립트는 어느걸 뜻하나요? (질문이 횡설수설하네요 ㅎ.._ 결국 이 alert 문에서 출력되는 결과가 무엇인지 잘 모르겠어서 질문드립니다.


