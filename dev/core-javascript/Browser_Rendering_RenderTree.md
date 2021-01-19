---
sidebarDepth: 2
---

# 렌더 트리 구축
DOM 트리가 구축되는 동안 렌더 트리를 구축한다.
 
## Renderer (렌더러)
자신과 자식 요소의 reflow/repaint 방법을 알고 있음.
- 요소의 표시 순서
- 문서의 시각적인 구성 요소

명명
- 파이어폭스 → "형상(frames)"  
- 웹킷 → "렌더러(renderer)" / "렌더 객체(render object)" 


### RenderObject 클래스의 정의
```
class RenderObject { virtual  
    void layout(); virtual
    void paint(PaintInfo); virtual
    void rect repaintRect();
    Node * node; //the DOM node
    RenderStyle * style; // the computed style
    RenderLayer * containgLayer; //the containing z-index layer
}
```
렌더러의 CSS 박스 유형
- 기하학적 정보 → 너비, 높이, 위치 
- "display" 스타일 속성의 영향을 받는다(스타일 계산 참고). 

```
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)  
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    …
    RenderObject* o = 0;
 
    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
        ...
    }
    return o;
}
```
- 웹킷 코드 : display 속성 → DOM 노드에 어떤 유형의 렌더러를 만들어야 하는지 결정
- 이외 요소 유형에 따라서 렌더러의 특징은 달라질 것이다.

## DOM 트리와 렌더 트리의 관계
### 렌더러 와 DOM 요소
서로 부합하지만 꼭 1:1로 대응하는 관계는 아니다. 
- "head" 요소 (비시각적 DOM 요소) → 렌더 트리에 추가 X
- display 속성에 "none" 값이 할당된 요소 → 트리에 나타나지 않는다
- visibility 속성에 "hidden" 값이 할당된 요소 → 트리에 나타난다
        
- 여러 개의 시각 객체와 대응하는 DOM 요소
    - 복잡한 구조 : 보통 하나의 사각형으로는 묘사할 수 없다.
    - "select" 요소
        - '표시 영역, 드롭다운 목록, 버튼' 표시를 위한 3개의 렌더러
        
- 한 줄에 충분히 표시할 수 없는 문자 → 여러 줄로 바뀔 때 
    - 새 줄은 별도의 렌더러로 추가됨
- 깨진 HTML
    - CSS 명세, 인라인 박스 → 블록 박스만 포함 or 인라인 박스만 포함
    - 인라인 박스 → 인라인과 블록 박스가 섞인 경우 
        - 인라인 박스를 감싸기 위한 익명의 블록 렌더러가 생성됨
        
- DOM 노드에 대응하지만 트리와 동일한 위치에 있지 않은 렌더 객체
    - float 처리된 요소 / position 속성 값이 absolute 로 처리된 요소
    - 트리의 다른 곳에 배치된 상태로 형상이 그려짐 
    - 자리 표시자가 원래 있어야 할 곳에 배치됨
    > 자리표시자에 대한 내용은 아래에 한번 더 나옴
    
