<template>
  <div class="crud-container">
    <h2 class="title">CRUD de Usuários</h2>

    <div class="form-card">
      <div class="input-group">
        
        <input 
          v-model="store.form.nome" 
          placeholder="Nome do Usuário"
          class="input-field"
        />
        <input 
          v-model="store.form.email" 
          type="email"
          placeholder="E-mail"
          class="input-field"
        />
      </div>

      <div class="actions-form">
        <button 
          @click="store.salvar" 
          :disabled="!store.form.nome || !store.form.email"
          :class="['btn', 'btn-primary']"
        >
          {{ store.editandoId ? "Atualizar Usuário" : "Adicionar Novo Usuário" }}
        </button>

        <button v-if="store.editandoId" @click="store.resetForm" :class="['btn', 'btn-secondary']">
          Cancelar
        </button>
      </div>
    </div>

    <hr class="divider" />

    <h3 class="subtitle">Lista de Usuários Cadastrados</h3>
    
    <p v-if="store.users.length === 0" class="empty-message">
      Nenhum usuário cadastrado. Carregando...
    </p>

    <ul class="user-list">
      <li v-for="u in store.users" :key="u._id" class="user-item">
        <span class="user-details">
          <strong>{{ u.nome }}</strong> - 
          <span class="email-text">{{ u.email }}</span>
        </span>

        <div class="item-actions">
          <button @click="store.setFormForEdit(u)" :class="['btn', 'btn-info']">
            Editar
          </button>
          
          <button @click="store.deleteUser(u._id)" :class="['btn', 'btn-danger']">
            Excluir
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue"; 
import { useUserStore } from "../stores/userStore"; // Importa a Store

// Inicializa a Store
const store = useUserStore();

// Carrega a lista de usuários assim que o componente é montado
onMounted(() => {
  store.fetchUsers();
});
</script>

<style scoped>
/* ESTILO PROFISSIONAL (Flat Design) */
.crud-container { max-width: 800px; margin: 40px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; }
.title { color: #333; text-align: center; margin-bottom: 25px; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
.subtitle { color: #555; margin-top: 30px; margin-bottom: 15px; }
.form-card { padding: 20px; border: 1px solid #e0e0e0; border-radius: 6px; background-color: #f9f9f9; }
.input-group { display: flex; gap: 15px; margin-bottom: 15px; }
.input-field { padding: 10px 15px; border: 1px solid #ccc; border-radius: 4px; flex: 1; font-size: 16px; transition: border-color 0.3s, box-shadow 0.3s; }
.input-field:focus { border-color: #007bff; box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25); outline: none; }
.actions-form { display: flex; gap: 10px; justify-content: flex-start; }
.btn { padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background-color 0.3s, opacity 0.3s; }
.btn:disabled { background-color: #adb5bd; cursor: not-allowed; }
.btn-primary { background-color: #007bff; color: white; }
.btn-primary:hover:not(:disabled) { background-color: #0056b3; }
.btn-secondary { background-color: #6c757d; color: white; }
.btn-secondary:hover:not(:disabled) { background-color: #5a6268; }
.btn-info { background-color: #ffc107; color: #333; }
.btn-info:hover { background-color: #e0a800; }
.btn-danger { background-color: #dc3545; color: white; }
.btn-danger:hover { background-color: #c82333; }
.user-list { list-style: none; padding: 0; }
.user-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; margin-bottom: 10px; border-left: 5px solid #007bff; background-color: #f1f8ff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); }
.user-details { flex-grow: 1; font-size: 16px; color: #333; }
.email-text { font-size: 0.9em; color: #666; }
.item-actions { display: flex; gap: 8px; }
.divider { border: 0; height: 1px; background-color: #e0e0e0; margin: 30px 0; }
.empty-message { text-align: center; color: #888; padding: 20px; border: 1px dashed #ccc; border-radius: 4px; }
</style>
