# ITEM6 불필요한 객체 생성을 피하라
객체 하나를 재사용하는 예시에는 불변 객체가 적합하다. 

불변 객체는 재사용해도 안전함이 명백함.

## primitive 문자열, Object 문자열
- `String s = new String("bikini");` 
    - new → Heap 영역
    - 문장 실행마다 String 인스턴스를 새로 생성.
    - 반복과 호출이 많아지면 String 인스턴스가 메모리를 차지함.
- `String s = "bikini";`
    - 리터럴 → string constant pool 영역
    - 내부적으로 String 의 intern() 메서드가 호출
         - intern() 메서드는 문자열이 string constant pool 에 존재하는지 검색
            - 있다면 그 주소값을 반환
            - 없다면 string constant pool 에 넣고 새로운 주소값을 반환 
    - 하나의 String 인스턴스 사용
    - 같은 가상 머신 안에서, 똑같은 문자열 리터럴을 사용하는 모든 코드가 같은 객체를 사용함을 보장.

```java
public final class String {
    public native String intern();
}
```
   
- [@kth496](https://gist.github.com/kth496/1d6906d43775e76bd0956be228f8f83d)
```java
public class Main {
    public static void main(String[] args) {
        String id = "taehongkim";
        String id2 = new String("taehongkim");
        String id3 = "taehongkim";
        System.out.println(id.equals(id2));  // true 값 비교
        System.out.println(id == id2);       // false 주소 비교
        System.out.println(id == id3);       // true 
    }
}
```

- Boolean(String) 생성자 < Boolean.valueOf(String) 팩터리 메서드 [1]

## 생성비용이 비싼 객체 → 캐싱
`String.matches` 
- 정규 표현식으로 문자열 형태를 확인하는 가장 쉬운 방법
```java
static boolean isRomanNumeral(String s) {
    return s.matches("reg");
}
```
- 내부적으로 Pattern 인스턴스 생성
    - 한번쓰면 가비지 컬렉션의 대상
    - 생성 비용이 높음
- Pattern 인스턴스를 캐싱 (개선후 6배 향상)
```java
public class RomanNumerals {
    private static final Pattern ROMAN = Pattern.compile(
        "^(?=....)" // 정규표현식
    );
    
    static boolean isRomanNumerals(String s) {
        return ROMAN.macher(s).matches();
    }
}
```

## 지연초기화 Lazy Initialization
메서드가 처음 호출될 때 필드를 초기화 하는 것.
- 장점: 불필요한 초기화를 없앰
- 단점: 코드가 복잡해지는 만큼 성능이 크게 개선되지 않는 경우가 많음

## Auto boxing
기본타입과 박싱된 기본 타입을 섞어 쓸 때 자동으로 상호 변환해 주는 기술

오토박싱이 일어날 때 인스턴스가 생성됨 → 반복이 많이 일어나면, 성능에 좋지 않다.

## 객체 풀
- 단순히 객체 생성을 피하기 위한 객체 풀 생성 X
    - 일반적으로 코드가 어려워짐, 메모리 사용량을 늘리고 성능을 저하
- 데이터 베이스 연결은 생성 비용이 비쌈 → 풀 생성 O
 
## 타협점
- JVM 은 별다른 일을 하지 않는 작은 객체를 생성하고 회수하는 일이 크게 부담되지 않음
- 프로그램의 명확성, 간결성, 기능을 위해서 객체를 추가로 생성하는 것이라면 일반적으로 좋은 일
- [50] 새로운 객체를 만들어야 한다면 기존 객체를 재사용 하지마라
    - 재사용 했을 때의 피해 → 버그와 보안구멍
    - 불필요한 객체 생성 → 코드 형태와 성능에만 영향
    - 객체 특성에 맞게 사용
    

Reference
--
- [== 와 equals](https://coding-factory.tistory.com/536)
