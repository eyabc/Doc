---

sidebarDepth: 2

---

# ITEM10 equals 는 일반 규약을 지켜 재정의하라
재정의 하지 않으면, 그 클래스의 인스턴스는 오직 자기 자신과만 같게 된다.

재정의를 할 때 주의할 점들이 많기 때문에 재정의가 필요할 때만 사용하는 것이 좋다

## 재정의 하지 않아야 할 경우

### 1. 각 인스턴스가 본질적으로 고유할 때 (동작하는 개체를 표현하는 클래스)
- 값 표현이 아닌, 동작하는 개체를 표현하는 클래스일 때 ??
- `Thread` 
- Object 의 equals 메서드는 이러한 클래스에 딱 맞게 구현 되어 있다.

### 2. 인스턴스의 논리적 동치성 logical equality 를 검사할 일이 없을 때

### 3. 상위 클래스에서 재정의한 equals 가 하위 클래스에 딱 들어 맞을 때
- Set 구현체는 AbstractSet 으로 부터 
- List 구현체들을 AbstractList 로부터
- Map 구현체들을 AbstractMap 으로 부터 
 
 상속받아 그래돌 쓴다.

### 4. 클래스가 private 이거나, package-private 이고, equals 메서드를 호출할 일이 없다.
equals 가 실수로라도 호출 되는 걸 막고 싶다면 다음과 같이 사용한다.
```java
@Ovveride public boolean equals(Object o) {
    throw new AssertionError();
}
```

### 5. 인스턴스가 둘 이상 만들어지지 않음을 보장하는 인스턴스 통제 클래스[1]

## equals 를 재정의 해야 할 때 → 논리적 동치성을 확인해야 할 때
객체 식별성 (Object identity; 두 객체가 물리적으로 같은가)이 아니라 논리적 동치성을 확인해야 할 때
- 상위 클래스의 equals 가 논리적 동치성을 비교하도록 재정의되지 않았을 때

### 값 클래스들
- Integer 와 String 처럼현하는 클래스
- 인스턴스가 둘 이상 만들어지지 않음을 보장하는 인스턴스 통제 클래스라면 재정의 하지 않아도 된다.

### Equals 가 논리적 동치성을 확인할 때 장점
- 그 인스턴스는 값을 비교하기를 기대할 수 있다.
- Map 의 키와, Set 의 원소로 사용할 수 있다  
    
## equals 메서드 재정의 일반 규약
equals 메서드는 동치 관계(equivalence relation)를 구현하며 다음을 만족한다.

1. 반사성 reflexivity
    - null 이 아닌 모든 참조 값 x 에 대해, 
    - `x.equlas(x)` 는 true
2. 대칭성 symmetry
    - null 이 아닌 모든 참조 값 x, y에 대해, 
    - `x.equals(y)` 가 true 면 
    - `y.equals(x)` 도 true
3. 추이성 transitivity
    - null 이 아닌 모든 참조 값, x, y, z 에 대해, 
    - `x.equals(y)` 가 true 이면 
    - `y.equlas(z)` 도 true
4. 일관성 consistency
    - null 이 아닌 모든 참조 값 x, y 에 대해
    - `x.equals(y)` 를 반복해서 호출하면 항상 true 거나 false 를 반환
5. null-아님
    - null 이 아닌 모든 참조값 x 에 대해, 
    - `x.equals(null)` 은 false
    
### Object 명세에서의 동치 관계
집합을 서로 같은 원소들로 이뤄진 부분집합으로 나누는 연산

- 부분집합 → 동치류 (equivalence class: 동치 클래스)
- equals 메서드가 쓸모있으려면 모든 원소가 같은 동치류에 속한 어떤 원소와도 서로 교환할 수 있어야 한다.

### 1. 반사성
객체는 자기 자신과 같아야 한다.

반사성을 위배한 경우, 
- contains 메서드를 호출하면 방금 넣은 인스턴스가 없다고 답할 것임.

### 2. 대칭성
두 객체는 서로에 대한 동치 여부에 똑같이 답해야 한다

#### 대칭성을 위배한 경우
대소문자를 구별하지 않는 문자열을 구현한 클래스
- `toString` 메서드 에서는 원본 문자열의 대소문자를 그대로 돌려준다.
- `equals` 에서 대소 문자를 무시한다.

