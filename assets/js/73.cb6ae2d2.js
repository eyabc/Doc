(window.webpackJsonp=window.webpackJsonp||[]).push([[73],{474:function(t,s,a){"use strict";a.r(s);var n=a(44),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"value-context-vs-identifier-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#value-context-vs-identifier-context"}},[t._v("#")]),t._v(" Value Context vs Identifier Context")]),t._v(" "),a("h2",{attrs:{id:"value-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#value-context"}},[t._v("#")]),t._v(" Value Context")]),t._v(" "),a("p",[t._v("변수가 메모리에 저장이 된다."),a("br"),t._v("\n메모리에 1번 주소와 2번 주소에 3을 각각 넣는다."),a("br"),t._v("\n메모리 주소와 관계 없이 값이 같으면 같다라고 판단한다."),a("br"),t._v("\n값은 메모리 주소가 중요치 않다.")]),t._v(" "),a("blockquote",[a("p",[t._v("값의 정의")]),t._v(" "),a("ul",[a("li",[t._v("프로그래밍 언어에 따라, 기본 설정으로 제공됨")]),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/dev/core-javascript/원시타입과 참조타입.html#원시타입"}},[t._v("자바스크립트 기본값 primitive")]),t._v(" "),a("ul",[a("li",[t._v("null, undefined, boolean, string, number, symbol")])])],1)])]),t._v(" "),a("h3",{attrs:{id:"특징"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#특징"}},[t._v("#")]),t._v(" 특징")]),t._v(" "),a("ol",[a("li",[t._v("끝 없는 복사본\n"),a("ul",[a("li",[t._v("값을 할당/함수의 인자 → 언제나 복사본을 만든다")])])]),t._v(" "),a("li",[t._v("(강제적으로) 상태 변화에 안전하다\n"),a("ul",[a("li",[t._v("불변성을 통해서 안전하지만, 관리하기 어렵다.")]),t._v(" "),a("li",[t._v("값을 관리하기 위해서 함수형 프로그래밍이 등장.")])])]),t._v(" "),a("li",[t._v("연산을 기반으로 로직을 전개\n"),a("ul",[a("li",[t._v("수학적 프로그래밍은 굉장히 복잡한 도메인의 연산을 표현하기 어렵다.")])])])]),t._v(" "),a("h2",{attrs:{id:"identifier-context"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#identifier-context"}},[t._v("#")]),t._v(" Identifier Context")]),t._v(" "),a("p",[t._v("heap 메모리에 들어가 있는 객체 O 가 있다."),a("br"),t._v("\nA 라는 변수도 O 를 가리키고,"),a("br"),t._v("\nB 라는 변수도 O 를 가리키면,"),a("br"),t._v("\nA 와 B 는 같다 라고 한다."),a("br"),t._v("\n똑같은 메모리에 있는 "),a("em",[t._v("주소")]),t._v("를 가리킴")]),t._v(" "),a("h3",{attrs:{id:"특징-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#특징-2"}},[t._v("#")]),t._v(" 특징")]),t._v(" "),a("ol",[a("li",[t._v("하나의 원본")]),t._v(" "),a("li",[t._v("상태 변화를 내부에서 책임짐\n"),a("ul",[a("li",[t._v("만들기 어렵다")])])]),t._v(" "),a("li",[t._v("메세지를 기반으로 로직을 전개")])]),t._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" a"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false, Identifier Context")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true, Value Context")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("h2",{attrs:{id:"객체지향은-철저하게-value-context-를-배제한다"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#객체지향은-철저하게-value-context-를-배제한다"}},[t._v("#")]),t._v(" 객체지향은 철저하게 Value Context 를 배제한다.")]),t._v(" "),a("p",[t._v("반대로 함수형 프로그래밍에서 Identifier 를 쓰면 버그가 나타날 수 있다")]),t._v(" "),a("p",[t._v("객체지향에서 인자로 primitive → 버그 발생"),a("br"),t._v("\n좀 더 나아가")]),t._v(" "),a("ul",[a("li",[t._v("Number 가, 어떤 것은 Age 로서, 어떤것은 Money 로써..등 이유를 생각하고 객체로 만들어야 한다.")]),t._v(" "),a("li",[t._v("값을 받을 수 있는 메서드는, "),a("em",[t._v("생성자 인자")]),t._v("밖에 남지 않을 것임")])])])}),[],!1,null,null,null);s.default=e.exports}}]);