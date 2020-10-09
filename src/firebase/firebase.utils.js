import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyChWm1c83PjLeK_K41fY0Le9BhoizXeruc",
    authDomain: "crwn-db-7245e.firebaseapp.com",
    databaseURL: "https://crwn-db-7245e.firebaseio.com",
    projectId: "crwn-db-7245e",
    storageBucket: "crwn-db-7245e.appspot.com",
    messagingSenderId: "517309230473",
    appId: "1:517309230473:web:adb9096dcca9dd06374558"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;