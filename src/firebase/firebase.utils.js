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

  //FUNCTION TO ADD USERS
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    
    //CHECKS IF AUTH OBJECT EXIST 
    if (!userAuth) return;

    //REFERENCE OF THE USER IN DATABASE USING AUTH UID
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    //GET METHOD TO RETRIEVE USER DATA
    const snapshot = await userRef.get();

    //IF USER DOES NOT EXIST THAN IT WILL CREATE ONE
    if(!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createAt = new Date();

      //SETS USER INFO
      try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;