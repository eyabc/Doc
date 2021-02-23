# ITEM16 public 클래스에서는 public 필드가 아닌 접근자 메서드를 사용하라
- public 클래스는 절대 가변 필드를 직접 노출해서는 안된다.
- 불변 필드라면 덜 위험하지만 완전히 안심할 수는 없다.
- package-private 클래스나 private 중첩 클래스에서는 종종(불변이든 가변이든) 필드를 노출하는 편이 나을 때도 있다.

## 인스턴스 필드만 모아놓은 클래스는 public 이어서는 안된다.
```java
class Point {
    public double x;
    public double y;
}
```
- 데이터 필드에 직접 접근 가능 → 캡슐화의 이점을 제공하지 못함[15]

## public 클래스 → 접근자와 변경자(mutator) 메서드를 활용한 데이터의 캡슐화
- 패키지 바깥에서 접근할 수 있는 클래스라면 접근자를 제공함으로써 
- 클래스 내부 표현 방식을 언제든 바꿀수 있는 유연성을 얻음
```java
class Point {
    private double x;
    private double y;
    
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
    
    public double getX() { return x; }
    public double getY() { return y; }

    public void setX(double x) { this.x = x; }
    public void setY(double y) { this.y = y; }
}
```

## package-private 클래스 / private 중첩 클래스
데이터 필드를 노출해도 괜찮다
- 접근자 방식보다 훨씬 깔끔하다
- 클라이언트 코드가 이 클래스 내부 표현에 묶이기도 하나, 클라이언트 코드는 이 클래스를 포함하는 패키지 안에서만 동작하는 코드
- 패키지 바깥 코드는 전혀 손대지 않고도 데이터 표현 방식을 바꿀 수 있다.

## 규칙을 어긴 자바 플랫폼의 라이브러리
java.awt.package 의 Point 와 Dimension 클래스는 내부를 노출하여 심각한 성능 문제가 발생하였으며
오늘날까지도 해결되지 못함

## 불변 필드를 노출한 public 클래스
직접 노출할 때의 단점이 조금 줄어들긴 하지만, 결코 좋은 생각이 아니다.

- API 를 변경하지 않고는 표현 방식을 바꿀 수 없다.
- 필드를 읽을 때 부수 작업을 수행할 수 없다.

```java
public final class Time {
    private static final int HOURS_PER_DAY = 24;
    private static final int MINUTES_PER_HOUR = 60;
    
    public final int hour;
    public final int minute;

    public Time(int hour, int minute) {
        // ...
    }
    // ...

}
```
