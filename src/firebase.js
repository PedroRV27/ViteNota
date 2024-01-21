import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
    apiKey: "AIzaSyDdsz05S07OkGeMQDX9lsGKBM4Bb0cXGhI",
    authDomain: "firestore-a107d.firebaseapp.com",
    projectId: "firestore-a107d",
    storageBucket: "firestore-a107d.appspot.com",
    messagingSenderId: "644520347686",
    appId: "1:644520347686:web:402c17c79ffba0bb94fee7",
    measurementId: "G-B9MK3JJNZG"
  };
export const firebaseApp = initializeApp(firebaseConfig)

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')