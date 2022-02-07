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
              <label>Nombre:</label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Nombre"
                v-model="pac.perNombre"
              />
            </td>
            <td>
              <label>Apellido:</label><br />

              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Apellido"
                v-model="pac.perApellido"
              />
            </td>
            <td>
              <label>Tipo de Documento:</label><br />

              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Docmento"
                v-model="pac.perTipDocumento"
              />
            </td>
            <td>
              <label>Documento:</label><br />

              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Documento"
                v-model="pac.perDocumento"
              />
            </td>
            <td>
              <label>Sexo:</label><br />
              <div v-if="pac.perSexo == 'Masculino'">
                <select
                  :class="$style.input_txt"
                  v-model="pac.perSexo"
                  required
                >
                  <option value="Masculino" selected>Masculino</option>
                  <option>Femenino</option>
                </select>
              </div>
              <div v-else>
                <select
                  :class="$style.input_txt"
                  v-model="pac.perSexo"
                  required
                >
                  <option>Masculino</option>
                  <option value="Femenino" selected>Femenino</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label>Fecha Nacimiento</label><br />
              <input
                type="date"
                required
                :class="$style.input_txt"
                placeholder="Digite Fecha Nacimiento"
                v-model="pac.perFecNacimiento"
              />
            </td>
            <td>
              <label>Teléfono</label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Teléfono"
                v-model="pac.perTelefono"
              />
            </td>
            <td>
              <label>Correo Eléctronico</label><br />
              <input
                type="email"
                required
                :class="$style.input_txt"
                placeholder="Digite Correo"
                v-model="pac.perCorreo"
              />
            </td>
            <td>
              <label>Regimen:</label><br />
              <div v-if="pac.perRegimen == 'Contributivo'">
                <select
                  :class="$style.input_txt"
                  v-model="pac.perRegimen"
                  required
                >
                  <option value="Contributivo" selected>Contributivo</option>
                  <option>Subsidiado</option>
                  <option>Particular</option>
                </select>
              </div>
              <div v-else-if="pac.perRegimen == 'Subsidiado'">
                <select
                  :class="$style.input_txt"
                  v-model="pac.perRegimen"
                  required
                >
                  <option>Contributivo</option>
                  <option value="Subsidiado" selected>Subsidiado</option>
                  <option>Particular</option>
                </select>
              </div>
              <div v-else-if="pac.perRegimen == 'Particular'">
                <select
                  :class="$style.input_txt"
                  v-model="pac.perRegimen"
                  required
                >
                  <option>Contributivo</option>
                  <option>Subsidiado</option>
                  <option value="Particular" selected>Particular</option>
                </select>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <label>Eps</label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Eps"
                v-model="pac.perEps"
              />
            </td>
            <td>
              <label>Departamento</label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Departamento"
                v-model="pac.perDepartamento"
              />
            </td>
            <td>
              <label>Municipio</label><br />
              <input
                type="text"
                required
                :class="$style.input_txt"
                placeholder="Digite Municipio"
                v-model="pac.perMunicipio"
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
          >
            actualizar
          </button>
        </div>

        <div class="form-group col-md-2">
          <router-link class="btn btn-danger btn-block" to="/lis_pac"
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
      titulo: "EDITAR PACIENTE",
      pac: {}
    };
  },
  created() {
    let dbRef = db.collection("paciente").doc(this.$route.params.id);
    dbRef
      .get()
      .then(doc => {
        this.pac = doc.data();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    onUpdateForm(event) {
      event.preventDefault();
      db.collection("paciente")
        .doc(this.$route.params.id)
        .update(this.pac)
        .then(() => {
          console.log("Paciente actualizado con éxito!");
          this.$router.push("/lis_pac");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
