<script setup>
import cabecera from './cabecera.vue'
import cuerpo from './cuerpo.vue'
import {useRouter,useRoute} from 'vue-router'

const router =useRouter();
const ruta =useRoute(); 

function cerrarSesion(){
    //Redirigirse a inicio
    router.push("/");
}
</script>
<template>
    <div class="area-privada">
        <cabecera class="cabecera" />
        <cuerpo />
        <button class="cerrar-sesion" @click="cerrarSesion">Cerrar Sesión</button>
      </div>
</template>

<style>
.area-privada {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
  }
  
  .cerrar-sesion {
    padding: 10px 20px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .cerrar-sesion:hover {
    background-color: #2980b9;
  }
</style>
