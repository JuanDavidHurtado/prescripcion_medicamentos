import Vue from "vue";
import VueRouter from 'vue-router'
import firebase from 'firebase';


import login from './views/VLogin/login.vue'
import home from "./views/VHome/home.vue";
import agregar_usuario from "./views/VUsuario/VAgregar.vue";
import listar_usuario from "./views/VUsuario/VListar.vue";
import editar_usuario from "./views/VUsuario/VEditar.vue";
import listar_medicamento from "./views/VMedicamento/VListar.vue";
import editar_medicamento from "./views/VMedicamento/VEditar.vue";
import listar_farmacia from "./views/VFarmacia/VListar.vue";
import editar_farmacia from "./views/VFarmacia/VEditar.vue";
import listar_diagnostico from "./views/VDiagnostico/VListar.vue";
import editar_diagnostico from "./views/VDiagnostico/VEditar.vue";
import listar_entidad from "./views/VEntidad/VListar.vue";
import editar_entidad from "./views/VEntidad/VEditar.vue";


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
  },
  {
    path: "/lis_med",
    name: "lis_med",
    component: listar_medicamento
  },
  {
    path: '/edi_med/:id',
    name: 'edi_med',
    component:editar_medicamento
  },
  {
    path: "/lis_far",
    name: "lis_far",
    component: listar_farmacia
  },
  {
    path: '/edi_far/:id',
    name: 'edi_far',
    component:editar_farmacia
  },
  {
    path: "/lis_dia",
    name: "lis_dia",
    component: listar_diagnostico
  },
  {
    path: '/edi_dia/:id',
    name: 'edi_dia',
    component:editar_diagnostico
  },
  {
    path: "/lis_ent",
    name: "lis_ent",
    component: listar_entidad
  },
  {
    path: '/edi_ent/:id',
    name: 'edi_ent',
    component:editar_entidad
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