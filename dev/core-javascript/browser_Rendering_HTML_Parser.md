---

sidebarDepth: 2

---

# 렌더링 HTML 파서
HTML 마크업을 파싱 트리로 변환

- HTML 문법 정의
    - HTML 어휘와 문법은 W3C 에 의해 명세로 정의됨

## HTML DTD
- `<!DOCTYPE html>`

### [SGML](https://ko.wikipedia.org/wiki/SGML) Standard Generalized Markup Language
- 문서용 마크업 언어를 정의하기 위한 메타 언어이다. 
- SGML 은 많은 응용이 가능하도록 다양한 마크업 구문을 제공한다.
    
- 마크업 언어
    - 태그를 이용하여 문서나 데이터의 구조를 명기하는 언어

### DTD 
- Document Type Definition
- SGML 계열의 마크업 언어에서 문서 형식을 정의하는 것임.
- 브라우저에게 문서 형식을 알려주는 것
- 문맥 자유 문법이 아님

### HTML DTD
- HTML2 ~ HTML4 은 SGML 에 기반을 두어 만들어 졌기 때문에 DTD 참조가 필요함.
- HTML5 는 SGML 에 기반을 두지 않아 DTD 참조가 필요없다.

## DOM
파싱트리는 DOM 요소와 속성노드의 트리다.

DOM 은 마크업과 1:1 관계를 맺는다.

