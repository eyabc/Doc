# DOM

![image](https://user-images.githubusercontent.com/31977543/97259157-7215f980-185d-11eb-975c-084a84eeda07.png)

## DOM Document Object Model
- HTML / XML 문서의 프로그래밍 interface
- 많은 브라우저들이 표준 규약 외에 각기 다른 추가기능들을 제공하고 있다.

문서의 구조화 된 표현(structured representation) 을 제공

→ 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공함.

→ 프로그래밍 언어는 문서 구조, 스타일, 내용 들을 변경할 수 있다.

웹 페이지 내의 모든 콘텐츠 -> 객체

## 웹문서가 브라우저에 렌더링 되기 까지
1. 브라우저 렌더링 엔진
    - 웹 문서를 브라우저가 이해할 수 있는 구조로 만든다
    - 웹 문서를 로드 / 파싱 후 DOM 으로 만든다.
2. DOM 을 메모리에 적재한다. 

## DOM Tree
DOM 은 객체 트리로 구성된다.

## DOM API
- 정적인 웹페이지를 동적으로 변경하기 위한 방법
- 메모리 상에 존재하는 DOM 을 변경하는 것
- DOM 의 객체에 접근하고 수정할 수 있는 메서드와 프로퍼티
---
API(web or XML page) = DOM + JS(scripting language)
- DOM 은 프로그래밍 언어와 독립적으로 디자인 되었음


Reference
--
- https://gitlab.com/siots-study/topics/-/wikis/dom
- https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/%EC%86%8C%EA%B0%9C