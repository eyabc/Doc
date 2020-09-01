# 함수형 프로그래밍
- [인프런 함수형 프로그래밍 유인동](https://www.inflearn.com/course/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)

## 클로저 [:link:](./반환함수)

## 성공적인 프로그래밍
- 모든 프로그래밍 패러다임은 성공적인 프로그래밍을 위해 존재한다.
- 성공적인 프로그래밍은 좋은 프로그램을 만드는 일이다.
- 좋은 프로그램은 사용성, 성능, 확장성, 기획변경에 대한 대응력이 좋다.
- 이것들을 효율적이고 생산적으로 이루는 일이 성공적인 프로그래밍이다.


## 함수형 프로그래밍 정의, 순수함수
함수형 프로그래밍은 성공적인 프로그래밍을 위해   
부수효과를 미워하고 조합성을 강조하는    
프로그래밍 패러다임이다.

- 부수효과를 미워한다 -> 순수함수를 만든다.
- 조합성을 강조한다 -> 모듈화 수준을 높인다.
- 순수함수로 모듈화 수준을 높이게 되면 오류를 줄이고 안정성을 높일 수 있다.
- 모듈화 수준이 높다 -> 생선성을 높인다.

함수형 프로그래밍은 애플리케이션, 함수의 구성요소, 더 나아가서 언어 자체를 함수처럼 여기도록 만들고,
이러한 함수 개념을 가장 우선순위에 놓는다.

함수형 사고방식은 문제의 해결 방법을 동사(함수) 들로 구성(조합) 하는 것

데이터(객체) 기준
```javascript
duck.moveLeft();
duck.moveRight();
```
함수 기준
```javascript
moveLeft(dog);
moveRight(duck);
```


### 순수함수
원래 있던 부분은 놔두고 새로운 값을 생성해서 리턴하는 형식으로 함수를 만든다. 

#### 순수함수의 조건
- 들어오는 인자가 같으면 항상 동일한 결과를 리턴한다.
    ```javascript
    function add(a, b) {
        return a + b;
    }
    console.log(add(10, 5));
    console.log(add(10, 5));
    ```
- 평가 시점이 중요하지 않다.
    서로 다른 공간이나 스레드에서 함수를 평가시켜도 항상 동일한 결과를 리턴하기 때문에 안전하고 다루기 쉽다.
  - 아닐 조건   
    c 가 상수일 때는 순수함수지만, 변수일 때는 순수함수가 아닐 수 있다.    
    c 변경 전후(평가 시점) 에 따라서 같은 인자더라도 다른 결과를 리턴한다.
      ```javascript
        var c = 10;
        function add2(a, b) {
            return a + b + c;
        }
        console.log(add(10, 2));
        console.log(add(10, 3));
        
        c = 20;
        // 결과가 달라진다.
        console.log(add(10, 2));
        console.log(add(10, 3));
    ```
- 부수효과
    - 외부의 상태를 변경
        ```javascript
        var c = 20;
        function add3(a, b) {
            c = b;
            return a + b;
        }
        console.log(c); // 20 
        console.log(add3(20, 30));
        console.log(add3(20, 30));
        console.log(c)  // 30
        ``` 
    - 들어온 인자의 상태를 직접 변경
        ```javascript
        var obj1 = { val: 10 };
        function add4(obj, b) {
            obj.val += b;
        }
        console.log(obj1.val); // 10
        add4(obj1, 20);
        console.log(obj1.val); // 30
        ```
    - 부수효과가 없는 함수
        ```javascript
        var obj1 = { var: 10 };
        function add5(obj, b) {
          return { val: obj.val + b }
        }
        console.log(obj1.val);    // 10
        var obj2 = add5(obj1, 20);
        console.log(obj1.val);    // 10
        console.log(obj2.val) // 20 
        ```  
- 리턴값 외에는 외부와 소통하지 않는다.

### 일급함수
함수를 값으로 다룰 수 있다.
- 런타임에서 언제나 정의할 수 있다.
- 인자로 넘겨질 수 있다.
    ```javascript
    var f1 = function(a) { return a * a };
    console.log(f1)
    ```
- 함수를 변수에 담는다 `var f2 = add;`
- 원하는 시점에 평가할 수 있다.

```javascript
function f3(f) {
    return f(); 
}
f3(function() { return 10; });
f3(function() { return 20; });
```

### add_maker
함수를 리턴하는 함수
```javascript
function add_maker(a) {
    return function(b) {
        return a + b;
    }
}
var add10 = add_maker(10);
console.log(add10(20));
```
add_maker(10)을 호출하면
```javascript
return function(b) {
    return 10 + b; 
}
```
라는 함수(클로저)를 리턴하게 된다. 
add10 는 위에 생성된 익명함수가 되고 add10(20) 을 호출하면 20을 리턴하게 된다.


위 예제는 아래 세가지를 담고 있다.
1. 클로저
2. 일급함수
3. 순수함수
    - a 는 클로저 내부에서 사용되지만 a 의 상태를 변경하고 있지 않다. 

```javascript
function f4(f1, f2, f3) {
    return f3(f1 + f2);
}
f4(
    function() { return 2; },
    function() { return 3; },
    function(a) { return a * a }
);
```
순수한 함수들을 조합하고, 평가 시점에 의존되지 않도록 하는 프로그래밍.

## 요즘 개발 이야기
|   |   |
|---|---|
| 재미, 실시간성 | 라이브방송, 실시간 댓글, 협업, 메신저|
| 독창성, 완성도 UI UX | 애니메이션, 무한 스크롤, 벽돌형태 리스트 |
| 더 많아져야하는 동시성 | 비동기 I/O, CSP, Actor, STM |
| 더 빨라야하는 반응성, 고가용성 | ELB, Auto Scaling, OTP Supervisor | 
| 대용량, 정확성, 병렬성 | MapReduce, Clojure Reducers |
| 복잡도, MSA, ... | 많아지고 세밀해지는 도구들 |
* 고가용성 - 절대 죽지 않는 서비스

- 좋아지는 하드웨어 성능
- 좋아지는 컴파일러
- 함수형 프로그래밍 기술
- 좋아지는 분산/리액티브 환경
- 동시성 + 병렬성 관련 기술 
- 성공적인 적용 사례

## 함수형으로 전환하기
```javascript
var user = [
    { id: 1, name: 'ID', age: 36 },
    { id: 2, name: 'BJ', age: 32 },
    { id: 3, name: 'JM', age: 32 },
    { id: 4, name: 'PJ', age: 27 },
    { id: 5, name: 'HA', age: 25 },
    { id: 6, name: 'JE', age: 26 },
    { id: 7, name: 'JI', age: 31 },
    { id: 8, name: 'MP', age: 23 },
]
```

### 명령형 프로그래밍 보다 선언적 프로그래밍
- 코드가 간결
- 오류와 실수 감소
- 정확하게 코딩했다는 확신을 느끼기 쉽다.

### 1. 명령형 코드
1. 30 세 이상인 users 를 거른다.
```javascript
const temp_users = [];
for (let i = 0; i < users.length; i++) {
    if (users[i].age >= 30) {
        temp_users.push(users[i]);
    }
}
console.log(temp_users);
```

2. 30세 이상인 users의 names를 수집한다.
```javascript
const names = [];
for (let i = 0; i < temp_users.length; i++) {
    names.push(temp_users[i].name);
}
console.log(names);
```

3. 30세 미만인 users를 거른다.
```javascript
const temp_users = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
```

4. 30세 미만인 users의 ages를 수집한다.
```javascript
const ages = [];
for (let i = 0; i < temp_users.length; i++) {
    ages.push(temp_users[i].age);
}
console.log(ages);
```

### 2. _filter, _map 으로 리팩토링
1번과 3번의 중복을 제거해 보자.
```javascript
function _filter(users, predi) {
    const new_list = [];
    for (let i = 0; i < users.length; i++) {
        // 어떤 조건일 때 filter 를 할 것인가를 predi 라는 함수에 완전히 위임한다.
        if (predi(users[i])) {
            new_list.push(users[i]);
        }
    }
    return new_list;
}
console.log(
    _filter(users, function(user) { return user.age >= 30 }),
    _filter(users, function(user) { return user.age < 30; }),
);
```
users 말고도 규격을 맞춘다면 다른 객체를 사용할 수 도 있다.
```javascript
console.log(
    _filter([1, 2, 3, 4], function(num) { return num % 2; }),
)
```
이제 users 를 list 로 일반화 시켜보자.
```javascript
function _filter(list, predi) {
    const new_list = [];
    for (let i = 0; i < list.length; i++) {
        // 어떤 조건일 때 filter 를 할 것인가를 predi 라는 함수에 완전히 위임한다.
        if (predi(list[i])) {
            new_list.push(list[i]);
        }
    }
    return new_list;
}
```
---
2 와 4 의 중복을 제거해 보자.
```javascript
function _map(list, mapper) {
    const new_list = [];
    for (let i = 0; i < list.length; i++) {
        new_list.push(mapper(list[i]));
    }
    return new_list;
}
```
```javascript
const over_30 = _filter(users, function(user) { return user.age >= 30 });
const names = _map(over_30, function(user) {
    return user.name;
});

const under_30 = _filter(users, function(user) { return user.age < 30 });
const ages = _map(over_30, function(user) {
    return user.age;
});
_map([1, 2, 3], function(num) { return num * 2 });
```
```javascript
console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30; }),
    function(user) { return user.name; }));

console.log(
  _map(
    _filter(users, function(user) { return user.age < 30; }),
    function(user) { return user.age; }));
```

### each
filter 와 map 의 중복을 제거하자
1. for loop
2. list[i]

```javascript
function _each(list, iter) {
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}
```
```javascript
function _filter(list, predi) {
    const new_list = [];
    _each(list, function(val) {
        if (predi(val)) new_list.push(val);
    });
    return new_list;
}
```
```javascript
function _map(list, mapper) {
    const new_list = [];
    _each(list, function(val) {
        new_list.push(mapper(val));
    });
    return new_list;
}
```

### 다형성
- 자바스크립트 array.prototype 의 map, each, filter 는 함수가 아닌 메서드 이다.
    - 이것은 순수함수가 아니며, 객체의 상태에 따라 결과가 달라진다.
    - 메서드는 객체지향 프로그래밍이다.
    - 메서드는 해당 클래스의 인스턴스에서만 사용할 수 있다. 
    - array 가 아니면 사용할 수 없다
    - 다형성을 지원하기가 어렵다.
- array like 객체 
    - javascript 에 array 가 아닌데 array 같이 여겨지는 객체들 
    - jquery 객체
    - document.querySelectorAll('body'); 
    - document.querySelectorAll('*'); 
        - 배열이 아닌  NodeList.

- 함수형 프로그래밍의 높은 다형성
    - 그리고 우리가 만든 map 함수를 사용한다면 array like 도 사용할 수 있다.
    - length / key:value 형태만 만족하면 된다.
 
### 외부 다형성 
`array_like, arguments, document.querySelectorAll`    
은 map 이나 filter 가 담당


### 내부 다형성
우리가 만든 `predi, iter, mapper`
은 배열안에 어떤 값이든 들어있어도 무언가를 수행할 수 있게 만드는 역할을 하는 보조 함수
```javascript
_map([1, 2, 3, 4], function(v) {
    return v + 10;
})
```
함수의 두번째 인자를 보통 callback 함수라고 부르는데, 사실 역할에 따라서 부르는 이름이 달라진다.
- callback 함수:  어떤 일을 다 끝난 후에 리턴하는 함수 
- predicate : 조건을 리턴하는 함수
- iterator(?): 돌면서 반복적으로 실행되는 함수
- mapper: 무언가의 사이를 매핑하는 함수

보조 함수의 이름을 다르게 불러주자

### 커링 curry, curryr
함수와 인자를 다루는 기법.     
함수의 인자를 하나씩 적용해 나가다가, 필요한 인자가 모두 채워지면 함수본체를 실행한다.

JavaScript 는 커링을 지원하지 않지만, 일급함가 지원되고 평가시점을 마음대로 다룰 수 있기 때문에
커링을 구현할 수 있다.

#### curry
```javascript
function _curry(fn) {
    return function(a) {
        return function(b) {
            return fn(a, b);
        }
    }
}
```
curry 가 아닌 예
```javascript
const add = function(a, b) {
    return a + b;
};
console.log(add(10, 5));    // 15
```
curry 를 사용한 예
```javascript
const add2 = _curry(function(a, b) {
    return a + b;
});

const add10 = add2(10);
console.log(add10(5)); // 15

console.log(add2(5)(3));    // 15
```
curry 의 변형
```javascript
function _curry(fn) {
    return function(a, b) {
        if (arguments.length === 2) return fn(a, b);
        return function(b) {
            return fn(a, b);
        }
    }
}
console.log(add2(1, 2))
```
```javascript
function _curry(fn) { 
    return function(a, b) {
        return arguments.length === 2 ? fn(a, b) : function(b) { return fn(a, b); };
    }
}
console.log(add2(1, 2))
```
curry 를 이용한 빼기 함수
```javascript
const sub = _curry(function(a, b) {
    return a - b;
})
console.log(sub(10, 5));    // 5
```

#### curryr 함수
인자를 오른쪽에서 부터 채워나감
```javascript
const sub10 = sub(10);
console.log(sub10(5));  // 5
```
인자를 를 반대로 채워넣고 싶을때

```javascript
function _curryr(fn) {
    return function (a) {
        return arguments.length === 2 ? fn(a, b) : function(b) { return fn(b, a)}
    }
}
```
```javascript
var sub = _curryr(function(a, b) {
    return a - b;
})
console.log(sub(10, 5));
const sub10 = sub(10);
console.log(sub10(5));  // -5
```

#### _get 
object 의 값을 안전하게 참조하는 함수
```javascript
function _get(obj, key) {
  return obj === null ? undefined : obj[key];
}
```
있는 값을 참조할 때
```javascript
const user1 = users[0];
console.log(user1.name);
console.log(_get(users1, 'name'));
```
만약 없는 값을 참조하려 할 때
```javascript
console.log(users1[10].name)    // undefined Type Error
console.log(_get(users[10], 'name'));   // undefined
``` 
---
커링을 이용한 _get
```javascript
const _get = _curryr(function(obj, key) {
    return obj === null ? undefined : obj[key];
})
console.log(_get('name')(user1));
```
name 을 꺼내는 함수를 만들어 재활용 할 수 있다. 
```javascript
const get_name = _get('name');
console.log(get_name(user1));
console.log(get_name(user1[3]));
```
이전의 _map 을 사용한 코드를 더 간결하게 할 수 있다.
```javascript
console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30; }),
    function(user) { return user.name; }));

console.log(
  _map(
    _filter(users, function(user) { return user.age < 30; }),
    function(user) { return user.age; }));
```
->
```javascript
console.log(
  _map(
    _filter(users, function(user) { return user.age >= 30; }),
    _get('name')
))

console.log(
  _map(
    _filter(users, function(user) { return user.age < 30; }),
    _get('age')))
```

### _reduce
```javascript
function _reduce(list, iter, memo) {

}
console.log(
    _reduce([1, 2, 3], function(a, b) {
        return a + b;
    }, 0) 
)   // 6
```


## 고차함수

함수를 인수로 받는 함수 ex) map, reduce...
함수를 반환하는 함수 ex) bind

