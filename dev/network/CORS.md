# CORS
Cross Origin Resource Sharing 정책


## URL
- `Protocol` https://
- `Host`    www.evan-moon.com
- `Path` /users
- `Query String` ?sort=asc&page=1
- `Fragment` #foo

- `Port` 의 생략
    - HTTP, HTTPS 프로토콜의 기본 포트 번호(80)가 정해져 있기 때문이다.

## 출처
Protocol, Host, Port 

서버위치를 찾기 위한 가장 기본적인 요소


```javascript
console.log(location.origin);       // "https://evan-moon.github.io"
```

`출처를 비교`하는 로직은 서버가 아니라 `브라우저`에 구현되어 있다.
- 브라우저를 통하지 않은 서버 간 통신은 SOP 가 적용되지 않는다. 
- 출처 비교 시 포트 번호를 완전 무시하는 브라우저는 Internet Explorer 밖에 없다.

## SOP : Same Origin Policy
같은 출처에서만 리소스를 공유할 수 있다

- CORS 정책을 지킨 리소스 요청은 출처가 다르더라도 허용한다.

### 예외 조항
스크립트, 렌더될 이미지, 스타일 시트, script, img, style 태그
```html
<img src="https://evanmoon.tistory.com/rss">
<script src="https://evanmoon.tistory.com/rss"></script>
```
요청 자체는 성공한다 

`Sec-Fetch-Mode: no-cors`
- 헤더의 요청 필드를 설정
- 브라우저가 no-cors 인 경우 다른 출처여도 CORS 정책을 검사하지 않는다. 
- 응답을 자바스크립트에게 알려주지 않아 응답 내용을 알 수 없다.


## CORS 배경
출처가 다른 두개의 어플리케이션이 마음대로 소통할 수 있는 것은 위험하다.

웹에서 돌아가는 클라이언트 어플리케이션은 사용자의 공격에 취약하다.
- CSRF (Cross-Site Request Forgery)
- XSS (Cross0Site Scripting)

1. 브라우저 개발자도구에서 각종 정보들을 아무런 제제없이 열 수 있다.
    - DOM 확인
    - 서버 통신 내역
    - 리소스 출처 
2. 자바스크립트 코드 난독화는 암호화가 아니다.
    - 난독화가 안되어 있어 소스코드가 그대로 노출되는 사이트들도 많다.
    
## CORS 와 브라우저
출처는 브라우저가 판별한다. 따라서

CORS를 위반했을 때
- 서버는 정상적으로 응답
- 응답의 파기 여부는 브라우저가 결정

