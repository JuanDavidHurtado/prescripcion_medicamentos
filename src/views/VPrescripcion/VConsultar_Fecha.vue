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
    <h4>{{ titulo }}</h4>
    <hr />
    <br />
    <form @submit.prevent="consultar" :class="$style.form">
      <div class="form-group row">
        <label class="col-sm-1 col-form-label">Desde:</label>
        <div class="col-sm-3">
          <input
            type="date"
            :class="$style.input_txt"
            v-model="pre.fecha1"
            required
          />
        </div>
        <label class="col-sm-1 col-form-label">Hasta:</label>
        <div class="col-sm-3">
          <input
            type="date"
            :class="$style.input_txt"
            v-model="pre.fecha2"
            required
          />
        </div>
        <div class="col-sm-4">
          <input
            type="submit"
            name="submit"
            value="Consultar"
            class="btn btn-primary btn-sm"
            style="background-color: #7752CA;"
          />
        </div>
      </div>
    </form>
    <br />

    <div class="col-md-12" v-if="prescri != 0">
      <br />
      <table class="table table-bordered">
        <thead>
          <tr :class="$style.th">
            <th>Registro</th>

            <th>Atendio</th>

            <th>Documento</th>

            <th>Paciente</th>
            <th>Medicamento</th>
            <th>Dosis</th>
            <th>Diagnostico</th>
            <th>Advertencia</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in prescri" :key="p.key" :class="$style.th">
            <td>{{ p.preFecha }}</td>

            <td>
              {{ "Doc: " + p.usuMedico.perDocumento }}<br />
              {{
                "Profesional: " +
                  p.usuMedico.perNombre +
                  " " +
                  p.usuMedico.perApellido
              }}
            </td>
            <td>
              {{ "Doc: " + p.usuPaciente.perDocumento }}<br />
              {{
                "Paciente: " +
                  p.usuPaciente.perNombre +
                  " " +
                  p.usuPaciente.perApellido
              }}

            <td>{{ p.usuPaciente.perDocumento }}</td>
            <td>
              {{ p.usuPaciente.perNombre + " " + p.usuPaciente.perApellido }}

            </td>
            <td>
              {{ p.idMedicamento.medNombre }} <br />
              {{ p.idMedicamento.medConcentracion }}
            </td>
            <td>
              {{ p.preDosis }}
            </td>
            <td>
              {{ p.idDiagnostico.diaNombre }} <br />
              {{ p.preDiaTratamiento }}
            </td>
            <td>{{ p.preAdvertencia }}</td>
            <td>{{ p.preEstado }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {
      titulo: "CONSULTAR POR FECHA PRESCRIPCIONES REALIZADAS",
      pre: {},
      prescri: []
    };
  },

  methods: {
    consultar() {
      db.collection("prescripcion")
        .where("preFecha", ">=", this.pre.fecha1)
        .where("preFecha", "<=", this.pre.fecha2)
        .onSnapshot(snapshotChange => {
          this.prescri = [];
          snapshotChange.forEach(doc => {

            //console.log(this.prescri);

            this.prescri.push({
              key: doc.id,
              preAdvertencia: doc.data().preAdvertencia,
              usuMedico: doc.data().usuMedico,

              //console.log(this.prescri);

            this.prescri.push({

             
              key: doc.id,
              preAdvertencia: doc.data().preAdvertencia,

              usuPaciente: doc.data().usuPaciente,
              idMedicamento: doc.data().idMedicamento,
              idDiagnostico: doc.data().idDiagnostico,
              preEstado: doc.data().preEstado,
              preDiaTratamiento: doc.data().preDiaTratamiento,
              preDosis: doc.data().preDosis,
              preFecha: doc.data().preFecha,
              f1: this.pre.fecha1,
              f2: this.pre.fecha2

            });
          });
          if (this.prescri == 0) {
            this.pre.fecha1 = "";
            this.pre.fecha2 = "";
            alert("No hay prescripciones realizadas en las fechas indicadas.");


            });
          });
          if(this.prescri == 0){
                 this.pre.fecha1 = "";
                 this.pre.fecha2 = "";
                 alert("No hay prescripciones realizadas en las fechas indicadas.")


          }
          this.pre.fecha1 = "";
          this.pre.fecha2 = "";
        });
    }
  }
};
</script>
