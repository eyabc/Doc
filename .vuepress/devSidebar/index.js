const javascript = require('./javascript.js');
const java = require('./java.js');

const root = '/dev/';

const { getSideBar } = require('../util.js');

module.exports = [
  getSideBar({ folder: '/dev-nodes', title: '전체글' }),
  {
    title: '자바스크립트',
    children: javascript,
  },
  {
    title: '자바',
    children: java,
  },
  {
    title: '스터디',
    children: [
      getSideBar({ folder: '/dev/dku-javascript-study', title: '자바스크립트 스터디' }),
      getSideBar({ folder: '/dev/dku-study/cat-search', title: 'Cat Search' }),
      getSideBar({ folder: '/dev/운영체제', title: '운영체제' }),
      getSideBar({ folder: '/dev/TDD_CleanCode', title: 'TDD CleanCode' }),
    ],
  },
  getSideBar({ folder: '/dev/react', title: '리액트' }),
  {
    title: 'Tutorials',
    children: [
      getSideBar({ folder: '/dev/book-springboot-aws', title: '스프링 부트와 AWS 로 혼자 구현하는 웹 서비스' }),
    ],
  },
  getSideBar({ folder: '/dev/my-project', title: '참여 프로젝트' }),
  getSideBar({ folder: '/dev/spring', title: 'Spring' }),
  getSideBar({ folder: '/dev/network', title: '네트워크' }),
  getSideBar({ folder: '/dev/design-pattern', title: '디자인 패턴' }),
].map(v => {
  v.sidebarDepth = 2;
  return v;
});
