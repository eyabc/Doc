# ITEM17 변경 가능성을 최소화하라

## 불변클래스
인스턴스 내부의 값을 수정할 수 없는 클래스

예시 
- String
- 기본타입의 박싱된 클래스
- BigInteger
- BigDecimal
...

### 불변 클래스로 설계하는 이유
가변클래스보다 
- 설계/구현/사용이 쉬움
- 오류가 더 적고 훨씬 안전함

### 불변 클래스로 만드는 방법
1. 객체의 상태를 변경하는 메서드(변경자)를 제공하지 않기
2. 클래스를 확장할 수 없도록 한다.
    - 하위클래스에서 부주의하게/나쁜의도로 객체의 상태를 변하게 하는 사태를 방지
    - final 클래스로 선언하는 방법
3. 모든 필드를 **final** 로 선언
    - 생성된 인스턴스를 동기화 없이 다른 스레드로 건네도 문제가 없다
4. 모든 필드를 **private** 으로 선언
    - 클라이언트에서 가변객체를 참조하는 필드를 수정하는 일을 방지
    - public final 로 선언한다면 다음 릴리스에서 내부 표현을 수정할 수 없다.
5. 자신 외에는 내부의 **가변 컴포넌트**에 접근할 수 없도록 한다.
    - 필드는 클라이언트의 객체 참조를 가리켜서는 안된다.
    - 접근자 메서드로 가변 객체 필드를 반환하면 안된다.
    - 생성자, 접근자, readObject 메서드 [88] 에서 방어적 복사를 수행해야 한다.

## 함수형 프로그래밍과 절차형 프로그래밍

### 함수형 프로그래밍
사칙연산 메서드들이 인스턴스 자신을 수정하지 않고 새로운 Complex 인스턴스를 만들어 반환한다

```java
public final class Complex {
    private final double re;
    private final double im;
    
    public Complex(double re, double im) { ... }
    public double realPart() { return re; }
    public double imaginaryPart() { return im; }
    
    public Complex plus(Complex c) {
        return new Complex(re + c.re, im + c.im);
    }
    // ...
}
```

**피연산자에 함수를 적용해 그 결과를 반환하지만, 피연산자 자체는 그대로인 프로그래밍 패턴**

- 동사(add) 대신 전치사(plus) 사용
    - 해당 메서드가 객체의 값을 변경하지 않는다는 사실을 강조함

### 절차적(명령형) 프로그래밍
메서드에서 피연산자인 자신을 수정해 자신의 상태가 변하게 된다.

## 장점
### 1. 스레드 안전 → 동기화 불필요
- 안심하고 공유 가능

### 2. 불변 인스턴스의 캐싱
- public static final 상수로 불변 인스턴스 제공
    ```java
    public static final Complex ZERO = mew Complex(0, 0);
    public static final Complex ONE = new Complex(1, 0);
    ```
- 불변 클래스는 자주 사용되는 인스턴스를 캐싱하는 정적 팩터리를 제공할 수 있다.
    - 박싱된 기본 타입, BigInteger 의 특징
    - 클라이언트가 인스턴스를 공유하여, 메모리 사용량과 가비지 컬렉션의 비용이 감소

### 3. 방어적 복사 불필요
- 아무리 복사해도 원본과 같음
- clone 메서드, 복사 생성자[13] 불필요

### 4. 불변 객체끼리는 내부 데이터를 공유할 수 있다.
BigInteger 클래스는 내부에서 
- 값의 부호(sign)와 크기(magnitude) 를 따로 표현함
- negate 메서드는 크기가 같고, 부호만 반대인 새로운 BigInteger 생성.
- 배열은 가변이지만, 원본 인스턴스와 공유하여 사용함.

```java
public class BigInteger extends Number implements Comparable<BigInteger> {
    final int signum;
    final int[] mag;

    public BigInteger negate() {
        return new BigInteger(this.mag, -this.signum);
    }

}
```

### 5. 객체를 만들 때 불변객체들을 구성요소로 사용하면 이점이 많다.
- 구조가 아무리 복잡하더라도 불변식을 유지하기 훨씬 수월하다
- 불변 객체는 **Map 의 키와** **Set 의 원소** 에 적합하다
- 맵이나 집합은 담긴값이 바뀌면 불변식이 무너진다.

### 6. 불변객체는 그 자체로 실패 원자성을 제공한다[76]
실패원자성 failure atomicity
- 메서드에서 예외가 발생한 후에도 그 객체는 여전히 유효한 상태여아 한다.

상태가 변하지 않으니 잠깐이라도 불일치 상태에 빠질 가능성이 없다.

