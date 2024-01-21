<script setup>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const user = ref(null);
const email = ref('');
const password = ref('');
const usuario = ref('');
const mostrarFormEmail = ref(false);
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (authUser) => {
    user.value = authUser;
  });
});

function iniciaSesion() {
  console.log("Inicio de Sesión");
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userData = result.user;
      console.log(userData);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

function cerrarSesion() {
  signOut(auth).then(() => {
    console.log("Cerrar Sesión");
  }).catch((error) => {
  });
}

function registrarUsuarioEmail() {
  console.log("Email:", email.value);
  console.log("Contraseña:", password.value);

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const authUser = userCredential.user;
      usuario.value = authUser.email;
      router.push({ path: '/privada' });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error al registrar usuario:", errorCode, errorMessage);
    });
}

function iniciarSesionEmail() {
  console.log("Email:", email.value);
  console.log("Contraseña:", password.value);

  if (email.value === 'admin@gmail.com' && password.value === 'admin1') {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const authUser = userCredential.user;
        usuario.value = authUser.email;
        router.push({ path: '/privada' });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al iniciar sesión:", errorCode, errorMessage);
      });
  } else {
    console.error("Credenciales incorrectas");
  }
}

function mostrarFormularioEmail() {
  mostrarFormEmail.value = true;
}
</script>

<template>
  <main>
    <div v-if="user">
      <p>Bienvenido, {{ user.displayName }}</p>
      <button @click="cerrarSesion">Cerrar Sesión</button>
    </div>
    <div v-else>
      <button @click="iniciaSesion">Iniciar Sesión con Google</button>
      <button @click="mostrarFormularioEmail">Iniciar Sesión con Correo y Contraseña</button>
      
      <div v-if="mostrarFormEmail">
        <label for="email">Correo:</label>
        <input type="text" v-model="email" id="email" />

        <label for="password">Contraseña:</label>
        <input type="password" v-model="password" id="password" />
        La contraseña debe tener un minimo de 6 caracteres
        <button @click="registrarUsuarioEmail">Registrar Usuario por Email</button><br>
        <button @click="iniciarSesionEmail">Iniciar Sesión por Email</button>
      </div>
    </div>

    <div v-if="usuario">
      <p>Bienvenido, {{ usuario }}</p>
    </div>
  </main>
</template>

<style>
  main {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Arial', sans-serif;
  }

  button {
    padding: 10px 15px;
    margin: 5px;
    cursor: pointer;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
  }

  button:hover {
    background-color: #2980b9;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 16px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
  }

  input[type="password"] {
    margin-bottom: 20px;
  }

  input:focus {
    border-color: #3498db;
    outline: none;
  }

  .form-container {
    margin-top: 20px;
  }

  p {
    font-size: 18px;
  }
</style>