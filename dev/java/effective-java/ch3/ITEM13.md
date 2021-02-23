# ITEM13 clone 재정의는 주의해서 진행하라

- Cloneable 은 여러가지 문제를 안고 있다.
- 기본 원칙은 '복제 기능은 생성자와 팩터리를 이용하는게 최고다'
- 단 배열만은 clone 메서드 방식이 가장 깔끔한, 규칙의 예외다.

## Cloneable
- 복제해도 되는 클래스임을 명시하는 용도인 믹스인 인터페이스[20](./ITEM20)
- 여러문제에도 불구하고 널리 쓰인다.

### Cloneable 의 문제점
Cloneable 을 구현하는 것 만으로 외부 객체에서 clone 메서드를 호출 할 수 없는 이유
- clone 메서드가 Cloneable 이 아닌 Object 에 선언되어 있다. 
- clone 메서드는 protected 이다

### Cloneable 인터페이스의 역할
메서드 하나 없지만 놀라운 일을 한다.

- Object 의 protected 메서드인 clone 의 동작 방식을 결정한다.
- Cloneable 을 구현한 클래스의 인스턴스에서 clone 을 호출할 때
    - 그 객체의 필드들을 하나하나 복사한 객체를 반환한다.
- 그렇지 않은 클래스의 인스턴스에서 호출하면 `CloneNotSupportedException` 을 던진다.
    
#### 일반적으로, 인터페이스를 구현한다는 것은
해당 클래스가 그 인터페이스에서 정의한 기능을 제공한다고 선언하는 행위

#### 이례적으로, Cloneable 은 
상위 클래스(Object)에 정의된 protected 메서드(clone)의 동작 방식을 변경함.

## clone 메서드의 일반 규약
- 이 객체의 복사본을 생성해 반환
    - 복사는 구현한 클래스에 따라 다를 수 있음

`true` 가 필수 
- `x.clone() != x`
- `x.clone().getClass == x.getClass()`

일반적으로 `true` 지만 필수가 아닌 것
- `x.clone().equals(x)`

**관례상**
- 메서드가 반환하는 객체는 `super.clone` 을 호출해 얻어야 한다. 관례를 따른다면 다음은 참이다
    - `x.clone().getClass() == x.getClass()`
- 반환된 객체와 원본 객체는 독립적 이어야 한다.

### 취약점
Object 명세의 clone 메서드의 일반 규약은 허술하다.

- clone 메서드가 super.clone 이 아닌, 
생성자를 호출해 얻은 인스턴스를 반환해도 컴파일 문제 없음
- 이 클래스의 하위 클래스에서 super.clone 호출 → 상위 클래스의 객체를 반환
- final 클래스라면 이 문제에 해당하지 않는다. 
    - 그러나 super.clone 을 호출하지 않는다면, Cloneable 을 구현할 이유도 없다.

## 불변 상태만 참조하는 클래스용 clone 메서드
- 모든 필드가 기본타입 이거나 불변 객체를 참조한다면 객체는 완벽히 복사된다.
- 쓸데없는 복사를 지양한다는 관점에서, 불변 클래스는 굳이 clone 메서드를 제공하지 않는 것이 좋다.
```java
// PhoneNumber 는 불변 클래스
// PhoneNumber 클래스는 Cloneable 를 구현 하였음
@Override public PhoneNumber clone() {
    // try-catch 
    // Object clone 메서드가 CloneNotSupportedException 을 던지도록 선언 되었기 때문
    try {
        // Object 의 clone 메서드는 Object 를 반환하지만
        // PhoneNumber 의 clone 메서드는 PhoneNumber를 반환한다.
        return (PhoneNumber) super.clone(); 
    } catch (CloneNotSupportedException e) {
        // 일어날 수 없는 일이다. 절대 실행되지 않음
        // PhoneNumber 가 Cloneable 을 구현하지 않았을 때
        throw new AssertionError(); 
    }
}
```

## 가변 상태를 참조하는 클래스용 clone 메서드

### 문제점
[ITEM7](./../ch2/ITEM7) 의 Stack 클래스의 
`elements` 필드는 원본 Stack 인스턴스와 **똑같은 배열을 참조하여 불변식을 해친다.**
```java
public class Stack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;
    
    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }
    
    // ...
}
```

### 참조 타입의 재귀적 clone 호출로 해결 : 배열
스택 내부 정보를 복사할 때 elements 배열의 clone 을 재귀적으로 호출해 준다.
```java
@Override public Stack clone() {
    try {
        Stack result = (Stack) super.clone();
        result.elements = elements.clone();
        return result;
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}
```

### 참조 타입이 final 일 때 문제점
final 필드는 새로운 값을 할당할 수 없다.

error! `result.elements = elements.clone();`

복제할 수 있는 클래스를 만들기 위해 final 을 제거해야 한다.
- 일반용법, **가변 객체를 참조하는 필드는 final 로 선언하라** 와 충돌함

### 참조 타입의 재귀적 clone 호출로 해결되지 않는 문제 : 해시테이블
```java
public class HashTable implements Cloneable {
    private Entry[] buckets = ...;
    
    private static class Entry {
        final Object key;
        Object value;
        Entry next;
    
        Entry(Object key, Object value, Entry next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }
    // ...
}
``` 

#### 잘못된 clone 메서드 - 가변 상태를 공유함
- 복제본은 자신만의 buckets 배열을 가진다.
```java
@Override public HashTable clone() {
    try {
        HashTable result = (HashTable) super.clone();
        result.buckets = buckets.clone();
        return result;
    } catch (CloneNotSupportedException e) {
              throw new AssertionError();
    }
}
```
buckets 배열은 원본과 같은 연결 리스트를 참조한다
- 원본 복제본 모두 예기치 않은 동작이 일어날 수 있다.
- **각 버킷을 구성하는 연결 리스트를 복사**하여 해결한다.

