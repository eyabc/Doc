## 유림
- Q https://github.com/pul8219/TIL/issues/13#issuecomment-725801004
### el1
```
<div id='reflow-test1' style='background-color:red;' >hi</div>

el1.style.padding = "8px";
el1.style.width = "320px";
el1.style.height = "240px";
```
![image](https://user-images.githubusercontent.com/31977543/99208779-d85ebe00-2804-11eb-985e-3f4b797753a4.png)

### e2
```
<div id='reflow-test2' style='background-color:red;'>hi</div>
const el2 = document.getElementById("reflow-test2");
el2.style = "padding: 8px; width: 320px; height: 240px;";
```
![image](https://user-images.githubusercontent.com/31977543/99209251-13adbc80-2806-11eb-8c96-3c99f54dd166.png)

`background-color :red` 스타일이 적용되지 않는 이유는 https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/style
기존의 스타일을 덮어 썼기 때문입니다 

그 결과 el2.style 의 객체는 아래와 같습니다. style 을 수정하면 cssText 도 변경 되어 집니다. 
결과는 비슷하지만 기술적으로는 어떻게 구현이 되어있는지 잘모르겠네요
 `dom.style.cssText="..."` 이 올바른 명세서의 표현이기 때문에 
제 생각에는 파싱을 할 때 `dom.style="..."` 을 `dom.style.cssText="..."` 으로 바꾸어 주는 것이 아닐까 생각됩니다
![image](https://user-images.githubusercontent.com/31977543/99211392-8ff6ce80-280b-11eb-86c9-4982048f7eef.png)
![image](https://user-images.githubusercontent.com/31977543/99211427-a3099e80-280b-11eb-8e84-9f6ed7e57bba.png)


따라서 다음과 같이 사용한다면 background-color 를 유지할 수 있습니다
```
  el2.style = el2.style.cssText + "; padding: 8px; width: 320px; height: 240px";
```


## 성능
크롬 84 의 performance 메뉴에서 확인한 결과

### el1

![image](https://user-images.githubusercontent.com/31977543/99210163-6ee0ae80-2808-11eb-8ba0-b024d44bceb5.png)

위 이미지를 시간별로 확인을 해보면 
![image](https://user-images.githubusercontent.com/31977543/99210244-ae0eff80-2808-11eb-9c4b-696e326146dd.png)

![image](https://user-images.githubusercontent.com/31977543/99210266-b9fac180-2808-11eb-845f-5eba9489fa8a.png)
![image](https://user-images.githubusercontent.com/31977543/99210282-c121cf80-2808-11eb-93aa-2e21676a5654.png)

.... 

### el2 

![image](https://user-images.githubusercontent.com/31977543/99209491-a0587a80-2806-11eb-9e07-aa06f7d933b8.png)


### el3 
![image](https://user-images.githubusercontent.com/31977543/99211987-2081de80-280d-11eb-8de0-123804c8bff1.png)


거의 비슷한 시간과 렌더링 과정을 가지는 것을 보아 
 엔진이 최적화를 하는 것 같습니다 

크롬 84 기준. 

의외로 첫 방법이 평균적으로 제일 빨랐습니다. 
크롬에서 사용하는 엔진 동작을 잘 모르기 때문에 상세한 이유는 잘 모르겠네요

## 형욱
Repaint : 이 Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 렌더링 트리를 화면에 픽셀로 변환

중요) DOM이 화면을 변화시키는가? => 변화시킨다 => reflow 발생(Dom트리 변화=>CSSOM변화 =>Render tree 변화) => repaint를 통해 브라우저 출력

픽셀로 변환하는 것과 브라우저로 출력하는 행위는 다릅니다. 
정확히 말하자면 `repaint를 통해 브라우저 출력` 하는 것이 아니라
`Composite` 이라는 합성 과정을 통해 브라우저에 출력하게 됩니다 
![image](https://user-images.githubusercontent.com/31977543/99213029-e36b1b80-280f-11eb-90a8-cce6be725516.png)

