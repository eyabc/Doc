# ITEM5 자원을 직접 명시하지 말고 의존 객체 주입을 사용하라

많은 클래스가 하나 이상의 자원에 의존한다.

- 맞춤법 검사기를 예를 들면, 맞춤법 검사기는 사전(dictionary) 에 의존한다.
 
이것을 어떻게 구현하면 좋을 지 알아보도록 하자.

1. 정적 유틸리티를 잘못 사용한 예 - 유연하지 않고 테스트하기 어렵다.
```java
public class SpellChecker {
    private static final Lexicon dictionary = ...;
    private SpellChecker() {} 
    public static boolean isValid(String word) { ... }
    public static List<String> suggestions(String typo) { ... }
}
```

2. 싱글턴을 잘못 사용한 예 - 유연하지 않고 테스트하기 어렵다.
```java
public class SpellChecker {
    private final Lexicon dictionary = ...;
    private SpellChecker() {} 
    public static SpellChecker INSTANCE = new SpellChecker(...);
    public boolean isValid(String word) { ... }
    public List<String> suggestions(String typo) { ... }
}
```

정적 유틸리티와 싱글턴의 사용은 **사전을 단 하나만 사용** 한다고 가정했을 때 유효하다.
따라서 여러 사전이 있을때의 대응이 어렵다.

## 의존 객체 주입
SpellChecker 인스턴스 생성자에 필요한 자원 (dictionary) 를 넘겨주는 방식.

> requireNonNull ?? 을 한번도 사용해 본적이 없는데, 생성자를 만들 때 이러한 동작이 얼마나 필요한지 궁금하다. 
```java
public class SpellChecker {
    private final Lexicon dictionary;
    
    public SpellChecker(Lexicon dictionary) {
        this.dictionary = Objects.requireNonNull(dictionary);
    }

    // ...
}
```
- 유연성과 테스트 용이성을 높여준다.
- 불변성을 보장
- 의존성이 수천개나 되는 큰 프로젝트에서는 코드를 어지럽게 만들기도 한다.
    - 의존 객체 주입 프레임워크를 사용할 수 있다.
        - Dagger, Guice, Spring

## 생성자에 자원 팩터리를 넘겨주는 방식
팩터리
- 호출할 때마다, 특정 타입의 인스턴스를 반복해서 만들어 주는 객체
- 자바8 의 `Supplier<T>` 인터페이스가 팩터리를 표현..
    > 아마도 람다의 개념이이었나 ?? 모르겠다 
                               
- `Mosaic create(Supplier<? extends Tile> tileFactory)`
    - 클라이언트가 제공한 팩터리가 생성한 타일들로 구성된 모자이크를 만드는 메서드
    
    
## 요약
- 클래스가 내부적으로 하나 이상의 자원에 의존하고,     
- 그 자원이 클래스 동작에 영향을 준다면     

싱글턴과 정적 유틸리티 클래스는 사용하지 않는 것이 좋다.    
이 자원들을 클래스가 직접 만들게 해서도 안된다.

- 대신 필요한 자원을 생성자에 넘겨주자.
- 혹은 그 자원을 만들어주는 팩터리를 정적 팩터리나 빌더에 넘겨주자.

의존 객체 주입 기법은 **클래스의 유연성, 재사용성, 테스트 용이성**을 대폭 개선해준다.


