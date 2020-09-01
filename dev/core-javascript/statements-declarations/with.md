# with 

## Syntax
```text
with (expression)
  statement
```

### expression 
`statement` 를  평가할 때, 범위 체인에, `expression` 을 추가
- statement 가 expression 속성의 속성인가?  
    - `YES` expression 에 바인딩 된다.
    - `NO` ReferenceError 
- 표현식을 중괄호로 감싸는 것은 필수

### statement
- 모든 구문 
- 여러개의 명령문을 실행 : 블록명령문 ({...}) 사용 - 명령문을 그룹화

## Not recommended 
- 혼란스러운 버그 야기
- 호환성 이슈
- ES5 엄격모드에서 금지

## 예시 
특정 조건에서 작성해야 할 코드의 양을 줄임 
```javascript
with(document) { //document가 속성 앞에 붙게 됩니다.
    write("with 명령문을 사용하면<br>");
    write("반복 사용할 특정객체를<br>");
    write("여러번 사용하지 않고도<br>");
    write("편리하게 사용할 수 있습니다");
}

// BEFORE
x = Math.cos(3 * Math.PI) + Math.sin(Math.LN10) 
y = Math.tan(14 * Math.E)

// AFTER
with (Math){
   x = cos(3 * PI) + sin (LN10)  
   y = tan(14 * E)
}
```

## 장점
- `성능 저하없이` 긴 `객체 참조를 반복`해야할 필요를 `줄여` `파일 크기를 감소`
- with 에 필요한 `스코프 체인 변경 연산`은 `비용이 없다`.
- `반복되는 객체 참조`를 하는 인터프리터가 `해소`된다.
    - 임시변수를 사용하는 방법으로 with 를 대체할 수 있다.
    
### 단점
- statement 가 expression 의 속성이 아닌경우, with 를 안썼을 때 보다 시간이 더 소요된다.
    - 성능이 중요한 경우 with statements 에는 expression 의 멤버에 접근하는 코드만 써야한다.

#### 모호성
사람이나 js 컴파일러가 인식하는 `console.log(x)` x 의 스코프 체인의 혼란이 올 수 있다. (....?)
```javascript
function f(x, o) {
  with (o) {
    console.log(x);
  }
}
```
```javascript
f('a', {}); // 'a'
```
```javascript
f('a', { x: 'A'});  // 'A'
```

```javascript
f([1,2,3], obj)
```


Reference
--
- [blog](https://m.blog.naver.com/PostView.nhn?blogId=seilius&logNo=130165893114&proxyReferer=https:%2F%2Fwww.google.com%2F)
- [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/with)
