# ITEM22 인터페이스는 타입을 정의하는 용도로만 사용하라

## 안티패턴 - 상수 인터페이스
### 상수 인터페이스 
- 메서드 없이, 상수를 뜻하는 static final 필드로만 가득찬 인터페이스
```java
public interface PhysicalConstants {
    static final double AVOGADRO_NUMBER = ...;
    static final double BOLTZMANN_CONSTANT = ...;
    // ...
}
```

### 문제점
1. 클래스 내부에서 사용하는 상수는 외부 인터페이스가 아닌 내부 구현이다.
    - 내부 구현을 클래스의 API 로 노출하는 행위임
2. 오히려 사용자에게 혼란을 줌
3. 클라이언트 코드가 상수들에 종속되게 함.
    - 다음 릴리즈에서 더이상 사용하지 않더라도, 바이너리 호환성을 위해 상수인터페이스를 구현해야 한다.
4. final 이 아닌 클래스가 상수 인터페이스를 구현한다면, 모든 하위 클래스의 이름 공간이 그 인터페이스가 정의한 상수들로 오염된다.

## 상수 공개 방법
1. 특정 클래스나 인터페이스와 강하게 연관된 상수라면 자체에 추가해야 한다.
    - 모든 숫자 기본타입의 박싱 클래스
    - Integer 와 Double 에는 MIN_VALUE, MAX_VALUE 상수가 있음

2. 열거 타입   
3. 인스턴스화 할 수 없는 상수 유틸리티 클래스
    ```java
    public class PhysicalConstants {
        private PhysicalConstants() { } // 인스턴스화 방지
        public static final double AVOGADROS_NUMBER = ...;
        public static final double BOLTZMANN_CONST = ...;
        // ...
    }
    ```
   - 정적 임포트를 사용해 상수 이름만으로 사용하기
        ```java
        import static ...PysicalConstants.*;    
        public class Test {
            double atoms(double mols) {
                return AVOGADROS_NUMBER * mols;
            }
        }
        ```

