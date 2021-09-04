# Nwitter

Twitter (mini)clone with React and Firebase



## Windows 8.1 + Ubuntu 진행사항
* 호스트 PC가 Windows 8.1이라서 Node 14.x 버전을 설치할 수 가 없어서, 내부의 가상머신의 Ubuntu에다 nodejs lts 설치 후 진행해봄.
* 소스코드 편집은 호스트의 Windows 8.1의 VSCode에서 Remote SSH 확장기능으로 연결해서 편집
  * https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh
* Ubuntu에서 NodeJS LTS 설치 (14.x)
  * 참고: https://github.com/nodesource/distributions/blob/master/README.md
    ```bash
    # Using Ubuntu  
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```

* 가상머신 3000번 포트 열기
  ```bash
  sudo ufw allow 3000/tcp
  ```
  
* 다른 컴퓨터에서의 처음 시작...
  1. `.env`의 내용은 아직 대책을 배우지 않았으니 생성해주자.
  2. GitHub로 받은 nwitter 루트 경로에다가 firebase 설치해주자. 
      ```bash
      npm install firebase
      ```
  3. 서버 시작
      ```bash
      npm run start
      ```
      * 포트 변경을 하고 싶다면
        ```bash
        PORT={포트번호} npm run start       
        ``` 
  * VSCode의 터미널에서 서버 시작을 하면 포트포워딩을 자동으로 해줌
    * 호스트 머신에서 `http://localhost:3000` 으로 접근 가능함

### 질문
1. Ubuntu에서 재부팅하거나 쉘을 다시 시작하게되면 `npm install firebase` 를 다시 해줘야만 적용이 되는데? 원래 이런 것인지?
  * 그런데.. npm명령을 sudo로 명령어를 실행했을 때는, 재부팅 또는 쉘을 다시시작하더라도 문제가 없었음.
  * 그런데.. npm 명령을 sudo로 실행하지 말라고 함...
    * https://stackoverflow.com/questions/16151018/how-to-fix-npm-throwing-error-without-sudo
      * 아래와 같이 하였음.
        1. `sudo npm uninstall firebase`
        2. `sudo chown -R $(whoami) ~/.npm`
        3. `npm install firebase` 
      * 이렇게 하고 재부팅 후에도 일부러 firebase를 설치할 필요는 없긴한데.. 이전에 루트로 설치한 영향이 남아서 그런것일지는 잘모르겠다.

### fbase.js에서의 import
* 집필시점이후로 firebase에 변경이 있어서 그런 것 같다. compat 경로를 추가해주면 에러는 해결된다.
  ```javascript
  import firebase from "firebase/compat/app";
  /*
    firebase/app 으로 import 하면, 아래 오류가 발생한다.
    Attempted import error: 'firebase/app' does not contain a default export (imported as 'firebase').
    https://stackoverflow.com/questions/68946446/how-do-i-fix-a-firebase-9-0-import-error-attempted-import-error-firebase-app
  */
  import "firebase/compat/auth"
  /*  
    "firebase/auth" 을 import 하면 아래 오류가 발생한다.  app과 마찬가지로 compat경로를 붙인다.
    TypeError: firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__.default.auth is not a function
  */
  import "firebase/compat/firestore"
  /*
    "firebase/firestore" 을 import 하면 아래 오류가 발생한다.  app과 마찬가지로 compat경로를 붙인다.
    TypeError: firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__.default.firestore is not a function
  */
  ```



### 필요 배경지식 링크


