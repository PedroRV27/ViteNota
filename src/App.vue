<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/privada">AreaPrivada</RouterLink>
        <RouterLink to="/admin">Administracion</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #283442;
    color: #ffffff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .logo {
    margin-right: 0.5rem;
    width: 50px; /* Ajustar según el tamaño deseado */
    height: 50px; /* Ajustar según el tamaño deseado */
  }

  .wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 40px; /* Ajustar según la altura del header */
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  nav a {
    text-decoration: none;
    color: #ffffff;
    font-weight: bold;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  nav a:hover {
    background-color: #1a2533;
  }

  RouterView {
    margin-top: 10px;
  }
</style>