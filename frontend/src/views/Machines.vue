<template>
  <div>
    <h2>CRUD de Máquinas</h2>

    <div class="form-container">
      <input 
        v-model="formData.nome" 
        placeholder="Nome da máquina"
      />
      <input 
        v-model="formData.status" 
        placeholder="Status"
      />

      <button 
        @click="salvar" 
        :disabled="!formData.nome || !formData.status"
      >
        {{ editandoId ? "Atualizar" : "Adicionar" }}
      </button>

      <button v-if="editandoId" @click="cancelarEdicao" class="cancel-button">
        Cancelar
      </button>
    </div>

    <hr />

    <h3>Lista de Máquinas</h3>
    
    <p v-if="store.machines.length === 0">Carregando dados ou nenhuma máquina cadastrada.</p>
    
    <ul class="machine-list">
      <li v-for="m in store.machines" :key="m._id">
        <span class="machine-details">
          <strong>{{ m.nome }}</strong> - Status: {{ m.status }}
        </span>

        <div class="actions">
          <button @click="iniciarEdicao(m)" class="edit-button">
            Editar
          </button>
          
          <button @click="store.deleteMachine(m._id)" class="delete-button">
            Excluir
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
// Importa a Store que você definiu
import { useMachineStore } from "../stores/machineStore"; 

const store = useMachineStore();

// --- ESTADO LOCAL DO FORMULÁRIO ---
// Estado reativo para os campos do formulário (nome e status)
const formData = reactive({
  nome: '',
  status: ''
});

// Referência para armazenar o ID da máquina sendo editada
const editandoId = ref(null);

// --- LÓGICA DO CRUD ---

// 1. Ação Principal: Salvar (Adicionar ou Atualizar)
async function salvar() {
  if (editandoId.value) {
    // Se há um ID, chama a ação de atualização da Store (updateMachine)
    await store.updateMachine(editandoId.value, { ...formData });
  } else {
    // Se não há ID, chama a ação de adição da Store (addMachine)
    await store.addMachine({ ...formData });
  }
  
  // Reseta o formulário após a operação
  resetForm();
}

// 2. Iniciar Edição: Preenche o formulário
function iniciarEdicao(machine) {
  editandoId.value = machine._id;
  formData.nome = machine.nome;
  formData.status = machine.status;
}

// 3. Cancelar Edição: Limpa o formulário
function cancelarEdicao() {
  resetForm();
}

// Função auxiliar para limpar o estado local do formulário
function resetForm() {
  editandoId.value = null;
  formData.nome = '';
  formData.status = '';
}

// --- CARREGAMENTO INICIAL ---
// Quando o componente for montado, carrega a lista de máquinas do servidor
onMounted(() => {
  store.fetchMachines();
});
</script>

<style scoped>
/* --- ESTILOS SIMPLES PARA MELHORAR A VISUALIZAÇÃO --- */
.form-container { display: flex; gap: 10px; margin-bottom: 20px; align-items: center; }
input { 
  padding: 10px; border: 1px solid #ccc; border-radius: 4px; flex: 1; 
  min-width: 150px;
}
button { 
  padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; 
  background-color: #007bff; color: white; transition: opacity 0.2s; 
}
button:hover:not(:disabled) { opacity: 0.8; }
button:disabled { background-color: #ccc; cursor: not-allowed; }

.cancel-button { background-color: #f4f4f4; color: #333; }
.cancel-button:hover { background-color: #e0e0e0; }

.machine-list { list-style: none; padding: 0; }
.machine-list li { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 12px 15px; margin-bottom: 8px; border: 1px solid #eee; 
  border-radius: 4px; background-color: #fff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.actions button { margin-left: 8px; padding: 6px 12px; font-size: 14px; }
.edit-button { background-color: #ffc107; color: #333; }
.delete-button { background-color: #dc3545; }
</style>
