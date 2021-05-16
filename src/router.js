import Vue from "vue";
import VueRouter from 'vue-router'
import firebase from 'firebase';


import login from './views/VLogin/login.vue'
import home from "./views/VHome/home.vue";
import listar_paciente from "./views/VPaciente/VListar.vue";
import editar_paciente from "./views/VPaciente/VEditar.vue";
import agregar_paciente from "./views/VPaciente/VAgregar.vue";
import listar_medicamento from "./views/VMedicamento/VListar.vue";
import editar_medicamento from "./views/VMedicamento/VEditar.vue";
import listar_farmacia from "./views/VFarmacia/VListar.vue";
import editar_farmacia from "./views/VFarmacia/VEditar.vue";
import listar_diagnostico from "./views/VDiagnostico/VListar.vue";
import editar_diagnostico from "./views/VDiagnostico/VEditar.vue";
import listar_entidad from "./views/VEntidad/VListar.vue";
import editar_entidad from "./views/VEntidad/VEditar.vue";
import agregar_prescripcion from "./views/VPrescripcion/VAgregar.vue";



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
    path: "/lis_pac",
    name: "lis_pac",
    component: listar_paciente,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/agr_pac",
    name: "agr_pac",
    component: agregar_paciente,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/edi_pac/:id",
    name: "edi_pac",
    component: editar_paciente,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/lis_med",
    name: "lis_med",
    component: listar_medicamento,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: '/edi_med/:id',
    name: 'edi_med',
    component:editar_medicamento,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/lis_far",
    name: "lis_far",
    component: listar_farmacia,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: '/edi_far/:id',
    name: 'edi_far',
    component:editar_farmacia,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/lis_dia",
    name: "lis_dia",
    component: listar_diagnostico,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: '/edi_dia/:id',
    name: 'edi_dia',
    component:editar_diagnostico,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/lis_ent",
    name: "lis_ent",
    component: listar_entidad,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: '/edi_ent/:id',
    name: 'edi_ent',
    component:editar_entidad,
    meta: {

      requiresAuth: true
    }
  },
  {
    path: "/agr_pre",
    name: "agr_pre",
    component: agregar_prescripcion,
    meta: {

      requiresAuth: true
    }
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