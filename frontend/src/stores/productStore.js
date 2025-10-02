// frontend/src/stores/productStore.js
import { defineStore } from "pinia";
import api from "../services/api";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: []
  }),

  actions: {
    async fetchProducts() {
      const res = await api.get("/products");
      this.products = res.data;
    },

    async addProduct(product) {
      const res = await api.post("/products", product);
      this.products.push(res.data);
    },

    async deleteProduct(id) {
      await api.delete(`/products/${id}`);
      this.products = this.products.filter(u => u._id !== id);
    }
  }
});
