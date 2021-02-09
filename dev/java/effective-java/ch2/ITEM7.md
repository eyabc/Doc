# ITEM7 다 쓴 객체 참조를 해제하라
GC 가 있는 언어에서도 메모리 관리를 신경써야 한다.

메모리 누수는 겉으로 잘 드러나지 않아 시스템에 수년간 잠복하는 사례도 있다.
이러한 누수는 철저한 코드 리뷰나 힙 프로파일러 같은 디버깅 도구를 동원해야만 발견되기도 한다.
그래서 이런 종류의 문제는 예방법을 익혀두는 것이 매우 중요하다.

## 스택에서 꺼내진 객체들을 GC 가 회수하지 않음

```java
public class Stack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;
    
    public Stack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }
    
    public void push(Object e) {
        ensureCapacity();
        elements[size++] = e;
    }

    public Object pop() {
        if (size == 0)
            throw new EmptyStackException();
        return elements[--size];
    }

    private void ensureCapacity() {
        if (elements.length == size) {
            elements = Arrays.copyOf(elements, 2 * size + 1);            
        }
    }

}
```
- 스택들이 그 객체들의 다쓴 참조 obsolete reference(다시 쓰지 않을 참조) 를 여전히 가지고 있기 때문
- 해당 참조를 다 썼을 때 null 처리 해줘야 한다.

```java
public Object pop() {
    if (size == 0) 
        throw new EmptyStackException();
    Object result = elements[--size];
    elements[size] = null;
    return result;
}
```

## null 처리는 언제 해야 할까?
객체 참조를 null 처리 하는 일은 예외적인 경우여야 한다.

### 1. 자기 메모리를 직접 관리하는 클래스
Stack 클래스는, 스택이 자기 메모리를 직접 관리하기 때문에 메모리 누수에 취약하다.
- 객체의 참조를 담는 배열은, 저장소 풀을 만들어 원소를 관리함.
- GC 는 배열의 활성 영역과 비활성 영역을 구분할 수 없다.

### 2. 캐시 메모리
`WeakHashMap`
- 캐시 외부에서, 키를 참조하는 동안에만 엔트리가 살아있는 캐시가 필요한 상황일 때
- 다쓴 엔트리는 즉시 제거됨

캐시 엔트리의 유효 기간을 정확히 정의하기 어려울 때 
- 직접 청소
- Scheduled ThreadPoolExecutor 과 같은 백그라운드 쓰레드 활용
- `LinkedHashMap`
    - remove EldestEntry 메서드를 사용하여, 캐시에 새 엔트리를 추가할 때 부수 작업으로 수행
- 더 복잡한 캐시를 만들고 싶다면 java.lang.ref 패키지 직접 활용

### 3. 리스너 (콜백)
클라이언트가 콜백을 등록하고 명확한 해지를 하지 않을 때, 콜백은 계속 쌓여감.
- 콜백을 약한참조로 저장하면 GC 가 즉시 수거해 간다.
- WeakHashMap 에 키로 저장한다.

> HashMap 의 종류와, 콜백의 해지를 하지 않은 경우, java.lang.ref 가 무엇일까?

