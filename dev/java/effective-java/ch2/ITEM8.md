# ITEM8 finalizer 와 cleaner 사용을 피하라
이번 내용은 잘 와닿지 않아서 내용을 적기만 하였습니다. 얼마나 의미가 있을까 모르겠네요
`try-with-resources`를 위한 내용인 것 같기도 합니다.

## 문제점들 
자바의 두가지 객체 소멸자 `finalizer` `cleaner`
- 예측이 어려움
- 일반적으로 불필요함
- 오동작, 낮은성능, 이식성 문제, 위험성

### 즉시 실행된다는 보장이 없다.
- 객체에 접근할 수 없게 된 후 finalizer / cleaner 의 수행시점을 알 수 없다.
- finalizer / cleaner 의 수행은, 전적으로 GC 알고리즘에 달렸다.
- finalizer 스레드는 다른 애플리케이션 스레드보다 우선순위가 낮아 실행 기회를 제대로 얻지 못할 수 있다.
- cleaner 는 자신을 수행할 스레드를 제어할 수 있다.

### 수행 여부를 보장하지 않는다.
데이터베이스 같은 공유 자원의 영구 Lock 해제를 finalizer 나 cleaner 에 맡겨 놓으면 분산 시스템 전체가 서서히 멈출것 ? 
- 상태를 영구적으로 수정하는 작업에서는 절대 의존해선 안된다.

### finalizer 동작 중 발생한 예외는 무시된다.
경고 조차 출력하지 않음.

잡지 못한 예외 때문에 해당 객체는 자칫 마무리가 덜 된 상태로 남을 수 있다.

- cleaner 를 사용하는 라이브러리는 자신의 스레드를 통제하기 때문에 이런 문제가 없다.

### 심각한 성능 문제
GC 의 효율을 떨어 뜨린다.

### finalizer 공격에 노출되어 심각한 보안 문제
finalizer 공격 원리
- 생성자나 직렬화 과정에서 예외가 발생하면,        
생성 되다만 객체에서 악의적인 하위 클래스의 finalizer 가 수행될 수 있다.

#### 악의적인 하위 클래스의 finalizer    
- finalizer 는 정적 필드에 자신의 참조를 할당하여 GC 가 수집하지 못하게함

객체 생성을 막으려면 생성자에서 예외를 던지는 것만으로 충분하지만, finalizer 가 있다면 그렇지 않다.
- final 클래스는 하위 클래스를 만들수 없으니 finalizer 공격에서 안전함.
- final 클래스가 아니면, 아무일도 하지 않는 finalize 메서드를 만들고 final 로 선언하자.

> ?? 실제 finalizer 공격이 발생한 사례가 무엇이 있을까?

## finalizer / cleaner 의 대안

### AutoClosable 의 구현

### 클라이언트에서 인스턴스를 다 쓰고나면 close 메서드 호출
예외가 발생해도 제대로 종료되도록 `try-with-resources` 를 사용 [9]

### 인스턴스 자신이 닫혔는지 추적하기
1. close 메서드 에서, 객체가 유효하지 않음을 필드에 기록한다.
1. 다른 메서드는 이 필드를 검사해서 객체가 닫힌 후 불렸다면 IllegalStateException 을 던진다.

> ?? 2 번의 방법은 어떻게 쓰이는 것일까? 얼마나 쓰일까? 

## finalizer / cleaner 의 쓰임새

### 클라이언트가 하지 않은 자원회수를 늦게라도 해주는게 낫다.
FileInputStrean, FileOutputStream, ThreadPoolExecutor 가 대표적으로
안전망 역할의 finalizer 를 제공함.

### 네이티브 피어와 연결된 객체

#### Native Peer
- 일반 자바 객체가 네이티브 메서드를 통해 기능을 위임한 네이티브 객체
- 네이티브 피어는 자바 객체가 아니니 GC 는 존재를 알지 못하여 회수하지 않음

#### 조건
- 성능저하를 감당할 수 있어야 한다.
- 네이티브피어가 심각한 자원??을 가지고 있지 않아야 한다.

#### close 메서드
- 성능저하를 감당할 수 없음
- 네이티브 피어가 사용하는 자원을 즉시 회수해야 할 경우

close 메서드를 사용해야 한다.

### cleaner 
cleaner 는 사용하기에 조금 까다롭다.

Room 클래스로 이 기능을 설명하고 있다.
- room 을 수거하기 전, 반드시 clean 청소 해야 한다.
- Room 클래스는 AutoCloseable 을 구현한다.
- 자동 청소 안전망이 cleaner 를 사용하지 말지는 내부 구현 방식에 관한 문제다.
    - finalizer 와 달리 cleaner 클래스의 public API 에 나타나지 않는다. ??

cleaner 를 안전망으로 활용하는 AutoCloseable 클래스    
```java
public class Room implements AutoCloseable {
    private static final Cleaner cleaner = Cleaner.create();
        
    // 청소가 필요한 자원. 절대 Room 을 참조해선 안된다.
    // Room 인스턴스를 호출할 경우 순환참조가 생겨 GC 가 Room 인스턴스를 회수하지 않음
    // 정적이 아닌 중첩 클래스는 자동으로 바깥 객체의 참조를 갖는다.
    // 람다도 바깥객체의 참조를 갖기 쉽다.
    private static class State implements Runnable {
        int numJunkPiles;   // Room 안의 쓰레기 수
        
        State(int numJunkPiles) {
            this.numJunkPiles = numJunkPiles;
        }
    
        // close 메서드나, cleaner 가 호출된다. .. 
        // cleanable 에 의해 딱 한번 호출된다고 함.
        // 보통은 Room 의 close 를 호출할 때 호출됨
        // GC 가 Room 을 회수할 때까지 클라이언트가 close 를 호출하지 않는다면 
        // cleaner 가 State 의 run 메서드를 호출 할 것임.
        @Override public void run() {
            System.out.println("방 청소");
            numJunkPiles = 0;
        }
    }

    // 방의 상태, cleanable 과 공유함.
    private final State state; 

    // Cleanable 객체, 수거 대상이 되면 방을 청소한다.
    private final Cleaner.Cleanable cleanable;

    public Room(int numJunkPiles) {
        state = new State(numJunkPiles);
        cleanable = cleaner.register(this, state);
    }

    @Override public void close() {
        cleanable.clean();
    }
} 
```

클라이언트가 모든 Room 생성을 `try-with-resources` 블록으로 감쌌다면 자동 청소는 전혀 필요하지 않다.
`System.out.println("방 청소");` 가 같이 실행 될 것이다. 
```java
public class Adult {
    public static void main(String[] args) {
        try (Room myRoom = new Room(7)) {
            System.out.println("hi~");
        }
    }
}
```

만약 `try-with-resources` 블록 이 없다면,
`System.out.println("방 청소");` 가 출력되지 않을 수 있다.
clean 의 예측할 수 없는 특징 때문이다.
