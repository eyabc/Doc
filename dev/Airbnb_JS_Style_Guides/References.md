# References

## prefer-const, no-const-assign : 모든 곳에 const 사용
- 인지 부하 감소
- 유지 관리성 향상

references 의 재할당 -> bugs, 코드 이해의 어려움

## no-var : references 재할당 -> let
함수 스코프 var < 블록 스코프 let

- 블록 스코프는 다른 많은 프로그래밍 언어에서 일반적이다.
- 블록 스코프는 프로그래머의 실수 방지

```javascript
var count = people.length;
var enoughFood = count > sandwiches.length;

if (enoughFood) {
    var count = sandwiches.length; // 실수로 count 변수 재정의
    console.log("We have " + count + " sandwiches for everyone. Plenty for all!");
}

// count 변수가 더 이상 정확하지 않습니다.
console.log("We have " + count + " people and " + sandwiches.length + " sandwiches!");
```

## let/ const -> block-scoped.
