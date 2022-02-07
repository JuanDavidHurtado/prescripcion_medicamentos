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
  /*background-color: #e0ebeb;*/
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

    <div v-if="estado != 'activo'">
      <button
        type="button"
        class="btn btn-primary"
        style="background-color: #7752CA;"
        @click="toggleModal"
      >
        <font-awesome-icon icon="plus" /> Agregar Numeración
      </button>
    </div>

    <div
      ref="modal"
      class="modal fade"
      :class="{ show, 'd-block': active }"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">AGREGAR N° PRESCRIPCION</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="toggleModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="agregar">
              <table class="table table-bordered" :class="$style.form">
                <tr>
                  <th>Campo</th>
                  <th>Datos</th>
                </tr>
                <tr>
                  <td>Numeración Inicial:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      required="required"
                      type="text"
                      placeholder="Digite N° Inicial"
                      v-model="numeracion.numInicial"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Numeración Final:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      type="text"
                      required="required"
                      placeholder="Digite N° Final"
                      v-model="numeracion.numFinal"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Año:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      type="text"
                      required="required"
                      placeholder="Digite Año"
                      v-model="numeracion.numYear"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: center">
                    <input
                      type="submit"
                      name="submit"
                      value="Agregar"
                      class="btn btn-primary"
                      style="background-color: #7752CA;"
                    />
                  </td>
                </tr>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="active" class="modal-backdrop fade show"></div>

    <div class="col-md-12">
      <br />
      <table class="table table-bordered">
        <thead>
          <tr :class="$style.th">
            <th>Cantidad Inicial</th>
            <th>Cantidad Final</th>
            <th>Año</th>
            <th>Total Formatos</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in num" :key="n.key" :class="$style.th">
            <td>{{ n.numInicial }}</td>
            <td>{{ n.numFinal }}</td>
            <td>{{ n.numYear }}</td>
            <td>{{ n.numFinal - n.numInicial + 1 }}</td>
            <td v-if="n.numEstado == 'activo'">
              <p style="background: #7752CA">{{ n.numEstado }}</p>
            </td>
            <td v-else>
              <p style="background: #e8354e">{{ n.numEstado }}</p>
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
    this.estado = "inactivo";

    db.collection("numeracion")
      .where("numEstado", "==", "activo")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //  console.log(doc.data().numEstado);
          this.estado = doc.data().numEstado;
        });
      })
      .catch((error) => {
        console.log("Error al obtener documentos: ", error);
      });

    return {
      titulo: "LISTA NUMERACION PRESCRIPCION",
      num: [],
      active: false,
      show: false,
      numeracion: {},
      estado: this.estado,
    };
  },
  created() {
    db.collection("numeracion").onSnapshot((snapshotChange) => {
      this.num = [];
      snapshotChange.forEach((doc) => {
        this.num.push({
          key: doc.id,
          numInicial: doc.data().numInicial,
          numFinal: doc.data().numFinal,
          numYear: doc.data().numYear,
          numEstado: doc.data().numEstado,
        });
      });
    });
  },
  methods: {
    agregar() {
      db.collection("numeracion")
        .add({
          numInicial: this.numeracion.numInicial,
          numFinal: this.numeracion.numFinal,
          numYear: this.numeracion.numYear,
          numEstado: "activo",
          numContador: this.numeracion.numInicial,
        })
        .then(() => {
          alert("Numeración Registrada correctamente!");
          (this.numeracion.numInicial = ""),
            (this.numeracion.numFinal = ""),
            (this.numeracion.numYear = ""),
            this.$router.replace("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    toggleModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
      setTimeout(() => (this.show = !this.show), 10);
    },
  },
};
</script>
