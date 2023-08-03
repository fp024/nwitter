import firebase from 'firebase/compat/app';
/*
  firebase/app 으로 import 하면, 아래 오류가 발생한다.
  Attempted import error: 'firebase/app' does not contain a default export (imported as 'firebase').
  https://stackoverflow.com/questions/68946446/how-do-i-fix-a-firebase-9-0-import-error-attempted-import-error-firebase-app
*/
import 'firebase/compat/auth';
/*  
  "firebase/auth" 을 import 하면 아래 오류가 발생한다.  app과 마찬가지로 compat경로를 붙인다.
  TypeError: firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__.default.auth is not a function
*/
import 'firebase/compat/firestore';
/*
  "firebase/firestore" 을 import 하면 아래 오류가 발생한다.  app과 마찬가지로 compat경로를 붙인다.
  TypeError: firebase_compat_app__WEBPACK_IMPORTED_MODULE_0__.default.firestore is not a function
 */
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
