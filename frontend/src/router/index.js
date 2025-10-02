import { createRouter, createWebHistory } from "vue-router";
import Users from "../views/Users.vue";
import Products from "../views/Products.vue";
import Machines from "../views/Machines.vue";

const routes = [
  { path: "/users", component: Users },
  { path: "/products", component: Products },
  { path: "/machines", component: Machines },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
