// frontend/src/stores/machineStore.js
import { defineStore } from "pinia";                 // Biblioteca para criar Store (estado global)
import api from "../services/api";                   // Cliente Axios configurado (baseURL do backend)

export const useMachineStore = defineStore("machine", { // Cria a Store 'machine'
  state: () => ({                                    // Define os dados globais
    machines: []                                     // Lista de máquinas vinda do MongoDB
  }),

  actions: {                                         // Funções que acessam a API e mudam o estado
    async fetchMachines() {                          // Busca todas as máquinas
      const res = await api.get("/machines");        // GET /api/machines
      this.machines = res.data;                      // Atualiza a lista local com o resultado
    },

    async addMachine(machine) {                      // Adiciona nova máquina
      const res = await api.post("/machines", machine); // POST /api/machines
      this.machines.push(res.data);                  // Coloca a nova máquina também na lista local
    },

    async updateMachine(id, machine) {               // Atualiza uma máquina existente
      const res = await api.put(`/machines/${id}`, machine); // PUT /api/machines/:id
      const i = this.machines.findIndex(m => m._id === id);  // Acha a posição da máquina na lista
      if (i !== -1) this.machines[i] = res.data;     // Substitui a máquina antiga pela atualizada
    },

    async deleteMachine(id) {                        // Remove uma máquina
      await api.delete(`/machines/${id}`);           // DELETE /api/machines/:id
      this.machines = this.machines.filter(u => u._id !== id); // Remove do array local a que foi apagada
    }
  }
});
