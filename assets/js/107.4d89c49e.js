(window.webpackJsonp=window.webpackJsonp||[]).push([[107],{514:function(t,s,a){"use strict";a.r(s);var n=a(44),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"브라우저의-js-코드-실행과정"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#브라우저의-js-코드-실행과정"}},[t._v("#")]),t._v(" 브라우저의 JS 코드 실행과정")]),t._v(" "),a("h2",{attrs:{id:"motivation-타이머-api"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#motivation-타이머-api"}},[t._v("#")]),t._v(" Motivation - 타이머 API")]),t._v(" "),a("p",[t._v("자바스크립트 개념이 아닌 브라우저와 node.js 에서 부터 왔다.")]),t._v(" "),a("p",[t._v("setTimeout")]),t._v(" "),a("ul",[a("li",[t._v("인자 (callback, msTime) : msTime 후에 callback 실행")]),t._v(" "),a("li",[t._v("msTime : callback 이 실행의 최소 대기시간, 지연될 수 있다.")])]),t._v(" "),a("p",[t._v("setInterval")]),t._v(" "),a("ul",[a("li",[t._v("msTime 을 1000ms 이하로 지정하였을 때\n"),a("ul",[a("li",[t._v("브라우저에 따라 msTime 을 강제로 set 시킨다.")]),t._v(" "),a("li",[t._v("크롬의 경우, 1000ms 으로 set 한다.")])])])]),t._v(" "),a("p",[t._v("여기서 왜 setTimeout 의 일정시간을 지키지 않고 지연되어 실행되는 이유가 무엇인지 알아보자.")]),t._v(" "),a("h2",{attrs:{id:"브라우저의-javascript-코드-실행-과정"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#브라우저의-javascript-코드-실행-과정"}},[t._v("#")]),t._v(" 브라우저의 JavaScript 코드 실행 과정")]),t._v(" "),a("h3",{attrs:{id:"호출-스택-call-stack"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#호출-스택-call-stack"}},[t._v("#")]),t._v(" 호출 스택 (Call Stack)")]),t._v(" "),a("p",[t._v("JS 엔진은 함수 호출 관련정보를 콜스택에서 관리한다.")]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" y")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" y"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `add`를 호출")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add2AndPrint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("x")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `add2`를 호출")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `console.log`를 호출")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add2AndPrint")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// `add2AndPrint`를 호출")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])]),a("p",[t._v("위 코드의 호출스택 상태 변화는 아래와 같다.")]),t._v(" "),a("img",{staticStyle:{width:"200px"},attrs:{src:"https://user-images.githubusercontent.com/31977543/91665967-54b20100-eb34-11ea-87fb-0db6b7b7b4fa.png"}}),t._v(" "),a("img",{staticStyle:{width:"200px"},attrs:{src:"https://user-images.githubusercontent.com/31977543/91665973-61cef000-eb34-11ea-8418-f8d9b1ca4429.png"}}),t._v(" "),a("img",{staticStyle:{width:"200px"},attrs:{src:"https://user-images.githubusercontent.com/31977543/91665980-70b5a280-eb34-11ea-8e4e-2c9d0f5dad78.png"}}),t._v(" "),a("img",{staticStyle:{width:"200px"},attrs:{src:"https://user-images.githubusercontent.com/31977543/91665973-61cef000-eb34-11ea-8418-f8d9b1ca4429.png"}}),t._v(" "),a("img",{staticStyle:{width:"200px"},attrs:{src:"https://user-images.githubusercontent.com/31977543/91665967-54b20100-eb34-11ea-87fb-0db6b7b7b4fa.png"}}),t._v(" "),a("h3",{attrs:{id:"실행-맥락-execution-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#실행-맥락-execution-context"}},[t._v("#")]),t._v(" 실행 맥락 (Execution context)")]),t._v(" "),a("p",[t._v("call stack 에 저장되는 각 항목")]),t._v(" "),a("h4",{attrs:{id:"execution-context-의-요소들"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#execution-context-의-요소들"}},[t._v("#")]),t._v(" Execution Context 의 요소들")]),t._v(" "),a("p",[a("a",{attrs:{href:"./%EB%A0%89%EC%8B%9C%EC%BB%AC%20%ED%99%98%EA%B2%BD"}},[t._v("렉시컬 환경")]),t._v(" (어휘환경)")]),t._v(" "),a("ul",[a("li",[t._v("Environment Record\n"),a("ul",[a("li",[t._v("함수 내부에서 사용되는 변수")]),t._v(" "),a("li",[t._v("this 가 가리치는 객체")])])]),t._v(" "),a("li",[t._v("outer Lexical Environment")])]),t._v(" "),a("h3",{attrs:{id:"브라우저가-javascript-코드를-실행할-때-호출-스택의-변화"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#브라우저가-javascript-코드를-실행할-때-호출-스택의-변화"}},[t._v("#")]),t._v(" 브라우저가 JavaScript 코드를 실행할 때, 호출 스택의 변화")]),t._v(" "),a("ol",[a("li",[t._v("스크립트를 로드 할 때\n"),a("ul",[a("li",[a("strong",[t._v("전역실행맥락(Global Execution Context)")]),t._v(" 을 호출 스택에 push")])])]),t._v(" "),a("li",[t._v("함수가 호출 될 때\n"),a("ul",[a("li",[t._v("함수 호출의 실행 맥락 생성")]),t._v(" "),a("li",[a("strong",[t._v("함수 호출의 실행 맥락")]),t._v("을 호출 스택에 push")])])]),t._v(" "),a("li",[t._v("함수의 실행이 끝날 때\n"),a("ul",[a("li",[t._v("결과값 반환")]),t._v(" "),a("li",[t._v("호출 스택의 가장 위에 있는 실행 맥락 pop")])])]),t._v(" "),a("li",[t._v("스크립트의 실행이 모두 끝날 때\n"),a("ul",[a("li",[t._v("전역 실행 맥락을 호출 스택에서 pop")])])])]),t._v(" "),a("p",[t._v("웹 브라우저는 호출 스택에 실행 맥락이 존재하는 동안(실행 중인 함수가 존재하는 동안) 먹통이 된다.")]),t._v(" "),a("ul",[a("li",[t._v("먹통이 되는 시간에 따라서, blocking, nonblocking 을 구분한다.")]),t._v(" "),a("li",[t._v("브라우저의 주사율, 보통 60fps, 대략 16 ms 안에 코드 실행을 완료되지 않으면\n"),a("ul",[a("li",[t._v("브라우저 내 애니매이션이 뚝뚝 끊기는 현상")]),t._v(" "),a("li",[t._v("사용자 경험에 악영향")])])])]),t._v(" "),a("h3",{attrs:{id:"작업-큐-task-queue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#작업-큐-task-queue"}},[t._v("#")]),t._v(" 작업 큐 (Task Queue)")]),t._v(" "),a("p",[t._v("작업 큐에는 blocking 이 되어 처리하는 것이 어려운 일들이 들어간다.")]),t._v(" "),a("ul",[a("li",[t._v("event 를 기다리는 일")]),t._v(" "),a("li",[t._v("계산이 오래걸리는 작업")]),t._v(" "),a("li",[t._v("스크립트나 모듈을 로딩하는 동작")])]),t._v(" "),a("h3",{attrs:{id:"브라우저의-행동-이벤트-루프-event-loop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#브라우저의-행동-이벤트-루프-event-loop"}},[t._v("#")]),t._v(" 브라우저의 행동 : 이벤트 루프 (Event Loop)")]),t._v(" "),a("p",[t._v("브라우저가 아래 행동을 끊임 없이 반복하는 것을 이벤트 루프라고 부른다.")]),t._v(" "),a("ol",[a("li",[t._v("태스크 처리 위임\n"),a("ul",[a("li",[t._v("From : JS 엔진")]),t._v(" "),a("li",[t._v("To : API 를 통해(TODO)\n"),a("ul",[a("li",[t._v("브라우저 혹은 Web Worker(message 이벤트에 이벤트 리스너 등록) 에 위임 "),a("code",[t._v("async")])]),t._v(" "),a("li",[t._v("태스크가 끝나면 실행시킬 "),a("code",[t._v("콜백")]),t._v(" 등록")])])])])]),t._v(" "),a("li",[t._v("위임된 태스크가 끝남\n"),a("ul",[a("li",[t._v("태스크의 "),a("strong",[t._v("반환값")]),t._v("과 "),a("strong",[t._v("콜백")]),t._v("을 작업 큐(task queue) 에 추가")])])]),t._v(" "),a("li",[t._v("브라우저는 호출 스택이 비워질 때 마다\n"),a("ul",[a("li",[t._v("작업 큐에서 가장 오래된 작업을 꺼낸다.")]),t._v(" "),a("li",[t._v("작업에 대한 콜백을 실행 시킨다.")])])])]),t._v(" "),a("embed",{attrs:{src:"https://helloworldjavascript.net/images/eventloop.svg",onload:"onKSLoad(this)","data-loop":""}}),t._v(" "),a("h3",{attrs:{id:"호출-스택과-작업-큐의-성질"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#호출-스택과-작업-큐의-성질"}},[t._v("#")]),t._v(" 호출 스택과 작업 큐의 성질")]),t._v(" "),a("ol",[a("li",[t._v("호출 스택이 비워져야 Task Queue 의 다음 태스크가 실행된다.")]),t._v(" "),a("li",[t._v("각 태스크 사이에 브라우저는 화면을 새로 그릴 수 있다.\n"),a("ul",[a("li",[t._v("호출스택이 비워질 때")])])])]),t._v(" "),a("h2",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[t._v("#")]),t._v(" Reference")]),t._v(" "),a("ul",[a("li",[t._v("https://helloworldjavascript.net/pages/285-async.html")])])])}),[],!1,null,null,null);s.default=e.exports}}]);