![cors](https://user-images.githubusercontent.com/31977543/89126088-f89c9280-d51d-11ea-8b47-9d540b57c194.png)

## CORS 의 기본 동작
웹 클라이언트가 다른 출처의 리소스를 요청할 때 기본적인 동작

1. 사용자의 첫 요청
    1. HTTP 프로토콜을 사용하여 요청을 보낸다
    1. 브라우저는 요청 헤더에 `Origin` 필드에 요청을 보내는 출처를 함께 담아 보낸다.     
        `Origin: https://evan-moon.github.io`
2. 서버의 응답
    1. 응답 헤더 `Access-Controll-Allow-Origin` 를 보낸다.  
        - 리소스에 접근할 수 있는 허용된 출처
3. 응답을 받은 브라우저
    1. 자신이 보냈던 `Origin` 과 응답 받은 `Access-Control-Allow-Origin` 을 비교하여 유효한지 결정한다.
   
   
## Preflight Request
웹 어플리케이션을 개발할 때 일반적으로 마주치는 시나리오

브라우저는 `예비요청`(Preflight)과 `본 요청`으로 나누어서 서버로 전송한다.

### Preflight
본 요청을 보내기 전, 브라우저가 요청을 보내는 것이 안전한지 확인한다.

- HTTP 의 `OPTIONS` 메서드가 사용된다.

![image](https://user-images.githubusercontent.com/31977543/89126538-42d34300-d521-11ea-90a4-beae5ab70188.png)

```javascript
const headers = new Headers({
  'Content-Type': 'text/xml',
});
fetch('https://evanmoon.tistory.com/rss', { headers });
```
요청
```http request
OPTIONS https://evanmoon.tistory.com/rss

Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: en-US,en;q=0.9,ko;q=0.8,ja;q=0.7,la;q=0.6
Access-Control-Request-Headers: content-type
Access-Control-Request-Method: GET
Connection: keep-alive
Host: evanmoon.tistory.com
Origin: https://evan-moon.github.io
Referer: https://evan-moon.github.io/2020/05/21/about-cors/
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: cross-site
```
본 요청에 대한 다른 정보들도 미리 알려준다.
- `Access-Control-Request-Headers` : Content-Type 
- `Access-Control-Request-Method` : GET
 
예비 요청에 대한 응답
```http request
OPTIONS https://evanmoon.tistory.com/rss 200 OK

Access-Control-Allow-Origin: https://evanmoon.tistory.com
Content-Encoding: gzip
Content-Length: 699
Content-Type: text/xml; charset=utf-8
Date: Sun, 24 May 2020 11:52:33 GMT
P3P: CP='ALL DSP COR MON LAW OUR LEG DEL'
Server: Apache
Vary: Accept-Encoding
X-UA-Compatible: IE=Edge
```
- 응답 헤더의 `Access-Control-Allow-Origin: https://evanmoon.tistory.com` 는 요청 헤더의 
`Origin: https://evan-moon.github.io` 와 출처가 다르므로 CORS 정책 위반 에러를 띄운다.

## Simple Request
예비 요청이 없다.
![image](https://user-images.githubusercontent.com/31977543/89157338-54f7c480-d5a7-11ea-9daf-131893d4db68.png)
- 특정조건이 만족해야 Simple Request 를 할 수 있다.
- 사용이 드물다
> 언제할 까? TODO


## Credentialed Request
인증된 요청을 사용하는 방법
- CORS 에서 좀더 보안을 강화하고 싶을 때 사용한다.

### credential
비동기 요청 API `XMLHttpRequest`객체, `fetchAPI` 는 브라우저의 쿠키정보나 인증과 관련된 헤더를 담지 않는다.
이때 `credential` 은 요청에 인증과 관련된 정보를 담을 수 있게 해준다.
 
### credential 옵션의 종류 
1. `Same Origin`(크롬 Default) 같은 출처간 요청에만 인증 정보를 담을 수 있다.
1. `include` 모든 요청에 인증정보를 담을 수 있다.
1. `omit` 모든 요청에 인증정보를 담지 않는다.

`Same Origin` `include` 옵션이라면 `Access-Control-Allow-Origin` 이외에 조건이 더 까다로워진다.
1. `Same Origin` : `Access-Control-Allow-Origin: *` 허용
1. `include` 응답헤더에
    - `Access-Control-Allow-Origin: *` 미허용
    - `Access-Control-Allow-Credentials: true` 필수
    
## CORS 해결 방법
### 1. Access-Control-Allow-Origin 세팅
1. 서버엔진의 설정 nginx, apache
1. 소스코드 내에 응답 미들웨어 세팅
    - CORS 미들웨어 라이브러리를 찾아보자

### 2. Webpack DevServer 로 리버스 프록싱
프론트엔드 개발환경에서 CORS 를 많이 마주칠 것이다.     
벡엔드의 `Access-Control-Allow-Origin: http://localhost:3000` 같이 범용적인 출처를 넣어주는 경우는 드물다.      
그래서 프론트엔드의 `webpack-dev-server` 의 라이브러리의 프록시 기능은 CORS 정책을 우회하게 해준다.     

```javascript
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.evan.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }
  }
}
```
- `localhost:8000/api` 처럼, path 가 `/api` 로 시작되는 요청을 웹팩이 `https://api.evan.com` 으로 요청을 프록싱 해준다.
- 브라우저는 여전히 `localhost:8000/api` 로 알고있다.


  



Reference
--
- [CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/)