```java
public final class CaseInsensitiveString {
    private final String s;
    public CaseInsensitiveString(String s) {
        this.s = Objects.requireNonNull(s);
    }

    @Override public boolean equals(Object o) {
        if (o instanceof CaseInsensitiveString)
            return s.equalsIgnoreCase((CaseInsensitiveString) o).s;

        // 순진하게?? 일반 문자열과도 비교를 시도한다. 
        // CaseInsensitiveString 은 String 을 알고 있다.
        if (o instanceof String)    // 한 방향으로만 작동한다
            return s.equalsIgnoreCase((String) o); 
        return false;
    }
}
```

```java
CaseInsensitiveString cis = new CaseInsensitiveString("Polish");
String s = "polish";

/* 대칭성 위반 */
cis.equals(s); // true;   CaseInsensitiveString 은 String 을 알고 있다.    
s.equals(cis); // false;  String 의 equals 는 CaseInsensitiveString 를 모른다.  
```

#### CaseInsensitiveString 를 컬렉션에 넣는 경우
equals 규약을 어기면 그 객체를 사용하는 다른 객체들이 어떻게 반응할 지 알 수 없다.

```java
List<CaseInsensitiveString> list = new ArrayList<>();
list.add(cis);
```

### 3. 추이성
- 첫번째 객체와 두번째 객체가 같고,
- 두번째 객체가 세번째 객체와 같다면
- 첫번째 객체와 세번째 객체도 같아야 한다.

#### 상위 클래스에는 없는 새로운 필드를 하위클래스에 추가하는 경우
equals 비교에 영향을 주는 정보를 추가한 것임.

##### 점을 표현하는 클래스
```java
public class Point {
    private final int x; 
    private final int y;
    
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override public boolean equals(Object o) {
        if (!(o instanceof Point))
            return false;
        Point p = (Point)o;
        return p.x == x && p.y = y;
    }
}
```

##### 점 클래스를 확장해 색상 추가 
```java
public class ColorPoint extends Point {
    private final Color color;
    
    public ColorPoint(int x, int y, Color color) {
        super(x, y);
        this.color = color;
    }
}
```

##### equals 메서드를 재정의 하지 않을 때,
- Point 의 구현이 상속되어 색상 정보는 무시한 채 비교 수행
- equals 규약을 어기지는 않지만, 중요한 정보를 놓치게 된다.

##### 잘못된 코드 1 - 대칭성 위배 
 
```java
public class ColorPoint extends Point {
    // ...
    @Override public boolean equals(Object o) {
        if (!(o instanceof ColorPoint))
            return false;
        return super.equals(o) && ((ColorPoint) o).color == color;
    }
}
```

```java
Point p = new Point(1, 2);  // true
ColorPoint cp = new ColorPoint(1, 2, Color.RED); // false
```
`x.equals(y)`
- Point 의 equals 는 색상을 모른다.

`y.equals(x)`
- ColorPoint 의 equals 는 Point 와 비교할 때,  
입력 매개 변수의 클래스의 종류가 다르다며 false 만 반환


##### 잘못된 코드 2 - 추이성 위배
equals 가 Point 와 비교할 때는 색상을 무시하도록 할 때
```java
public class ColorPoint extends Point {
    // ...
    @Override public boolean equals(Object o) {
        if (!(o instanceof ColorPoint))
            return false;

        // o 가 일반 Point 인 색상을 무시하고 비교
        if (!(o instanceof ColorPoint))
            return o.equals(this);
        
        // o 가 ColorPoint 면 색상까지 비교
        return super.equals(o) && ((ColorPoint) o).color == color;
    }
}
```
```java
ColorPoint p1 = new ColorPoint(1, 2, Color.RED);
Point p2 = new Point(1, 2);
ColorPoint p3 = new ColorPoint(1, 2, Color.BLUE);

p1.equals(p2);  // true
p2.equals(p3);  // false;
```

