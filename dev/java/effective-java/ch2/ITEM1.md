# ITEM 1 생성자 대신 정적 팩터리 메서드를 고려하라
클래스는 클라이언트에 public 생성자 대신 **정적 팩터리 메서드** 를 제공할 수 있다.

- 각각의 쓰임새가 있으나, 상대적인 장단점을 이해하고 사용하는 것이 좋다.
- 정적 팩터리가 유리한 경우가 더 많으므로 무작정 public 생성자를 제공하던 습관이 있으면 고치는 것을 권장

> 처음 책을 보면서 모르거나 얼핏으로 알기만 하는 개념들이 수두룩 했습니다. ITEM 레퍼런스도 나와 있지만, 
현재 개념에 집중하기 위해 찾아보지 않았습니다. 
순차적으로 공부를 하면서 개념이 등장할 때, 다시 보충하고 복습하는 식으로 책을 읽겠습니다.

예시) boolean 기본 타입의 박싱 클래스인 Boolean 에서 발췌하였다.    
boolean 값을 받아 Boolean 객체 참조로 변환해주는 메서드.
```java
public static Boolean valueOf(boolean B) {
    return b ? Boolean.TRUE : Boolean.FALSE;
}
```


```java
@Deprecated(
    since = "9"
)
public Boolean(boolean value) {
    this.value = value;
}
```
Boolean 클래스는 정적 팩터리 메서드인 valueOf()를 가지며, 
덕분에 새로운 객체를 전혀 생성하지 않고 인스턴스를 재활용할 수 있다.  
자바 9 이후로는 위 코드와 같이 Boolean 클래스의 생성자가 deprecated 되었다.    
불필요한 객체 생성을 하지 않는 쪽으로 발전하는 것이다.
[@kth496](https://gist.github.com/kth496/1d6906d43775e76bd0956be228f8f83d)

## 장점
### 1. 이름을 가질 수 있다.
- 반환될 객체의 특성을 더 잘 설명할 수 있다.
    - 예시) 값이 소수인 BigInteger 를 반환한다   
        - `BigInteger(int, int, Random)`
        - `BigInteger.probablePrime`

- 시그니처의 제한이 없이 생성자의 의미를 드러낼 수 있다.

### 2. 호출 될 때마다 인스턴스를 새로 생성하지 않아도 된다.
- 불변 클래스[17]에서 불필요한 객체 생성을 피할 수 있다.
    - **인스턴스를 미리 만들어 놓는방법** 가능
    - 새로 생성한 인스턴스를 **캐싱**하여 재활용 가능

- 생성 비용이 큰 객체를 자주 요청되는 상황에서 성능 향상을 기대
    - `Boolean.valueOf(boolean)` 는 객체를 생성하지 않음.
        - valueOf 는 Boolean 객체를 매번 생성하여 true, 나 false 를 반환하지 않는다.
    - 불변 클래스는 getter setter 를 쓰지 않고, 내용의 변경이 필요할 경우, 새로운 객체를 만들어서 반환하는 특징이 있다.
    - ~~Flyweight 패턴과 유사.~~

- 인스턴스 통제 Instance-controlled
    - `캐싱` 반복되는 요청에는 같은 객체를 반환
    - `싱글턴` SingleTon[3] 
    - `인스턴스화 불가` NonInstantiable[4] 클래스
    - 불변 값 클래스 (ITEM 17) 에서 동치인 인스턴스가 단 하나뿐임을 보장 가능
        - `a == b` 일 때만, `a.equals(b)` 가 성립
- ~~인스턴스 통제는 Flyweight 패턴의 근간이 된다.~~
- ~~열거 타입 (ITEM 34) 은 인스턴스가 하나만 만들어짐을 보장한다.~~

### 3. 반환 타입의 하위 타입 객체를 반환 가능
- 반환할 객체의 클래스를 자유롭게 선택할 수 있는 유연성

