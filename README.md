# Nwitter

Twitter (mini)clone with React and Firebase



## Windows 8.1 + Ubuntu 진행사항
* 호스트 PC가 Windows 8.1이라서 Node 14.x 버전을 설치할 수 가 없어서, 내부의 가상머신의 Ubuntu에다 nodejs lts 설치 후 진행해봄.
* 편집은 호스트의 Windows 8.1의 VSCode에서 Remote SSH 확장기능으로 연결해서 편집
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
  
* 처음 시작...
  1. .env 의 내용은 아직 대책을 배우지 않았으니 생성해주자.
  2. git으로 받은 nwitter 루트 경로에서 firebase 설치해주자. 
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