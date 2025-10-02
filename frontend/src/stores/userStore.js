import { defineStore } from "pinia";              // Importa a função que cria uma store (estado global) no Pinia
import api from "../services/api";                 // Importa a instância do Axios já configurada com baseURL da API

export const useUserStore = defineStore("user", {  // Cria e exporta a store "user" (ID único)
  state: () => ({                                  // state: função que retorna o estado inicial (reativo)
    users: [],                                      // users: array que armazenará a lista de usuários da API
    form: { nome: '', email: '' },                 // form: estado reativo para os inputs do formulário (nome e email)
    editandoId: null                              // editandoId: armazena o _id do usuário em edição (null = Adicionar)
  }),                                              // fim do state

  actions: {                                       // actions: métodos assíncronos e de lógica que alteram o estado
    
    // --- LÓGICA DE FORMULÁRIO ---
    
    setFormForEdit(user) {                         // setFormForEdit: Prepara o formulário para edição
      this.editandoId = user._id;                  // Ativa o modo de edição, salvando o ID
      this.form.nome = user.nome;                  // Preenche o input 'nome'
      this.form.email = user.email;                // Preenche o input 'email'
    },
    
    resetForm() {                                  // resetForm: Limpa o formulário e sai do modo de edição
      this.editandoId = null;                      // Reseta o ID de edição
      this.form.nome = '';                        // Limpa o input 'nome'
      this.form.email = '';                        // Limpa o input 'email'
    },
    
    async salvar() {                               // salvar: Função orquestradora (chamada pelo botão principal)
      if (this.editandoId) {                       // Verifica se há um ID em edição (modo UPDATE)
        await this.updateUser(this.editandoId, this.form); // Chama a action de API para UPDATE
      } else { 
        await this.addUser(this.form);             // Senão, chama a action de API para CREATE
      }
      this.resetForm();                            // Limpa o formulário após a conclusão da operação
    },

    // --- FUNÇÕES DE API (CRUD) ---
    
    async fetchUsers() {                           // fetchUsers: busca a lista de usuários no backend (READ)
      const res = await api.get("/users");         // Faz requisição GET para /api/users
      this.users = res.data;                       // Atualiza o estado com os dados retornados
    },

    async addUser(user) {                          // addUser: cria um novo usuário no backend (CREATE)
      const res = await api.post("/users", user);  // Envia o objeto "user" em uma requisição POST
      this.users.push(res.data);                   // Insere o usuário criado no array local
    },

    async updateUser(id, user) {                   // updateUser: atualiza um usuário existente (UPDATE)
      const res = await api.put(`/users/${id}`, user); // Envia os dados em uma requisição PUT para /api/users/:id
      const i = this.users.findIndex(u => u._id === id); // Encontra o índice do usuário no array local
      if (i !== -1) this.users[i] = res.data;     // Se encontrado, substitui pelo objeto atualizado vindo da API
    },
    
    async deleteUser(id) {  // deleteUser: remove um usuário pelo _id (DELETE)
      await api.delete(`/users/${id}`);            // Chama DELETE em /api/users/:id para excluir no backend
      this.users = this.users.filter(u => u._id !== id); // Remove do estado local o usuário com o _id
      if (this.editandoId === id) this.resetForm();  // Se o item deletado era o que estava sendo editado, limpa o form
    }
  }
});
