# ITEM23 태그 달린 클래스보다는 클래스 계층구조를 활용하라

## 태그 달린 클래스
- 두가지 이상의 의미를 표현하는 클래스
- 현재 표현하는 의미를 태그 값으로 알려준다.

```java
class Figure {
    enum Shape { RECTANGLE, CIRCLE };
    
    // 태그 필드 - 현재 모양을 나타낸다
    final Shape shape;
    
    // 다음 필드들은 모양이 사각형(RECTANGLE) 일 때만 쓰인다
    double length;
    double width;
    
    // 다음 필드는 모양이 원 (CIRCLE) 일 때만 쓰인다
    double radius;

    // 원용 생성자
    Figure(double radius) {
        shape = Shape.CIRCLE;
        this.radius = radius;
    }

    // 사각형용 생성자 
    Figure(double length, double width) {
        shape = Shape.RECTANGLE;
        this.length = length;
        this.width = width;
    }
        
    double area() {
        switch(shape) {
            case RECTANGLE:
                return length * width;
            case CIRCLE:
                return Math.PI * (radius * radius);
            default: 
                throw new AssertionError(shape);
        }
    }
}
```

### 단점
장황하고, 오류를 내기쉽고, 비효율적

1. 불필요한 코드가 많다.
    - 열거타입
    - 태그 필드
    - switch 문
2. 여러 구현이 한 클래스에 혼합되어 있어 가독성이 나쁘다
3. 필드를 final 로 선언하기 위해 해당 의미에 쓰이지 않는 필드까지 초기화 해야 함.
    - 메모리를 많이 사용함
    - 엉뚱한 필드를 초기화해도 런타임에 문제 발생
3. 또 다른 의미를 추가하면 코드를 수정해야 함.

## 클래스 계층 구조
객체 지향언어는 타입 하나로 다양한 의미의 객체를 표현하는 수단을 제공함.

### 1. 루트가 될 추상 클래스를 정의한다.
- 태그 값에 따라 동작이 달라지는 메서드
    - figure 의 area 메서드 (switch)
- 태그 값에 상관없이 동작이 일정한 메서드 
- 모든 하위 클래스에서 공통으로 사용하는 데이터 필드
```java
abstract class Figure {
    abstract double area();
}
```

### 2. 루트 클래스를 확장한 구체 클래스를 의미별로 정의
```java
class Circle extends Figure {
    final double radius;
    
    Circle(double radius) { this.radius = radius; }
    @Override double area() { return Math.PI * (radius * radius ); }
}
```    
```java
class Rectangle extends Figure {
    final double length;
    final double width;

    Rectangle(double length, double width) {
        this.length = length;
        this.width = width;
    }
    @Override double area() { return length * width; }    
}
```

### 장점
1. 간결하고 명확하다.
2. 태그 달린 클래스의 단점이 모두 없다.
3. 타입 사이의 자연스러운 계층 관계를 반영할 수 있다.
