# ITEM11 equals 를 재정의하려거든 hashCode 도 재정의하라
equals 를 재정의 할 때는 hashCode 도 반드시 재정의 해야 한다.     
그렇지 않으면 프로그램이 제대로 동작하지 않을 것이다.      
재정의한 hashCode 는 Object 의 API 문서에 기술된 일반 규약을 따라야 한다.

## Object, API 문서에 기술된 일반 규약
1. equals 비교에 사용되는 정보가 변경되지 않으면, 
    - hashCode 메서드는 일관되게 항상 같은 값을 반환해야 한다.
2. equals(Object) 가 두 객체를 같다고 판단했다면, 
    - 두 객체의 hashCode 는 똑같은 값을 반환해야 한다.
3. equals(Object) 가 두 객체를 다르다고 판단했더라도
    - 두 객체의 hashCode 가 서로 다른 값을 반환할 필요는 없다.
    - 하지만 다른 객체에 대해서 다른 hashCode 를 반환해야 해시테이블의 성능이 좋아진다.
    
앞서 [10]의 equals 만을 정의한 객체를 HashMap 의 원소로 사용할 때,
```java
Map<PhoneNumber, String> m = new HashMpa<>();
m.put(new PhoneNumber(707, 867, 5309), "제니");
m.get(new PhoneNumber(707, 867, 5309)); // null
``` 

위에서는 2개의 PhoneNumber 인스턴스가 사용되었다.
1. HashMap 에 넣을 때
2. HashMap 에서 꺼낼 때

### hashCode 를 재정의 하지 않으면 
- 논리적 동치인 두 객체가 다른 해시코드 반환      
→ 2번째 규약 위배    
 
- get 메서드는 엉뚱한 해시 버킷에서 객체를 찾으려함     
→ 두 객체를 같은 버킷에 담아도, 결과는 같다.         
→ HashMap 은 hashCode 가 다른 엔트리끼리는 동치성 비교를 시도조차 하지 않기로 최적화 되어 있기 때문
 
## HashCode 정의하기

### 최악의 HashCode 구현
동치인 모든 객체에서 똑같은 해시 코드를 반환하니 적법하다.

```java
@Override public int hashCode() {
    return 42;
}
```

#### 모든 객체에서 똑같은 값을 반환하는 문제
- 모든 객체가 해시테이블의 버킷 하나에 담겨 마치 연결 리스트처럼 동작
- 평균 수행 시간이 O(1) 인 해시 테이블이 O(n) 으로 느려져 객체가 많아지면 도저히 쓸 수 없게 된다.
    
#### 좋은 해시 함수의 특징
서로 다른 인스턴스에 대해 다른 해시코드를 반환한다.   
→ hashCode 3번째 규약

이상적인 해시함수는 서로 다른 인스턴스들을 32비트 정수 범위에 균일하게 분배해야 한다.

### 전형적인 hashCode 메서드
- 핵심필드
    - equals 비교에 사용되는 필드
    
```java
@Override public int hashCode() {
    int result = Short.hashCode(areaCode);
    result = 31 * result + Short.hashCode(prefix);
    result = 31 * result + Short.hashCode(lineNum);
    return result;
}
```

1. int 변수 result 를 선언한 후 값 c 로 초기화 한다.
    - `c` 해당 객체의 첫번째 핵심 필드를 `2.i` 방식으로 계산한 해시코드
1. 나머지 핵심 필드 f 각각에 대해 다음 작업을 수행한다. 
    1. 해당 필드의 해시코드 c 를 계산한다
        1. 기본 타입 필드
            - `Type.hashCode(f)` Type 은 기본 타입의 박싱 클래스
        1. 참조 타입 필드
            - 필드의 hashCode 를 재귀적으로 호출한다.
            - 복잡하다면 필드의 표준형 nonical representation 을 만들어 표준형의 hashCode 를 호출한다.
        1. 값이 null
            - 다른 상수도 괜찮지만 전통적으로 0 사용
        1. 배열
            - 핵심 원소를 각각의 별도 필드처럼 다룬다.
            - 각 핵심원소의 해시코드를 계산한 다음, `2.ii` 방식으로 갱신한다.
            - 핵심원소가 하나도 없다면 상수(0) 을 사용한다.
            - 모든 원소가 핵심원소라면 Arrays.hashCode 를 사용
        1. 제외 필드
            - 파생 필드 제외 옵션
            - equals 비교에 사용되지 않는 필드는 제외 필수.
    1. `2.i` 에서 계산한 해시코드 c로 result 를 갱신한다.
        - `result = 31 * result + c;`
1. result 를 반환한다.

### 해시 코드 최적화
#### `31 * result`는 필드를 곱하는 순서에 따라 result 값이 달라지게 한다.
비슷한 필드가 여러개일 때 해시 효과를 크게 높여준다.
- String 의 hashCode 를 곱셈 없이 구현한다면 모든 아나그램(구성 철자가 같고 순서만 다른 문자열)의 해시코드가 같아진다.
    
#### 31 로 곱하는 이유
31 은 홀수이면서 prime 이다.

- 짝수라면, 오버플로가 발생한다면 정보를 잃게 된다 ??
- 소수를 곱하는 이유   
    - 명확하지는 않지만 전통적인 방법
- 곱셈을 시프트 연산과 뺄셈으로 대체해 최적화 가능
    - `31 * i` == `(i << 5) - i)` ??
    
### Object 클래스의 hash 메서드
임의의 개수만큼 객체를 받아 해시코드를 계산해 주는 정적 메서드
```java
@Override public int hashCode() {
    return Objects.hash(lineNum, prefix, areaCode);
}
```
- 속도는 더 느리다.
    - 입력 변수를 담기 위한 배열이 생성된다.
    - 기본타입은 박싱과 언박싱이 발생한다.
- 성능에 민감하지 않은 상황에만 사용하자

### 캐싱
1. 불변 클래스
1. 해시코드 계산비용이 큰 클래스

이런 타입의 객체가
#### 주로 해시의 키로 사용될 것 같다면,    
인스턴스가 만들어질 때 해시코드를 계산해 둔다.

#### 해시의 키로 사용되지 않은 경우
해시코드를 지연초기화 하려는 hasCode 메서드
- 스레드의 안정성까지 고려해야 한다. [83]

```java
private int hashCode;   // 자동으로 0으로 초기화 된다.

@Override public int hashCode() {
    int result = hashCode;
    if (result == 0) {
        result = Short.hashCode(areaCode);
        result = 31 * result + Short.hashCode(prefix);
        result = 31 * result + Short.hashCode(lineNum);
        hashCode = result;
    }
    return result;
}
```

## 주의할 점

1. 성능을 위해 해시코드의 핵심필드를 생략하면 안된다.
    - 계산 속도는 빨라지지만, 해시품질이 나빠져 해시테이블의 성능을 선형으로 떨어뜨린다.
    - 실제로 자바 2 전의 String 은 최대 16개의 문자만으로 해시코드를 계산했다. 
        - 해당 영역의 수많은 인스턴스가 단 몇개의 해시코드로 집중된다.

2. hashCode 가 반환하는 값의 생성 규칙을 API 사용자에게 자세히 공표하지 말자
    - 클라이언트가 현재의 hashCode 값에 의지하지 않게 되고, 추후에 계산 방식을 바꿀 수 있다.
    - String, Integer 와 같은 자바 라이브러리의 많은 클래스에서 hashCode 메서드가 반환하는 정확한 값을 알려주는 실수를 저질렀다.
        - 향후 릴리스에서 개선하기 어려워 졌음
        - 결함을 고칠수 없어짐
         
