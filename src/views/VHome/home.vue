<template>
  <div class="home">
    <div class="alert alert-primary" role="alert">
      <strong>Bienvenido usuario</strong>
    </div>
    <br />
    <div v-if="rol_usuario.tipoRol == 'administrador'">
      <div class="form-row">
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/lis_usu"
            ><font-awesome-icon
              icon="users"
              style="color:black; font-size:65px;"
            /><br />
            Lista usuario</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/lis_pac"
            ><font-awesome-icon
              icon="head-side-mask"
              style="color:black; font-size:65px;"
            /><br />
            Lista paciente</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/lis_far"
            ><font-awesome-icon
              icon="briefcase-medical"
              style="color:black; font-size:65px;"
            /><br />
            Lista Farmacia</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/lis_med"
            ><font-awesome-icon
              icon="capsules"
              style="color:black; font-size:65px;"
            /><br />
            Lista medicamento</router-link
          >
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/lis_dia"
            ><font-awesome-icon
              icon="hand-holding-medical"
              style="color:black; font-size:65px;"
            /><br />
            Lista diagnostico</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            :to="{ name: 'edi_per', params: { id: user.uid } }"
            ><font-awesome-icon
              icon="user-circle"
              style="color:black; font-size:65px;"
            /><br />
            Mi perfil</router-link
          >
        </div>
      </div>
    </div>
    <div v-if="rol_usuario.tipoRol == 'medico'">
      <div class="form-row">
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/his_pre_usu"
            ><font-awesome-icon
              icon="search"
              style="color:black; font-size:65px;"
            /><br />
            Consultar prescripcion</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: white; border: 1px solid #d0d0d0;
        height:120px;"
            to="/agr_pre"
          >
            <img
              :src="image"
              style="max-width: 100%;
 max-height: 70%;"
            />
            <br />
            Realizar prescripcion</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            :to="{ name: 'edi_per', params: { id: user.uid } }"
            ><font-awesome-icon
              icon="user-circle"
              style="color:black; font-size:65px;"
            /><br />
            Mi perfil</router-link
          >
        </div>
      </div>
    </div>
    <div v-if="rol_usuario.tipoRol == 'auditor'">
      <div class="form-row">
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/con_pre_per_fecha"
            ><font-awesome-icon
              icon="search"
              style="color:black; font-size:65px;"
            /><br />
            Consultar prescripcion</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            :to="{ name: 'edi_per', params: { id: user.uid } }"
            ><font-awesome-icon
              icon="user-circle"
              style="color:black; font-size:65px;"
            /><br />
            Mi perfil</router-link
          >
        </div>
      </div>
    </div>
    <div v-if="rol_usuario.tipoRol == 'farmacia'">
      <div class="form-row">
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            to="/med_ent"
            ><font-awesome-icon
              icon="handshake"
              style="color:black; font-size:65px;"
            /><br />
            Pendientes de entrega</router-link
          >
        </div>
        <div class="form-group col-md-3">
          <router-link
            class="btn"
            style="width:260px; background-color: #e0ebeb;
        height:120px;"
            :to="{ name: 'edi_per', params: { id: user.uid } }"
            ><font-awesome-icon
              icon="user-circle"
              style="color:black; font-size:65px;"
            /><br />
            Mi perfil</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../../firebaseDb";
import image from "../../assets/mce.png";

export default {
  data() {
    return {
      user: {},
      rol_usuario: {},
      image: image
    };
  },

  created() {
    firebase.auth().onAuthStateChanged(user => {
      //console.log("usuario:");
      if (user) {
        this.user = user;
        let dbRef = db.collection("persona").where("idUsuario", "==", user.uid);
        dbRef.get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.rol_usuario = doc.data();
            //console.log(this.rol_usuario.tipoRol);
          });
        });
      } else {
        this.user = null;
        console.log("Sin Usuario");
      }
    });
  }
};
</script>
