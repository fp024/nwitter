# 노트

> 5장까지 따로 시행착오를 적지는 않았는데, 지금부터 적어보자!
>
> 그런데, firebase의 compat 라이브러리를 사용해서 딱히 특별한 문제는 없을 것 같다. 😅



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

