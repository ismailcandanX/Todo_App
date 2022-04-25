import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyCu5uQNfXy2e3v59EhAkunEAfNdq84-A2o',
  authDomain: 'react-todo-app-940b8.firebaseapp.com',
  projectId: 'react-todo-app-940b8',
  storageBucket: 'react-todo-app-940b8.appspot.com',
  messagingSenderId: '838837597837',
  appId: '1:838837597837:web:3f0a926538c1086b4e54c4',
  measurementId: 'G-XTJ1RMZP1C',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()


export default db