- 자바 컬렉션 프레임 워크
    - 구현체 대부분을 단 하나의 인스턴스화 불가 클래스인 java.util.Collections 에서 정적 팩터리 메서드를 통해 얻도록함.
    - [20] 정적 팩터리 메서드의 반환 타입으로 사용하는 인터페이스 기반 프레임워크를 만드는 핵심기술.

### 4. 입력 매개 변수에 따라 매번 다른 클래스의 객체를 반환할 수 있다.
반환 타입의 하위 타입이기만 하면 모든 클래스의 객체를 반환 할 수 있는 특성.

EnumSet
- 정적 팩터리만 제공
- OpenJDK 는 원소의 수에 따라 두가지 하위 클래스 중 하나의 인스턴스를 반환할 수 있음. 
- 클라이언트는 하위 클래스의 존재를 신경쓰지 않아도 됨

### 5. 정적 팩터리 메서드 작성 시점, 반환할 객체의 클래스가 존재하지 않아도 된다.
> 반환할 객체의 클래스가 존재하지 않아도 된다? 처음 들은 시점에는 참 이상한 소리다... 

#### Service Provider Framework 를 만드는 근간이 된다.
- Provider
    - 서비스의 구현체
- Framework 
    - 구현체들을 클라이언트에게 제공하는 것을 통제.
    - 클라이언트를 구현체로부터 분리.
- Service Provider Framework 의 핵심 컴포넌트 3 요소
    1. Service Interface
        - 구현체 동작 정의.
    1. Provider Registration API
        - Provider 가 구현체를 등록할 때 사용하는 API
    1. Service Access API
        - 클라이언트가 서비스의 인스턴스를 얻을 때 사용하는 API
        - 정적 팩터리
        
    
#### 예) JDBC (Java Database Connectivity) 
- Service Interface
    - Connection
- Provider Registration API
    - DriverManager.registerDriver
- Service Access API
    - DriverManager.getConnection

## 단점
### 1. 정적 팩터리 메서드만 제공할 경우, 하위클래스를 만들 수 없다.
- 상속을 하려면 public 이나 protected 생성자가 필요하기 때문
- 역단점
    - 상속 보다는 컴포지션[18]사용과, 불변 타입[17] 을 지킬 수 있다는 장점으로 작용한다.

### 2. 정적 팩터리 메서드는 프로그래머가 찾기 어렵다.
- 생성자는 API 설명에 명확히 드러나있다.
- 사용자가 정적 팩터리 메서드에 대해 공부해야 한다.
- 보완
    - javadoc 정리
    - 메서드 이름을 잘 알려진 규약으로 짓기
    
## 잘 알려진 규약의 명명 방식

### from 
형 변환 메서드
- 매개 변수 1개 
- 해당 타입의 인스턴스 반환  

`Date d = Date.from(instance);`

### of
집계 메서드
- 여러 매개변수
- 적합한 타입의 인스턴스 반환

`Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING);`

### valueOf
from/of 의 더 자세한 버전 ??

`BigInteger prime = BigInteger.valueOf(Integer.MAX_VALUE);`

### instance / getInstance
- 매개변수를 받는 다면, 매개변수로 명시한 인스턴스를 반환한다. ??
- 매개변수와 같은 인스턴스임을 보장하지 않음.

`StackWalker luke = StackWalker.getInstance(options);`

### create / newInstance
- `instance / getInstance` 와 같지만, 매번 새로운 인스턴스를 생성해 반환함을 보장

`Object newArray = Array.newInstance(classObject, arrayLen);`

### getType
- `getInstance` 와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 사용
- Type 은 팩터리 메서드가 반환할 객체 타입

`FileStore fs = Files.getFileStore(path);`

### newType
- `newInstance` 와 같으나, 생성할 클래스가 아닌 다른 클래스에 팩터리 메서드를 정의할 때 사용
- Type 은 팩터리 메서드가 반환할 객체 타입

`BufferedReader br = Files.newBufferedReader(path);`


### type
`getType/newType` 의 간결한 버전

`List<Complaint> litany = Collections.list(legacyLitany);` 