#### 복잡한 가변 상태를 갖는 클래스용 재귀적 clone 메서드
다음 예제는, 버킷이 너무 길지 않다면 잘 작동한다.
리스트가 길면 스택오버플로를 일으킬 위험이 있기 때문에 좋은 방법은 아니다.

```java
public class HashTable implements Cloneable {
    private Entry[] buckets = ...;

    private static class Entry {
        final Object key;
        Object value;
        Entry next;
    
        Entry(Object key, Object value, Entry next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
    
        // 이 엔트리가 가리키는 연결 리스트를 재귀적으로 복사
        Entry deepCopy() {
            return new Entry(key, value,
                next == null ? null : next.deepCopy());
        }
    }
    /*
        super.clone 을 호출하여 얻은 객체의 모든 필드를 초기 상태로 설정한 다음
        원본 객체의 상태를 다시 생성하는 고수준의 메서드들을 호출한다. 
        간단하고 우아한 코드를 얻게 되지만 저수준에서 바로 처리할 때보다는 느리다.
        Cloneable 아키텍처의 기초가 되는 필드 단위 객체 복사를 우회하기 때문에
        전체 Cloneable 아키텍처와는 어울리지 않는 방식이기도 하다.
    */
    @Override public HashTable clone() {
        try {
            HashTable result = (HashTable) super.clone();
            result.buckets = new Entry[buckets.length];
            for (int i = 0; i < buckets.length; i++) 
                if (buckets[i] != null)
                    result.buckets[i] = buckets[i].deepCopy();
            return result;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();            
        }
    }
    // ...
}
```

#### 엔트리 자신이 가리키는 연결 리스트를 반복적으로 복사한다.
```java
Entry deepCopy() {
    Entry result = new Entry(key, value, next);
    for (Entry p = result; p.next != null; p = p.next) 
        p.next = new Entry(p.next.key, p.next.value, p.next.next);
    return result
}
```

## 주의사항

#### 1. clone 메서드 안에서 재정의 될 수 있는 메서드를 호출하면 안된다.[19]
- 만약 clone 이 하위 클래스에서 재정의한 메서드를 호출하면, 하위 클래스는 복제 과정에서 자신의 상태를 교정할 기회를 잃어 버리게 되어 원본과 복제본의 상태가 달라질 수 있다. ??
- 앞서 용법에서 `put(key, value)` 기능은 final 이거나 private 이어야 한다.

#### 2. Object 의 clone 메서드는 CloneNotSupportedException 을 던진다. 그러나 재정의한 메서드는 그렇지 않다.
- public 인 clone 메서드에서는 throws 절을 없애야 한다.[71]??
    
#### 3. 상속용 클래스는 Cloneable 을 구현해서는 안된다.
해결방법
1. Object 를 상속할 때 처럼, Cloneable 구현 여부를 하위 클래스에서 선택할 수 있게함.
    - 제대로 작동하는 protected clone 메서드를 구현
    - CloneNotSupportedException 을 던질 수 있다고 선언
     
2. 하위 클래스에서 Cloneable 을 지원하지 못하게 하는 clone 메서드
```java
@Override
protected final Object clone() throws ConeNotSupportedException {
    throw new CloneNotSupportedException();
}
```

#### 4. Cloneable 을 구현한 스레드 안전 클래스를 작성할 때는 clone 메서드도 동기화 필요[78]

## 요약
Cloneable 을 구현하는 모든 클래스는 clone 을 재정의 해야 한다.
- 접근제한자 : public
- 반환타입 : 클래스 자신
- super.clone 호출 후 적절히 수정하기
    - 깊은 구조에 숨어있는 모든 가변 객체 복사
    - 복제본이 가진 객체 참조 모두가 복사된 객체를 가리키게 하기
    - 기본 타입 필드와 불변 객체 참조만 갖는 클래스라면 아무 필드도 수정할 필요가 없다.
    - 일련번호나 고유 ID 는 비록 기본 타입이나 불변일지라도 수정해 준다.
    
## 복사의 또다른 방법
Cloneable 의 방법은 복잡하다.
Cloneable 을 이미 구현한 클래스를 확장한다면 어쩔 수 없이 clone 을 잘 동작하도록 구현해야 한다.

### 복사 생성자
단순히 자신과 같은 클래스의 인스턴스를 인수로 받는 생성자
```java
public Yum(Yum yum) { ... }
```

### 복사 팩터리
복사 생성자를 모방한 정적 팩터리[1]
```java
public static Yum newInstance(Yum yum) { ... }
```

### 장점

### Cloneable 의 단점 보완
- 언어 모순적이고 위험천만한 객체 생성 매커니즘을 사용하지 않는다.
- 엉성한 문서화규약에 의존하지 않음
- 정상적인 final 필드 용법과도 충돌하지 않음
- 불필요한 검사 예외를 던지지 않음
- 형변환 불필요

### 복사 생성자/팩터리의 장점
해당 클래스가 구현한 인터페이스 타입의 인스턴스를 인수로 받을 수 있다.

- 변환 생성자/팩터리 (conversion ...)
    - 인터페이스 기반 복사 생성자/팩터리
- 모든 범용 컬렉션 구현체는 Collection 이나 Map 타입을 받는 생성자를 제공함
- 클라이언트는 원본의 구현 타입에 얽매이지 않고 복제본의 타입을 직접 선택할 수 있음
    - HashSet 객체 s 를 TreeSet 타입으로 복제할 수 있다.
    - `new TreeSet<>(s)`
