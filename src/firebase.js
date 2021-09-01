import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDJNxSBhbO1FdlZZQLSFxRYdsT7xQRe2EM",
    authDomain: "clone-e296c.firebaseapp.com",
    projectId: "clone-e296c",
    storageBucket: "clone-e296c.appspot.com",
    messagingSenderId: "804794554184",
    appId: "1:804794554184:web:188bd2ae078b0b23c6857d",
    measurementId: "G-F9FJ9DZ9XV"
  };
  
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { db, auth };