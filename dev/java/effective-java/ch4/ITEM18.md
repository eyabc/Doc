# ITEM18 상속보다는 컴포지션을 사용하라

이번 장에서 논하는 문제는, 인터페이스 상속과는 무관함.

## 불안전한 상속
- 항상 재사용의 최선은 아니다 → 컴포지션 사용!
- 오류를 내기 쉬운 소프트웨어를 만들게 된다.
- 다른 패키지의 구체 클래스를 상속하는 일은 위험하다.

## 안전한 상속
- 코드를 재사용하는 강력한 수단이다
- 상위 클래스와 하위 클래스를 모두 같은 프로그래머가 통제하는, 패키지 안에서라면 안전한 방법이다
- 확장 목적으로 설계 + 문서화도 잘된 클래스

## 불안전한 상속의 문제점

### 메서드 호출과 달리 상속은 캡슐화를 깨뜨린다.
상위클래스의 구현 → 하위 클래스의 동작에 영향

상위클래스의 변화
- 릴리스에 따라 내부구현이 달라질수 있음 
- 하위클래스는 상위클래스에 맞춰 수정되어야함.

 
### 상속을 잘못 사용한 예        
- `InstrumentedHashSet<E>` 클래스는 `HasSet<E>` 를 확장한다.
- HashSet 의 성능을 높이기 위해 처음 생성 이후 원소가 몇개 더해졌는지 (증가만 하는 수) 알수 있어야함
- add, addAll 을 재정의 하였다.

```java
public class InstrumentedHashSet<E> extends HashSet<E> {
    private int addCount = 0;
    
    public InstrumentedHashSet() { }
    public InstrumentedHashSet(int initCap, float loadFactor) {
        super(initCap, loadFactor);
    }   

    @Override public boolean add(E e) {
        addCount++;
        return super.add(e);
    }

    @Override public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return super.addAll(c);
    }
    
    public int getAddCount() {
        return addCount;
    }
}
```
```java
InstrumentedHashSet<String> s = new InstrumentedHashSet<>();
s.addAll(List.of("틱", "탁탁", "펑"));
s.getAddCount();    // 6을 반환
```
- HashSet 의 addAll 메서드가 add 메서드를 사용해 구현됨 → 6 출력
- 이런 내부구현방식은 HashSet 문서에 쓰여있지 않다.
- 자기 사용 self-use 여부는 해당 클래스의 내부 구현 방식이다. 
- 내부 구현 방식은 다음 릴리스에서도 유지될 지 알 수 없다. 

문제해결
- addAll 메서드를 재정의 하지 않는다.
- 하위 클래스에서 메서드를 재정의 하는 대신, 새로운 메서드를 추가하는 일도 위험할 수 있다.
    - 다음 릴리스에서 상위클래스에 새 메서드가 추가 될 때,
    - 하위 클래스에서 정의한 메서드와 시그니처가 동일하고, 반환값이 다른 메서드를 정의할 수 있다. 

## 래퍼 클래스 - 상속 대신 컴포지션 사용
### 컴포지션 Composition; 구성
- 기존 클래스가 새로운 클래스의 구성요소로 쓰인다는 의미
- 기존 클래스를 확장하는 대신, 
- 새로운 클래스를 만들고 private 필드로 기존 클래스의 인스턴스를 참조하게 한다.

### 전달 forwarding
**새 클래스의 메서드**들은 기존 클래스의 대응하는 메서드를 호출해 그 결과를 반환함.

### 전달 메서드 forwarding method
새 클래스의 메서드들

### [래퍼 클래스](https://coding-factory.tistory.com/547)
기본 자료타입(primitive type)을 객체로 다루기 위해서 사용하는 클래스

### [데코레이터 패턴](http://www.w3big.com/ko/design-pattern/decorator-pattern.html)
구조를 변경하지 않고 기존 개체에 새로운 기능을 추가 할 수 있음 → 래퍼 클래스

### 컴포지션 + 전달 → 위임 delegation
래퍼 객체가 내부 객체에 자신의 참조를 넘기는 경우

```java
class In {
    private final int in = 0;
    
    public int add(int num) { return num + 1; }
}
class Wrapper {
    private final In in = new In(); // 내부 객체
    private final int num = 1;
    private int call() {    // 전달 메서드
        in.add(num);        // 전달
    }
}
```
    
### 특징
- 새로운 클래스는 기존 클래스의 내부 구현방식에 영향을 받지 않는다.
- 전달메서드의 성능에 주는 영향/ 메모리 사용량은 별다른 영향이 없다.

### 래퍼 클래스 - 상속대신 컴포지션 사용
```java
public class InstrumentSet<E> extends ForwardingSet<E> {
    private int addCount = 0;
    
    public InstrumentSet(Set<E> s) {
        super(s);
    }
    @Override public boolean add(E e) {
        addCount++;
        return super.add(e);
    }
    @Override public boolean addAll(Collection<? extends E> c) {
        addCount += c.size();
        return super.addAll(c);
    }
}
```
### 재사용 할 수 있는 전달 클래스
```java
public class ForwardingSet<E> implements Set<E> {
    private final Set<E> s;
    public ForwardingSet(Set<E> s) { this.s = s; }
    
    public void clear() { s.clear(); }
    public boolean contains(Object o) { return s.contains(o); }
    // ...
}
```

### 래퍼 클래스는 콜백 프레임워크와는 어울리지 않는다.
#### 콜백 프레임워크 
자신의 참조를 다른 객체에 넘겨서 다음 호출 콜백 때 사용하도록 한다.

#### SELF 문제
- 내부 객체는 자신을 감싸고 있는 래퍼의 존재를 모르니 대신 this (자신)의 참조를 넘긴다.
- 콜백 때는 래퍼가 아닌 내부 객체를 호출하게 된다. 

## 상속을 써야 하는 상황
반드시 하위 클래스가 상위 클래스의 진짜 하위타입인 상황
- is-a 관계
- 상속 → 분류

### 위반한 클래스
- Stack 은 Vector 가 아니지만 확장하고 있다
- Properties 도 HashTable 을 확장해선 안됐다.

### 컴포지션 대신 상속을 사용하기로 결정하기 전 마지막 자문
1. 확장하려는 클래스의 API 에 아무런 결함이 없는가
2. 결함이 우리의 클래스 API 까지 전파되어도 되는가

