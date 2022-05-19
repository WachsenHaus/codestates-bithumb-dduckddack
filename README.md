# 목차

```
1. 배포링크
2. 프로젝트 실행 방법
3. 사용한 기술 스택
4. 구현한 기능 목록
5. 구현 방법 및 구현하면서 어려웠던 점
6. Prototype 소개(Figma)
7. 성능최적화
8. 과제를 통해 얻고자 했던점
9. ETC
```
## 배포링크
www.cointalk.wachsenhaus.com


## 프로젝트 실행 방법

```
npm i --force // npm 패키지를 인스톨해주세요
npm run start // 프로젝트를 실행해주세요.
```

## 사용한 스택
- CSS / UI 도구
  - tailwincss
  - Material UI
  - Framer.motion
  - lightweight-charts
- 자바스크립트 유틸도구
  - moment
  - immer
  - lodash
  - uuid
  - classnames
  - hangul-js
- 주 사용 프레임워크 및 라이브러리
  - React
  - Typescript
  - Recoil
- 기타 도구
  - Notion
  - Figma

<img src="https://user-images.githubusercontent.com/59411545/165929665-1f3b5138-94da-4c7c-9a3e-9a23666af797.png" width="400" height="400">  


## 구현한 기능 목록

1. 체결내역, 호가창, 전체코인목록에 가격반영내용이 실시간으로 애니메이션과 함께 보여집니다.
2. 원화코인, 즐겨찾기 기능이 구현되었습니다. 즐겨찾기 정보는 쿠키로 보관되면 1일의 유효기간을 가집니다.
3. 초성 검색이 지원됩니다. 한글자음,코인 심볼,코인 영문이름으로 검색이 가능합니다.

## 구현 방법 및 구현하면서 어려웠던 점

### 구현 방법

1. 처음 시험용 과제는 주어진 API를 사용하여 개발하였다면, 이번 실습 1,2,3주차 과제는 `리버스 엔지니어`링 관점으로 접근하였습니다.
   실제 빗썸에서 사용하는 `웹소켓`과 `REST API`를 `분석`하고 최대한 동일한 기능으로 구현하였습니다.

2. Recoil을 사용하였고, `atom`과 `selector`의 기능을 적극 활용하여 `데이터가 변경(구독)`된다면 자동으로 랜더링되게 구현하였습니다.

3. 컴포넌트의 **데이터 플로우 그래프**를 설계하며 진행하였습니다.  


### 어려웠던 점

1. 리액트의 **선언형 패러다임**을 따르려고 노력했습니다. 함수화하고 변수명을 짓는 부분에서 고민이 많이 되었습니다.

선언형 프로그램이란 ? 문제를 해결할때 어떻게 하는것보다 무엇을 해야되는지에 중점을 두면서 프로그램을 만드는 방법
![image](https://user-images.githubusercontent.com/59411545/165925987-54b71807-e263-48b0-97ff-a4ede885210f.png)


2. TradingVeiew의 **LightWeight** 라이브러리를 사용하였는데, Coin의 `Volume` 을 차트에 표기하려고했지만. `Y축 Value가 Coin,Volume의 단위`가 각기 달라, 표기가 깨지는 증상을 발견했습니다.
   해당이슈를 무료버전으로 해결하려고했지만. 상위 등급의 라이브러리로 변경해야되는것을 알고 포기했습니다.

3. 즐겨찾기 정보를 `Cookie`에 저장하는데 빗썸과 동일한 형태를 유지하려고 `암호화`, `복호화` 코드를 작성하는 부분이 어려웠습니다.


**최영훈 쿠키**  
![image](https://user-images.githubusercontent.com/59411545/165926172-b8f96b8d-93d3-4e06-8fed-b0d7f04c6670.png)  

**빗썸의 쿠키**  
![image](https://user-images.githubusercontent.com/59411545/165926265-b825b591-c2ca-4480-b82f-aaad0455daa8.png)  


4. **성능 이슈 recoil의 selecotr와 promise 이슈가 어려웠습니다.**

### 피그마 프로토타이핑 툴

<img src="https://user-images.githubusercontent.com/59411545/165928146-5bc8b2e6-8f11-449b-81fb-296928cb30a1.png" width="400" height="400">


# 성능 최적화 고민

1. 객체 깊은 복사  [객체깊은복사](https://bi9choi.notion.site/CS-9838e5c82d9449b398728e4d4da2b2bc)
   
2. 브라우저에서 비동기는 멀티 스레딩일까 아닐까?
   1. `promise,setTimeout`의 진짜 정체
   2. 마이크로 `태스크큐는 바쁘면 안된다.`
   3. 리코일 selector의 성능이슈  
   [노션](https://bi9choi.notion.site/3ec8074e516b4d1ca7c8d3d3f41721df)
      
3. react.memo로 성능 최적화  
   [노션](https://bi9choi.notion.site/React-memo-67dc4828e9584a5e8b3e28632f0268fd)
4. 리코일 메모리 누수  
   [노션](https://bi9choi.notion.site/eeeaae13fba142488f4ec171effdb5cd)
5. Web worker를 사용

## 팀별과제를 통해 얻고자 했던 점



## 아쉬웠던 점



## 느낀점



## 궁금한 점

