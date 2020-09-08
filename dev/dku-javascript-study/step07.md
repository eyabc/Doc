## By 형욱
오버워치 애쉬의 다이너마이트 예시가 인상적이네요. 굿굿
예제를 보면서 형욱님이 비동기프로그래밍을 하는 방법에 대해서는 잘 알게 되신것 같아요.
거기서 덧붙여 제가 한 과제를 보면 이론적인 부분도 더 있는데 읽어보시면 예제를 더 이해하는데 도움이 될 것 같습니다.!

## To 노원
setInterval 의 콜백 함수로 function(){...}을 넣어주면 해당 function 은 setInterval 객체의 메소드가 된다.
즉, 콜백함수 내 작성된 this 는 실행객체, setInterval 함수를 가리키게 되고, this 를 통해 별다른 변수 선언 없이도
함수를 끝내는 것이 가능하다.

```javascript
let i = 0;
setInterval(function(){
    i++;
    console.log(i);
    if(i === 5){
        clearInterval(this)
    }
},2000)
//5까지 콘솔에 출력되고 종료된다.
```
실제 실행을 해보니 clear 가 되지 않았았습니다. 
```javascript
for (var is = 1; is < 99999; is++)
        window.clearInterval(is);
```
이에대해 방식으로 clear 를 하였습니다.

```javascript
setInterval(function(){
    i++;
    console.log(i);
    clearInterval(this)
},2000)
```
if 문의 유무는 상관없이 `clearInterval(this)` 가 동작하지 않는 걸로 관찰 됩니다.
```javascript
setInterval(function(){
    i++;
    console.log(this); 
    clearInterval(this)
},2000)
```
출력을 해보니 이때의 this 는 window 객체였습니다. 

반면에 node.js 에서, setTimeout 콜백의 this 는 다음과 같았습니다. 
```text
Timeout {
  _idleTimeout: 2000,
  _idlePrev: null,
  _idleNext: null,
  _idleStart: 30,
  _onTimeout: [Function],
  _timerArgs: undefined,
  _repeat: 2000,
  _destroyed: false,
  [Symbol(refed)]: true,
  [Symbol(asyncId)]: 3,
  [Symbol(triggerId)]: 1
}
```
this 는 Timeout 객체 자신을 가리키고 있으며,

Timeout 객체의 메서드 _onTimeout 이 callback 함수라 추정되어  
`this._onTimeout.toString()` 을 출력한 결과는 다음과 같았습니다.
```javascript
setInterval(function () {
    i++;
    console.log(this._onTimeout.toString());
    if (i === 5) {
        clearInterval(this);
    }
}, 2000);
```

1. 결론 : node, deno, 브라우저 환경 등에 따라 출력 결과가 다를 수 있으므로, 실행 환경을 명시해 주어야 한다.
1. setTimeout 의 callback 은 Timeout 객체의 _onTimeout 의 메서드의 내용이 된다.
1. node 에서 _onTimeout 의 this 는 Timeout 객체 자신이다.

## By 유림
메이플 시럽 구매, 반죽, 생크림 휘핑 에 대한 예제가 인상 깊어요

비동기적인 코드의 예
- 사용자의 요청에 의해 특정 시간이 경과되기 전까지 어떤 함수의 실행을 보류하는 경우(setTimeout)
- 사용자의 직접 개입이 있을 때 어떤 함수를 실행하도록 대기하는 경우(addEventListner)
- 웹브라우저 자체가 아닌 다른 대상에 어떤 일을 요청하고 그에 대한 응답이 왔을 때 비로소 어떤 함수를 실행하도록 대기하는 경우(XMLHttpRequest)
- CPU의 계산에 의해 즉시 처리가 가능한 대부분의 코드는 비동기적인 코드가 아닌 동기적 코드이다.

## To 유림
`console.log('${ms} 밀리초가 지났습니다.'); // 템플릿 리터럴은 런타임 시점에 이미 문자열로 처리/변환 되서 결과에 ${ms} 그대로 표시되는 건가?(TODO)`
이런 의문점을 가져보는 습관이 좋은것 같습니다.
추가적으로 탬플릿 리터럴을 쓸 때는 `` backtick 을 사용해야 합니다. 예제에서는 '' 가 사용되었기 때문에 결과가 ${ms} 그대로 출력이 되었네요