## 단점 
### 1. 값이 다르면 반드시 독립된 객체로 만들어야 한다.
- 값의 가짓수가 많다면 모두 만드는데 큰 비용이 든다.

filpBit 메서드는 새로운 BigInteger 인스턴스를 생성한다.
- 원본과 단지 한비트만 다른 백만비트짜리 인스턴스 이다.
- BigInteger의 크기에 비례해 시간과 공간을 소비한다.
```java
BigInteger moby = ...;
mody = moby.filpBit(0);
```

BitSet
- BigInteger 처럼 임의 길이의 비트 순열도 표현
- BigInteger 와 달리 가변이다.
- 비트 하나만 상수 시간안에 바꾸는 메서드를 제공한다.
```java
BitSet moby = ...;
moby.flip(0);
```

### 2. 성능 문제
- 원하는 객체를 완성하기까지의 단계가 많다
- 그 중간 단계에서 만들어진 객체들이 모두 버려진다면 성능 문제가 불거진다.

대처방법
1. 다단계 연산들을 예측하여 기본 기능으로 제공한다.
    - 각 단계마다 객체를 생성하지 않아도 된다 
    - BigInteger 는 모듈러 지수 같은 다단계 연산 속도를 높여주는 가변 동반 클래스 companion class 를 package-private 으로 두고 있다.
    - String 클래스의 가변 동반 클래스는 StringBuilder 와 StringBuffer

## 불변 클래스를 만드는 방법

### 생성자 대신 정적 팩터리를 사용한 불변 클래스
자신을 상속하지 못하게 할 수 있다. (하위 클래스에서 상위 클래스의 생성자를 호출하지 못하므로)
```java
public class Complex {
    // ... 불변 필드

    private Complex(double re, double im) {
        this.re = re;
        this.im = im;
    }
    
    public static Complex valueOf(double re, double im) {
        return new Complex(re, im);
    }

    

}
```
- 이 방법이 최선일 때가 많다

BigInteger 와 BigDecimal
- 설계할 당시, 불변 객체가 사실상 final 이어야 한 다는 생각이 널리 퍼지지 않았음
- 두 클래스의 메서드 들은 모두 재정의할 수 있게 설계되었으며, 하위 호환성이 지금까지 발목을 잡고 있다
- 이 인수들은 가변이라 가정하고 방어적으로 복사해 사용해야 한다

## 유연성
"모든 필드는 final 이고 어떤 메서드도 그 객체를 수정할 수 없어야 한다"    
성능을 위해 다음처럼 살짝 완화해야 한다.

지연 초기화
- 어떤 불변 클래스는 계산 비용이 큰 값을 나중에 계산하여 final 이 아닌 필드에 캐시 할 수 있다.
- PhoneNumber 의 hashCode 메서드[11]는 처음 불렸을 때 해시 값을 계산해 캐시함 

## 직렬화의 주의점
Serializable 을 구현하는 불변 클래스의 내부에 가변 객체를 참조하는 필드가 있다면,
- readObject, readResolve 메서드를 반드시 제공하거나
- ObjectOutputStream.writeUnshared 와 ObjectInputStream.readUnshared 메서드를 사용해야 한다.

그렇지 않으면, 공격자가 이 클래스로부터 가변 인스턴스를 만들어 낼 수 있다.

## 타협점
클래스는 꼭 필요한 경우가 아니라면 불변이어야 한다.

- 불변 클래스는 장점이 많으며, 단점이라곤 특정 상황에서의 잠재적 성능 저하 뿐이다.
- 단순한 값 객체는 항상 불변으로 만들자
- 성능 때문에 어쩔 수 없다면 불변 클래스와 쌍을 이루는 가변 동반 클래스를 public 클래스로 제공하자 ??
- 불변으로 만들 수 없는 클래스라도 변경할 수 있는 부분을 최소화
- 객체가 가질 수 있는 상태의 수를 줄이면, 그 객체를 예측하기 쉬워지고 오류가 생길 가능성 감소
- 꼭 변경해야 할 필드를 뺀 나머지 모두를 final 로 선언
- 다른 합당한 이유가 없다면 모든 필드는 private final 이어야 한다.
- 생성자는 불변식 설정이 모두 완료된, 초기화가 완벽히 끝난 상태의 객체를 생성해야 한다.
- 확실한 이유가 없다면 생성자와 정적 팩터리 외에는 그 어떤 초기화 메서드도 public 으로 제공해서는 안된다.
- 객체를 재활용할 목적으로 상태를 다시 초기화 하는 메서드도 안된다.