렌더 트리와 DOM 트리 대응(3.1). "뷰포트"는 최초의 블록이다. 웹킷에서는 "RenderView" 객체가 이 역할을 한다.
![image](https://user-images.githubusercontent.com/31977543/98700300-65e07f00-23bb-11eb-8539-3a2e730e7f9d.png)

## 렌더 트리 구축

### 루트 렌더 객체
다른 모든 블록을 포함하는 최상위 블록

- 웹킷 : RenderView
- 파이어폭스 : ViewPortFrame

트리의 나머지 부분 → DOM 노드를 추가함으로써 구축된다.

### Attachment (Webkit)
**웹킷**에서 스타일을 결정하고 렌더러를 만드는 과정
- 모든 DOM 노드에는 "attach" 메서드가 있다. 
- Attachment 는 동기적
    - DOM 트리에 노드를 추가 → 새 노드의 "attach" 메서드를 호출한다.
    
### 프레젠테이션 (파이어폭스)
- DOM 업데이트를 위한 리스너
- 프레젠테이션은 형상 만들기를 FrameConstructor 에 위임
- FrameConstructor 는 스타일(**스타일 계산** 참고)을 결정하고 형상을 만든다

## 스타일 계산
각 렌더 객체의 시각적 속성에 대한 계산

→ 각 요소의 스타일 속성을 계산

### 최초의 스타일 시트
- 기본 스타일 시트
    - 브라우저가 제공
- 사용자 선호 스타일을 정의    
    - 파이어폭스 → "파이어폭스 프로필" 폴더 > 스타일 시트 변경
- 페이지 제작자의 제공 

### 스타일 계산의 어려움
스타일 데이터의 광범위한 구성 

→ 전체 규칙으로부터 각 요소에 할당된 규칙을 찾는 것
 
→ 메모리 문제
 
→ 최적화 필요


예를 들어 이런 복합 선택자 `div div div div { … }`
- 의미 : 3번째 자손 `<div>` 에 규칙을 적용
- 목적 : 규칙을 적용할 `<div>` 요소를 트리에서 탐색하는 것

이런 문제를 해결하는 방법은 아래와 같다.

### 스타일 정보 공유

#### 웹킷 노드의 스타일 객체(RenderStyle) 참조
웹킷 노드 --참조--> 스타일객체(RenderStyle)

#### 스타일 객체 공유 조건
- 형제 / 사촌 노드일 때
- 동일한 마우스 반응 상태를 가진 요소 
   - 한 요소가 `:hover` 상태가 될 수 없는데 다른 요소는 `:hover` 가 될 수 있다면 동일한 마우스 상태가 아니다.
- 아이디가 없는 요소
- 태그 이름이 일치
- 클래스 속성이 일치
- 지정된 속성이 일치
- 링크(link) 상태가 일치
- 초점(focus) 상태가 일치
- 문서 전체에서 속성 선택자의 영향을 받는 요소가 없어야 한다. 
    - 속성 선택자를 사용한 경우(속성 선택자 예 `input[type=text]{...}`)
- 요소에 인라인 스타일 속성이 없어야 한다
    - 인라인 스타일 예 `<p style="...">...</p>`
- 문서 전체에서 형제 선택자를 사용하지 않아야 한다. 
    - 형제 선택자  `+ 선택자`, `:first-child`, `:last-child`
    - 웹 코어는 형제 선택자를 만나면 전역 스위치를 열고, 전체 문서의 스타일 공유를 중단 

### 파이어폭스 스타일 계산
1. 규칙 트리
2. 스타일 문맥 트리 

#### 스타일 문맥 ⬅ **최종 값** 저장
- 값은 부합하는 **규칙**을 적용
    - 논리로부터 구체적인 값으로 변환함으로써 계산된다. 
    - 예) 논리적인 값(화면의 백분율(%)) -계산→ 절대적인 단위(px)로 변환
- 규칙 트리 
    - 노드 사이에서 이 값을 공유 ➡ 다시 계산하는 일 방지

#### 규칙트리
- 부합하는 모든 규칙은 규칙트리에 저장한다.
- 노드 스타일이 계산될 필요가 있을 때 계산된 경로를 트리에 추가한다.
- 경로의 하위 노드 : 높은 우선순위 

