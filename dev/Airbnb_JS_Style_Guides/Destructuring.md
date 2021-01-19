# Destructuring

## prefer-destructuring :  
- 임시 references 생성을 줄여준다.

```javascript
// bad
function getFullName(user) {
  const firstName = user.firstName;
  const lastName = user.lastName;

  return `${firstName} ${lastName}`;
}

// good
function getFullName(user) {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// best
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}
```

## prefer-destructuring : 배열 destructuring
```javascript
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;
```

## 리턴값이 여러개 일 때 : 객체 비구조화 > 배열 비구조화
- 객체 비구조화는, 추후에 코드에 새 속성을 추가 할 수 있다.
- 리턴 값을 순서에 상관없이 가져올 수 있다. 
- 호출 할 때, 원하는 data 를 선택할 수 있다.

```javascript
// bad
function processInput(input) {
  // then a miracle occurs
  return [left, right, top, bottom];
}

// 호출을 할 때 반환값의 순서를 고려해야 하는 문제가 있다.
const [left, __, top] = processInput(input);

// good
function processInput(input) {
  // then a miracle occurs
  return { left, right, top, bottom };
}

// 호출 할 때, 원하는 data 를 선택할 수 있다.
const { left, top } = processInput(input);
```
