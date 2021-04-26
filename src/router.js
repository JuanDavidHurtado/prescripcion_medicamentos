import Vue from "vue";
import VueRouter from 'vue-router'
import firebase from 'firebase';


import login from './views/VLogin/login.vue'
import home from "./views/VHome/home.vue";
import agregar_usuario from "./views/VUsuario/VAgregar.vue";
import listar_usuario from "./views/VUsuario/VListar.vue";
import editar_usuario from "./views/VUsuario/VEditar.vue";

Vue.use(VueRouter)

const router = new VueRouter ({ 
  routes: [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/home",
    name: "home",
    component: home,
    meta: {

      requiresAuth: true
    }
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
]
});


router.beforeEach((to, from, next) => {

    if (to.matched.some(ruta => ruta.meta.requiresAuth)) {

      const user = firebase.auth().currentUser;

        if (user) {        
            next();

        } else {

        next({
            name: 'login'        
        }) 
      } 
    } else {

      next();

    }
})


// 💬 Exponemos la instancia de VueRouter que creamos
export default router;