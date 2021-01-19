---
sidebarDepth: 2
---

> 매우..중요..! **오래된 내용을 참고하여 작성하였으므로, 실제 사용시에 최신 문서를 참고할 필요가 있음.**

## 배치 (Reflow)
- 레이아웃부터 이후 과정을 다시 수행
- DOM 트리, CSSOM 트리가 변경될 때 재구성 된다.
    - DOM 추가/삭제
    - 요소에 기하학적인 영향(높이, 넓이, 위치)을 주는 CSS 속성값 변경   
        - **크기 | 위치**와 같은 값을 계산

![image](https://user-images.githubusercontent.com/31977543/99141126-2d76c480-268b-11eb-99e8-187d69d7f5b2.png)

    
- Repaint 보다도 더 심각한 퍼포먼스 저하를 유발
- 대부분의 리플로우는 페이지 전체의 렌더링을 다시 일으킨다.

(렌더러 생성 -> 렌더러 트리 추가) 과정 → 크기 / 위치 정보 X 

### HTML, 흐름 기반 배치 모델 
보통 단일 경로 → 크기 | 위치 정보 계산 

#### 배치 경로 흐름
- 왼쪽 → 오른쪽
- 위 → 아래 

#### 이유
일반적으로, "흐름 속"에서 나중에 등장하는 요소 

→ 앞서 등장한 요소의 위치와 크기에 영향을 미치지 않음 
    
- 예외) 표
    - 크기 | 위치 계산 → 하나 이상의 경로를 필요
    
### 좌표계
- 기준점으로부터 상대적으로 위치를 결정
- 좌단(X축), 상단(Y축) 좌표

---

- 배치는 반복된다.
- HTML 문서의 `<html>` 요소에 해당하는 최상위 렌더러에서 시작한다. 
- 배치는 프레임 계층의 일부 또는 전부를 통해 반복된다
- 각 렌더러에 필요한 크기와 위치 정보를 계산한다.
- 최상위 렌더러
    - 위치: 0,0 
    - 면적: 브라우저 창의 보이는 영역에 해당하는 뷰포트
- 모든 렌더러
    - "배치" | "리플로" 메서드를 가짐 
    - 각 렌더러는 배치해야 할 자식의 배치 메소드를 불러온다.
    
### 더티 비트 체제
소소한 변경 때문에 전체를 다시 배치하지 않기위해, 브라우저가 사용하는 체제.

#### 더티
- 렌더러가 다시 배치할 필요가 있는 변경 요소
- 추가된 것과 그 자식요소

#### 플래그
1. 더티
2. 자식이 더티
    - 본인은 괜찮지만 자식 가운데 적어도 하나를 다시 배치할 필요가 있음
    
### 전역 배치와 점증 배치

#### 전역 배치
배치는 렌더러 트리 전체에서 일어날 수 있다

1. 모든 렌더러에 영향을 주는 전역 스타일 변경
    - 예) 글꼴 크기 변경
2. 화면 크기 변경


#### 점증 배치
렌더러가 더티일 때 비동기적으로 일어난다.
 
- 예) 네트워크로부터 추가 내용을 받아서 DOM 트리에 더해진 다음,
    
    새로운 렌더러가 렌더 트리에 붙을 때

약간의 손실이 발생할 수 있다. (TODO)

### 비동기 배치와 동기 배치
- 점증 배치 → 비동기 실행

- 파이어폭스의 점증 배치
    - "리플로 명령"을 쌓아 놓고 **스케줄러**는 이 명령을 한꺼번에 실행한다. 
- 웹킷의 점증 배치
    - 실행하는 **타이머**가 있는데 트리를 탐색하여 "더티" 렌더러를 배치한다.
    
- 동기적 점증 배치
    - "offsetHeight" 같은 스타일 정보를 요청하는 스크립트

- 전역 배치 → 동기적 실행
- 스크롤 위치 변화와 같은 일부 속성 → 초기 배치 이후 콜백으로 실행 (?)

### 최적화
... 잘 모르겠다.
1. 배치가 (무엇의 크기변경?)"크기 변경" 또는 렌더러 위치 변화 때문에 실행되는 경우
    - 렌더러의 크기는 캐시로부터 가져옴 (?TODO)

2. 하위 트리만 수정이 되고 최상위로부터 배치가 시작되지 않는 경우 
    - 입력 필드에 텍스트를 입력하는 경우 
    - 한정적 변화 범위 → 주변에 영향을 미치지 않음
     
