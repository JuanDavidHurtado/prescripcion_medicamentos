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
  font-size: small
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
      <br />
      <table class="table table-bordered">
        <thead>
          <tr :class="$style.th">  
            <th>Documento</th>
            <th>Paciente</th>
            <th>Medicamento</th>
            <th>Concentracion</th>
            <th>Advertencia</th>
            <th colspan="2">Opcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtrarUsuario" :key="p.key" :class="$style.th">
            <td>{{ p.usuPaciente.perDocumento }}</td>
            <td>
              {{ p.usuPaciente.perNombre + " " + p.usuPaciente.perApellido }}
            </td>
            <td>{{ p.idMedicamento.medNombre }}</td>
            <td>{{ p.idMedicamento.medConcentracion }}</td>
            <td>{{ p.preAdvertencia }}</td>
            <td>
              <button
                class="btn btn-primary btn-sm"
                style="background-color: #7752CA;"
                @click.prevent="actualizar_estado_entregado(p.key)"
              >
                <font-awesome-icon icon="edit" /> Entregar
              </button>
            </td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click.prevent="actualizar_estado_rechazado(p.key)"
              >
                <font-awesome-icon icon="trash" /> Rechazar
              </button>
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
      titulo: "LISTA ENTREGAS PENDIENTES",
      pendiente: [],
      buscar: ""
    };
  },
  computed: {
    filtrarUsuario: function() {
      return this.pendiente.filter(p => {
        return p.usuPaciente.perDocumento
          .toLowerCase()
          .includes(this.buscar.toLowerCase());
      });
    }
  },

  methods: {
    actualizar_estado_entregado: function(id) {
      var estado = "ENTREGADO";
      if (
        window.confirm(
          "¿Realmente quieres aceptar la entrega de estos medicamentos?"
        )
      ) {
        db.collection("prescripcion")
          .doc(id)
          .update({ preEstado: estado })
          .then(() => {
            console.log("Documento eliminado!");
          })
          .catch(error => {
            console.error(error);
          });
      }
    },

    actualizar_estado_rechazado: function(id) {
      var estado = "RECHAZADO";
      if (
        window.confirm(
          "¿Realmente quieres anular la entrega de estos medicamentos?"
        )
      ) {
        db.collection("prescripcion")
          .doc(id)
          .update({ preEstado: estado })
          .then(() => {
            console.log("Documento eliminado!");
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  },
  created() {
    db.collection("prescripcion")
      .where("preEstado", "==", "PENDIENTE")
      .onSnapshot(snapshotChange => {
        this.pendiente = [];
        snapshotChange.forEach(doc => {
          this.pendiente.push({
            key: doc.id,
            preAdvertencia: doc.data().preAdvertencia,
            usuPaciente: doc.data().usuPaciente,
            idMedicamento: doc.data().idMedicamento
          });
        });
      });
  }
};
</script>
