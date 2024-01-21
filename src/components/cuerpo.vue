<script setup>
import { useCollection } from 'vuefire';
import { useFirestore } from 'vuefire';
import { collection, addDoc } from 'firebase/firestore';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

let usuario = getAuth().currentUser;

let db = useFirestore();
const coleccion = collection(db, 'todos');

let Admin = usuario.email === 'admin@gmail.com';

const list = Admin ? collection(db, 'todos') : query(coleccion, where("uid", "==", usuario.uid));

const todos = useCollection(list);

function eliminarNota(id) {
  console.log('id:' + id);
  deleteDoc(doc(db, 'todos', id));
}

function subirPrioridadBaja(id) {
  const notaActualizar = doc(db, 'todos', id);
  updateDoc(notaActualizar, {
    prioridad: 'baja',
  });
}
function subirPrioridadMedia(id) {
  const notaActualizar = doc(db, 'todos', id);
  updateDoc(notaActualizar, {
    prioridad: 'media',
  });
}
function subirPrioridadAlta(id) {
  const notaActualizar = doc(db, 'todos', id);
  updateDoc(notaActualizar, {
    prioridad: 'alta',
  });
}
function marcarHecho(todo) {
  const actualizar = doc(db, 'todos', todo.id);
  updateDoc(actualizar, {
    hecho: !todo.hecho
  });
}
function contarTareasPendientes() {
  if (!todos.value) return 0; 
  const tareasPendientes = todos.value.filter(todo => !todo.hecho).length;
  return tareasPendientes;
}
function eliminarTareasHechas() {
  const tareasHechas = todos.value.filter(todo => todo.hecho);

  tareasHechas.forEach(todo => {
    deleteDoc(doc(db, 'todos', todo.id));
  });
}


</script>

<template>
  <div>
    <p>Tienes {{ contarTareasPendientes() }} tareas pendientes de {{ todos.length }}</p>
    <button @click="eliminarTareasHechas">Eliminar Tareas Hechas</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <div class="nota-container">
          <input type="checkbox" :id="'check-' + todo.id" :checked="todo.hecho" @change="marcarHecho(todo)" />
          <label :for="'check-' + todo.id">
            <span :style="{ 'text-decoration': todo.hecho ? 'line-through' : 'none' }">{{ todo.titulo }} - {{ todo.prioridad }} - {{ todo.fecha }}</span>
          </label>
          <div class="contenido-nota">
            <img v-if="todo.img" :src="todo.img" alt="Imagen de la nota">
            <div class="botones-container">
              <button @click="subirPrioridadBaja(todo.id)" class="baja-button">Baja</button>
              <button @click="subirPrioridadMedia(todo.id)" class="media-button">Media</button>
              <button @click="subirPrioridadAlta(todo.id)" class="alta-button">Alta</button>
              <button @click="eliminarNota(todo.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.notas-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.nota-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.contenido-nota {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.baja-button {
  background-color: blue;
}

.media-button {
  background-color: orange;
}

.alta-button {
  background-color: red;
}

img {
  max-width: 20%;
  height: auto;
}
</style>

