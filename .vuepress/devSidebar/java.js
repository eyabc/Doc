const { makeDoc, getSideBar } = require('../util');

const EFFECTIVE_JAVA = '/dev/java/effective-java';
const EFFECTIVE_JAVA_CH2 = `${EFFECTIVE_JAVA}/ch2`;
const EFFECTIVE_JAVA_CH3 = `${EFFECTIVE_JAVA}/ch3`;
const EFFECTIVE_JAVA_CH4 = `${EFFECTIVE_JAVA}/ch4`;

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
          {
            title: `ITEM12 toString 을 항상 재정의하라`,
            path: `${EFFECTIVE_JAVA_CH3}/ITEM12`,
          },
          {
            title: `ITEM13 clone 재정의는 주의해서 진행하라`,
            path: `${EFFECTIVE_JAVA_CH3}/ITEM13`,
          },
          {
            title: `ITEM14 Comparable 을 구현할지 고려하라`,
            path: `${EFFECTIVE_JAVA_CH3}/ITEM14`,
          },
        ]
      },
      {
        title: 'Ch4 클래스와 인터페이스',
        path: `${EFFECTIVE_JAVA_CH4}/index`,
        children: [
          {
            title: `ITEM15 클래스와 멤버의 접근 권한을 최소화하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM15`,
          },
          {
            title: `ITEM16 public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM16`,
          },
          {
            title: `ITEM17 변경 가능성을 최소화하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM17`,
          },
          {
            title: `ITEM18 상속보다는 컴포지션을 사용하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM18`,
          },
          {
            title: `ITEM19 상속을 고려해 설계하고 문서화 하라, 그러지 않았다면 상속을 금지하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM19`,
          },
          {
            title: `ITEM20 추상 클래스보다는 인터페이스를 우선하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM20`,
          },
          {
            title: `ITEM21 인터페이스는 구현하는 쪽을 생각해 설계하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM21`,
          },
          {
            title: `ITEM22 인터페이스는 타입을 정의하는 용도로만 사용하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM22`,
          },
          {
            title: `ITEM23 태그 달린 클래스보다는 클래스 계층구조를 활용하라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM23`,
          },
          {
            title: `ITEM24 멤버 클래스는 되도록 static 으로 만들라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM24`,
          },
          {
            title: `ITEM25 톱레벨 클래스는 한 파일에 하나만 담으라`,
            path: `${EFFECTIVE_JAVA_CH4}/ITEM25`,
          },
        ]
      }
    ],
  },
];
