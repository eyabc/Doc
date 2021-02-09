const { makeDoc, getSideBar } = require('../util');

const cojs = '/dev/core-javascript';
const airbnb = '/dev/Airbnb_JS_Style_Guides';

module.exports = [
  {
    title: '자바스크립트 스타일 가이드',
    children: [
      'Types',
      'References',
      'Objects',
      'Arrays',
      'Destructuring',
      'Strings',
      'Functions',
      'Arrow Functions',
      '자바스크립트 스타일 가이드',
    ].map(makeDoc(airbnb)),
  },

  {
    title: '미분류',
    children: [
      '문법 사전',
      '자바스크립트의 역사',
      '자바스크립트의 장점',
      '자바스크립트의 값의 특징',
      'const, let, var',
      'V8',
      '렉시컬 환경',
      '반환함수',
      '호이스팅',
      '스코프',
      '글로벌 변수를 사용하면 안되는 이유',
      'JS 메모리 누수',
      '엄격모드',
      'JS전역객체',
      '전역객체 window',
      '값',
      '원시타입과 참조타입',
      '래퍼 객체',
      '가비지 컬렉션',
      'this',
      '화살표함수',
      '함수형 프로그래밍',
      'Symbol',
      'Iteration 프로토콜',
      '클래스',
      '프로토타입',
      '에러 핸들링',
      '참고자료',
    ].map(makeDoc(cojs)),
  },
  {
    title: '비동기 프로그래밍',
    children: [
      'Sync Async',
      '브라우저의 JS 실행과정',
      '비동기 프로그래밍',
      '콜백 Callback',
      'Promise',
      'JOBS',
      '비동기 함수 Async Await',
      'Async Iterator',
      'Async Generator',
      'Async Iterable',
    ].map(makeDoc(cojs)),
  },
  {
    title: 'JS 모듈',
    children: [
      '모듈',
      'JS 모듈의 변화',
      '브라우저 모듈',
      'ESM',
      'Module Reference',
    ].map(makeDoc(cojs)),
  },
  {
    title: '객체',
    path: `${cojs}/index/객체`,
    children: [
      {
        title: `객체 기본 문법`,
        path: `${cojs}/객체 기본 문법`,
      },
      {
        title: '내장 객체',
        path: `${cojs}/내장 객체`,
      },
      {
        title: `객체 프로퍼티`,
        path: `${cojs}/객체 프로퍼티`,
      },
      {
        title: `객체 메서드`,
        path: `${cojs}/객체 메서드`,
      },
      {
        title: `옵셔널 체이닝`,
        path: `${cojs}/객체 옵셔널체이닝`,
      },
      {
        title: `객체 심볼`,
        path: `${cojs}/객체 심볼`,
      },
      {
        title: `객체 원시형 변환`,
        path: `${cojs}/객체 원시형 변환`,
      },
      {
        title: `프로토타입 상속`,
        path: `${cojs}/객체 프로토타입 상속`,
      },
      {
        title: `함수의 prototype 프로퍼티`,
        path: `${cojs}/객체 함수의 prototype 프로퍼티`,
      },
      {
        title: `네이티브 프로토타입`,
        path: `${cojs}/객체_네이티브_프로토타입`,
      },
      {
        title: `프로토타입 메서드와 __proto__가 없는 객체`,
        path: `${cojs}/객체_프로토타입 메서드와 __proto__가 없는 객체`,
      },
      {
        title: `airbnb 객체 스타일 가이드`,
        path: `${airbnb}/Objects`,
      },
      {
        title: `Reference`,
        path: `${cojs}/객체 Reference`,
      },
    ].map(v => {
      v.sidebarDepth = 2;
      return v;
    }),
  },
  {
    title: 'Browser',
    path: `${cojs}/index/Browser`,
    children: [
      {
        title: `Browser`,
        path: `${cojs}/Browser`,
      },
      {
        title: `BOM`,
        path: `${cojs}/Browser_BOM`,
      },
      {
        title: `DOM`,
        path: `${cojs}/Browser_DOM`,
      },
      {
        title: `DOM Tree`,
        path: `${cojs}/Browser_DOM_Tree`,
      },
      {
        title: `DOM Search`,
        path: `${cojs}/Browser_DOM_Search`,
      },
      {
        title: `Compiler`,
        path: `${cojs}/Browser_Compiler.md`,
      },
      {
        title: `HTML Parser`,
        path: `${cojs}/browser_Rendering_HTML_Parser`,
      },
      {
        title: `DOM API`,
        path: `${cojs}/Browser_DOM_API`,
      },
      {
        title: `CSS 파싱`,
        path: `${cojs}/Browser_Rendering_CSS_Parsing`,
      },
      {
        title: `렌더트리 구축`,
        path: `${cojs}/Browser_Rendering_RenderTree`,
      },
      {
        title: `Reflow Repaint`,
        path: `${cojs}/Browser_DOM_Reflow_Repaint`,
      },
      {
        title: `성능 최적화`,
        path: `${cojs}/Browser_성능_최적화`,
      },
      {
        title: `이벤트`,
        path: `${cojs}/Browser_Event`,
      },
      {
        title: `버블링과 캡쳐링`,
        path: `${cojs}/Browser_Bubling_Capturing.md`,
      },
      {
        title: `이벤트 위임`,
        path: `${cojs}/Browser_Event_Delegation.md`,
      },
      {
        title: `이벤트 기본 동작`,
        path: `${cojs}/Browser_Default_Action.md`,
      },
      {
        title: `커스텀 이벤트 디스패치`,
        path: `${cojs}/Browser_event_custom_dispatch`,
      },
      {
        title: `마우스 이벤트`,
        path: `${cojs}/browser_mouse_event`,
      },
      {
        title: `마우스 drag & drop`,
        path: `${cojs}/Browser_event_mouse-drag-and-drop`,
      },
      {
        title: `Pointer 이벤트`,
        path: `${cojs}/Browser_pointer_events`,
      },
      {
        title: `Reference`,
        path: `${cojs}/Browser Reference`,
      },

    ].map(v => {
      v.sidebarDepth = 2;
      return v;
    }),
  },
  {
    title: 'HTML',
    path: `${cojs}/index/HTML`,
    children: [
    ].map(v => {
      v.sidebarDepth = 2;
      return v;
    }),
  },
  getSideBar({ folder: '/dev/core-javascript/statements-declarations', title: 'Statements & declarations' }),
];


