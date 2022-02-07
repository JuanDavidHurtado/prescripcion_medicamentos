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
.th {
  font-size: small;
}
</style>

<template>
  <div class="container">
    <h6 v-if="contadorPrescripciones == 0">
      <div class="alert alert-danger" role="alert">
        No hay prescripciones disponibles para uso.
      </div>
      <br />
    </h6>

    <!----------------- wizard -------------------------->
    <div v-if="contadorPrescripciones > 0">
      <form>
        <input type="text" class="form-control" hidden v-model="user.uid" />

        <form-wizard
          @on-complete="onComplete"
          back-button-text="Volver"
          next-button-text="Siguiente"
          finish-button-text="Terminar"
          title="RECETARIO OFICIAL"
          subtitle="PARA MEDICAMENTOS DE CONTROL ESPECIAL"
          color="#7752CA"
        >
          <tab-content title="DATOS DEL PACIENTE">
            <div class="form-row">
              <div class="form-group col-md-5">
                <label>Paciente:</label>
                <select
                  class="form-control"
                  v-model="selec"
                  required
                  @change="onChange(selec)"
                >
                  <option selected disabled value="null">
                    ---Seleccione Opcion---
                  </option>
                  <option v-for="p in paciente" :key="p.key" :value="p">
                    {{ p.perNombre + " " + p.perApellido }}
                  </option>
                </select>
              </div>
              <div
                v-if="this.variableGlobal == true"
                class="form-group col-md-12"
              >
                <table class="table table-sm table-bordered">
                  <thead :class="$style.form">
                    <tr>
                      <th>Regimen</th>
                      <th>Nombres</th>
                      <th>Tipo Documento</th>
                      <th>Documento</th>
                      <th>Fecha Nacimiento</th>
                      <th>Teléfono</th>
                      <th>Departamento</th>
                      <th>Municipio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <em>{{ selec.perRegimen }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perNombre + " " + selec.perApellido }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perTipDocumento }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perDocumento }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perFecNacimiento }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perTelefono }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perDepartamento }}</em>
                      </td>
                      <td>
                        <em>{{ selec.perMunicipio }}</em>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </tab-content>
          <tab-content title="DATOS DE LOS MEDICAMENTOS">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Medicamento:</label>

                <select
                  class="form-control"
                  v-model="selec1"
                  required
                  @change="onChange1(selec1)"
                >
                  <option selected disabled value="null">
                    ---Seleccione Opcion---
                  </option>
                  <option v-for="m in medica" :key="m.key" :value="m">
                    {{ m.medNombre + " " + m.medConcentracion }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label>Cantidad Prescripta: </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite Tratamiento"
                  v-model="pre.preDiaTratamiento"
                  required
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label>Dosis: </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite Dosis"
                  v-model="pre.preDosis"
                  required
                />
              </div>
              <div class="form-group col-md-8">
                <label>Diagnostico:</label>
                <select
                  class="form-control"
                  v-model="selec2"
                  required
                  @change="onChange2(selec2)"
                >
                  <option selected disabled value="null">
                    ---Seleccione Opcion---
                  </option>
                  <option v-for="d in diagnos" :key="d.key" :value="d">
                    {{ d.diaCodigo + " " + d.diaNombre }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Advertencia: </label>
              <textarea
                required
                v-model="pre.preAdvertencia"
                type="text"
                class="form-control"
                placeholder="Descripción Advertencia"
                rows="3"
              ></textarea>
            </div>
          </tab-content>
          <tab-content title="VERIFICACIÓN">
            <div v-if="this.variableGlobal == true">
              <div :class="$style.form">
                <h5><strong>1. DATOS DEL PACIENTE</strong></h5>
              </div>
              <br />
              <div class="form-row" :class="$style.form">
                <div class="form-group col-md-3">
                  <label>Documento: </label>
                  <em>
                    {{ selec.perDocumento }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Nombre: </label>
                  <em> {{ selec.perNombre }}</em>
                </div>
                <div class="form-group col-md-3">
                  <label>Apellido: </label>
                  <em> {{ selec.perApellido }}</em>
                </div>
                <div class="form-group col-md-3">
                  <label>Fecha Nacimiento: </label>
                  <em> {{ selec.perFecNacimiento }}</em>
                </div>
                <div class="form-group col-md-3">
                  <label>Genero: </label>
                  <em> {{ selec.perSexo }}</em>
                </div>
                <div class="form-group col-md-3">
                  <label>Telefono: </label>
                  <em>
                    {{ selec.perTelefono }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Departamento: </label>
                  <em> {{ selec.perSexo }}</em>
                </div>
                <div class="form-group col-md-3">
                  <label>Municipio: </label>
                  <em>
                    {{ selec.perTelefono }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Regimen: </label>
                  <em>
                    {{ selec.perRegimen }}
                  </em>
                </div>
              </div>
            </div>
            <br />
            <div v-if="this.variableGlobal1 == true">
              <div :class="$style.form">
                <h5><strong>2. DATOS DE LOS MEDICAMENTOS</strong></h5>
              </div>
              <br />
              <div class="form-row" :class="$style.form">
                <div class="form-group col-md-3">
                  <label>Nombre: </label>
                  <em>
                    {{ selec1.medNombre }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Concentración: </label>
                  <em>
                    {{ selec1.medConcentracion }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Forma Farmaceutica: </label>
                  <em>
                    {{ selec1.medPresentacion }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Dosis/Via de Administración: </label>
                  <em>
                    {{ pre.preDosis }}
                  </em>
                </div>
                <div class="form-group col-md-12">
                  <label>Advertencia: </label>
                  <em>
                    {{ pre.preAdvertencia }}
                  </em>
                </div>
              </div>
            </div>

            <div v-if="this.variableGlobal2 == true">
              <div class="form-row" :class="$style.form">
                <div class="form-group col-md-4">
                  <label>Codigo: </label>
                  <em>
                    {{ selec2.diaCodigo }}
                  </em>
                </div>
                <div class="form-group col-md-8">
                  <label>Diagnostico: </label>
                  <em>
                    {{ selec2.diaNombre }}
                  </em>
                </div>
              </div>
            </div>
            <br />
            <div
              v-if="
                this.variableGlobal == true &&
                  this.variableGlobal1 == true &&
                  this.variableGlobal2 == true
              "
            >
              <div :class="$style.form">
                <h5><strong>3. DATOS DEL PROFESIONAL</strong></h5>
              </div>
              <br />
              <div class="form-row" :class="$style.form">
                <div class="form-group col-md-3">
                  <label>Documento: </label>
                  <em>
                    {{ this.medico.perDocumento }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Nombre: </label>
                  <em>
                    {{ this.medico.perNombre }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Apellido: </label>
                  <em>
                    {{ this.medico.perApellido }}
                  </em>
                </div>
              </div>
              <div class="form-row" :class="$style.form">
                <div class="form-group col-md-3">
                  <label>Especialidad: </label>
                  <em>
                    {{ this.medico.idEspecialidad.espNombre }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Registro Profesional: </label>
                  <em>
                    {{ this.medico.perRegProfesional }}
                  </em>
                </div>
                <div class="form-group col-md-3">
                  <label>Telefono: </label>
                  <em>
                    {{ this.medico.perTelefono }}
                  </em>
                </div>
              </div>
            </div>
          </tab-content>
        </form-wizard>
      </form>
    </div>
    <!----------------- fin wizard -------------------------->
    <div v-if="contadorPrescripciones == 0">
      <div class="form-group col-md-2">
        <router-link class="btn btn-danger btn-block" to="/home"
          >Regresar</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";
import firebase from "firebase";

import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

export default {
  data() {
    this.contadorPrescripciones = 0;

    db.collection("numeracion")
      .where("numEstado", "==", "activo")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          //  console.log(doc.data().numContador);
          this.contadorPrescripciones = doc.data().numContador;
        });
      })
      .catch(error => {
        console.log("Error al obtener documentos: ", error);
      });

    return {
      titulo: "DILIGENCIAR PRESCRIPCION",
      selec: null,
      selec1: null,
      selec2: null,
      user: {},
      medica: [],
      diagnos: [],
      paciente: [],
      pre: {},
      nume: [],
      medico: {},
      contadorPrescripciones: this.contadorPrescripciones,
      variableGlobal: false,
      variableGlobal1: false,
      variableGlobal2: false
    };
  },

  components: {
    FormWizard,
    TabContent
  },
  methods: {
    onChange(valor) {
      if (valor == "null") {
        this.variableGlobal = false;
      } else {
        this.variableGlobal = true;
      }
    },
    onChange1(valor) {
      if (valor == "null") {
        this.variableGlobal1 = false;
      } else {
        this.variableGlobal1 = true;
      }
    },
    onChange2(valor) {
      if (valor == "null") {
        this.variableGlobal2 = false;
      } else {
        this.variableGlobal2 = true;
      }
    },

    onComplete() {
      if (
        !this.selec ||
        !this.selec1 ||
        !this.selec2 ||
        !this.pre.preDiaTratamiento ||
        !this.pre.preAdvertencia ||
        !this.pre.preDosis
      ) {
        alert("Por favor no deje campos vacios");
      } else {
        if (this.contadorPrescripciones == 0) {
          alert("No hay mas prescripciones disponibles.");
          return;
        }

        //se quito signo mayor y se igualo

        if (this.contadorPrescripciones == this.nume[0].numFinal) {
          alert(
            "Ya se gastaron las prescripciones disponibles. Se han realizado: " +
              this.contadorPrescripciones +
              " de " +
              this.nume[0].numFinal +
              "."
          );
          return;
        }

        let date = new Date();
        let day = `${date.getDate()}`.padStart(2, "0");
        let month = `${date.getMonth() + 1}`.padStart(2, "0");
        let year = date.getFullYear();

        var fecha_hoy = `${year}-${month}-${day}`;

        //console.log(fecha_hoy);

        const numCont1 = ++this.nume[0].numContador;
        db.collection("prescripcion").add({
          usuMedico: this.medico,
          usuPaciente: this.selec,
          idMedicamento: this.selec1,
          idDiagnostico: this.selec2,
          preDosis: this.pre.preDosis,
          preFecha: fecha_hoy,
          preDiaTratamiento: this.pre.preDiaTratamiento,
          preAdvertencia: this.pre.preAdvertencia,
          idNumeracion: this.nume[0],
          preEstado: "PENDIENTE",
          preContador: numCont1
        });
        if (this.nume[0].numFinal == this.nume[0].numContador) {
          var estado = "inactivo";
          db.collection("numeracion")
            .doc(this.nume[0].key)
            .update({ numEstado: estado });
        }

        const numCont = numCont1; //this.nume[0].numContador
        db.collection("numeracion")
          .doc(this.nume[0].key)
          .update({ numContador: numCont })

          .then(() => {
            alert("Excelente formato de prescripcion creado correctamente!");
            (this.selec = ""),
              (this.selec1 = ""),
              (this.selec2 = ""),
              (this.pre.preDosis = ""),
              (this.pre.preDiaTratamiento = ""),
              (this.pre.preAdvertencia = ""),
              this.$router.replace("/home");
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        db.collection("persona")
          .where("idUsuario", "==", this.user.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              console.log(this.medico);
              this.medico = doc.data();
            });
          })
          .catch(error => {
            console.log("Error al obtener documentos: ", error);
          });
      } else {
        this.user = null;
      }
    });

    db.collection("numeracion")
      .where("numEstado", "==", "activo")
      .get()
      .then(querySnapshot => {
        this.nume = [];
        querySnapshot.forEach(doc => {
          this.nume.push({
            key: doc.id,
            numInicial: doc.data().numInicial,
            numFinal: doc.data().numFinal,
            numYear: doc.data().numYear,
            numEstado: doc.data().numEstado,
            numContador: doc.data().numContador
          });
        });
      })
      .catch(error => {
        console.log("Error al obtener documentos: ", error);
      });

    db.collection("paciente")
      //.where("tipoRol", "==", "paciente")
      .onSnapshot(snapshotChange => {
        this.paciente = [];
        snapshotChange.forEach(doc => {
          this.paciente.push({
            key: doc.id,
            perNombre: doc.data().perNombre,
            perApellido: doc.data().perApellido,
            perDocumento: doc.data().perDocumento,
            perFecNacimiento: doc.data().perFecNacimiento,
            perSexo: doc.data().perSexo,
            perTelefono: doc.data().perTelefono,
            perMunicipio: doc.data().perMunicipio,
            perDepartamento: doc.data().perDepartamento,
            perRegimen: doc.data().perRegimen,
            perTipDocumento: doc.data().perTipDocumento
          });
        });
      });

    db.collection("medicamento")
      .where("medEstado", "==", "ACTIVO")
      .onSnapshot(snapshotChange => {
        this.medica = [];
        snapshotChange.forEach(doc => {
          this.medica.push({
            key: doc.id,
            medNombre: doc.data().medNombre,
            medConcentracion: doc.data().medConcentracion,
            medPresentacion: doc.data().medPresentacion
          });
        });
      });

    db.collection("diagnostico")
      .where("diaEstado", "==", "ACTIVO")
      .onSnapshot(snapshotChange => {
        this.diagnos = [];
        snapshotChange.forEach(doc => {
          this.diagnos.push({
            key: doc.id,
            diaCodigo: doc.data().diaCodigo,
            diaNombre: doc.data().diaNombre
          });
        });
      });
  }
};
</script>
