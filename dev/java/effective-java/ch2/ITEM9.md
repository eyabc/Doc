# ITEM9 try-finally 보다는 try-with-resources 를 사용하라
## close 메서드 호출로 직접닫아주어야 하는 자원
- InputStream
- OutputStream
- java.sql.Connection

클라이언트가 놓치기 쉬워서 예측할 수 없는 성능 문제로 이어지기도함.

## try-finally  
전통적인 자원 회수 수단이지만, 최선의 방책이 아니다.

### 1. 자원이 둘 이상이면 너무 지저분하다.

```java
static void copy(String src, String dst) throws IOException {
    InputStream in = new FileInputStream(src);
    try {
        OutputStream out = new FileOutputStream(dst);
        tru {
            byte[] buf = new byte[BUFFER_SIZE];
            int n;
            while ((n = in.read(buf)) >= 0)
                out.write(buf, 0, n);
        } finally {
            out.close()
        }   
    } finally {
        in.close();
    }
}   
```

### 2. 예외는 try / finally 블록에서 모두 발생할 수 있다.
기기에서 물리적인 문제가 생긴다면, readLine 메서드가 예외를 던지고, 같은 이유로 close 메서드도 실패한다.

두번째 예외가 첫번째 예외를 덮는다.
이때, 첫번째 예외를 스택에서 디버깅 할 수 없다.

 ```java
 static String firstLineOfFile(String path) throws IOException {
     BufferedReader br = new BufferedReader(new FileReader(path));
     try {
         return br.readLine();
     } finally {
         br.close();
     }
 }
 ```

## try-with-resources
코드는 더 짧고 분명해지고, 만들어지는 예외 정보도 훨씬 유용하다.

해당 자원이 AutoCloseable 인터페이스를 구현해야 한다.

### AutoCloseable 인터페이스
void 를 반환하는 close 메서드만 하나 정의한 인터페이스

- 자바라이브러리와 서드파티라이브러리들의 수많은 클래스와 인터페이스가 AutoCloseable 을 구현하거나 확장함.
- 닫아야 하는 자원의 클래스를 작성할 때, AutoCloseable 을 구현하자.

```java
static String firstLineOfFile(String path) throws IOException {
    try (BufferedReader br = new BufferedReader(new FileReader(path))) {
        return br.readLine();
    }
}
```

### 복수 자원 처리
try-finally 2번 처럼, 예외가 숨겨져도, 스택 추적 내역에 suppressed 로 출력이 된다.
- 자바7 에서 Throwable 에 추가 된 getSuppressed 메서드를 이용하면 프로그램 코드에서 가져올 수 있다.

```java
static void copy(String src, String dst) throws IOException {
    try (InputStream in = new FileInputStream(src);
         OutputStream out = new FileOutputStream(dst)) {
        byte[] buf = new byte[BUFFER_SIZE];
        int n;
        while((n = in.read(buf)) >= 0)
            out.write(buf, 0 , n);
    }
}
```

### try-with-resource 와 catch 함께 쓰기

```java
static String firstLineOfFile(String path, String defaultVal) {
    try (BufferedReader br = new BufferedReader(
            new FileReader(path))) {
        return br.readLine();
    } catch (IOException e) {
        return defaultVal;
    }
}
```
