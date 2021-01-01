import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBi7kWOCLDlVHEEmKWEYPuY4SPowlFGBqU",
    authDomain: "fir-cba35.firebaseapp.com",
    databaseURL: "https://fir-cba35.firebaseio.com",
    projectId: "fir-cba35",
    storageBucket: "fir-cba35.appspot.com",
    messagingSenderId: "447126842730",
    appId: "1:447126842730:web:a4f536e26674e2cb724913"
};

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth){
      return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set(
          {
            displayName,
            email,
            createdAt,
            ...additionalData
          }
        );
      }catch(error){
        console.log('error creaing user', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;
