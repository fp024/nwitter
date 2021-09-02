import firebase from "firebase/compat/app";
/*
  firebase/app 으로 import 하면, 아래 오류가 발생한다.
  Attempted import error: 'firebase/app' does not contain a default export (imported as 'firebase').
  https://stackoverflow.com/questions/68946446/how-do-i-fix-a-firebase-9-0-import-error-attempted-import-error-firebase-app
*/

const firebaseConfig = {
  apiKey: "process.env.REACT_APP_API_KEY",
  authDomain: "process.env.REACT_APP_AUTH_DOMAIN",
  projectId: "process.env.REACT_APP_PROJECT_ID",
  storageBucket: "process.env.REACT_APP_STORAGE_BUCKET",
  messagingSenderId: "process.env.REACT_APP_MESSAGING_SENDER_ID",
  appId: "process.env.REACT_APP_APP_ID"
};

export default firebase.initializeApp(firebaseConfig);