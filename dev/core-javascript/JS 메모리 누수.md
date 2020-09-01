# JS 메모리 누수 [:link:](https://itstory.tk/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EB%88%84%EC%88%98%EC%9D%98-4%EA%B0%80%EC%A7%80-%ED%98%95%ED%83%9C)

[Garbage Collection](./가비지%20컬렉션.md)

## 메모리 누수
어플리케이션에서 더이상 사용되지 않지만, 운영체제나 사용가능한 메모리풀에 반환 되지 않는 메모리.

### 메모리 누수의 문제점
- GC가 있어도 메모리 누수에 완전히 벗어날 수 없다.
- 특정 메모리가 실제 사용중인지는 개발자만 분명하게 알 수 있다.
- 메모리 누수는 어플리케이션의 속도 저하, 충돌, 지연시간 증가 뿐만 아니라 다른 어플리케이션에도 악 영향을 끼친다.

### `TODO` 악영향의 예시

### 자바스크립트에서 메모리 관리
이전에 할당한 메모리가 여전히 사용중인지 주기적으로 검사한다.

### 자바스크립트에서의 메모리 누수
주요 원인은 '예상치 못한 참조(unwanted references)'

## Mark and Sweep 알고리즘
JS 에서 GC가 메모리가 `다른 코드에서 접근될 수 있는지 확인`할 수 있는 방법

1. GC는 `roots`(전역변수)의 목록을 생성
1. 모든 루트들에 폐기되지 않도록, 활성화 상태를 표시한다.
    - 자식들도 재귀적으로 검사
    - 루트에 도달할 수 있는 자식 객체도 폐기 되지 않는다.
1. GC는 활성화 상태가 아닌 메모리들을 해제하여 OS에 반환함.

### 예상치 못한 참조  
- 개발자가 더이상 사용되지 않을거라 예상했지만, 활성화 상태인 루트트리에 존재하는 메모리 조각들.  
- 더이상 참조되지 않지만, 코드상 어디엔가 유지되어 해제되지 못한 변수들.  

## JS 메모리 누수의 일반적인 형태 
### 1. 우발적으로 형성된 전역변수 
아래의 bar, variable 은 전역객체의 프로퍼티.

선언되지 않은 변수 (ES6 이전)
```javascript
function foo(arg) { bar = "this is a hidden global variable"; }
```
this
```javascript
function foo () {
  this.variable = "potential accidental global";
}
foo ();
```
this 는 호출 문맥에 따라 결정되기 때문이다.

전역변수 사용후 null 처리/재할당 한다.


### 2. 잊혀진 타이머와 콜백
interval 핸들러가 수집되지 않으면, 의존 객체들도 수집되지 않음.
```javascript
var someResource = getData(); 
setInterval(function() { 
    var node = document.getElementById('Node'); 
    if(node) { 
        // Do stuff with node and someResource. 
        node.innerHTML = JSON.stringify(someResource)
    } 
}, 1000);
```

Observer와 관련 참조 (click 이벤트)
```javascript
var element = document.getElementById('button'); 
function onClick(event) { 
    element.innerHtml = 'text'; 
} 
element.addEventListener('click', onClick); 
// Do stuff 
element.removeEventListener('click', onClick); 
element.parentNode.removeChild(element); 
```

과거, IE 의 GC 버그로 (DOM 노드와 자바스크립트 코드 사이의 순환 참조`TODO`)를 탐지하지 못했다. 
- 메모리 누수가 발생하게 되었고 개발자들은 명시적으로 참조를 제거하기 시작했습니다. 

이제는 사이클을 잘 처리하지 못하는 오래된 브라우저에서도, 

요소가 범위를 벗어날 때, element 와 onClick 이 모두 수집됩니다.

즉, 노드가 제거되기 전에 removeEventListener 를 호출할 필요가 없어졌다.

### 3. DOM 에서의 외부 참조
DOM 노드를 자료구조 안에 유지할 경우. 테이블의 여러행을 빨리 업데이트 할 수 있는 장점이 있다.

