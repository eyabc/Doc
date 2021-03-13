(window.webpackJsonp=window.webpackJsonp||[]).push([[184],{593:function(s,t,a){"use strict";a.r(t);var e=a(44),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"cors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors"}},[s._v("#")]),s._v(" CORS")]),s._v(" "),a("p",[s._v("Cross Origin Resource Sharing 정책")]),s._v(" "),a("h2",{attrs:{id:"url"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#url"}},[s._v("#")]),s._v(" URL")]),s._v(" "),a("ul",[a("li",[a("p",[a("code",[s._v("Protocol")]),s._v(" https://")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("Host")]),s._v("    www.evan-moon.com")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("Path")]),s._v(" /users")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("Query String")]),s._v(" ?sort=asc&page=1")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("Fragment")]),s._v(" #foo")])]),s._v(" "),a("li",[a("p",[a("code",[s._v("Port")]),s._v(" 의 생략 → 기본 포트 번호")]),s._v(" "),a("ul",[a("li",[s._v("HTTP 80")]),s._v(" "),a("li",[s._v("HTTPS 443")])])])]),s._v(" "),a("h2",{attrs:{id:"출처"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#출처"}},[s._v("#")]),s._v(" 출처")]),s._v(" "),a("p",[s._v("Protocol, Host, Port")]),s._v(" "),a("p",[s._v("서버위치를 찾기 위한 가장 기본적인 요소")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("location"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("origin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("       "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('// "https://evan-moon.github.io"')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("code",[s._v("출처를 비교")]),s._v("하는 로직은 서버가 아니라 "),a("code",[s._v("브라우저")]),s._v("에 구현되어 있다.")]),s._v(" "),a("ul",[a("li",[s._v("브라우저를 통하지 않은 서버 간 통신은 SOP 가 적용되지 않는다.")]),s._v(" "),a("li",[s._v("출처 비교 시 포트 번호를 완전 무시하는 브라우저는 Internet Explorer 밖에 없다.")])]),s._v(" "),a("h2",{attrs:{id:"sop-same-origin-policy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sop-same-origin-policy"}},[s._v("#")]),s._v(" SOP : Same Origin Policy")]),s._v(" "),a("p",[s._v("같은 출처에서만 리소스를 공유할 수 있다")]),s._v(" "),a("ul",[a("li",[s._v("CORS 정책을 지킨 리소스 요청은 출처가 다르더라도 허용한다.")])]),s._v(" "),a("h3",{attrs:{id:"예외-조항"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#예외-조항"}},[s._v("#")]),s._v(" 예외 조항")]),s._v(" "),a("p",[s._v("스크립트, 렌더될 이미지, 스타일 시트, script, img, style 태그")]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("img")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("https://evanmoon.tistory.com/rss"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("https://evanmoon.tistory.com/rss"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}}),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("요청 자체는 성공한다")]),s._v(" "),a("p",[a("code",[s._v("Sec-Fetch-Mode: no-cors")])]),s._v(" "),a("ul",[a("li",[s._v("헤더의 요청 필드를 설정")]),s._v(" "),a("li",[s._v("브라우저가 no-cors 인 경우 다른 출처여도 CORS 정책을 검사하지 않는다.")]),s._v(" "),a("li",[s._v("응답을 자바스크립트에게 알려주지 않아 응답 내용을 알 수 없다.")])]),s._v(" "),a("h2",{attrs:{id:"cors-배경"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors-배경"}},[s._v("#")]),s._v(" CORS 배경")]),s._v(" "),a("p",[s._v("출처가 다른 두개의 어플리케이션이 마음대로 소통할 수 있는 것은 위험하다.")]),s._v(" "),a("p",[s._v("웹에서 돌아가는 클라이언트 어플리케이션은 사용자의 공격에 취약하다.")]),s._v(" "),a("ul",[a("li",[s._v("CSRF (Cross-Site Request Forgery)")]),s._v(" "),a("li",[s._v("XSS (Cross0Site Scripting)")])]),s._v(" "),a("ol",[a("li",[s._v("브라우저 개발자도구에서 각종 정보들을 아무런 제제없이 열 수 있다.\n"),a("ul",[a("li",[s._v("DOM 확인")]),s._v(" "),a("li",[s._v("서버 통신 내역")]),s._v(" "),a("li",[s._v("리소스 출처")])])]),s._v(" "),a("li",[s._v("자바스크립트 코드 난독화는 암호화가 아니다.\n"),a("ul",[a("li",[s._v("난독화가 안되어 있어 소스코드가 그대로 노출되는 사이트들도 많다.")])])])]),s._v(" "),a("h2",{attrs:{id:"cors-와-브라우저"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors-와-브라우저"}},[s._v("#")]),s._v(" CORS 와 브라우저")]),s._v(" "),a("p",[s._v("출처는 브라우저가 판별한다. 따라서")]),s._v(" "),a("p",[s._v("CORS를 위반했을 때")]),s._v(" "),a("ul",[a("li",[s._v("서버는 정상적으로 응답")]),s._v(" "),a("li",[s._v("응답의 파기 여부는 브라우저가 결정")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/31977543/89126088-f89c9280-d51d-11ea-8b47-9d540b57c194.png",alt:"cors"}})]),s._v(" "),a("h2",{attrs:{id:"cors-의-기본-동작"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors-의-기본-동작"}},[s._v("#")]),s._v(" CORS 의 기본 동작")]),s._v(" "),a("p",[s._v("웹 클라이언트가 다른 출처의 리소스를 요청할 때 기본적인 동작")]),s._v(" "),a("ol",[a("li",[s._v("사용자의 첫 요청\n"),a("ol",[a("li",[s._v("HTTP 프로토콜을 사용하여 요청을 보낸다")]),s._v(" "),a("li",[s._v("브라우저는 요청 헤더에 "),a("code",[s._v("Origin")]),s._v(" 필드에 요청을 보내는 출처를 함께 담아 보낸다."),a("br"),s._v(" "),a("code",[s._v("Origin: https://evan-moon.github.io")])])])]),s._v(" "),a("li",[s._v("서버의 응답\n"),a("ol",[a("li",[s._v("응답 헤더 "),a("code",[s._v("Access-Controll-Allow-Origin")]),s._v(" 를 보낸다.\n"),a("ul",[a("li",[s._v("리소스에 접근할 수 있는 허용된 출처")])])])])]),s._v(" "),a("li",[s._v("응답을 받은 브라우저\n"),a("ol",[a("li",[s._v("자신이 보냈던 "),a("code",[s._v("Origin")]),s._v(" 과 응답 받은 "),a("code",[s._v("Access-Control-Allow-Origin")]),s._v(" 을 비교하여 유효한지 결정한다.")])])])]),s._v(" "),a("h2",{attrs:{id:"preflight-request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#preflight-request"}},[s._v("#")]),s._v(" Preflight Request")]),s._v(" "),a("p",[s._v("웹 어플리케이션을 개발할 때 일반적으로 마주치는 시나리오")]),s._v(" "),a("p",[s._v("브라우저는 "),a("code",[s._v("예비요청")]),s._v("(Preflight)과 "),a("code",[s._v("본 요청")]),s._v("으로 나누어서 서버로 전송한다.")]),s._v(" "),a("h3",{attrs:{id:"preflight"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#preflight"}},[s._v("#")]),s._v(" Preflight")]),s._v(" "),a("p",[s._v("본 요청을 보내기 전, 브라우저가 요청을 보내는 것이 안전한지 확인한다.")]),s._v(" "),a("ul",[a("li",[s._v("HTTP 의 "),a("code",[s._v("OPTIONS")]),s._v(" 메서드가 사용된다.")])]),s._v(" "),a("p",[a("img",{attrs:{src:"https://user-images.githubusercontent.com/31977543/89126538-42d34300-d521-11ea-90a4-beae5ab70188.png",alt:"image"}})]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" headers "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Headers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Content-Type'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'text/xml'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'https://evanmoon.tistory.com/rss'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" headers "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("요청")]),s._v(" "),a("div",{staticClass:"language-http request line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[s._v("OPTIONS https://evanmoon.tistory.com/rss\n\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Accept:")]),s._v(" */*\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Accept-Encoding:")]),s._v(" gzip, deflate, br\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Accept-Language:")]),s._v(" en-US,en;q=0.9,ko;q=0.8,ja;q=0.7,la;q=0.6\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Request-Headers:")]),s._v(" content-type\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Request-Method:")]),s._v(" GET\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Connection:")]),s._v(" keep-alive\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Host:")]),s._v(" evanmoon.tistory.com\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Origin:")]),s._v(" https://evan-moon.github.io\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Referer:")]),s._v(" https://evan-moon.github.io/2020/05/21/about-cors/\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Sec-Fetch-Dest:")]),s._v(" empty\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Sec-Fetch-Mode:")]),s._v(" cors\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Sec-Fetch-Site:")]),s._v(" cross-site\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("본 요청에 대한 다른 정보들도 미리 알려준다.")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("Access-Control-Request-Headers")]),s._v(" : Content-Type")]),s._v(" "),a("li",[a("code",[s._v("Access-Control-Request-Method")]),s._v(" : GET")])]),s._v(" "),a("p",[s._v("예비 요청에 대한 응답")]),s._v(" "),a("div",{staticClass:"language-http request line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-http"}},[a("code",[s._v("OPTIONS https://evanmoon.tistory.com/rss 200 OK\n\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Access-Control-Allow-Origin:")]),s._v(" https://evanmoon.tistory.com\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Encoding:")]),s._v(" gzip\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Length:")]),s._v(" 699\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Content-Type:")]),s._v(" text/xml; charset=utf-8\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Date:")]),s._v(" Sun, 24 May 2020 11:52:33 GMT\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("P3P:")]),s._v(" CP='ALL DSP COR MON LAW OUR LEG DEL'\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Server:")]),s._v(" Apache\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("Vary:")]),s._v(" Accept-Encoding\n"),a("span",{pre:!0,attrs:{class:"token header-name keyword"}},[s._v("X-UA-Compatible:")]),s._v(" IE=Edge\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("ul",[a("li",[s._v("응답 헤더의 "),a("code",[s._v("Access-Control-Allow-Origin: https://evanmoon.tistory.com")]),s._v(" 는 요청 헤더의\n"),a("code",[s._v("Origin: https://evan-moon.github.io")]),s._v(" 와 출처가 다르므로 CORS 정책 위반 에러를 띄운다.")])]),s._v(" "),a("h2",{attrs:{id:"simple-request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#simple-request"}},[s._v("#")]),s._v(" Simple Request")]),s._v(" "),a("p",[s._v("예비 요청이 없다.\n"),a("img",{attrs:{src:"https://user-images.githubusercontent.com/31977543/89157338-54f7c480-d5a7-11ea-9daf-131893d4db68.png",alt:"image"}})]),s._v(" "),a("ul",[a("li",[s._v("특정조건이 만족해야 Simple Request 를 할 수 있다.")]),s._v(" "),a("li",[s._v("사용이 드물다")])]),s._v(" "),a("blockquote",[a("p",[s._v("언제할 까? TODO")])]),s._v(" "),a("h2",{attrs:{id:"credentialed-request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#credentialed-request"}},[s._v("#")]),s._v(" Credentialed Request")]),s._v(" "),a("p",[s._v("인증된 요청을 사용하는 방법")]),s._v(" "),a("ul",[a("li",[s._v("CORS 에서 좀더 보안을 강화하고 싶을 때 사용한다.")])]),s._v(" "),a("h3",{attrs:{id:"credential"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#credential"}},[s._v("#")]),s._v(" credential")]),s._v(" "),a("p",[s._v("비동기 요청 API "),a("code",[s._v("XMLHttpRequest")]),s._v("객체, "),a("code",[s._v("fetchAPI")]),s._v(" 는 브라우저의 쿠키정보나 인증과 관련된 헤더를 담지 않는다.\n이때 "),a("code",[s._v("credential")]),s._v(" 은 요청에 인증과 관련된 정보를 담을 수 있게 해준다.")]),s._v(" "),a("h3",{attrs:{id:"credential-옵션의-종류"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#credential-옵션의-종류"}},[s._v("#")]),s._v(" credential 옵션의 종류")]),s._v(" "),a("ol",[a("li",[a("code",[s._v("Same Origin")]),s._v("(크롬 Default) 같은 출처간 요청에만 인증 정보를 담을 수 있다.")]),s._v(" "),a("li",[a("code",[s._v("include")]),s._v(" 모든 요청에 인증정보를 담을 수 있다.")]),s._v(" "),a("li",[a("code",[s._v("omit")]),s._v(" 모든 요청에 인증정보를 담지 않는다.")])]),s._v(" "),a("p",[a("code",[s._v("Same Origin")]),s._v(" "),a("code",[s._v("include")]),s._v(" 옵션이라면 "),a("code",[s._v("Access-Control-Allow-Origin")]),s._v(" 이외에 조건이 더 까다로워진다.")]),s._v(" "),a("ol",[a("li",[a("code",[s._v("Same Origin")]),s._v(" : "),a("code",[s._v("Access-Control-Allow-Origin: *")]),s._v(" 허용")]),s._v(" "),a("li",[a("code",[s._v("include")]),s._v(" 응답헤더에\n"),a("ul",[a("li",[a("code",[s._v("Access-Control-Allow-Origin: *")]),s._v(" 미허용")]),s._v(" "),a("li",[a("code",[s._v("Access-Control-Allow-Credentials: true")]),s._v(" 필수")])])])]),s._v(" "),a("h2",{attrs:{id:"cors-해결-방법"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors-해결-방법"}},[s._v("#")]),s._v(" CORS 해결 방법")]),s._v(" "),a("h3",{attrs:{id:"_1-access-control-allow-origin-세팅"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-access-control-allow-origin-세팅"}},[s._v("#")]),s._v(" 1. Access-Control-Allow-Origin 세팅")]),s._v(" "),a("ol",[a("li",[s._v("서버엔진의 설정 nginx, apache")]),s._v(" "),a("li",[s._v("소스코드 내에 응답 미들웨어 세팅\n"),a("ul",[a("li",[s._v("CORS 미들웨어 라이브러리를 찾아보자")])])])]),s._v(" "),a("h3",{attrs:{id:"_2-webpack-devserver-로-리버스-프록싱"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-webpack-devserver-로-리버스-프록싱"}},[s._v("#")]),s._v(" 2. Webpack DevServer 로 리버스 프록싱")]),s._v(" "),a("p",[s._v("프론트엔드 개발환경에서 CORS 를 많이 마주칠 것이다."),a("br"),s._v("\n벡엔드의 "),a("code",[s._v("Access-Control-Allow-Origin: http://localhost:3000")]),s._v(" 같이 범용적인 출처를 넣어주는 경우는 드물다."),a("br"),s._v("\n그래서 프론트엔드의 "),a("code",[s._v("webpack-dev-server")]),s._v(" 의 라이브러리의 프록시 기능은 CORS 정책을 우회하게 해준다.")]),s._v(" "),a("div",{staticClass:"language-javascript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  devServer"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    proxy"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/api'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        target"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'https://api.evan.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        changeOrigin"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        pathRewrite"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'^/api'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("ul",[a("li",[a("code",[s._v("localhost:8000/api")]),s._v(" 처럼, path 가 "),a("code",[s._v("/api")]),s._v(" 로 시작되는 요청을 웹팩이 "),a("code",[s._v("https://api.evan.com")]),s._v(" 으로 요청을 프록싱 해준다.")]),s._v(" "),a("li",[s._v("브라우저는 여전히 "),a("code",[s._v("localhost:8000/api")]),s._v(" 로 알고있다.")])]),s._v(" "),a("h2",{attrs:{id:"reference"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[s._v("#")]),s._v(" Reference")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://evan-moon.github.io/2020/05/21/about-cors/",target:"_blank",rel:"noopener noreferrer"}},[s._v("CORS는 왜 이렇게 우리를 힘들게 하는걸까?"),a("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=n.exports}}]);