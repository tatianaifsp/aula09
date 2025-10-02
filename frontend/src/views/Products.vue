<template>
  <div>
    <h2>CRUD de Produtos</h2>

    <div class="form-container">
      
      <input 
        v-model="formData.nome" 
        placeholder="Nome do Produto"
        aria-label="Nome do Produto"
      />
      
      <input 
        v-model.number="formData.preco" 
        type="number" 
        step="0.01"
        placeholder="Preço (R$)"
        aria-label="Preço do Produto"
      />

      <button 
        @click="salvar" 
        :disabled="!formData.nome || formData.preco === null"
      >
        {{ editandoId ? "Atualizar Produto" : "Adicionar Produto" }}
      </button>

      <button v-if="editandoId" @click="cancelarEdicao" class="cancel-button">
        Cancelar
      </button>
    </div>

    <hr />

    <h3>Lista de Produtos</h3>
    <button @click="store.fetchProducts">Recarregar Lista</button>
    
    <p v-if="store.products.length === 0">Carregando dados ou nenhuma máquina cadastrada.</p>

    <ul class="product-list">
      <li v-for="p in store.products" :key="p._id">
        <span class="product-details">
          <strong>{{ p.nome }}</strong> - R$ {{ p.preco ? p.preco.toFixed(2) : 'N/A' }}
        </span>

        <div class="actions">
          <button @click="iniciarEdicao(p)" class="edit-button">
            Editar
          </button>
          
          <button @click="store.deleteProduct(p._id)" class="delete-button">
            Excluir
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"; 
import { useProductStore } from "../stores/productStore"; // Importa a Store do Pinia

// Inicializa a Store para que suas propriedades e ações fiquem acessíveis
const store = useProductStore();

// --- ESTADO LOCAL DO FORMULÁRIO ---

// Variável reativa (Composition API) que armazena os dados do formulário.
// Usamos 'reactive' para objetos com múltiplas propriedades.
const formData = reactive({
  nome: '',
  preco: null // Usamos null para campos numéricos que podem vir vazios
});

// Variável reativa (Composition API) que armazena o _id do produto em edição.
// Usamos 'ref' para valores primitivos. Se for null, estamos adicionando.
const editandoId = ref(null);

// --- LÓGICA DO CRUD LOCAL ---

// Função principal que orquestra a adição ou atualização
async function salvar() {
  // Cria uma cópia limpa dos dados do formulário
  const productData = { ...formData };
  
  if (editandoId.value) {
    // Modo UPDATE: chama a ação 'updateProduct' da Store com o ID e os dados
    await store.updateProduct(editandoId.value, productData);
  } else {
    // Modo CREATE: chama a ação 'addProduct' da Store com os novos dados
    await store.addProduct(productData);
  }
  
  // Limpa o formulário e sai do modo de edição após a conclusão da operação
  resetForm();
}

// Prepara o formulário para edição
function iniciarEdicao(product) {
  // Define o ID de edição
  editandoId.value = product._id;
  // Preenche os campos do formulário com os dados do produto clicado
  formData.nome = product.nome;
  formData.preco = product.preco;
}

// Função chamada pelo botão "Cancelar" ou após a conclusão de "Salvar"
function cancelarEdicao() {
  resetForm(); // Simplesmente chama a função que limpa o estado
}

// Função auxiliar para resetar o estado local do formulário
function resetForm() {
  editandoId.value = null;
  formData.nome = '';
  formData.preco = null;
}

// --- HOOK DE CICLO DE VIDA ---
// onMounted: Executa o código assim que o componente é inserido no DOM
onMounted(() => {
  // Chama a ação da Store para carregar a lista inicial de produtos da API
  store.fetchProducts();
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