트리 경로가 어휘 목록 속에 있는 단어이며, 이미 규칙 트리를 계산했다고 가정했을 때
![image](https://user-images.githubusercontent.com/31977543/98776463-4d5f7b80-2432-11eb-90b1-e895c017decf.png)

부합하는 규칙이 순서에 따라 B - E - I 라고 치자. 
브라우저는 이미 A - B - E - I - L 경로를 계산했기 때문에 트리 안에 이 경로가 있고 할 일이 줄었다. 

### 트리가 작업량을 줄이는 방법

#### 스타일 문맥 -분리→ 구조체
구조체(structs) 
- 스타일 정보: 선/색상과 같은 종류
- 상속되는 구조체의 속성
    - 구조체에서 어떤 선언도 발견할 수 없는 경우
    - 속성들은 요소에 따라 정해져 있지 않은 한 부모로부터 상속된다. 
        - 부모 구조체를 향하면서 구조체를 공유 
- 상속되지 않는 구조체의 속성
     - "재설정(reset)" 속성
     - 기본 값을 사용한다
 
#### 규칙 트리를 사용하여 스타일 문맥을 계산
어떤 요소의 스타일 문맥을 계산할 때 
1. 가장 먼저 규칙 트리의 경로를 계산하거나 또는 이미 존재하는 경로를 사용한다.
2. 새로운 스타일 문맥으로 채우기 위해 경로 안에서 규칙을 적용한다. 
3. 가장 높은 우선순위(보통 가장 구체적인 선택자)를 가진 경로의 하위 노드에서 시작하여 구조체가 가득 찰 때까지 트리의 상단으로 거슬러 올라간다. 

규칙 노드 안에서 (구조체를 위한 특별한 선언?)이 없다면 상당한 최적화를 할 수 있다. 
선언이 가득 채워질 때까지 노드 트리의 상위로 찾아 올라가서 간단하게 적용하면 최상의 최적화가 되고 모든 구조체는 공유된다. 
이것은 최종 값과 메모리 계산을 절약한다.

#### 가장 구체적인 노드에 값 추가
- 실제 값으로 변환하기 위해 약간의 추가적인 계산 필요
- 규칙 트리 노드에 결과 저장 → 자식에서도 사용 가능

주어진 HTML
```html
<div class="err" id="div1">  
    <p>
    this is a <span class="big"> big error </span>
    this is also a <span class="big"> very big error</span> error
    </p>
</div>  
<div class="err" id="div2">another error</div>  
```

주어진 규칙 : 색상과 여백의 구조체 속성을 사용하였다.
```
div { margin:5px; color:black }
.err { color:red }
.big { margin-top:3px }
div span { margin-bottom:4px }
#div1 { color:blue }
#div2 { color:green }
```

규칙트리의 노드 : 노드 이름 + 노드가 가리키는 규칙의 번호
![image](https://user-images.githubusercontent.com/31977543/98781498-beeef800-2439-11eb-9795-620b880c6a8f.png)

스타일 문맥 트리의 노드: 노드 이름 + 노드가 가리키는 규칙 노드
![image](https://user-images.githubusercontent.com/31977543/98781667-12f9dc80-243a-11eb-8fad-1e793a581393.png)

HTML 을 파싱하여 두 번째 `<div>` 태그인 `<div class="err" id="div2">`에 이르렀다고 가정하자. 

이 노드에 필요한 스타일 문맥을 생성하고 스타일 구조체를 채워야 한다.

1. 스타일 문맥 생성 및 스타일 문맥 트리에 추가 과정
    - 두 번째 `<div>` 규칙에 맞는 것 → `1, 2, 6` 
    - 요소가 사용할 수 있는 트리 경로(규칙 트리의 B:1, C:2)가 이미 존재
    - 새로운 스타일 문맥이 규칙 트리의 F:6 노드를 가리킨다.

2. 스타일 구조체를 채우는 과정
    - 여백 구조체를 채운다.
        - 마지막 규칙 노드(F:6)가 여백 구조체를 포함하지 않음
            - 상위 노드로 거슬러 올라가서 저장된 여백 구조체를 찾는다.
            - 여백 규칙이 선언된 최상위 노드의 구조체를 규칙 노드 B:1 에서 찾았다.
    - 색상 구조체 정의에는 저장된 구조체를 사용할 수 없다. 
        - 색상은 이미 하나의 속성 값을 가지고 있음 → 규칙 트리 상단으로 거슬러 올라갈 필요가 없다. 
        - 최종 값을 계산하고 계산된 값(문자열에서 RGB 등으로 변환된)을 이 노드에 저장할 것이다.

- 두 번째 `<span>` 요소
    - 규칙 트리의 G:3를 가리킨다
    - 동일한 노드를 가리키는 형제 → 전체 스타일 문맥을 공유, 이전 span 의 문맥을 취한다.

- 부모로부터 상속된 규칙을 포함하고 있는 구조체의 저장
    - 문맥 트리에서 처리됨 
    - 파이어폭스는 재설정으로 처리해서 규칙 트리에 저장함
    
예를 들어 문단 요소에 글꼴을 위한 규칙을 추가한다면.

`p { font-family:Verdana; font size:10px; font-weight:bold }`
  
`<p>` 는 스타일 문맥 트리에서 `<div>` 의 자식요소.
- 부모의 동일 글꼴 구조체를 공유할 수 있다. 
- p 요소에 지정된 규칙이 없는 경우라도 마찬가지다.

### 규칙 트리가 없는 웹킷
- 선언이 일치하는 규칙이 4번 탐색된다. 
- 우선 중요하지 않은 상위 속성(display 와 같은 속성이 의존하기 때문)이 적용
- 그 다음 중요한 상위 속성이 적용 
- 그리고 나서 중요하지 않은 일반 속성이 적용
- 마지막으로 중요한 일반 속성이 적용된다. 

여러 번 나타나는 속성들이 정확한 다단계 순서에 따라 결정된다

가장 마지막 값이 적용된다.

### 쉬운 선택을 위한 규칙 다루기
스타일 규칙을 위한 몇 가지 소스가 있다.

#### CSS 규칙을 외부 스타일 시트에서 선언 / style 요소에서 선언
`p {color:blue}`
  
#### 인라인 스타일 속성
`<p style="color:#0000ff"></p>`
  
#### HTML 의 시각적 속성
이것들은 CSS 규칙으로 변환됨

`<p bgcolor="blue"></p>`

---  
- 인라인 스타일 속성 → 자신이 스타일 속성을 가짐
- HTML 의 시각적 속성 → HTML 속성을 이용하여 연결할 수 있음

→ 요소에 쉽게 연결가능

### 스타일 시트 파싱
스타일 시트를 파싱 한 후, 규칙은 선택자에 따라 여러 해시맵 중 하나에 추가된다. 

이런 처리 작업을 통해 규칙을 찾는 일은 훨씬 쉬워진다.

맵에서 특정 요소와 관련 있는 규칙을 추출 할 수 있음
- 모든 선언을 찾아 볼 필요가 없다.

이러한 최적화는 찾아야 할 규칙의 95% 이상을 제거하기 때문에 
- 규칙을 찾는 동안 모든 선언을 고려할 필요가 없다.
 
#### 이름을 사용한 맵
아이디, 클래스 이름, 태그 이름 

- 아이디 선택자 규칙 → 아이디 맵에 추가 
- 클래스 선택자 규칙 → 클래스 맵에 추가

#### 일반적인 맵
이름을 사용한 맵 분류에 맞지 않는 것 

```css
p.error {color:red}  <!-- 클래스 맵에 추가 -->
#messageDiv {height:50px} <!-- 아이디 맵에 추가 -->
div {margin:5px}  <!-- 태그 맵에 추가 -->
```

위 스타일과 관련된 HTML 코드
```html
<p class="error">an error occurred </p>  
<div id=" messageDiv">this is a message</div>  
```

### 다단계 순서에 따라 규칙 적용하기
- 스타일 객체는 모든 CSS 속성을 포함한다. 
- 어떤 규칙과도 일치하지 않는 일부 속성 → 부모 요소의 스타일 객체로부터 상속 받음 
- 그 외 다른 속성들은 기본 값으로 설정된다.


#### 스타일 시트 다단계(cascade) 순서
규칙을 적용하는 순서

##### 다단계 순서가 중요한 이유
스타일 속성 선언은 
- 여러 스타일 시트에서 나타날 수 있다.
- 하나의 스타일 시트 안에서도 여러 번 나타날 수 있다.

##### CSS2 명세, 다단계 순서(우선 순위 낮음 → 높음 순서)
1. 브라우저 선언 (browser declarations)
1. 사용자 일반 선언 (user normal declarations)
1. 저작자 일반 선언 (author normal declarations)
1. 저작자 중요 선언 (author important declarations)
1. 사용자 중요 선언 (user important declarations)

##### 같은 순서 안에서 > 동일한 속성 선언
- 특정성(specificity)에 의해 정렬됨

##### HTML 시각 속성 -> CSS 속성 선언으로 변환
- 저작자 일반 선언 규칙으로 간주됨

##### 특정성
CSS2 명세, 선택자 특정성 정의

```
*{} /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
li{} /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */  
li:first-line{} /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */  
ul li{} /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */  
ul ol+li{} /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */  
h1+*[rel=up]{} /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */  
ul ol li.red{} /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */  
li.red.level{} /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */  
#x34y{} /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
style="" /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */ 
```
- 선택자 없이 'style' 속성이 선언된 것이면 1을 센다. 그렇지 않으면 0을 센다. (=a)
- 선택자에 포함된 아이디 선택자 개수를 센다. (=b)
- 선택자에 포함된 속성 선택자(클래스 선택자와 속성 선택자)와 가상 클래스 선택자의 숫자를 센다. (=c)
- 선택자에 포함된 요소 선택자와 가상 요소 선택자의 숫자를 센다. (=d)

특정성의 값 : a-b-c-d (큰 진법의 숫자)를 연결

사용할 진법 : 분류 중에 가장 높은 숫자에 의해서 정의됨 
- a=14 → 16진수 
- a=17 → 17진법 
    - html body div div p … (선택자에 17개의 태그를 사용하는 경우로 흔치 않음)

##### 규칙 정렬
맞는 규칙 발견 → 다단계 규칙에 따라 정렬됨

웹킷
- 목록이 적으면 → 버블 정렬
- 목록이 많으면 → 병합 정렬
- 규칙에 ">" 연산자를 덮어쓰는 방식으로 정렬을 실행 (?)

```
static bool operator >(CSSRuleData& r1, CSSRuleData& r2)  
{
  int spec1 = r1.selector()->specificity();
  int spec2 = r2.selector()->specificity();
  return (spec1 == spec2) : r1.position() > r2.position() : spec1 > spec2;
}
```

#### 점진적 처리
웹킷
- `@import` 를 포함한 최상위 수준의 스타일 시트가 로드되었는지 표시하기 위해 

→ 플래그 사용 

DOM 노드와 시각정보를 연결하는 과정(attaching)에서,
스타일이 완전히 로드되지 않았다면 
1. 문서에 자리 표시자를 사용 
1. 스타일 시트가 로드됐을 때 다시 계산


Reference
--
- https://d2.naver.com/helloworld/59361
