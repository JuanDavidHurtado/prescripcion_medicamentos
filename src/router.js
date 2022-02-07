import Vue from "vue";
import VueRouter from 'vue-router'
import firebase from 'firebase';

import login from './views/VLogin/login.vue'
import home from "./views/VHome/home.vue";
import editar_perfil from "./views/VUsuario/VEditarPerfil.vue";
import listar_usuario from "./views/VUsuario/VListar.vue";
import agregar_usuario from "./views/VUsuario/VAgregar.vue";
import editar_usuario from "./views/VUsuario/VEditar.vue";
import listar_paciente from "./views/VPaciente/VListar.vue";
import editar_paciente from "./views/VPaciente/VEditar.vue";
import agregar_paciente from "./views/VPaciente/VAgregar.vue";
import listar_medicamento from "./views/VMedicamento/VListar.vue";
import editar_medicamento from "./views/VMedicamento/VEditar.vue";
import listar_farmacia from "./views/VFarmacia/VListar.vue";
import editar_farmacia from "./views/VFarmacia/VEditar.vue";
import listar_diagnostico from "./views/VDiagnostico/VListar.vue";
import editar_diagnostico from "./views/VDiagnostico/VEditar.vue";
import agregar_prescripcion from "./views/VPrescripcion/VAgregar.vue";
import consultar_historial_prescripcion from "./views/VPrescripcion/VConsultar_Documento.vue";
import consultar_historial_prescripcion_fecha from "./views/VPrescripcion/VConsultar_Fecha.vue";
import list_info_prescripcion from "./views/VNumeracion/VListar.vue";
import medicamentos_entrega from "./views/VPendiente/VListar.vue";



Vue.use(VueRouter)

const router = new VueRouter({
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
      path: "/edi_per",
      name: "edi_per",
      component: editar_perfil,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: "/agr_usu",
      name: "agr_usu",
      component: agregar_usuario,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: "/lis_usu",
      name: "lis_usu",
      component: listar_usuario,
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
      component: editar_medicamento,
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
      component: editar_farmacia,
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
      component: editar_diagnostico,
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
    },
    {
      path: "/his_pre_usu",
      name: "his_pre_usu",
      component: consultar_historial_prescripcion,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: "/con_pre_per_fecha",
      name: "con_pre_per_fecha",
      component: consultar_historial_prescripcion_fecha,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: "/lis_num",
      name: "lis_num",
      component: list_info_prescripcion,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: "/med_ent",
      name: "med_ent",
      component: medicamentos_entrega,
      meta: {

        requiresAuth: true
      }
    },
    {
      path: "/edi_usu",
      name: "edi_usu",
      component: editar_usuario,
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