import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import 'firebase/storage';

let firebaseConfig = {
  apiKey: "AIzaSyC8V945RKLvyGDWXwS5Tqtmemn3z5EfP4A",
  authDomain: "financesapp-4e176.firebaseapp.com",
  databaseURL: "https://financesapp-4e176-default-rtdb.firebaseio.com",
  projectId: "financesapp-4e176",
  storageBucket: "financesapp-4e176.appspot.com",
  messagingSenderId: "435587556998",
  appId: "1:435587556998:web:324fa8f8e6e9862f8c5307"
};

passwordReset: email => {
  return firebase.auth().sendPasswordResetEmail(email)
}

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
