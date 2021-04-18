import Vue from "vue";
import VueRouter from 'vue-router'


import Home from "./views/VHome/home.vue";
import agregar_usuario from "./views/VUsuario/VAgregar.vue";
import listar_usuario from "./views/VUsuario/VListar.vue";
import editar_usuario from "./views/VUsuario/VEditar.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/usuario",
    name: "usuario",
    component: agregar_usuario
  },
  {
    path: "/listar",
    name: "listar",
    component: listar_usuario
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component:editar_usuario
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // esto es igual que routes : routes
  routes
})

// 💬 Exponemos la instancia de VueRouter que creamos
export default router