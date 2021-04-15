import Vue from "vue";
import VueRouter from 'vue-router'
import Home from "./views/VPlantilla/VBarraMenu.vue";
import About from "./views/VPlantilla/VFooter.vue";
import agregar_usuario from "./views/VUsuario/VAgregar.vue";
    
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/usuario",
    name: "usuario",
    component: agregar_usuario
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