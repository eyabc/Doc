# CSS

## font-display
### 플래시 또는 보이지 않은 텍스트 방지
웹폰트가 로드될 때까지 투명한 텍스트를 사용하지 마세요

`FOIT` Flash of Invisible Text
- 브라우저가 웹 서버에서 글꼴을 요청하면 글꼴이 다운로드 될 때까지 해당 글꼴을 호출하는 스타일 요소가 숨겨진다.

`FOUT` Flash of Unstyled Text
- 시스템 글꼴에서 처음 렌더링 되고, 서버에서 글꼴이 로드된 후에 사용자 지정 서체로 교환된다.

### 방법 1

1. 글꼴 요청 중일때, 시스템에서 사용할 수 있는 글꼴이 먼저 표시된다.
    ```css
    p {
        font-family: 'Helvetica", "Arial", sans-serif;
    }
    ```
   
1. 사용자 지정 서체가 로드된 후, CSS 비트(`TODO`) 를 통해 요소에 글꼴을 적용하는 클래스를 적용한다.
    ```css
    .font-loaded p {
        font-fanily: "Open Sans Regular";
    }
    ```
       
### 방법 2 `font-display`
크롬 61, 안드로이드용 크롬, 오페라, 사파리의 기술 미리보기로 사용할 수 있는 CSS 속성

값
- auto: 기본값, 일반적인 브라우저 글꼴 로드 동작 FOIT
- swap: 맞춤 글꼴이 로드될 때까지 글꼴 스택의 시스템 서체에서 즉시 렌더링 된다. 
- block
- fallback : 짧은 기간 사이에 로드 되지 않으면 스타일이 지정되지 않은 텍스트가 보인다.
 
```css
@font-face {
    font-family: "Open Sans Regular";
    src: url("fonts/OpenSans-Regular-BasicLatin.woff2") format("woff2");
    font-display: swap;
}
```