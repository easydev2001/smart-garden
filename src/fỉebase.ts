// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTo9RaNiz4ovrgrxaPNI1wCPxAX8eXrRE',
  authDomain: 'smart-garden-98b52.firebaseapp.com',
  databaseURL: 'https://smart-garden-98b52-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'smart-garden-98b52',
  storageBucket: 'smart-garden-98b52.firebasestorage.app',
  messagingSenderId: '92191390276',
  appId: '1:92191390276:web:172e9600bd1c2d7b481a11',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export { database }
