import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

let estasIdentificado = false;

router.beforeEach((to, from) => {
  if(to.path == "/privada" && !estasIdentificado)
  return false
  else
  return true
})

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Se ha iniciado sesión");
      estasIdentificado = true;
    } else {
      console.log("Se ha cerrado sesión");
      estasIdentificado = false;
    }

    if (to.path === "/admin") {
      if (estasIdentificado && user.email === "admin@gmail.com") {
        next();
      } else {
        console.log("Acceso denegado. Debes iniciar sesión como administrador.");
        next("/");
      }
    } else {
      next();
    }
  });
});


const app = createApp(App)
app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
  ],
})

app.use(router)

app.mount('#app')

