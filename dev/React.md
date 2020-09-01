# React

## 리액트 함수형 컴포넌트와 클래스의 차이
- [Ref](https://overreacted.io/ko/how-are-function-components-different-from-classes/)

### 함수형 컴포넌트는 렌더링된 값들을 고정시킨다.
#### 코드의 차이
함수형 컴포넌트
```jsx harmony
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```
클래스형
```jsx harmony
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
```

#### 결과의 차이
1. Follow 버튼을 누른다.
2. 3초가 지나기 전에 선택된 프로필을 바꾼다.

클래스형 컴포넌트의 버그
- 바뀐 프로필에 Follow 된다.

함수형 컴포넌트
- 바뀌기 전의 프로필에 Follow 된다.

### 클래스 컴포넌트의 동작 방식
```jsx harmony
class ProfilePage extends React.Component {
  showMessage = () => {
    alert('Followed ' + this.props.user);
  };
    //...
}
```
#### Pros, state
immutable

#### this
mutable
- 리액트에서 this.state 의 변경으로 render/라이프사이클 메서드를 호출할 때 업데이트된 값을 읽어올 수 있게 된다.
- 요청이 진행되고 있는 상황에서 `클래스 컴포넌트가 다시 렌더링` 되면 `this.props 또한 바뀐다.`

UI의 성질
- UI가 현재 어플리케이션 상태를 보여주 함수라면,
이벤트 핸들러 또한 렌더링 결과의 한 부분이다.
- 즉 `이벤트 핸들러`가 어떤 props와 state를 가진 `render에 종속`된다.

timeout 의 콜백함수
- render 종속되지 않아짐.
- 올바른 props를 잃음

#### 해결방법
1. this.props를 일찍 부르고 timeout함수에 미리 저장한 값 전달
    ```jsx harmony
    class ProfilePage extends React.Component {
        showMessage = (user) => {
            alert('Followed ' + user);
        };
        handleClick = () => {
            const { user } = this.props;
            setTimeout(() => this.showMessage(user), 3000);
        }
        render() {
            return <button onClick={this.handleClick}>Follow</button>;
        }
    }
    ```
   - 문제점
        - 코드를 복잡하게 하고, 에러에 노출될 가능성이 높아진다.
        - 여러개의 prop나 state까지 접근해야 할 때
        - showMessage가 다른 메서드를 부르고, 그 메서드가 this.props.someting이나 this.state.someting 과 같은 코드를 포함할 때
        모든 메서드에게 일일이 전달해야 된다.
               
2. 클로저
    - 클래스의 메서드가 아닌 render의 메서드
        ```jsx harmony
        class ProfilePage extends React.Component {
            render() {
                // props의 값을 고정
                const props = this.props;
                
                // 클래스의 메서드가 아닌 render의 메서드
                const showMessage = () => {
                    alert('Followdd ' + props.user);
                };
                const handleClick = () => {
                    setTimeout(showMessage, 3000);
                };
                return <button onClick={handleClick}>Follow</button>;
            }
        }
        ```
        - render 내부에 메서드를 선언하였기 때문에, 클래스를 이용할 필요가 없을 것 같다.

3. 함수형 컴포넌트
    - 값이 인자로 전달도기 때문에 props가 보존된다.
    ```jsx harmony
    function ProfilePage(props) {
      const showMessage = () => {
        alert('Followed ' + props.user);
      };
    
      const handleClick = () => {
        setTimeout(showMessage, 3000);
      };
    
      return (
        <button onClick={handleClick}>Follow</button>
      );
    }
    ```
   - Destructure `function ProfilePage({ user })`
   - 함수형 컴포넌트는 render 될 때의 값들을 유지한다.
   
### 함수형 컴포넌트에서의 Hooks로 state 고정
```jsx harmony
function MessageThread () {
    const [message, setMessage] = useState('');
    
    const showMessage = () => {
        alert('You said: ' + message);
    };
    const handleSendClick = () => {
        setTimeout(showMessage, 3000);
    }; 
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }
    return (
        <>
            <input value={message} onChange={handleMessageChange} />
            <button onClick={handleSendClick}>Send</button>
        </>
    )
}
```

### render 에 종속되지 않은, 가장 최근의 state/props를 읽고 싶을 때
- 클래스형 : this.props / this.state 값
- 함수형 : `ref`
    - this처럼 변할 수 있고, 다른 render 끼리 공유할 수 있음

```jsx harmony
function MyComponent() {
    const ref = useRef(null);
    // ref.current 로 읽고 쓸 수 있다.
}
```
- 자동으로 state/props를 최신값으로 유지하는 것은 아님
- ref를 쓰는 것은 드물기 때문에 이를 기본동작으로 두는 것은 비효율 적임

```jsx harmony
function MessageThread() {
  const [message, setMessage] = useState('');
  const latestMessage = useRef('');
  
    const showMessage = () => {
        alert('You said: ' + latestMessage.current);
    };
    
    const handleSendClick = () => {
        setTimeout(showMessage, 3000);
    };
    
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
        latestMessage.current = e.target.value;
    }
}
```

- render 내에는 예측 가능한 일만 일어나는 것이 권장됨
    - ref 는 고정된 값이 아니기 때문에 렌더링 도중에 읽거나 쓰는 것은 피하는 것이 좋다.
    > - 예측 가능하지 않는 일이 일어났을 때 궁금
                                                                                             
- ref의 자동화 `useEffect`
```jsx harmony
function MessageThread () {
  const [message, setMessage] = uesState('');

  // 최신값을 쫒아감
  const latestMessage = useRef('');
  useEffect(() => {
    latestMessage.current = message;
  })
  const showMessage = () => {
    alert('You said: ' + latestMessage.current);
  }
}
```

## 함수형 Component 의 Hooks
- [Ref](https://boxfoxs.tistory.com/395)
- [공식문](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)

### Hook 사용 규칙
- 최상위에서만 호출해야 한다.
- React 함수 컴포넌트 내에서만 호출해야 한다.


### State hooks : useState
- 인자 : 초기 state 값
- 반환
    - 타입 : Array
    - 값 : state, state 를 업데이트 시켜주는 함수

### Effect hook : useEffect
라이프 사이클의 사용
- componentDidMount, componentDidUpdate, componentWillUnmount

#### componentDidMount, componentDidUpdate
컴포넌트가 렌더링 될 때마다 호출됨
```jsx harmony
import React, { useState, useEffect } from 'react';

function Example() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });
    return (
        <div>
            <p>You Clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}> Click me </button>
        </div>
    )
}
```

#### componentWillUnmount
```jsx harmony
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```
effect hook의 반환함수
- componentWillUnMount나 컴포넌트가 업데이트 되어 다음 effect가 호출되기 이전에 호출된다.
   
   
#### componentDidMount
```text
useEffect(() => {
    TestAPI.request();
}, []);
```
배열로 넣어준 값들이 변경되었을 때만 effect hook이 호출됨

### 커스텀 훅 만들기
상태 관련 로직을 컴포넌트간에 재 사용하고 싶을 때 방법
1. higher-order components
1. render props
1. Custom Hook
    - 1, 2와 달리 컴포넌트 트리에 새 컴포넌트를 추가하지 않아도 됨
    
FriendStatus 컴포넌트의 친구 접속 상태를 구독하는 useState, useEffect 로직을 다른 컴포넌트에서 재사용하는 방법
1. 사용할 로직을 useFriendStatus 라는 custom Hook 으로 뽑아낸다.
    - friend id을 인자로 받아 친구의 접속상태를 반환함
    ```jsx harmony
    import React, { useState, useEffect } from 'react';
    
    function useFriendStatus(friendID) {
        const [isOnline, setIsOnline] = useState(null);
        
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
        });
    
        return isOnline;
    }
    ```
2. 여러 컴포넌트에서 사용하기
    - 각 호출은 독립된 state 를 가짐.
    ```jsx harmony
    function FriendStatus(props) {
        const isOnline = useFriendStatus(props.friend.id);
        ...
    }
    ```
   
컨벤션
- use로 시작하고 다른 Hook을 호출
- linter 플러그인이 Hook을 인식하고 버그를 찾을 수 있게함.


### [useCallback](https://ko.reactjs.org/docs/hooks-reference.html#usecallback)

shouldComponentUpdate

```js
const memoizedCallback = useCallback(
    () => {
        doSomething(a, b);
    },
    [a, b]
)
```

[메모이제이션](https://ko.wikipedia.org/wiki/%EB%A9%94%EB%AA%A8%EC%9D%B4%EC%A0%9C%EC%9D%B4%EC%85%98)
- 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써
동일한 계산의 반복수행을 제거하여
프로그램 실행속도를 빠르게 하는 기술

- 반환 : 메모이제이션된 콜백
- 인자
    - 인라인 콜백
    - 의존성 값의 배열
        - 콜백 안에서 참조되는 모든 값이 나타나야 한다.
    
의존성이 변경되었을 때 변경된다.

### useMemo
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- 반환 : 메모이제이션된 값
- 인자
    - 생성 함수
    - 의존성 값의 배열
        - [] : 매 렌더링마다 새 값을 계산함.

의존성이 변경되었을때만 메모이제이션된 값을 다시 계산한다.

useMemo 의 콜백함수는 렌더링 중에 실행되므로,
렌더링 중에서 하는 것을 이 함수 내에서 실행한다.

- 지양하는 것이 좋다.
    
### useContext
```jsx harmony
function Example() {
    const locale = useContext(LocaleContext);
}
```
컴포넌트를 중첩하지 않고도 React context 를 구독할 수 있게 해준다.

### useReducer
복잡한 컴포넌트의 state를 reducer로 관리할 수 있게 해준다
```jsx harmony
function Todos() {
    const [todos, dispatch] = useReducer(todosReducer);
}
```

## Proptypes
- [Ref](https://www.npmjs.com/package/prop-types)

컴포넌트 props 에서 타입체크를 한다.

성능상의 이유로 개발모드에서만 체크한다.
```jsx harmony
import PropTypes from 'prop-types';

class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello, { this.props.name }</h1>
        )   
    }
}
Greeting.propTypes = {
    name: PropTypes.string
}
```

### JS primitive
- PropTypes.array
- PropTypes.bool
- PropTypes.func,
- PropTypes.number,
- PropTypes.object,
- PropTypes.string
- PropTypes.symbol

### 렌더링 할수 있는 모든 요소들: numbers, strings, elements, array
- PropTypes.node

### 리액트 Element 
ie <MyComponent />

- PropTypes.element

### 리액트 Element Type
ie MyComponent

- PropTypes.elementType

### prop 가 특정 클래스의 인스턴스라고 선언하기
- PropTypes.instanceOf(Message)

### enum(열거형) 중 하나의 값으로 제한하기
- PropTypes.oneOf(['News', 'Photos'])

### enum(열거형) 중 하나의 타입으로 제한하기
```text
PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
])
```