```html
 <html>
  <body>
   <p>Hello World</p>
   <div><img src="example.png" /></div>
  </body>
</html>  
```
![image](https://user-images.githubusercontent.com/31977543/97322564-44f43600-18b3-11eb-8a2f-8890b7d2e7b4.png)

## 파싱 알고리즘

![image](https://user-images.githubusercontent.com/31977543/97324137-db752700-18b4-11eb-9e6a-bb6cfb5adfe2.png)


### HTML 을 일반적인 하향식 / 상향식 파서로 파싱할 수 없는 이유
1. HTML 언어의 너그러운 속성
    - HTML 은 암묵적으로 태그에 대한 생략 가능
    - 시작 태그, 종료 태그 등을 생략
2. 잘 알려져 있는 HTML 오류에 대한 브라우저의 관용
3. 변경에 의한 재파싱, 스크립트 태그는 토큰을 추가할 수 있기 때문에 파싱이 수정될 수 있다.

![image](https://user-images.githubusercontent.com/31977543/97323305-03b05600-18b4-11eb-856e-3e54a0f74f16.png)
### 1. 토큰화 알고리즘
- HTML 의 토큰
    - 시작 태그, 종료 태그, 속성 이름, 속성 값
- 토큰화 알고리즘의 결과물 -> HTML 토큰
- 알고리즘은 상태기계라고 볼 수 있다.
- 각 상태는 하나 이상의 연속된 문자를 입력받아 이 문자에 따라 다음 상태를 갱신한다.

```html
 <html>
   <body>
      Hello world
   </body>
</html>  
```

|  | 상태  | 설명 |
|---|---|---|
| 초기 | 자료 상태 |
| `<` | 태그 열림 상태 |
| `a-z` | 태그 이름 상태 | 시작 태그 토큰 생성 
| `/` | 태그 이름 상태 | 종료 태그 토큰 생성 
|  `>` | 자료 상태 | 토큰이 생성됨 

이와 같은 사이클이 반복된다.

![image](https://user-images.githubusercontent.com/31977543/97326206-1bd5a480-18b7-11eb-8eae-969d9a1e6b7d.png)

### 2. 트리 구축 알고리즘

- 각 토큰을 위한 DOM 요소의 명세는 정의되어 있다.
- DOM 트리에 요소를 추가하는 것이 아니라면, 열린 요소는 스택(임시 버퍼 저장소)에 추가된다.
- 스택은 부정확한 중첩과 종료되지 않은 태그를 교정한다.
- 알고리즘은 상태 기계라고 설명할 수 있고, 상태는 삽입 모드라고 부른다.
- 트리 구축 단계의 입력값은 토큰화 단계에서 만들어지는 일련의 토큰이다.

![image](https://user-images.githubusercontent.com/31977543/97327691-8fc47c80-18b8-11eb-84c3-6bc559f4b2be.png)

1. 초기 모드
    - `html 토큰` 을 받는다. 
1. `html 이전` 
    - `html 토큰` 이 처리되어 `HTMLHtmlElemnt` 요소를 생성하고 문서객체의 최상단에 추가된다.
2. `head 이전` 
    - `body 토큰` 을 받음.
    - `head 토큰` 이 없더라도 `HTMLHeadElement` 는 묵시적으로 생성되어 트리에 추가된다.
3. `head 내부` 
4. `head 다음` 
    - `body 토큰` 이 처리되어 `HTMLBodyElement` 가 생성되어 추가된다.
5. `body 내부` 
    - 'Hello world' `문자열 토큰` 을 받음
    - 첫 번째 토큰이 생성되고 본문 노드가 추가 되면서 다른 문자들이 그 노드에 추가 된다. (?)
1. `body 종료 토큰` 을 받고 `body 다음` 모드 가 된다.
1. `html 종료 토큰` 을 받고 `body 다음 다음` 가 된다.
1. `파일 토큰` 을 받으면 파싱을 종료한다.

문서 상태가 complete 된다.

## 브라우저의 오류 처리
브라우저가 모든 오류 구문을 교정하기 때문에, 
HTML 페이지에서 "유효하지 않은 구문" 이라는 오류를 볼 수 없다

```html
<html>  
   <mytag></mytag>
   <div>
     <p>
   </div>
   Really lousy HTML
   </p>
</html>  
```
1. `<mytag>` 는 표준 태그가 아님
2. `<p>` `<div>` 태그는 중첩오류 

### 파서가 처리하는 오류
1. 어떤 태그의 안쪽에 추가하려는 태그가 금지된 것일 때
    - 허용된 태그를 먼저 닫고 금지된 태그는 외부에 추가함
1. 파서가 직접 요소를 추가해서는 안된다. (문서 파일을 수정하는 행위?)
    - 문서 제작자에 의해 뒤늦게 요소가 추가되는 경우
    - 태그가 생략가능한 경우도 있음
        - head, body, tbody, tr, td, li 태그
1. 인라인 요소 안쪽에 블록 요소가 있는 경우
    - 인라인 Element : img, strong, span 
    - 블록 Element : h1~h6, p, div
    - 부모 블록 요소를 만날 때가지 모든 인라인 태그를 닫는다 (?)
1. 위 방법이 도움이 되지 않는다면, 태그를 추가하거나, 무시할 수 있는 상태가 될 때까지 요소를 닫는다.

태그를 닫는다는 의미가 무엇? 

웹킷은 아래와 같이 동작한다.

#### `<br>` 대신 `</ br>` 
- 어떤 사이트는 `<br>` 대신 `</br>`을 사용한다.
- 인터넷 익스플로러, 파이어폭스와 호환성을 갖기 위해 웹킷은 이것을 `<br>`으로 간주한다.
- 오류는 내부적으로 처리하고 사용자에게 표시하지 않음

> TODO .. ? 무슨말일까

#### 어긋난 표
table(1) 내부의 table(2) 가 (1) 의 th 혹은 td 셀 내부에 있어야함.
```html
<table>
    <table>
    <tr><td>inner table</td></tr>
    </table>
    <tr><td>outer table</td></tr>
</table> 
```
웹킷은 표를 분해하여 형제 요소가 되도록 처리.
```html
<table>
    <tr><td>outer table</td></tr>
</table>
<table>
    <tr><td>inner table</td></tr>
</table>  
```
스택을 사용한다.
```text
if(m_inStrayTableContent && localName == tableTag)  
popBlock(tableTag); 
```

#### 중첩된 폼 요소
폼안에 폼을 넣을 경우 안쪽의 폼은 무시된다.

#### 중첩이 너무 깊을 때
쵀대 20 개의 중첩만 허용 하고 나머지는 무시된다.
```text
bool HTMLParser::allowNestedRedundantTag(const AtomicString& tagName)  
{
    unsigned i = 0;
    for (HTMLStackElem* curr = m_blockStack; 
        i < cMaxRedundantTagDepth && curr && curr->tagName == tagName;  
        curr = curr->next, i++) { }
    return i != cMaxRedundantTagDepth;
}
```
> C++ 로 되어있구나... 아!!

#### 잘못 닫힌 html / body 태그
흠...


한국 사이트에는 내가 궁금한 정보를 찾아보기 힘든 것 같다. 외국 사이트도 마찬가지일지도 모른다.

1. HTML 토큰화와 파서의 명세
2. 토큰화와 파서는 대략 이렇게 한다
3. HTML 파서는 보편적인 파서를 쓰지 못하는 이유
4. 브라우저 파서가 처리하는 오류 

뭔가 똥을싸고 덜 닦은 느낌이지만, 이정도 까지만 알고, 내가 언젠가 더 알고싶거나 필요할 때 공부하면 될 것 같다.
그리고 지금은 직접사용하는 추상적인 부분에 대한 공부를 하는게 더 나은 것 같아 보인다.
그리고 계속 공부를 하면서 이제 MDN, NaverD2, ToastUI, ktword 참고하기 좋은 사이트에 익숙해 진 성과? 가 있는 것 같다
아직 공식문서와 외국 문서는 익숙해 지지 않았지만, 차차? 자연스레 보게 될 날이 올 것 같다.


Reference
--
- https://medium.com/@yeon22/web-dtd-document-type-definition-%EB%9E%80-1a1413771189
- https://d2.naver.com/helloworld/59361
- https://feel5ny.github.io/2018/06/06/rendering_engine_1/