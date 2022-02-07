<style module>
.img{
height: 100%;
width: 80%;
object-fit: contain;
}
</style>


<template>
  <div v-if="user">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e0ebeb;">
      <router-link class="nav-link pr-3" to="/home" style="color: #FAF9FC;"
        ><img :src="image" :class="$style.img"/></router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <div v-if="rol_usuario.tipoRol == 'administrador'">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style="color: black;"
              >
                Usuarios
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item"
                  ><router-link class="nav-link pr-3" to="/lis_pac"
                    >Paciente</router-link
                  ></a
                >
                <div class="dropdown-divider"></div>
                <a class="dropdown-item"
                  ><router-link class="nav-link" to="/lis_usu" 
                    >Usuario</router-link
                  ></a
                >
              </div>
            </li>
          </div>
          <div v-if="rol_usuario.tipoRol == 'administrador'">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style="color: black;"
              >
                Configración
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item"
                  ><router-link class="nav-link" to="/lis_far"
                    >Farmacia</router-link
                  ></a
                >

                <div class="dropdown-divider"></div>

                <a class="dropdown-item"
                  ><router-link class="nav-link pr-3" to="/lis_med"
                    >Medicamento</router-link
                  ></a
                >

                <div class="dropdown-divider"></div>

                <a class="dropdown-item"
                  ><router-link class="nav-link pr-3" to="/lis_dia"
                    >Diagnostico</router-link
                  ></a
                >

                <div class="dropdown-divider"></div>

                <a class="dropdown-item"
                  ><router-link class="nav-link pr-3" to="/lis_num"
                    >Info. Numeración</router-link
                  ></a
                >
              </div>
            </li>
          </div>
          <div v-if="rol_usuario.tipoRol == 'medico'">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style="color: black;"
              >
                Admin. Prescripción
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item"
                  ><router-link class="nav-link" to="/agr_pre"
                    >Prescripción</router-link
                  ></a
                >

                <div class="dropdown-divider"></div>

                <a class="dropdown-item"
                  ><router-link class="nav-link pr-3" to="/his_pre_usu"
                    >Consultar Usuario</router-link
                  ></a
                >
              </div>
            </li>
          </div>

          <div v-if="rol_usuario.tipoRol == 'farmacia'">
            <li class="nav-item">
              <router-link class="nav-link pr-3" style="color: black;" to="/med_ent"
                >Pendiente</router-link
              >
            </li>
          </div>
          <div v-if="rol_usuario.tipoRol == 'auditor'">
            <li class="nav-item">
              <router-link class="nav-link pr-3" style="color: black;" to="/con_pre_per_fecha"
                >Consultar</router-link
              >
            </li>
          </div>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="color: black;"
            >
              <font-awesome-icon icon="user" /> usuario: {{ user.email }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" 
                :to="{ name: 'edi_per', params: { id: user.uid } }"
                ><font-awesome-icon icon="user" /> Mi Perfil
              </router-link>
              <a class="dropdown-item" @click.prevent="changePassword">Cambiar contraseña</a>
              <a class="dropdown-item" @click.prevent="logout">Cerrar Sesión</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from "firebase";
import { db } from "../../firebaseDb";
import image from "../../assets/LogoIPS1.png"

export default {
  data() {
    return {
      user: {},
      rol_usuario: {},
      image: image
    };
  },
  methods: {
    changePassword () { 
      firebase.auth().onAuthStateChanged((user) => {
        if (user.email) {
          firebase
            .auth()
            .sendPasswordResetEmail(user.email)
            .then(() => {
              alert('Se envió un correo para restablecer la contraseña. Revise la bandeja de entrada de ' 
              + user.email);
            })
            .catch((error) => {
              console.log('Restablecimiento de contraseña error.' + error.message);
            });
        } else {
          console.log('Restablecimiento de contraseña error.');
        }
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        });
    },
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      //console.log("usuario:");
      if (user) {
        this.user = user;
        let dbRef = db.collection("persona").where("idUsuario", "==", user.uid);
        dbRef.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.rol_usuario = doc.data();
            //console.log(this.rol_usuario.tipoRol);
          });
        });
      } else {
        this.user = null;
        console.log("Sin Usuario");
      }
    });
  },
};
</script>

