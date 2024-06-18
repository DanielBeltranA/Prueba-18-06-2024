// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_iK9blnZuifqKfLTP7_QYIbD0KH-pBIw",
  authDomain: "gestion-de-inventario-2f95e.firebaseapp.com",
  projectId: "gestion-de-inventario-2f95e",
  storageBucket: "gestion-de-inventario-2f95e.appspot.com",
  messagingSenderId: "389028264638",
  appId: "1:389028264638:web:c75e994567f6f6ddcf7cef"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (producto) => addDoc(collection(db, 'Inventario'), producto)

export const getData = () => new Promise((resolve, reject) => {
    onSnapshot(collection(db, 'Inventario'), (snapshot) => {
        resolve(snapshot.docs)
    }, reject)
})

export const remove = (id) => deleteDoc(doc(db, 'Inventario', id))

export const getDocumento = (id) => getDoc(doc(db, 'Inventario', id))

export const update = (id, emp) => updateDoc(doc(db, 'Inventario', id), emp)
