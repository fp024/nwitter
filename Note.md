# 노트

> 5장까지 따로 시행착오를 적지는 않았는데, 지금부터 적어보자!
>
> 그런데, firebase의 compat 라이브러리를 사용해서 딱히 특별한 문제는 없을 것 같다. 😅



## 7장. 프로필 페이지와 필터링 기능 만들기

* 강의 동영상: https://www.youtube.com/watch?v=wvY5PVX6uxY

#### 프로필 페이지에 내가 작성한 트윗 목록만 나오도록 구현

* Home 컴포넌트에 있는 것 따라했을 때, 잘 동작하였다.
* 가져온 doc에서 doc.data()으로만 뽑으면 document의 id가 없어서 따로 조합을 해줘야했다. 그값을 반복을 돌릴 때, key 값으로 써줘야함. 그게 Home에서는 잘 되어있었음.









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



