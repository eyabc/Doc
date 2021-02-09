# 3장 모든 객체의 공통 메서드

## Object
- 객체를 만들 수 있는 구체 클래스
- 기본적으로 상속해서 사용하도록 설계됨
- final 이 아닌 메서드 equals, hashCode, toString, clone, finalize
    - 모두 overriding 을 염두에 두고 설계되었다.
    - 재정의 시 지켜야 하는 일반 규약이 명확히 정의되어 있음
    - 메서드를 잘못 구현하면 대상 클래스가 이 규약을 준수한다고 가정하는 클래스 (HashMap/HashSet 등) 를 오동작 하게 할 수 있다.

## 목표
- final 이 아닌 Object 메서드들의 정의 규약

