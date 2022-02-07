
<style module>
.input_txt {
  border: 1px solid #848484;
  padding: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 5px;
  color: #0b2f3a;
  max-width: 558px;
  min-width: 158px;
  text-transform: uppercase;
}

.form {
  font-family: Arial;
  font-size: 9pt;
  background-color: #e0ebeb;
  color: #008585;
  border: 1px solid #e0ebeb;
}
</style>

<template>
  <div class="container" :class="$style.form">
    <h4>
      {{ titulo }}
    </h4>
    <hr />

    <form @submit.prevent="onUpdateForm">
      <table>
        <tbody>
          <tr>
            <td>
              <label>Nombre: </label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Nombre"
                v-model="user.perNombre"
              />
            </td>
            <td>
              <label>Apellido: </label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Apellido"
                v-model="user.perApellido"
              />
            </td>
            <td>
              <label>Tipo de Documento:</label><br />
              <div v-if="user.perTipDocumento == 'Cédula de Ciudadanía'">
                <select
                  :class="$style.input_txt"
                  v-model="user.perTipDocumento"
                  required
                >
                  <option value="Cédula de Ciudadanía" selected
                    >Cédula de Ciudadanía</option
                  >
                  <option>Tarjeta de Identidad</option>
                  <option>Cédula de Extranjeria</option>
                  <option>PEP</option>
                </select>
              </div>
              <div v-else-if="user.perTipDocumento == 'Tarjeta de Identidad'">
                <select
                  :class="$style.input_txt"
                  v-model="user.perTipDocumento"
                  required
                >
                  <option>Cédula de Ciudadanía</option>
                  <option value="Tarjeta de Identidad" selected
                    >Tarjeta de Identidad</option
                  >
                  <option>Cédula de Extranjeria</option>
                  <option>PEP</option>
                </select>
              </div>
              <div v-else-if="user.perTipDocumento == 'Cédula de Extranjeria'">
                <select
                  :class="$style.input_txt"
                  v-model="user.perTipDocumento"
                  required
                >
                  <option>Cédula de Ciudadanía</option>
                  <option>Tarjeta de Identidad</option>
                  <option value="Cédula de Extranjeria" selected
                    >Cédula de Extranjeria</option
                  >
                  <option>PEP</option>
                </select>
              </div>
              <div v-else>
                <select
                  :class="$style.input_txt"
                  v-model="user.perTipDocumento"
                  required
                >
                  <option>Cédula de Ciudadanía</option>
                  <option>Tarjeta de Identidad</option>
                  <option>Cédula de Extranjeria</option>
                  <option value="PEP" selected>PEP</option>
                </select>
              </div>
            </td>
            <td>
              <label>Documento: </label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Documento"
                v-model="user.perDocumento"
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Fecha Nacimiento: </label><br />
              <input
                type="date"
                required
                :class="$style.input_txt"
                placeholder="Digite Fecha Nacimiento"
                v-model="user.perFecNacimiento"
              />
            </td>
            <td>
              <label>Teléfono: </label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Teléfono"
                v-model="user.perTelefono"
              />
            </td>
            <td>
              <label>Departamento: </label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Departamento"
                v-model="user.perDepartamento"
              />
            </td>
            <td>
              <label>Municipio: </label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Municipio"
                v-model="user.perMunicipio"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div class="form-row">
        <div class="form-group col-md-2">
          <button
            class="btn btn-primary btn-block"
            style="background-color: #7752CA;"
            id="button"
          >
            Actualizar
          </button>
        </div>

        <div class="form-group col-md-2">
          <router-link class="btn btn-danger btn-block" to="/lis_usu"
            >Regresar</router-link
          >
        </div>
      </div>
    </form>
<template>
  <div class="row justify-content-center">
    <div class="col-md-5">
      <h3 class="text-center">Actualizar usuario</h3>
      <form @submit.prevent="onUpdateForm">
        <div class="form-group">
          <label>Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="user.usu_nombre"
            required
          />
        </div>

        <div class="form-group">
          <label>Login</label>
          <input
            type="text"
            class="form-control"
            v-model="user.usu_login"
            required
          />
        </div>

        <div class="form-group">
          <label>Contraseña</label>
          <input
            type="text"
            class="form-control"
            v-model="user.usu_pwd"
            required
          />
        </div>

        <div class="form-group">
          <label>Rol</label>
          <input
            type="text"
            class="form-control"
            v-model="user.usu_rol"
            required
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block">Actalizar Usuario</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {

      titulo: "ACTUALIZAR USUARIO",
      user: {}
    };
  },
  created() {
    let dbRef = db.collection("persona").doc(this.$route.params.id);
    dbRef
      .get()
      .then(doc => {
        this.user = doc.data();
      })
      .catch(error => {

      user: {},
    };
  },
  created() {
    let dbRef = db.collection("usuario").doc(this.$route.params.id);
    dbRef
      .get()
      .then((doc) => {
        this.user = doc.data();
      })
      .catch((error) => {

        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();

      db.collection("persona")

      db.collection("usuario")

        .doc(this.$route.params.id)
        .update(this.user)
        .then(() => {
          console.log("Usuario actualizado con éxito!");

          this.$router.push("/lis_usu");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

          this.$router.push("/listar");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

