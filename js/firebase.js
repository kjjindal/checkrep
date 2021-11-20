import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBE1g3VsAblO44oP1SvS-H7ldwXF5bxp5I",
    authDomain: "catchstackoverflowerror.firebaseapp.com",
    projectId: "catchstackoverflowerror",
    storageBucket: "catchstackoverflowerror.appspot.com",
    messagingSenderId: "912019412399",
    appId: "1:912019412399:web:56c09128b616ed47700b5a",
    measurementId: "G-TBTKK7L3XR"
  };

  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const db=firebaseapp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export default db;
  export {auth,provider};
  