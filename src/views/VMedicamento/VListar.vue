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

    <button type="button" class="btn btn-primary" style="background-color: #7752CA;" @click="toggleModal">
      <font-awesome-icon icon="plus" /> Agregar
    </button>

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
            <h5 class="modal-title">AGREGAR MEDICAMENTO</h5>
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
            <form @submit.prevent="onFormSubmit">
              <table class="table table-bordered" :class="$style.form">
                <tr>
                  <th>Campo</th>
                  <th>Datos</th>
                </tr>
                <tr>
                  <td>Codigo:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      required="required"
                      type="text"
                      placeholder="Digite Codigo"
                      v-model="medi.medCodigo"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Nombre:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      type="text"
                      required="required"
                      placeholder="Digite Nombre"
                      v-model="medi.medNombre"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Concentración:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      type="text"
                      required="required"
                      placeholder="Digite Concentración"
                      v-model="medi.medConcentracion"
                    />
                  </td>
                </tr>
                <tr>
                  <td>Presentación:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      type="text"
                      required="required"
                      placeholder="Digite Presentación"
                      v-model="medi.medPresentacion"
                    />
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: center">
                    <input
                      type="submit"
                      name="submit"
                      value="Agregar"
                      style="background-color: #7752CA;"
                      class="btn btn-primary"
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
       <paginate ref="paginator" name="med" :list="med" :per="4">
      <table class="table table-bordered table-sm">
        <thead>
          <tr :class="$style.th">
            <th>Còdigo</th>
            <th>Nombre</th>
            <th>Concentraciòn</th>
            <th>Presentaciòn</th>
            <th>Ópciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in paginated('med')" :key="m.key" :class="$style.th"> 
            <td>{{ m.medCodigo }}</td>
            <td>{{ m.medNombre }}</td>
            <td>{{ m.medConcentracion }}</td>
            <td>{{ m.medPresentacion }}</td>
            <td>
              <router-link
                :to="{ name: 'edi_med', params: { id: m.key } }"
                class="btn btn-primary btn-sm"
                style="background-color: #7752CA;"
              >
                <font-awesome-icon icon="edit" /> Editar
              </router-link>
              <button
                @click.prevent="deleteMedicamento(m.key)"
                class="btn btn-danger btn-sm"
              >
                <font-awesome-icon icon="trash" /> Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
       </paginate>
       <paginate-links 
        for="med"
        :show-step-links="true"
        :simple="{
          next: 'Siguiente',
          prev: 'Anterior'
        }"
      ></paginate-links>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {
      titulo: "LISTA MEDICAMENTO",
      paginate: ["med"],
      med: [],
      active: false,
      show: false,
      medi: {},
    };
  },
  created() {
    db.collection("medicamento")
      .where("medEstado", "==", "ACTIVO")
      .onSnapshot((snapshotChange) => {
        this.med = [];
        snapshotChange.forEach((doc) => {
          this.med.push({
            key: doc.id,
            medCodigo: doc.data().medCodigo,
            medConcentracion: doc.data().medConcentracion,
            medNombre: doc.data().medNombre,
            medPresentacion: doc.data().medPresentacion,
          });
        });
      });
  },
  methods: {
    deleteMedicamento(id) {
      var estado = "INACTIVO";
      if (window.confirm("¿De verdad quieres borrar?")) {
        db.collection("medicamento")
          .doc(id)
          .update({ medEstado: estado })
          .then(() => {
            console.log("Documento eliminado!");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    toggleModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
      setTimeout(() => (this.show = !this.show), 10);
    },
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("medicamento")
        .add({
          medCodigo: this.medi.medCodigo,
          medConcentracion: this.medi.medConcentracion,
          medNombre: this.medi.medNombre,
          medPresentacion: this.medi.medPresentacion,
          medEstado: "ACTIVO",
        })
        .then(() => {
          alert("Medicamento creado correctamente!");
          this.medi.medCodigo = "";
          this.medi.medConcentracion = "";
          this.medi.medNombre = "";
          this.medi.medPresentacion = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
