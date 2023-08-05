# 노트

> 5장까지 따로 시행착오를 적지는 않았는데, 지금부터 적어보자!
>
> 그런데, firebase의 compat 라이브러리를 사용해서 딱히 특별한 문제는 없을 것 같다. 😅



## 8장. 깃허브로 누이터배포하고 보안 챙기기



#### 니콜라스의 스타일

* 모든 작업은 기능을 우선 개발하고 나중에 코드를 정리함.



### 깃허브로 누이터 호스팅하기

* 배포 명령

  ```sh
  npm run deploy
  ```

* 다른건 별 문제가 없는데, Nwitter 레파지토리에서 브렌치를 잘 설정해주는 것이 중요했다.

  1. 해당 레파지토리 설정에 들어감

  2. Page > GitHub Pages > Branch
     * gh-pages 브랜치로 설정
  



### 에러 발생, 보안 정책 수정하기







---



## 7장. 프로필 페이지와 필터링 기능 만들기

* 강의 동영상: https://www.youtube.com/watch?v=wvY5PVX6uxY

#### 프로필 페이지에 내가 작성한 트윗 목록만 나오도록 구현

* Home 컴포넌트에 있는 것 따라했을 때, 잘 동작하였다.
* 가져온 doc에서 doc.data()으로만 뽑으면 document의 id가 없어서 따로 조합을 해줘야했다. 그값을 반복을 돌릴 때, key 값으로 써줘야함. 그게 Home에서는 잘 되어있었음.



### 프로필 페이지 기능 보완하기

* 직전에 했던 자신이 적은 트윗목록만 보는 코드는 삭제

  

#### 프로필 업데이트 기능 추가하기

* userObj 관련 문서 살펴보고 프로파일 업데이트 하기

  * https://firebase.google.com/docs/auth/web/manage-users?hl=ko#update_a_users_profile

    * 위의 문서는 최신 문서다.

  * compat : 네임스페이스 방식

    * https://firebase.google.com/docs/reference/js/v8/firebase.User

    * https://firebase.google.com/docs/reference/js/v8/firebase.User#updateprofile

      


### 내가 잘 모르는 것?

자바스크립트 네임스페이스 방식을 모듈식으로 바꿨다?

* https://yamoo9.gitbook.io/typescript/namespace-vs-module
* 약간은 좀 이해가 되는 것 같긴함. 😅









---

## 6장.  사진 미리보기, 저장 기능 만들기

* 트윗의 역순 정렬

  ```js
  dbService.collection('nweets')
    .orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
    const newArray = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data()
    }));
    setNweets(newArray);
  });
  ```

  컬랙션 함수 뒤에 `orderBy()`를 연달아서 실행해주면 됨.



#### uuid

* https://github.com/uuidjs/uuid#readme



#### file 타입 input을 초기화하고 싶을 때...

> 파일을 첨부했던 file 타입 input에 파일명이 계속 남아있는 문제가 있었는데... 
>
> https://stackoverflow.com/a/70390197 글보고 해결했다. useRef를 활용해서 
> ref.current.value = '' 로 해주면 됨
>
> 처음에는 리엑트에서는 input file을 다른 버튼이벤트로 어떻게 처리할지? 해깔렸는데... useRef 활용해서 잘 할 수 있었다. 



####  트윗 삭제 시 사진을 스토리지에서 삭제하기

* ...



