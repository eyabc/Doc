# ITEM3 private 생성자나 열거 타입으로 싱글턴임을 보증하라

## Singleton
인스턴스를 오직 하나만 생성할 수 있는 클래스

### 대상
- 함수와 같은 무상태 객체 ??
- 설계상 유일해야 하는 시스템 컴포넌트

### 한계
싱글턴 클래스를 사용하는 클라이언트를 테스트하기 어렵다.
- 싱글턴 인스턴스를 mock 구현으로 대체할 수 없다.
- 방법은 있다. 타입을 인터페이스로 정의한 다음, 그 인터페이스를 구현해 싱글턴으로 만든다. 

## Singleton 생성 방식
- 생성자는 private 으로 감춘다.
- 유일한 인스턴스에 접근할 수 있는 수단으로 `public static` 멤버를 하나 만든다.
- 리플렉션 공격 : 클라이언트에서 [65]AccessibleObject.setAccessible 을 사용해 private 을 호출할 수 있는 취약점
    - 생성자에서 두 번째가 객체생성되려 할 때 예외를 던지는 코드를 추가해 준다.

### 1. public static final 필드 방식의 싱글턴
```java
public class Elvis {
    public static final Elvis INSTANCE = new Elvis();
    private Elvis() { /* ...*/ }
    
    public void leaveTheBuilding() { /* ... */ } 
}
```
- 해당 클래스가 싱글턴임이 API 에 명백히 드러난다.
- 간결하다

### 2. 정적 팩터리 방식의 싱글턴
```java
public class Elvis {
    private static final Elvis INSTANCE = new Elvis();
    private Elvis() { /*... */ }
    public static Elvis getInstance() { return INSTANCE; }
}
``` 
1. API 를 바꾸지 않고도 싱글턴이 아니게 변경할 수 있다.
    - 스레드 별로 다른 인스턴스를 넘겨주게 할 수 있다.
        - DataSourceLookupKeyContextHolder 구현..

2. 정적 팩터리를 제네링 싱글턴 팩터리로 만들 수 있다[30] ?? 
3. 정적 팩터리의 메서드 참조를 공급자(supplier) 로 사용할 수 있다 ??
> java 를 잘 몰라서... 

이러한 장점들이 굳이 필요하지 않으면 public 필드 방식이 좋다.

#### 싱글턴 클래스의 직렬화[12]
Serializable 의 구현/선언 의 한계   
→ 직렬화된 인스턴스를 역직렬화 할 때마다 새로운 인스턴스가 만들어짐

1. 모든 인스턴스 필드를 일시적(transient) 로 선언
2. Elvis 클래스에 다음의 readResolve 메서드 제공 [89]

```java
private Object readResolve() {
    // 진짜 'Elvis' 를 반환하고, 가짜 Elvis 는 가비지 컬렉터에 맡긴다.
    return INSTANCE;
}
```

### 3. 원소가 하나인 열거 타입 선언
```java
public enum Elvis {
    INSTANCE;
    
    public void leaveTheBuilding() { /* ...*/ }
}
```

1. public 필드 방식보다 더 간결하다
2. 추가 노력없이 직렬화 가능
3. 복잡한 직렬화 상황이나 리플렉션 공격을 완벽히 막아준다.

대부분의 상황, 싱글턴을 만드는 가장 좋은 방법

한계
- 만드려는 싱글턴이 Enum 외의 클래스를 상속해야 한다면 사용할 수 없다.
> 어떤 상황이 있을까, Spring 을 쓰는 상황에서도 싱글턴 패턴을 직접 만드는 일이 있을까? 
- 열거 타입이 다른 인터페이스를 구현하도록 선언할 수는 있다.
