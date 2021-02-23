---

sidebarDepth: 2

---

# ITEM14 Comparable 을 구현할지 고려하라

**순서를 고려해야 하는 값 클래스를 작성** → 꼭 Comparable 인터페이스를 구현  
- 그 인스턴스들을 쉽게 정렬하고, 검색하고, 비교 기능을 제공하는 컬렉션과 어우러지도록 해야한다.   

## compareTo
Comparable 인터페이스의 유일한 메서드
- Object 메서드가 아님
- Object equals 와 유사함

## compareTo 특징
- compareTo 는 단순 동치성 비교 + **순서 비교** 
- Comparable 을 구현한 클래스
    - 객체는 자연 순서 존재
    - 객체들의 배열은 `Arrays.sort(a);` 로 정렬 가능
- Comparable 을 구현하면 이 인터페이스를 활용하는 수 많은 제네릭 알고리즘과 컬렉션의 효과를 사용할 수 있음
    - 자바 플랫폼 라이브러리의 모든 값 클래스와 열거타입[34]이 Comparable 을 구현함.
    - 알파벳, 숫자, 연대 같이 순서가 명확한 값 클래스를 작성한다면 반드시 Comparable 인터페이스를 구현하자
    - 검색, 극단값 계산, 자동 정렬되는 컬렉션 관리 가능
    - 아래 코드는 String 이 Comparable 을 구현 → 명령줄 인수들을 알파벳 순으로 출력함
    ```java
    public class WordList {
        public static void main(String[] args) {
            Set<String> s = new TreeSet<>();
            Collections.addAll(s, args);
            System.out.println(s);
        }   
    }
    ```
 
## compareTo 일반 규약
equals 규약과 유사함
```java
public interface Comparable<T> {
    int compareTo(T t);
}
```
이 객체와 주어진 객체의 순서를 비교한다.
- 이 객체가 주어진 객체보다 
    - 작으면 음의정수 반환
    - 같으면 0 반환
    - 크면 양의정수 반환
- 이 객체와 비교할 수 없는 타입의 객체가 주어지면
    - ClassCastException 을 던짐
    
> sng(표현식) 표기        
> 부호 함수(signum function)    
> 표현식의 값이 음수, 0, 양수 일 때 -1, 0, 1 을 반환하도록 정의됨

Comparable 을 구현한 클래스는
- 모든 x, y 에 대해  
    - `sng(x.compareTo(y)) == - sgn(y.compareTo(x))` 이다
    - (따라서 `x.compareTo(y)` 는 `y.compareTo(x)` 가 예외를 던질 때에 한해 예외를 던져야 한다.)
- 추이성을 보장해야 한다.
    - `(x.compareTo(y) > 0 && y.compareTo(z) > 0)` 이면 `x.compareTo(z) > 0` 이다
- 모든 z 에 대해 
    - `x.compareTo(y) == 0` 이면 `sgn(x.compareTo(z)) == sgn(y.compareTo(z))` 
- 필수는 아니지만 꼭 지키는게 좋은 항목
    - `(x.compareTo(y) == 0) == (x.equals(y))` 여야 한다.
    - compareTo 로 수행한 동치성 테스트의 결과가 equals 와 같아야 한다.
    - 권고를 지키지 않는 클래스
        - "주의: 이 클래스의 순서는 equals 메서드와 일관되지 않다." 명시해야 함
        
## equals 와 compareTo
### equals
- 모든 객체에 대해 전역 동치관계를 부여함
- 타입 캐스팅 필요

### compareTo
- 타입이 다른 객체를 신경쓰지 않아도 됨
- 타입이 다른 객체가 주어지면 ClassCastException 을 던지면 됨.
- 규약에서는 다른 타입 비교도 허용하지만,    
    보통 비교할 객체들이 구현한 공통 인터페이스(Collections, Set, Map)를 매개로 이뤄진다.
    
- hashCode 규약을 지키지 못하면 해시를 사용하는 클래스와 어울리지 못하듯,      
compareTo 규약을 지키지 못하면 비교를 활용하는 클래스와 어울리지 못한다.
    - 비교를 활용하는 클래스 
        - 정렬된 컬렉션 TreeSet, TreeMap
        - 검색과 정렬알고리즘을 활용하는 Collections, Arrays
    - 해당 컬렉션이 구현한 인터페이스(Collections, Set, Map..) 에 정의된 동작과 어울리지 못함.
        - 이 인터페이스들은 equals 메서드의 규약을 따른다고 되어 있지만, 동치성을 비교할 때 compareTo 를 사용함
