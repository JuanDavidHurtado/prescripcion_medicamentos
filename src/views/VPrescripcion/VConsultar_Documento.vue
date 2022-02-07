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
    <div class="form-group row" :class="$style.form">
      <label class="col-sm-3 col-form-label">Buscar Por Documento:</label>
      <div class="col-sm-9">
        <input
          type="text"
          :class="$style.input_txt"
          placeholder="Numero Documento"
          v-model="buscar"
        />
      </div>
    </div>
    <br />
    <div class="col-md-12">
      <table class="table table-bordered">
        <thead>
          <tr :class="$style.th">
            <th>Registro</th>
            <th>Atendio</th>
            <th>Paciente</th>
            <th>Medicamento</th>
            <th>Concentracion</th>
            <th>Advertencia</th>
            <th>Estado</th>
            <th>Opcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtrarUsuario" :key="p.key" :class="$style.th">
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
            </td>
            <td>{{ p.idMedicamento.medNombre }}</td>
            <td>{{ p.idMedicamento.medConcentracion }}</td>
            <td>{{ p.preAdvertencia }}</td>
            <td>{{ p.preEstado }}</td>
            <td v-if="p.preEstado != 'ANULADA'">
              <button
                style="background-color: #7752CA;"
                class="btn btn-primary btn-sm"
                @click.prevent="anular(p.key)"
              >
                <font-awesome-icon icon="trash" /> Anular
              </button>
            </td>
            <td v-else>
              <em style="color:#9B5CDE;">Prescipcion anulada</em>
            </td>
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
      titulo: "CONSULTAR HISTORIAL DE PRESCIPCION",
      prescripcion: [],
      buscar: ""
    };
  },

  /*
  ONCLICK DE JS 
  v-on:click="saludar"*/
  methods: {
    anular: function(id) {
      var estado = "ANULADA";
      if (window.confirm("¿Realmente quieres anular la prescripcion?")) {
        db.collection("prescripcion")
          .doc(id)
          .update({ preEstado: estado })
          .then(() => {
            console.log("Documento anulado!");
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  },

  computed: {
    filtrarUsuario: function() {
      return this.prescripcion.filter(p => {
        return p.usuPaciente.perDocumento
          .toLowerCase()
          .includes(this.buscar.toLowerCase());
        /*||
          item.noticia_titulo_cas
            .toLowerCase()
            .includes(this.noticia_titulo_cas.toLowerCase()) ||
          item.lanak_titulo_cas
            .toLowerCase()
            .includes(this.noticia_titulo_cas.toLowerCase()) ||
          item.noticia_fecha
            .toLowerCase()
            .includes(this.noticia_titulo_cas.toLowerCase())*/
      });
    }
  },

  created() {
    db.collection("prescripcion")
      //.where("preEstado", "==", "ENTREGADO")
      .onSnapshot(snapshotChange => {
        this.prescripcion = [];
        snapshotChange.forEach(doc => {
          //this.pres = doc.data();
          this.prescripcion.push({
            key: doc.id,
            preFecha: doc.data().preFecha,
            preAdvertencia: doc.data().preAdvertencia,
            usuPaciente: doc.data().usuPaciente,
            usuMedico: doc.data().usuMedico,
            idMedicamento: doc.data().idMedicamento,
            preEstado: doc.data().preEstado
          });
        });
      });
  }
};
</script>
