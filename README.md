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

### VSCode 관련 메시지
* Unable to watch for file changes in this large workspace folder.
  * 해결방법 가이드
    * https://code.visualstudio.com/docs/setup/linux#_visual-studio-code-is-unable-to-watch-for-file-changes-in-this-large-workspace-error-enospc
  * VS Code의 파일 감시기의 핸들이 부족해서 나타나는 현상.
    * 프로젝트에 한정된 내용이라 방법1이 나을 것 같다.
    * 방법1: settings.json 에 감시 제외 경로 추가
      ```
      "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/*/**": true
      }
      ```
    * 방법2: 시스템의 `/etc/sysctl.conf` 의 `fs.inotify.max_user_watches` 항목을 수정 후 `sudo sysctl -p` 로 적용
      ```
      fs.inotify.max_user_watches=524288
      ```

### 필요 배경지식 링크



---

### ✨ 오랜만에...  실행을 해봤는데... 잘되는 것 같다.

단지... Node 18 LTS에서 실행시... OpenSSL 오류가 나서 ...

처음에는 Node 14 LTS로 실행했다가... 그냥 `npm audit fix --force` 명령으로 디펜던시 업데이트를 해버렸음.

* https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

디펜던시 업데이트 후, Node 18 LTS 버전에서 OpenSSL오류 없이 잘 실행되었다.

* 디펜던시 변경은 ..
  * `"react-scripts": "4.0.3"` >   `"^5.0.1"`로 바뀜.



### ✨ [5장 이후 진행 노트 정리](Note.md)

2년전에 5장까지 하다말고 다시하는 거라서, 진행하면서 특이한 부분 노트로 정리했다.