그러나 이 때, DOM 노드는 DOM 트리와 elements 자료구조 두 곳에서 참조가 이루어 진다.

` document.body.removeChild(document.getElementById('button')); `
 
DOM 트리에서 제거 되어도 

자료구조에서는 여전히 참조하고 있기 때문에 메모리 누수가 생김.

```javascript
var elements = { 
    button: document.getElementById('button'), 
    image: document.getElementById('image'), 
    text: document.getElementById('text') 
}; 
function doStuff() { 
    image.src = 'http://some.url/image'; 
    button.click(); 
    console.log(text.innerHTML); 
    // Much more logic 
} 
function removeButton() { 
    // The button is a direct child of body. 
    document.body.removeChild(document.getElementById('button')); 
    // 여기서 elements 에서 여전히 button 참조를 가지고 있습니다. 
    // 이 경우 button element는 여전히 메모리에 상주하게 되며 GC에 의해 수집될 수 없습니다. 
}
```
### 4. 클로저
```javascript
var theThing = null; 
var replaceThing = function () { 
    var originalThing = theThing; 
    var unused = function () { 
        if (originalThing) 
            console.log("hi"); 
    }; 
    theThing = { 
        longStr: new Array(1000000).join('*'), 
        someMethod: function () { 
            console.log('someMessage'); 
        } 
    }; 
    // 만약 여기에 `originalThing = null` 를 추가한다면, 메모리 누수는 사라질 것 입니다. 
}; 
setInterval(replaceThing, 1000);
```

### 클로저가 생성되는 이유
- setInterval 은 첫번째 인자가 callback 함수임. replaceThing 은 반환되고 있다는 의미.
- replaceThing 의 내부 변수가 외부변수 theThing 을 참조하고 있음.

### replaceThing 이 호출될 때 마다 클로저 생성.
1. theThing 에 할당하는 행위.
2. unused 에서 originalThing(theThing) 을 참조

### unused 내부 함수가 없을 때 (originalThing[theThing] 이 사용되지 않을때)
- replaceThing 함수는 매번 실행 시 길이가 큰 문자열을 생성
- 최신 JS 엔진(V8)은 originalThing 이 사용되지 않음을 파악하고 
이전 값을 메모리 해제하여 일정 메모리 사용량을 유지시켜 줍니다.(?)
 
### unused 내부 함수의 originalThing 을 참조 `TODO`
- 비록 unused 가 사용하지 않더라도 이 코드가 반복적으로 실행될 때 마다 메모리 사용량이 꾸준히 증가
- 최신 자바스크립트 엔진은 1 depth 의 미사용 클로저에 대한 스코프를 클린징 해주지만 2 depth 부터는 안된다는 뜻
- 본질적으로 클로저의 참조고리가 생성되고(theThing 변수를 루트로),
이 클로저의 범위에는 큰 사이즈의 배열에 대한 간접적인 참조를 동반하기 때문에 상당한 양의 메모리 누수가 발생하게 됩니다.


## 5. GC 의 비직관적인 동작 
언제 수집될 지 모름.
그러나 대부분의 GC는 `메모리 할당`이 이뤄질 때 수집하고,
그 외는 유휴 상태

`TODO`
```text
사이즈가 큰 데이터 할당을 여러번 수행합니다.
Garbage Collector에 의해 대부분(혹은 전부)은 더 이상 접근되지 않는다라고 표시가 됩니다.
(더 이상 사용하지 않은 경우 null 로 초기화 했다고 가정)
더 이상의 할당을 수행하지 않습니다.
이 시나리오에서 대부분의 GC들은 더 이상 수집을 수행하지 않습니다. 
즉, 더 이상 접근되지 않는 데이터 셋들이 남아있음에도 불구하고 수집이 일어나지 않습니다. 
이는 엄격히 메모리 누수는 아니지만, 일반적인 메모리 사용량보다 더 많은 메모리를 사용하게 됩니다.
https://developer.chrome.com/devtools/docs/demos/memory/example2
```
