<script setup>
import { useCollection } from 'vuefire'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let estasIdentificado = false;
let uid;

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    console.log("Sesión iniciada " + uid)
    estasIdentificado = true;
  } else {
    console.log("Sesión cerrada")
    estasIdentificado = false;
  }
});

let db = useFirestore();
const todos = useCollection(collection(db, 'todos'))

let file = null;
let contenidonota = "";

function altanota() {
  if (file !== null) {
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    
    uploadBytes(storageRef, file)
      .then((snapshot) => getDownloadURL(snapshot.ref))
      .then((downloadURL) => {
        console.log('Download URL', downloadURL);
        const fechaActual = new Date().toLocaleTimeString();
        if (contenidonota !== '') {
          addDoc(collection(db, "todos"), {
            titulo: contenidonota,
            prioridad: "baja",
            fecha: fechaActual,
            img: downloadURL,
            uid: uid
          });
        }
        contenidonota = '';
        downloadURL = '';
      })
      .catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
  }
}

function subirArchivo(e) {
  file = e.target.files[0];
  console.log(file);
}
</script>

<template>
  <div class="container">
    <h1>Cabecera</h1>
    <input type="text" v-model="contenidonota" placeholder="Escribe tu nota">
    <button @click="altanota">Agregar</button>
    <input type="file" name="img" id="subirFichero" accept="image/png, image/jpg" @change="subirArchivo($event)">
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; 
}

.nota-input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

input {
  margin-bottom: 10px;
}
</style>