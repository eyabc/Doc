const { makeDoc, getSideBar } = require('../util');

module.exports = [
  {
    title: '미분류',
    children: [
      '문법 사전',
      '자바스크립트 스타일 가이드',
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
      '객체',
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
    ].map(makeDoc('/dev/core-javascript')),
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
    ].map(makeDoc('/dev/core-javascript')),
  },
  {
    title: 'JS 모듈',
    children: [
      '모듈',
      'JS 모듈의 변화',
      '브라우저 모듈',
      'ESM',
      'Module Reference'
    ].map(makeDoc('/dev/core-javascript')),
  },
  getSideBar({ folder: '/dev/core-javascript/statements-declarations', title: 'Statements & declarations' }),
];


