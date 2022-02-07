<template>
  <div class="container">
    <div class="row">
      <div class="col-6" style="padding: 5% 0 0">
        <!--h4 style="color: #7752CA;">
          Prescripción de Medicamentos de Control Especial
        </h4><hr style="background-color: #7752CA;"-->
        <br><img :src="image"/>
        <!--em style="color: #7752CA;">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste
          quae cupiditate autem? Quis perspiciatis dolorem a quod laudantium
          animi ea maxime quos mollitia, praesentium minus doloribus asperiores
          libero veritatis! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Facilis veritatis voluptates quis laboriosam dolore asperiores
          illum error dicta repellendus necessitatibus cupiditate inventore, aut
          dolorum aliquam beatae assumenda minima quibusdam et. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Quidem hic ex quasi
          vitae quisquam harum amet modi voluptates officia iure, mollitia
          repellat itaque eius culpa, voluptatem, quo aut sit repellendus! Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Aut dolorum
          deserunt tempore nemo saepe sint voluptatibus necessitatibus eius
          molestias magnam, reprehenderit, sapiente quis voluptatem dignissimos?
          Sit culpa provident molestiae veritatis.
        </em-->
      </div>
      <div class="col-1"></div>
      <div class="col-5">
        <div
          style="padding: 20% 0 0; margin: 0 auto 100px; max-width: 400px"
          class="row text-center"
        >
          <div class="alert alert-danger" role="alert" v-if="error">
            {{ error }}
          </div>
          <div
            style="box-shadow: 0 0 15px 0 rgba(84, 84, 84, 0.62)"
            class="col-md-12"
          >
            <form @submit.prevent="login">
              <div class="row">
                <div style="padding-top: 16px" class="col-md-12">
                  <!--<img src="../../assets/logo-login.png"/-->
                  <p style="font-size: 14px; font-weight: bold">
                    <span style="color: #7752CA;">Sistema de Información para la Prescripción de Medicamentos de Control Especial</span>
                  </p>
                  <b>
                    INICIO DE SESIÓN
                  </b>
                </div>
              </div>
              <br />

              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Correo Eléctronico"
                  v-model="email"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    ><font-awesome-icon icon="envelope"
                  /></span>
                </div>
              </div>

              <div class="input-group mb-3">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Contraseña"
                  v-model="password"
                />
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    ><font-awesome-icon icon="lock"
                  /></span>
                </div>
              </div>

              <div class="row">
                <div
                  class="col-md-12"
                  style="padding-top: 16px; padding-bottom: 16px"
                >
                  <button
                    class="btn btn-primary btn-block"
                    style="background-color: #7752CA;"
                  >
                    Ingresar
                  </button>
                  <button
                    type="button"
                    class="btn btn-link"
                    @click="resetPassword"
                  >
                    Recuperar contraseña
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import image from "../../assets/mce.png"

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      image: image
    };
  },
  name: "login",

  methods: {
    resetPassword () { 
      this.error = "";

      if (this.email != "") {
        firebase
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(() => {
            this.error = "EXITO. Se envió un correo de restablecimiento de contraseña.";
          })
          .catch((error) => {
            this.error = error.message;
          });
      } else {
        this.error = "Necesita email para restablecer contraseña!";
      }
    },
    login() {
      this.error = "";

      if (this.email && this.password) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(user => {
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            this.error = err.message;
            if (err.code == 'auth/user-not-found'){

              this.email = "";
              this.error = "Correo electronico incorrecto. por favor vuelva a intentar.";

            }else if (err.code == 'auth/wrong-password') {
              this.password = "";
              this.error = "Contraseña no coincide con este usuario. Reintente o recupere su contraseña.";
            }
          });
      } else {
        this.error = "Todos los campos son requeridos";
      }
    }
  }
};
</script>
