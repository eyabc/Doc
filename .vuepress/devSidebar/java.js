const { makeDoc, getSideBar } = require('../util');

const EFFECTIVE_JAVA = '/dev/java/effective-java';
const EFFECTIVE_JAVA_CH2 = `${EFFECTIVE_JAVA}/ch2`;
const EFFECTIVE_JAVA_CH3 = `${EFFECTIVE_JAVA}/ch3`;

module.exports = [
  {
    title: 'Effective Java',
    children: [
      {
        title: 'Ch1 들어가기',
        path: `${EFFECTIVE_JAVA}/들어가기`,
      },
      {
        title: 'Ch2 객체 생성과 파괴',
        path: `${EFFECTIVE_JAVA_CH2}/index`,
        children: [
          {
            title: `ITEM1 정적 팩터리 메서드`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM1`,
          },
          {
            title: `ITEM2 생성자에 매개변수가 많다면 빌더를 고려하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM2`,
          },
          {
            title: `ITEM3 private 생성자나 열거 타입으로 싱글턴임을 보증하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM3`,
          },
          {
            title: `ITEM4 인스턴스화를 막으려거든 private 생성자를 사용하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM4`,
          },
          {
            title: `ITEM5 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM5`,
          },
          {
            title: `ITEM6 불필요한 객체 생성을 피하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM6`,
          },
          {
            title: `ITEM7 다 쓴 객체 참조를 해제하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM7`,
          },
          {
            title: `ITEM8 finalizer 와 cleaner 사용을 피하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM8`,
          },
          {
            title: `ITEM9 try-finally 보다는 try-with-resources 를 사용하라`,
            path: `${EFFECTIVE_JAVA_CH2}/ITEM9`,
          },
        ],
      },
      {
        title: 'Ch3 모든 객체의 공통 메서드',
        path: `${EFFECTIVE_JAVA_CH3}/index`,
        children: [
          {
            title: `ITEM10 equals 는 일반 규약을 지켜 재정의하라`,
            path: `${EFFECTIVE_JAVA_CH3}/ITEM10`,
          },
          {
            title: `ITEM11 equals 를 재정의하려거든 hashCode 도 재정의하라`,
            path: `${EFFECTIVE_JAVA_CH3}/ITEM11`,
          },
        ]
      }
    ],
  },
];
