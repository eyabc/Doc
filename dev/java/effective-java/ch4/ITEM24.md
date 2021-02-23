# ITEM24 멤버 클래스는 되도록 static 으로 만들라

## 중첩 클래스 nested class
다른 클래스 안에 정의된 클래스

- 자신을 감싼 **바깥 클래스** 에서만 쓰여야 한다.

종류 4 가지
- static 멤버 클래스, 정적 멤버 클래스
- 내부 클래스
    - (비정적) 멤버 클래스
    - 익명 클래스
    - 지역 클래스

이 장에서는
- 각각의 중첩 클래스의 용도와 사용이유에 대해 서술하고 있다.

## 정적 멤버 클래스 static member class

### 특징
일반 클래스와의 차이점 빼고는 같다

차이점
1. 중첩 클래스임
2. 바깥 클래스의 private 멤버에 접근할 수 있다.

정적 멤버와 접근 규칙이 같다.
- **private** static 멤버 클래스 → 바깥 클래스에서만 접근 가능

### 용도
흔히 바깥 클래스와 함께 쓰일 때만 유용한 **public 도우미 클래스**로 쓰임

- Calculator 클래스 
    - public 정적 멤버 클래스 Operation 열거 타입
    - `Calculator.Operation.PLUS`, `Calculator.Operation.MINUS` 
    
## 정적 멤버 클래스와 비정적 멤버 클래스

### 구문상 차이
static 의 여부

### 멤버 클래스의 인스턴스와 바깥 인스턴스의 관계
#### (비정적) 멤버 클래스
정적 멤버 클래스의 인스턴스는 바깥 클래스의 인스턴스와 암묵적으로 연결된다.

> 정규화된 this
> - `클래스명.this` 형태로 바깥 클래스의 이름을 명시하는 용법

비정적 멤버 클래스의 인스턴스 메서드에서,      
*정규화된 this* 를 사용해 바깥 인스턴스 메서드를 호출하거나, 바깥 인스턴스의 참조를 가져올 수 있다.

##### 관계 
- **멤버 클래스가 인스턴스화 할 때** 확립된다.
- 확립된 관계는 변경할 수 없다.
- 자동생성 
    - 바깥 클래스의 인스턴스 메서드에서, 비정적 멤버 클래스의 생성자를 호출
- 수동 생성
    - 드물게, 직접 `바깥 인스턴스의 클래스.new member Class(args)` 를 호출 
- 관계정보는 비정적 멤버 클래스의 인스턴스 안에 만들어짐 → 메모리와 생성 시간을 소비
    - 가비지 컬렉션이 바깥 클래스의 인스턴스 수거를 못하는 메모리 누수가 생길 수 있다.

##### 어댑터를 정의할 때 자주 쓰인다.
어떤 클래스의 인스턴스를 감싸, 마치 다른 클래스의 인스턴스처럼 보이게 하는 뷰

```java
public class MySet<E> extends AbstractSet<E> {
    
    @Override public Iterator<E> iterator() {
        return new MyIterator();
    }
    
    private class MyIterator implements Iterator<E> {
        // 자신의 반복자를 구현하는 비정적 멤버 클래스
    }
}
``` 
Map 인터페이스 구현체들은 보통 자신의 컬렉션 뷰를 구현할 때 비정적 멤버 클래스를 사용함
- KeySet, entrySet, values

```java
public class TreeMap<K,V>
    extends AbstractMap<K,V>
    implements NavigableMap<K,V>, Cloneable, java.io.Serializable
{
    class EntrySet extends AbstractSet<Map.Entry<K,V>> {
        
    }
    // ...
}
```

Set, List ...

```java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    private class Itr implements Iterator<E> { /* ... */ }
    private class SubList extends AbstractList<E> implements RandomAccess {
        public E set(int index, E e) {
            ArrayList.this.elementData[offset + index] = e;
            // ...
        }

        public E get(int index) {
            // ...
            return ArrayList.this.elementData(offset + index);
        }
    }
}
```

메서드 밖에서도 사용해야 하거나 메서드 안에 정의하기에 너무 길때 사용한다

#### 정적 멤버 클래스
중첩 클래스의 인스턴스가 바깥 인스턴스와 독립적으로 존재할 때 사용

## private 정적 멤버 클래스
- 바깥 클래스에서만 접근 가능

### 사용 용도
바깥 클래스가 표현하는 객체의 한 부분(구성요소)을 나타낼 때 쓰임

Map 인스턴스
- 엔트리의 메서드들 (getKey, getValue, setValue) 는 맵을 직접사용하지 않음     
→ 정적 멤버 클래스가 적당함

공개된 바깥 클래스의, public / protected 접근자를 가진 정적 멤버 클래스는 공개 API 되므로 주의해야 한다.

```java
public class TreeMap<K,V>
    extends AbstractMap<K,V>
    implements NavigableMap<K,V>, Cloneable, java.io.Serializable
{
    static final class Entry<K,V> implements Map.Entry<K,V> {
        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
        public V setValue(V value) {
            V oldValue = this.value;
            this.value = value;
            return oldValue;
        }
    }
}
```

## 익명 클래스
- 바깥 클래스의 멤버가 아니다.
- 쓰이는 시점에, 선언과 동시에 인스턴스가 생성됨
- 코드의 어디에서든 만들 수 있다.

### 사용 문맥
#### 비정적 문맥
바깥 클래스의 인스턴스 참조 가능

#### 정적 문맥
상수 변수 이외의 정적 멤버는 가질 수 없다.

상수 표현을 위해 초기화 된 final 기본 타입과 문자열 필드만 가질 수 있다.

### 제약사항
1. 선언한 지점에서만 인스턴스를 만들수 있다.
2. `instanceof` 검사나 클래스의 이름이 필요한 작업 수행 불가
3. 여러 인터페이스를 구현할 수 없다.
4. 인터페이스를 구현하는 동시에 다른 클래스를 상속할 수 없다.
5. 클라이언트는 익명 클래스가 상위타입에서 상속한 멤버 외에는 호출할 수 없다. ??
6. 표현식 중간에 등장하므로 짧지(10줄)않으면 가독성이 떨어진다.

### 사용 용도
- 중첩 클래스가 한 메서드 안에서만 쓰일 때
- 인스턴스를 생성하는 지점이 단 한 곳일 때
- 해당 타입으로 쓰기에 적합한 클래스나 인터페이스가 있을 때

#### 람다 지원 이전
즉석에서 작은 함수 객체(??) 처리 객체(??) 를 만드는데 주로 사용함

#### 정적 팩터리 메서드 구현
[20] 의 intArrayAsList 참조

## 지역 클래스

### 특징
- 가장 드물게 사용됨
- 지역변수를 선언할 수 있는 곳이라면 어디서든 선언 가능
- 유효 범위도 지역변수와 같다
- 멤버 클래스처럼, 이름이 있고 반복해서 사용할 수 있다
- 익명 클래스처럼, 비정적 문맥에서 사용될 때만 바깥 인스턴스를 참조할 수 있다
- 정적 멤버는 가질 수 없다.
- 가독성을 위해 짧게 작성해야 한다.

More Reference
--
- [https://jsnote.tistory.com/21](https://jsnote.tistory.com/21)



