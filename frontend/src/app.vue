<template>
  <div>
    <h1>📘 CRUD Fullstack com Vue + Pinia</h1>
    <nav>
      <router-link to="/users">Usuários</router-link> |
      <router-link to="/products">Produtos</router-link> |
      <router-link to="/machines">Máquinas</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// Esse arquivo é o "componente raiz" da aplicação
</script>

<style>
nav {
  margin: 10px 0;
}
nav a {
  margin: 0 8px;
  text-decoration: none;
  color: blue;
}
nav a.router-link-active {
  font-weight: bold;
}
</style>
