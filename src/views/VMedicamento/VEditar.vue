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
    <h4>{{ titulo }}</h4>
    <hr />

    <form @submit.prevent="onUpdateForm">
      <table>
        <tbody>
          <tr>
            <td>
              <label>Código</label><br />
              <input
                type="text"
                :class="$style.input_txt"
                v-model="med.medCodigo"
                required
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Nombre:</label><br />
              <input
                type="text"
                :class="$style.input_txt"
                v-model="med.medNombre"
                required
              />
            </td>
            <td>
              <label>Concentración:</label><br />

              <input
                type="text"
                :class="$style.input_txt"
                v-model="med.medConcentracion"
                required
              />
            </td>
            <td>
              <label>Presentación</label><br />

              <input
                type="text"
                :class="$style.input_txt"
                v-model="med.medPresentacion"
                required
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />

      <div class="form-row">
        <div class="form-group col-md-2">
          <button class="btn btn-primary btn-block" style="background-color: #7752CA;">
            Actalizar
          </button>
        </div>

        <div class="form-group col-md-2">
          <router-link class="btn btn-danger btn-block" to="/lis_med"
            >Regresar</router-link
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {
      titulo: "ACTUALIZAR MEDICAMENTO",
      med: {}
    };
  },
  created() {
    let dbRef = db.collection("medicamento").doc(this.$route.params.id);
    dbRef
      .get()
      .then(doc => {
        this.med = doc.data();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("medicamento")
        .doc(this.$route.params.id)
        .update(this.med)
        .then(() => {
          console.log("Medicamento actualizado con éxito!");
          this.$router.push("/lis_med");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
