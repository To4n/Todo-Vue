import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCpCgfWydKsqm5Q_6d_W1AeWeYgPXlY53I",
    authDomain: "todo-vue-835c5.firebaseapp.com",
    databaseURL: "https://todo-vue-835c5-default-rtdb.firebaseio.com",
    projectId: "todo-vue-835c5",
    storageBucket: "todo-vue-835c5.appspot.com",
    messagingSenderId: "386424390491",
    appId: "1:386424390491:web:f253b1c59fec19ed5ed07e",
    measurementId: "G-5K61XGLV4L"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestore = firebaseApp.firestore();
  
  export default firestore