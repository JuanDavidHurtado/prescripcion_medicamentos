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

    <button type="button" class="btn btn-primary" style="background-color: #7752CA;"  @click="toggleModal">
      <font-awesome-icon icon="plus" /> Agregar Farmacia
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
            <h5 class="modal-title">AGREGAR FARMACIA</h5>
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
                  <td>Nit:</td>
                  <td>
                    <input
                      :class="$style.input_txt"
                      required="required"
                      type="text"
                      placeholder="Digite Nit"
                      v-model="farma.farNit"
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
                      v-model="farma.farNombre"
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
            <th>Nit</th>
            <th>Nombre</th>
            <th>Ópciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="f in far" :key="f.key" :class="$style.th">
            <td>{{ f.farNit }}</td>
            <td>{{ f.farNombre }}</td>
            <td>
              <router-link
                :to="{ name: 'edi_far', params: { id: f.key } }"
                class="btn btn-primary btn-sm" style="background-color: #7752CA;"
              >
                <font-awesome-icon icon="edit" /> Editar
              </router-link>
              <button
                @click.prevent="deleteFarmacia(f.key)"
                class="btn btn-danger btn-sm"
              >
                <font-awesome-icon icon="trash" /> Eliminar
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
      titulo: "LISTA FARMACIA",
      farma: {},
      far: [],
      active: false,
      show: false,
    };
  },
  created() {
    db.collection("farmacia")
      .where("farEstado", "==", "ACTIVO")
      .onSnapshot((snapshotChange) => {
        this.far = [];
        snapshotChange.forEach((doc) => {
          this.far.push({
            key: doc.id,
            farNit: doc.data().farNit,
            farNombre: doc.data().farNombre,
          });
        });
      });
  },
  methods: {
    onFormSubmit(event) {
      event.preventDefault();
      db.collection("farmacia")
        .add({
          farNit: this.farma.farNit,
          farNombre: this.farma.farNombre,
          farEstado: "ACTIVO",
        })
        .then(() => {
          alert("Farmacia creado correctamente!");
          this.farma.farNit = "";
          this.farma.farNombre = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deleteFarmacia(id) {
      var estado = "INACTIVO";
      if (window.confirm("¿De verdad quieres borrar?")) {
        db.collection("farmacia")
          .doc(id)
          .update({ farEstado: estado })
          .then(() => {
            console.log("farmacia eliminado!");
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
  },
};
</script>