3. 입력 필드 바깥쪽에 텍스트가 입력되는 경우 
    - 최상단으로부터 배치 시작

### 배치 과정
1. 부모 렌더러가 자신의 너비를 결정
2. 부모가 자식을 검토
    1. 자식 렌더러를 배치(자식의 x와 y를 설정)
    2. 필요하다면 자식 배치를 호출하여 자식의 높이를 계산한다.
        - 부모와 자식이 더티
        - 전역 배치 상태
        - 이외 
3. 부모는 자식의 누적된 높이와 여백, 패딩을 사용하여 자신의 높이를 설정한다. 
    - 이 값은 부모 렌더러의 부모가 사용하게 된다. (?)
4. 더티 비트 플래그를 제거한다.

파이어폭스에서,
- "상태" 객체(nsHTMLReflowState)
    - 배치("리플로"를 의미)를 위한 매개 변수 
    - 상태는 부모의 너비를 포함함
- 배치 결과
    - "매트릭스" 객체(nsHTMLReflowMatrics)인데 높이가 계산된 렌더러를 포함한다.
    
### 너비 계산
렌더러의 너비
- 포함하는 블록의 너비, 그리고 렌더러의 너비와 여백, 테두리 

`<div style="width:30%"></div>`
  
- 미리 획득한 너비의 계산 
    - 웹킷의 RenderBox 클래스의 calcWidth 메서드
        - 컨테이너의 너비: 컨테이너 availableWidth ~ 0 사이의 최대값
        - availableWidth : 계산된 contentWidth
            - `clientWidth() - paddingLeft() - paddingRight()`
            - clientWidth / clientHeight
                - 객체의 테두리 / 스크롤바를 제외한 내부 영역
        - 요소의 너비는 "width" 스타일 속성의 값
            - 컨테이너 너비의 백분률 값 → 절대 값
        - 좌우측 테두리와 패딩 값이 추가된다.
- 최소 너비 / 최대 너비 계산
    - 미리 획득한 너비 > 최대 너비 → 최대 너비 사용
    - 미리 획득한 너비 < 최소 너비(깨지지 않는 가장 작은 단위) → 최소 너비 사용 

배치할 필요가 있지만, 너비가 고정된 경우 → 값은 캐시에 저장됨

### 줄바꿈
렌더러가 배치되는 동안, 줄을 바꿀 필요가 있을 때

→ 배치 중단, 줄 바꿀 필요가 있음을 부모에게 전달함. 

→ 부모는, 추가 렌더러를 생성 & 배치 호출



