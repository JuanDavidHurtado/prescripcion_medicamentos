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
      <input type="text" v-model="key" hidden />
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
          </tr>
          <tr>
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
          <router-link class="btn btn-danger btn-block" to="/home"
            >Regresar</router-link
          >
        </div>
      </div>
    </form>

  <div class="container">
    <h4>{{ titulo }}</h4>
    <hr />

  </div>
</template>

<script>

import { db } from "../../firebaseDb";

export default {
  data() {
    //this.perNombre = '';

    return {
      titulo: "ACTUALIZAR MI PERFIL",
      user: {},
      key: {}
    };
  },

  created() {
    db.collection("persona")
      .where("idUsuario", "==", this.$route.params.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(this.$route.params.id);
          this.key = doc.id;
          this.user = doc.data();
        });
      })
      .catch(error => {
        console.log("Error al obtener documentos: ", error);
      });
  },

  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("persona")
        .doc(this.key)
        .update(this.user)
        .then(() => {
          alert("Usuario actualizado con éxito!");
          this.$router.push("/home");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

export default {
  data() {
    return {
      titulo: "EDITAR MI PERFIL",
    };
  },
};
</script>