- compareTo 와 equals 가 일관되지 않는 BigDecimal 클래스
    - HashSet 인스턴스를 생성한 다음
        - `new BigDecimal("1.0")`, `new BigDecimal("1.00")` 을 추가한다.
        - equals 메서드로 비교하면 서로 다르기 때문에 hashSet 은 원소를 2개 갖는다.
    - TreeSet 인스턴스를 사용하면 원소 1개 만 갖는다.
        - compareTo 메서드로 비교하면 두 bigDecimal 인스턴스가 같다.
  
## Comparable 을 구현한 클래스를 확장해 값을 추가하는 방법
- 확장하여 값을 추가할 때 compareTo 규약을 지킬 방법이 없다.      
- 컴포지션을 사용하자

## compareTo 메서드 작성 요령
[equals 와 비슷함](https://eyabc.github.io/Doc/dev/java/effective-java/ch3/ITEM10.html#equals-%EB%A9%94%EC%84%9C%EB%93%9C-%EA%B5%AC%ED%98%84-%EB%B0%A9%EB%B2%95)
1. == 연산자를 사용해 입력이 자기 자신의 참조인지 확인한다.
2. instanceof 연산자로 입력이 올바른 타입인지 확인한다.
3. 입력을 올바른 타입으로 형변환한다.
4. 입력 객체와 자기 자신의 대응되는 핵심 필드들이 모두 일치하는지 하나씩 검사한다.

### equals와 차이점
- Comparable 은 타입을 인수로 받는 제네릭 인터페이스      
    - compareTo 메서드의 인수 타입은 컴파일 타임에 정해짐
    - 입력 인수타입을 확인하거나 형변환 할 필요가 없다.
- null 을 인수로 넣어 호출하면 NullPointerException 을 던져야 한다.

### 객체 compareTo 의 비교
compareTo 는 각 필드의 동치를 비교하는 것이 아니라, 순서를 비교함

- 객체참조 필드를 비교하려면 compareTo 메서드를 재귀적으로 호출함
- Comparator 비교자의 사용
    - Comparable 을 구현하지 않은 필드
    - 표준이 아닌 순서로 비교해야 할 때
    - 비교자는 직접 만들거나 자바가 제공하는 것 중에 고르면 된다.
    - 다음 코드는 자바가 제공하는 비교자를 사용하였음
    ```java
    public final class CaseInsensitiveString 
      implements Comparable<CaseInsensitiveString> {
        public int compareTo(CaseInsensitiveString cis) {
            return String.CASE_INSENSITIVE_ORDER.compare(s, cis.s);
        }
    }
    ```
    - `implements Comparable<CaseInsensitiveString>`
        - CaseInsensitiveString 의 참조는, CaseInsensitiveString 참조와만 비교할 수 있다
        
### 기본 타입의 비교
자바7 이후의, 박싱된 기본 타입 클래스들에 추가된 정적 메서드 compare 사용

### 비교 순서
클래스에 핵심필드가 여러개라면 비교 순서가 중요하다

#### 1. 가장 핵심적인 필드부터 비교
- 비교 결과가 0 이 아니라면, (순서가 결정되면) 결과를 바로 반환해야 한다.
- 핵심 필드가 똑같다면(0), 똑같지 않은 필드를 찾을 때 까지 그 다음으로 중요한 필드를 비교한다.
    
```java
public int compareTo(PhoneNumber pn) {
    int result = Short.compare(areaCode, pn.areaCode);
    if (result == 0) {
        result = Short.compare(prefix. pn.prefix);
        if (result == 0)
            result = Short.compare(lineNum, pn.lineNum);
    }
    return result;
}
```

### 비교자 생성 메서드를 활용한 비교자
자바8 에서, Comparator 인터페이스가 비교자 생성 메서드 comparator constructor method
와 메서드 연쇄방식으로 비교자를 생성할 수 있게 되었다.

```java
private static final Comparator<PhoneNumber> COMPARATOR = 
    comparingInt((PhoneNumber pn) -> pn.areaCode)
        .thenComparingInt(pn -> pn.prefix)
        .thenComparingInt(pn -> pn.lineNum);

public int compareTo(PhoneNumber pn) {
    return COMPARATOR.compare(this, pn);
}
```
#### 특징
- 약간의 성능저하
- 정적 비교자 생성 메서드들을 이름으로만 사용할 수 있어 코드가 깔끔해짐

#### 정적 compare 메서드를 활용한 비교자
```java
static Comparator<Object> hashCodeOrder = new Comparator<>() {
    public int compare(Object o1, Object o2) {
        return Integer.compare(o1.hasCode(), o2.hashCode());
    }
}
```

#### 비교자 생성 메서드를 활용한 비교자
```java
static Comparator<Object> hashCodeOrder = 
    Comparator.comparingInt(o -> o.hashCode());
```
