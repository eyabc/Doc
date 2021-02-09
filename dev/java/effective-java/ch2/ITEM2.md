# ITEM2 생성자에 매개변수가 많다면 빌더를 고려하라

정적 팩터리와 생성자의 공통 제약
- 선택적 매개변수가 많을 때 대응의 어려움

## 여러 선택적 매개변수의 몇가지 대응 방법들

### 점층적 생성자 패턴 telescoping constructor pattern
확장하기 어려운 특징

```java
public class NutritionFacts {
    private final int servingSize;  // required
    private final int servings;     // required
    private final int calories;     // options         
    private final int fat;          // options
    private final int sodium;       // options
    private final int carbohydrate; // options
    
    public NutritionFacts(int servingSize, int servings) {
        this(servingSize, servings, 0);
    }
    
    public NutritionFacts(int servingSize, int servings, int calories) {
        this(servingSize, servings, calories, 0);
    }

    // ... 
    
    public NutritionFacts(int servingSize, int servings, int calories, int fat, int sodium, int carbohydrate) {
        this.servingSize = servingSize;
        this.servings = servings;
        this.calories = calories;
        this.fat = fat;
        this.sodium = sodium;
        this.carbohydrate = carbohydrate;
    }

}
```

단점
1. 사용자가 설정하기 원치않은 매개변수까지 값을 지정해줘야 한다.
1. 매개 변수가 많아지만 클라이언트 코드를 작성하거나 읽기 어렵다.
1. 클라이언트가 매개변수의 순서를 바꿔 건네줘도, 런타임에 엉뚱한 동작을 하게 됨[51]

### 자바빈즈 패턴 JavaBeans Pattern
매개 변수가 없는 생성자로 객체를 만든 후, setter 메서드 호출하여 원하는 값을 설정

```java
public class NutritionFacts {
    private int servingSize = -1;   // required 기본값 없음
    private int servings = -1;      // required 기본값 없음
    private int calories = 0;
    private int fat = 0;
    private int sodium = 0;
    private int carbohydrate = 0;
    
    public NutritionFacts() {}
    
    public void setServingSize(int val) { servingSize = val; }
    public void setServings(int val) {servings = val; }
    // ...
}
```
...
```java
class SomeWhere {
    NutritionFacts cocaCola = new NutritionFacts();
    cocaCola.setServingSize(240);
    cocaCola.setServings(8);
    // ...
}
```

단점 
1. 객체 하나를 생성하기 위해 메서드를 여러개 호출해야 함
1. 객체 완성 전까지 일관성 consistency 가 무너진 상태
    - 런타임, 디버깅 문제
1. 클래스를 불변으로 만들 수 없다.
    - 스레드 안정성을 얻으려면 추가 작업 필요

## 빌더 패턴 Builder pattern
점층적 생성자 패턴과 자바빈즈 패턴의 장점만 취했다.

```java
public class NutritionFacts {
    // final 로 선언 -> 불변
    private final int servingSize;
    private final int servings;
    private final int calories; 
    // ...
    
    public static class Builder {
        // 필수 매개 변수
        private final int servingSize;
        private final int servings;
    
        // 선택 매개 변수 - 기본값으로 초기화
        private int calories = 0;
        // ...
        
        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
            this.servings = servings;
        }
    
        public Builder calories(int val) {
            this.calories = val;
            // 연쇄적 호출 : fluent API, method chaining
            return this;
        }
        // ...
        
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }

        private NutritionFacts(Builder builder) {
            servingSize = builder.servingSize;
            // ...
        }
        
    }
}

class Client {
    NutritionFacts cocaCola = new NutritionFacts.Builder(240, 8)
                                                .calories(100)
                                                // ...
                                                .build();
}
```

## 빌터 패턴의 특징
1. 클라이언트가 쓰기/읽기 가 수월함
1. 각각의 체이닝 메서드에서 유효성 검사 코드를 삽입할 수 있다.
1. 코드가 장황해서 매개변수가 4개 이상은 되어야 값어치를 한다.

## 계층적으로 설계된 클래스와 함께 쓰기 좋다. 

```java
public abstract class Pizza {
    public enum Topping { HAM, MUSHROOM, ONION, PEPPER, SAUSAGE }
    final Set<Topping> toppings;

    abstract static class Builder<T extends Builder<T>> { // [30]
        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
        public T addTopping(Topping topping) {
            toppings.add(Object.requiredNonNull(topping));
            return self;
        }

        abstract Pizza build(); 
    
        // 하위 클래스는 이 메서드를 override 하여 this 를 반환하도록 해야 한다. 
        // 하위 클래스에서 형 변환을 하지 않고도 메서드 연쇄 지원.
        protected abstract T self();

    }
    
    Pizza(Builder<?> builder) {
        toppings = builder.toppings.clone(); // [50]
    }      
}

public class NyPizza extends Pizza {
    public enum Size { SMALL, MEDIUM, LARGE }
    private final Size size;
        
    public static class Builder extends Pizza.Builder<Builder> {
        private final Size size;
        
        public Builder(Size size) {
            this.size = Objects.requiredNonNull(size);
        }

        // 구체 하위 클래스를 반환하도록 선언 -> 클라이언트가 형 변환에 신경쓰지 않고도 빌더 사용가능
        @Override public NyPizza build() {
            return new NyPizza(this);
        }
    
        @Override protected Builder self() {
            return this;
        }   
    }

    private NyPizza(Builder builder) {
        super(builder);
        size = builder.size;
    }
}

class Client {
    NyPizza pizza = new NyPizza.Builder(NyPizza.Size.SMALL)
                                .addTopping(Pizza.Topping.SAUSAGE)
                                .addTopping(Pizza.Topping.ONION)
                                .build();
}
```
