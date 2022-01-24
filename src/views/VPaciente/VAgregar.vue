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

    <form @submit.prevent="agregar">
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

              <select :class="$style.input_txt" v-model="selec" required>
                <option selected disabled value="null">
                  [Seleccione]
                </option>
                <option>Cédula de Ciudadanía</option>
                <option>Tarjeta de Identidad</option>
                <option>Cédula de Extranjeria</option>
                <option>PEP</option>
              </select>
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
              <select :class="$style.input_txt" v-model="selec_sexo" required>
                <option selected disabled value="null">
                  [Seleccione]
                </option>
                <option>Masculino</option>
                <option>Femenino</option>
              </select>
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
              <select
                :class="$style.input_txt"
                v-model="selec_regimen"
                required
              >
                <option selected disabled value="null">
                  [Seleccione]
                </option>
                <option>Contributivo</option>
                <option>Subsidiado</option>
                <option>Particular</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label>Departamento</label><br />
              <!--select
                :class="$style.input_txt"
                v-model="selec_departamento"
                required
              
              >
                <option selected disabled value="null">
                  [Seleccione Opcion]
                </option>
                <option v-for="d in depa" :key="d.key" :value="d">
                  {{ d.depNombre }}
                </option>
              </select-->
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
              <!--select
                :class="$style.input_txt"
                v-model="selec_municipio"
                required
              >
                <option selected disabled value="null">
                  [Seleccione Opcion]
                </option>
                <option v-for="m in muni" :key="m.key" :value="m">
                  {{ m.munNombre }}
                </option>
              </select-->
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
            Registrar
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
      titulo: "AGREGAR PACIENTE",
      selec: null,
      selec_sexo: null,
      selec_regimen: null,
      //selec_departamento: null,
      //depa: [],
      //muni: [],
      pac: {}
      //selec_municipio: null,
    };
  },

  methods: {
    agregar() {
      db.collection("paciente")
        .add({
          perNombre: this.pac.perNombre,
          perApellido: this.pac.perApellido,
          perTipDocumento: this.selec,
          perDocumento: this.pac.perDocumento,
          perFecNacimiento: this.pac.perFecNacimiento,
          perTelefono: this.pac.perTelefono,
          perCorreo: this.pac.perCorreo,
          perDepartamento: this.pac.perDepartamento,
          /*perDepartamento: this.selec_departamento,
          perMunicipio: this.selec_municipio,*/
          perMunicipio: this.pac.perMunicipio,
          perSexo: this.selec_sexo,
          perRegimen: this.selec_regimen,
          perEntidad: "IPS NUEVA POPAYAN"
        })
        .then(() => {
          alert("Paciente creado correctamente!");
          (this.pac.perNombre = ""),
            (this.pac.perApellido = ""),
            (this.selec = "null"),
            (this.selec_sexo = "null"),
            (this.selec_regimen = "null"),
            (this.pac.perDocumento = ""),
            /*(this.selec_departamento = "null"),
            (this.selec_municipio = "null"),*/
            (this.pac.perFecNacimiento = ""),
            (this.pac.perTelefono = ""),
            (this.pac.perCorreo = "");
            (this.pac.perDepartamento = ""),
            (this.pac.perMunicipio = "");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  /*created() {
    db.collection("departamento").onSnapshot(snapshotChange => {
      this.depa = [];
      snapshotChange.forEach(doc => {
        this.depa.push({
          key: doc.id,
          depNombre: doc.data().depNombre
        });
      });
    });
    db.collection("municipio")
    .where("departamento", "==", 'jHPfBP6j9y76k8gr490w')
    .onSnapshot(snapshotChange => {
      this.muni = [];
      snapshotChange.forEach(doc => {
        this.muni.push({
          key: doc.id,
          munNombre: doc.data().munNombre
        });
      });
    });
  }*/
};
</script>