##### 잘못된 코드 3 - 리스코프 치환 원칙 위배
[getClass](https://zzdd1558.tistory.com/57) 를 사용한 equals 는       
같은 구현 클래스의 객체와 비교할 때만 true 를 반환.
```java
public class ColorPoint extends Point {
    // ...
    @Override public boolean equals(Object o) {
        if (o == null || o.getClass() != getClass())
            return false;
        Point p = (Point) o;
        return p.x == x && p.y == y;
    }
}
```

실제로 활용할 수도 없지만, **리스코프 치환 원칙**을 위배하게 된다.
- 어떤 타입에 있어서 중요한 속성이라면 그 하위 타입에서도 마찬가지로 중요하다.
- 따라서 그 타입의 모든 메서드가 하위 타입에서도 똑같이 잘 작동해야 한다.
- Point 의 하위 클래스는 정의상 여전히 Point 이므로 어디서든 Point 로써 활용될 수 있어야 한다.

##### 결론    
- 구체 클래스를 확장해 새로운 값을 추가하면서 equals 규약을 만족시킬 방법은 없다.
- 상속 대신 컴포지션을 사용하자

```java
public class ColorPoint {
    private final Point point;
    private final Color color;

    public ColorPoint(int x, int y, Color color) {
        point = new Point(x, y);
        this.color = Objects.requireNonNull(color);
    }
    
    public Point asPoint() {
        return point;
    }
    
    @Override public boolean equals(Object o) {
        if (!(o instanceof ColorPoint))
            return false;
        ColorPoint cp = (ColorPoint) o;
        return cp.point.equals(point) && cp.color.equals(color);
    }
}
```

#### java.sql.Timestamp
자바 라이브러리에서 구체 클래스를 확장해 값을 추가한 클래스의 예이다.

- java.util.Date 를 확장한 후 nanoseconds 필드를 추가함.
- 대칭성을 위배한다.
- Timestamp 를 Date 객체와 한 컬렉션에 넣거나 서로 섞어 사용하면 엉뚱하게 동작할 수 있다.

#### 추상 클래스의 필드 확장
추상 클래스의 하위 클래스에서라면 equals 규약을 지키면서도 값을 추가할 수 있다.

상위 클래스를 직접 인스턴스로 만드는게 불가능 하다면 문제가 없다.

- 아무런 값을 갖지 않은 추상 클래스인 Shape 를 위에 두고,
- 확장하여 radius 필드를 추가한 Circle 클래스
- length width 필드를 추가한 Rectangle 클래스

### 4. 일관성
두 객체가 같다면 (어느 하나 혹은 두 객체가 모두 수정되지 않는 한) 앞으로도 영원히 같아야 한다.

#### 신뢰할 수 없는 자원 java.net.URL
- equals 의 판단에 신뢰할 수 없는 자원이 끼어들면 결과를 보장할 수 없다.
- 항시 메모리에 존재하는 객체만을 사용한 deterministic 계산만 수행해야 한다.

java.net.URL
- URL 과 매핑된 호스트 IP 주소를 이용해 비교한다
- 호스트 이름을 IP 주소로 바꾸려면 네트워크를 통해야 하는데, 그 결과가 항상 같다고 보장할 수 없다.


### 5. null-아님
모든 객체가 null 과 같지 않아야 한다.

명시적 null 검사는 필요없다.
```java
@Override public boolean equals(Object o) {
    if (o == null) 
        return false;
    // ...
}
```

묵시적 null 검사를 하자
```java
@Override public boolean equals(Object o) {
    if (!(o instanceof MyType))
        return false;
    MyType my = (MyType) o;
    // ...
}
```

equals 가 타입을 확인하지 않으면
- 잘못된 타입이 인수로 주어졌을 때, CastException 을 던져서 일반 규약 을 위배하게 된다. ??

instanceof 로 타입 확인을 하면 묵시적 null 검사도 할 수 있다.
- 두 번째 피연산자와 무관하게 첫 번째 피연산자가 null 이면 false 를 반환한다.


## equals 메서드 구현 방법

### 1. == 연산자를 사용해 입력이 자기 자신의 참조인지 확인한다.
자기 자신이면 true 를 반환한다.

- 단순 성능 최적화용으로, 비교 작업이 복잡한 상황일 때 좋다.

### 2. instanceof 연산자로 입력이 올바른 타입인지 확인한다.
그렇지 않다면 false 를 반환한다.

#### 올바른 타입
- equals 가 정의된 클래스
- 클래스가 구현한 특정 인터페이스

어떤 인터페이스는 자신이 구현한 (서로다른) 클래스 끼리도 비교할 수 있도록 equals 규약을 수정하기도 한다. ??
- Set, List, Map, Entry 컬렉션 인터페이스

### 3. 입력을 올바른 타입으로 형변환한다.
instanceof 검사를 했기 때문에 100% 성공

### 4. 입력 객체와 자기 자신의 대응되는 핵심 필드들이 모두 일치하는지 하나씩 검사한다.
#### 1. float, double 을 제외한 타입 필드
== 연산자로 비교

#### 2. 참조 타입 필드
각각의 equals 메서드로 비교

null 을 정상 값으로 취급하는 참조필드
- 정적 메서드 Object.equals(Object, Object) 로 비교해 NullPointerException 을 예방할 수 있다.

#### 3. float, double 필드
각각의 정적 메서드인 Float.compare(float, float), Double.compare(double, double) 으로 비교
- Float.NaN, -0.0f, 특수한 부동소수 값을 ?? 다뤄야 하기 때문

Float.equals, Double.equals 는 오토박싱으로 성능이 좋지 않다.

#### 4. 배열
원소 각각을 앞서의 지침대로 비교함.

- 배열의 모든 원소가 핵심필드라면 Arrays.equals 메서들 중 하나를 사용함 ??


#### 5. 아주 복잡한 필드를 가진 클래스 → 표준형 정의
CaseInsensitiveString 같은 클래스는 

그 필드의 표준형 Canonical form ?? 을 저장해 둔 후 표준형 끼리 비교하면 경제적이다.

- 불변 클래스 [17] 에 좋은 방법 ??
- 가변 객체라면 값이 바뀔 때마다 표준형을 최신 상태로 갱신해 줘야 한다. ??

#### 필드 비교와 성능
1. 다를 가능성이 더 크거나, 비교하는 비용이 싼 필드를 먼저 비교한다.
2. 동기화용 락 필드 같이 객체의 논리적 상태와 관련 없는 필드는 비교하면 안된다.
3. 핵심 필드로부터 계산해 낼 수 있는 파생 필드
    - 굳이 비교할 필요는 없다. 
    - 파생 필드가 객체 전체의 상태를 대표하는 상황에서 더 빠를 수 있다.
    - 자신의 영역을 캐시해 두는 Polygon 클래스는, 변과 정점을 일일이 비교할 필요없이, 캐시해둔 영역만 비교하면 결과를 곧바로 알 수 있다.
    
    
## 테스트
단위 테스트를 해보자
- 대칭성
- 추이성
- 일관성

null-아님 과 반사성이 문제되는 경우는 별로 없다.

## 주의 사항
### 1. equals 를 재정의 할 땐 hashCode 도 반드시 재정의
### 2. 너무 복잡하게 해결하려 하지 않기
필드의 동치성만 검사해도 equals 규약을 어렵지 않게 지킬 수 있다.

- File 클래스라면 심볼릭 링크를 비교해 같은 파일을 가리키는지를 확인하려 들지 말자.

### 3. Object 외의 타입을 매개변수로 받는 equals 메서드는 선언하지 않기

잘못된 예 
- 입력 타입은 반드시 Object 여야 한다.
- Object.equals 를 재정의 한 것이 아닌 다중정의[52] 한 것이다.
- 하위 클래스에서의 @Override 애너테이션이 거짓양성 오류를 내게 한다.
- 보안적 측면에서도 잘못된 정보를 준다.
```java
public boolean equals(MyClass o) {
    // ...
}
```

@Override 애너테이션을 일관되게 사용하면 이러한 실수를 예방할 수 있다.    
컴파일 되지 않기 때문이다.

## equals 쉽게 사용하기
### AutoValue 프레임워크의 애너테이션
직접 작성하는 것과 근본적으로 똑같은 코드를 생성해 준다.

### IDE
- AutoValue 만큼 깔끔하거나 가독성 있지는 않다.
- 클래스의 수정을 자동으로 알아차리지 못하여 테스트 코드를 작성해야 하는 수고가 있다.