## 그리기 (Repaint)
- 요소에 기하학적인 영향을 주지 않는 CSS 속성값 변경할 때 발생
- 렌더링 과정에서 레이아웃 과정을 건너뛴다. 페인트부터 수행
![image](https://user-images.githubusercontent.com/31977543/99141139-58f9af00-268b-11eb-9407-fa5380756858.png)


UI 기반의 구성 요소를 사용 (backend ui)

1. 렌더 트리 탐색
2. 렌더러의 "paint" 메서드 호출

### 전역과 점증 
- 그리기는 배치와 마찬가지로, 전역 | 점증 방식 

- 점증 그리기
    - 일부 렌더러는 전체 트리에 영향을 주지 않는 방식으로 변경된다. 
    - 변경된 렌더러는 (화면 위의 사각형을 무효화?TODO) 하는데 OS는 이것을 **더티 영역**으로 보고 **paint 이벤트 발생** 
    - OS는 몇 개의 영역을 하나로 합치는 방법으로 효과적으로 처리한다. 
    - 크롬은 렌더러가 별도의 처리 과정이기 때문에 조금 더 복잡하다. 
        - 크롬은 OS의 동작을 어느 정도 모방한다. 
    - 프레젠테이션(파이어폭스)은 이런 이벤트에 귀 기울기고 렌더 최상위로 메시지를 전달한다. 
        - 트리는 적절한 렌더러에 이를 때까지 탐색되고 스스로(보통 자식과 함께) 다시 그려진다.
        
### 그리기 순서
CSS2, 그리기 과정의 순서를 정의 
- 실제로 요소가 `stacking contexts` 에 쌓이는 순서 
- 스택은 `뒤`에서 `앞`으로 그려지기 때문에 이 순서는 그리기에 영향을 미친다. 

블록 렌더러가 쌓이는 순서는 다음과 같다.
1. 배경 색
2. 배경 이미지
3. 테두리
4. 자식
5. 아웃라인

### 파이어폭스 표시 목록
- 렌더 트리 검토 → 그려진 사각형을 위한 **표시 목록** 구성 
    - 표시 목록
        - 올바른 그리기 순서(배경, 테두리,……)에 따라 사각형을 위한 적절한 렌더러를 포함한다. 
    - 트리는 여러 번 리페인팅을 실행하는 대신, 한 번만 탐색하면서 배경 색, 배경 이미지, 테두리 그리고 나머지 순으로 그려낸다.
- 다른 불투명 요소 뒤에 완전히 가려진 요소는 추가하지 않는 최적화

### 웹킷 사각형 저장소
- 리페인팅 전에 웹킷은 기존의 사각형을 **비트맵**으로 저장
- 새로운 사각형과 비교하고 차이가 있는 부분만 다시 그린다.

### 동적 변경
브라우저 : 변경 → 가능한 한 최소한의 동작으로 반응
 
- 요소의 색깔 변화 → 해당 요소의 리페인팅만 발생 
- 요소의 위치 변화 → 요소와 자식 그리고 형제의 리페인팅과 재배치가 발생 
- DOM 노드를 추가 → 노드의 리페인팅과 재 배치가 발생 
- 큰 변경("html" 요소의 글꼴 크기 변경)
    - 캐시를 무효화
    - 트리 전체의 배치와 리페인팅이 발생
    
## 렌더링 엔진의 스레드
통신을 제외한 거의 모든 경우에 **단일 스레드**로 동작
 
- 파이어폭스 / 사파리 렌더링
    - 브라우저의 주요한 스레드 (?)
- 크롬
    - 탭 프로세스의 주요 스레드 (?)

- 통신
    - 병렬 스레드에 의해 진행
    - 보통 2개에서 6개로 제한

### 이벤트 순환
브라우저의 주요 스레드는 
- 이벤트 순환으로 처리 과정을 유지하기 위해 무한 순환된다. 
- 배치와 그리기 같은 이벤트를 위해 대기하고 이벤트를 처리한다. 

주요 이벤트 순환을 위한 파이어폭스 코드
```
while (!mExiting)  
NS_ProcessNextEvent(thread);  
```

## CSS2 시각 모델
### 캔버스
CSS2 명세, 캔버스
- 서식 구조가 표현되는 공간
- 브라우저가 내용을 그리는 공간
- 캔버스 공간 각각의 면적은 무한하지만 브라우저는 뷰포트의 크기를 기초로 초기 너비를 결정한다.
- 캔버스는 기본적으로 투명
    - 다른 캔버스와 겹치는 경우 비쳐 보임 (?)
    - 투명하지 않을 경우에는 브라우저에서 정의한 색이 지정된다.

### CSS 박스 모델
- 문서 트리에 있는 요소를 위해 생성된다. 
- 시각적 서식 모델에 따라 배치된 사각형 박스를 설명한다.
- 각 박스는 콘텐츠 영역(문자, 이미지 등)과 선택적인 패딩과 테두리, 여백이 있다.

![image](https://user-images.githubusercontent.com/31977543/98902996-0e94f880-24fa-11eb-8760-679d1a133ab0.png)

- 각 노드는 이런 상자를 0 ~ n개 생성

- `display` 속성
    - 모든 요소가 가짐
    - 만들어질 박스의 유형을 결정한다.
    1. block  - **블록 상자**를 만든다.
    2. inline - 하나 또는 그 이상의 **인라인 상자**를 만든다.
    3. none - **박스를 만들지 않는다.**
    
### 위치 결정 방법
위치는 "position" 속성과 "float" 속성에 의해 결정된다.
#### 1. Normal
- 객체는 **문서 안의 자리**에 따라 위치가 결정된다. 
- 렌더 트리 객체의 자리 = DOM 트리의 자리
- 박스 유형과 면적에 따라 배치됨

#### 2. Float
- 객체는 우선 일반적인 흐름에 따라 배치된 다음 왼쪽이나 오른쪽으로 흘러 이동한다.

#### 3. Absolute
- DOM 트리 자리 != 렌더 트리 자리

#### position 속성
- `static`  `relative` 일반적인 흐름에 따라 위치가 결정된다.
- `absolute` `fixed` 절대적인 위치
- 기본값 `static`
- `relative``absolute``fixed`
    - top, bottom, left, right 속성으로 위치를 결정할 수 있다.

#### 박스가 배치되는 방법
- 박스 유형(display, inline ...)
- 박스 크기(width, height ...)
- 위치 결정 방법(position, float)
- 추가적인 정보 - 이미지 크기와 화면 크기 등

### 박스유형
#### 블록박스 
브라우저 창에서 사각형 블록을 형성

![image](https://user-images.githubusercontent.com/31977543/98903969-050c9000-24fc-11eb-9748-a6ccd70e0d2d.png)

#### 인라인박스
블록이 되지 않고 블록 내부에 포함된다.

![image](https://user-images.githubusercontent.com/31977543/98904012-15246f80-24fc-11eb-8e14-b67cf6a7d72f.png)

#### 블록과 인라인 배치
- 블록 : 다른 블록아래 수직으로 배치
- 인라인 : 수평으로 배치

![image](https://user-images.githubusercontent.com/31977543/98904043-2ff6e400-24fc-11eb-895b-032cdbae86e9.png)

![image](https://user-images.githubusercontent.com/31977543/98904116-616faf80-24fc-11eb-9401-fad5f0beb66b.png)
- 인라인 박스
    - 라인 또는 "라인 박스" 안쪽에 놓임
- 라인
    - 적어도 가장 큰 박스만큼 크지만 "baseline" 정렬일 때 더 커질 수 있다. 
        - 요소의 하단이 다른 상자의 하단이 아닌 곳에 배치된 경우를 의미한다. (?) 
        - ["baseline" 정렬](https://aboooks.tistory.com/171)
        - 포함하는 너비가 충분하지 않으면 인라인은 몇 줄의 라인으로 배치됨
            - 문단 안에서 발생함.
            
### 위치잡기

#### 상대적인 위치
일반적인 흐름에 따라 위치를 결정 → 필요한 만큼 이동
![image](https://user-images.githubusercontent.com/31977543/98904926-df808600-24fd-11eb-8f54-1ccabfe4c26c.png)

#### 플로트
플로트 박스는 라인의 왼쪽 또는 오른쪽으로 이동한다. 

- 흥미로운 점은 다른 박스가 이 주변을 흐른다는 것이다.
```html
 <p>  
 <img src="http://helloworld.naver.com/image.gif" alt="image.gif" width="100" height="100" style="float:right">  
 Lorem ipsum dolor sit amet, consectetuer...  
 </p>  
```     

![image](https://user-images.githubusercontent.com/31977543/98905040-1191e800-24fe-11eb-86fe-9bf4e845cf8a.png)

#### 절대적인(absolute) 위치와 고정된(fixed) 위치
- 일반적인 흐름과 무관하게 결정
- absolute
    - 면적은 부모에 따라 상대적이다. 
- fixed 
    - 뷰포트로부터 위치를 결정
    - 문서가 스크롤되어도 따라 움직이지 않는다.

![image](https://user-images.githubusercontent.com/31977543/98905162-4b62ee80-24fe-11eb-9511-31df38c7012d.png)

### 층 표현
- CSS 의 z-index 속성
- 3차원 표현
- "z 축"을 따라 위치 결정

#### stacking contexts
박스는 (stacking contexts) 스택으로 구분된다. 
- 각 스택에서 뒤쪽 요소가 먼저 그려지고 앞쪽 요소는 사용자에게 가까운 쪽으로 나중에 그려진다. 
- 가장 앞쪽에 위치한 요소는 겹치는 이전 요소를 가린다.
- 스택은 z-index 속성에 따라 순서를 결정한다. 
- z-index 속성이 있는 박스는 지역 스택(local stack)을 형성한다. 
- 뷰포트는 바깥쪽의 스택(outer stack)이다.

```html
<style type="text/css">  
div {  
    position: absolute;
    left: 2in;
    top: 2in;
}
</style>  
<p>  
    <div style="z-index:3;background-color:red;width:1in;height:1in"></div>
    <div style="z-index:1;background-color:green;width:2in;height:2in"></div>
</p>  
```
![image](https://user-images.githubusercontent.com/31977543/98905427-bd3b3800-24fe-11eb-95cb-e8b74cc9eb3e.png)

## reflow 최적화
- 레이아웃
    - 전체픽셀을 다시 계산 → 부하가 크다.
- 리페인트 
    - 이미 계산된 픽셀값을 이용해 화면을 그린다. → 레이아웃에 비해 부하가 적다.

### 레이아웃과 리페인트를 발생시키는 CSS 속성
[레이아웃과 리페인트를 발생시키는 CSS 속성 목록](https://docs.google.com/spreadsheets/u/0/d/1Hvi0nu2wG3oQ51XRHtMv-A_ZlidnwUYwgQsPQUg1R2s/pub?single=true&gid=0&output=html)

- 요소에 기하적인 영향을 주는 CSS 속성 값
    - height, width, left, top, font-size, line-height 등
    ![image](https://user-images.githubusercontent.com/31977543/99141409-78460b80-268e-11eb-8b60-47eabc0c41ce.png)

- 요소에 기하적인 영향을 주지 않는 CSS 속성값 변경
    - background-color, color, visibility, text-decoration 등
  ![image](https://user-images.githubusercontent.com/31977543/99141412-7c722900-268e-11eb-9ac8-0d8e8a934fb3.png)

### Reflow 발생 케이스
- 윈도우 리사이징
- 폰트의 변화
- 특정 스타일 추가 또는 제거 (?)
- 내용 변화 (인풋박스에 텍스트 입력 등..)
- `:hover` 와 같은 CSS Pseudo Class
- 클래스 Attribute 의 동적 변화 (?)
- JS를 통한 DOM 동적 변화
- 엘리먼트에 대한 offsetWidth / offsetHeight (화면에서 보여지는 좌표) 계산시 (?)
- 스타일 Attribute 동적변화 (?)

### Reflow 최소화
#### 클래스 변화로 인한 Reflow
클래스 변화에 따른 스타일 변화를 원할 경우, 
- 최대한 DOM 구조 상 끝단에 위치한 노드에 변화주기
- 리플로우의 행동반경을 전체 페이지가 아닌 일부 노드들로 제한 가능
 
전체 페이지를 감싸는 wrapper 에 클래스를 수정하는 행위는 꼭 피해야 한다.
 
[OOCSS 방식](https://medium.com/witinweb/css-%EB%B0%A9%EB%B2%95%EB%A1%A0-2-oocss-object-oriented-css-4064e1119354)
을 통해 클래스변화가 발생할 경우, 
- 특정 엘리먼트에 대해 상당히 많은 클래스를 적용 
- 리플로우의 영향 최소화 → 퍼포먼스적인 측면에서 큰 이득


#### 인라인 스타일을 최대한 배제하라.
- DOM 은 매우 느린 구조체 
- 인라인상에 스타일 
    - 리플로우는 페이지 전체에 걸쳐 수차례 발생 
- 인라인스타일이 없을 경우 
    - 외부스타일 클래스의 조합으로 단 한번만 리플로우를 발생

> 상황을 고려하자! 프레임워크의 jsx 문법같은 것은 인라인을 사용해도 된다고 얼핏 들었다.

#### 애니메이션이 들어간 엘리먼트는 가급적 position:fixed 또는 position:absolute 로 지정
일반적으로 JS (특히 jQuery)나 CSS3로 width/height 또는 위치이동을 구현한 애니메이션
- 거의 초단위로 상당한 Reflow

해당 개체의 position 속성을 fixed 또는 absolute 사용
- 다른 요소들의 레이아웃에 영향을 끼치지 않는다.

#### 퀄리티와 퍼포먼스 사이에서 타협하라
- 한 time 에 1px을 움직이는 애니메이션 A
- 한 time 에 3px를 움직이는 애니메이션 B

A가 B에 비해 더욱 큰 비용이 발생한다. 
- 속도가 빠른 디바이스 → 비슷
- 속도가 느린 (휴대전화와 같은) 디바이스 → 그 차이가 눈에 띌 수 있다.

#### 테이블 레이아웃을 피하라
테이블로 구성된 페이지 레이아웃
- 점진적(progressive) 페이지렌더링 X 
- 모두 로드되고 계산된 후에야 화면에 화면에 렌더링됨.
- 테이블 레이아웃에서는 아주 작은 변화마저도 해당 테이블 전체 모든 노드에 대한 Reflow 발생
- 레이아웃 용도가 아닌 데이터표시 용도의 올바른 테이블이라 할지라도 
    - 해당 테이블에 table-layout:fixed 속성을 설정해야 한다.
    - 디폴트값인 auto 에 비해 성능면에서 더 좋다고 한다.

#### JS를 통해 스타일변화를 주어야 할 경우, 가급적 한번에 처리하라.
여러번 중복된 Reflow와 Repaint를 유발
```javascript
var toChange = document.getElementById('elem');
toChange.style.background = '#333';
toChange.style.color = '#fff';
toChange.style.border = '1px solid #ccc';
```
단 한번의 변화만을 발생
```
/* CSS */
#elem { border:1px solid #000; color:#000; background:#ddd; }
.highlight { border-color:#00f; color:#fff; background:#333; }
/* js */
document.getElementById('elem').className = 'highlight';
```

#### CSS 하위선택자는 필요한 만큼만 정리하라.
Reflow 가 유발시키는 CSS Recalculation 에 필요한 내용. 

##### CSS의 Rule 매칭 프로세스
- 가장 우측의 핵심 선택자 → 좌측
- 더 이상 매치시킬 Rule 이 없거나 잘못된 Rule 를 만날 때까지 계속 매칭시키며 진행된다. 
- CSS 의 특별성(specialty)이 확보되는 선에서, 딱 필요한만큼 사용
    - 극적인 퍼포먼스 향상 
    - 룰이 적을수록 비용절감
- `.btn_more` 라는 클래스가 `list_service` 내에 쓰이는 유일한  요소일 경우, 아래와 같은 두가지 예가 발생할 수 있다.
    - `.section_service .list_service li .box_name .btn_more {display:block;width:100px;height:30px;}`
        - 5단계에 걸쳐 필요이상의 규칙들을 작성해 놓을 경우 퍼포먼스 하락을 가져올 수 있다.
        - 가독성을 위해 길게 쓴 경우라면 분류 묶음에 CSS 주석처리를 하는 것이 효과적이다. 
        - 하위선택자는 가급적 적을수록 좋다
    - `.section_service .list_service .btn_more {display:block;width:100px;height:30px;}`
> 하드웨어와 내부 프로세스는 항상 달라질 수 있을 것이므로, 사용이 필요한 경우 최신의 문서를 보아야 합니다

#### position:relative 사용 시 주의
페이지를 새로 열거나, Reflow 가 발생되어 CSS Calculation 이 발생 할 경우,
- Box model Calculation → Normal flow 상태의 레이아웃에 배치
- Normal flow 
    - 선형적 배치
    - Layout / Reflow 의 일부 과정
 
##### 1) Box model Calculation 에 의한 계산
화면 내 배치가 아닌 각 엘리먼트 자체의 Metrics 계산을 우선 진행한다.  

![image](https://user-images.githubusercontent.com/31977543/98902996-0e94f880-24fa-11eb-8760-679d1a133ab0.png)

##### 2) Normal flow 에 의해 선형적으로 배치된 상태
Box model 계산 후, 마크업 순서에 따라 화면 내 배치를 실행한다.

 ![image](https://user-images.githubusercontent.com/31977543/98904012-15246f80-24fc-11eb-8e14-b67cf6a7d72f.png)
 
- `position:absolute / fixed`
    - Normal flow 을 거치지 않음
    - Out of flow 곧바로 Positioning 을 진행
    
##### 3) Normal Flow 이후
Float | Position 에 따라 Positioning 과정이 한번 더 발생

###### case 1. Float 속성을 가진 요소
- Normal flow 이후 별도의 Positioning 계산이 없다.
- 왼쪽 또는 오른쪽으로 자신이 갈수있는 한 끝까지 이동한다.
- Box model → Normal flow → Floating

###### caes 2. position:relative; 와 함께 top,left 등 위치값을 가진 요소
- Normal flow 상태에서 한번 더 Positioning 프로세스를 거치게 된다.
- Box model → Normal flow → Positioning

###### case 3. position:absolute 또는 fixed를 가진 요소 (out of flow)
- Box model 계산 후 Normal flow 과정을 거치지 않고 Positioning
- Box model → Positioning

> position:relative 가 오히려 position:absolute 또는 float 속성보다 더 큰 비용을 가진다. (Box model → Normal flow →
Positioning 의 3단계를 모두 거치므로) 때문에 UL 또는 OL과 같은 목록에서 상당수 반복되는 LI 요소에 position:relative 와 top,left 속성등을
주는 경우, 퍼포먼스 하락이 발생할 가능성이 크다.
