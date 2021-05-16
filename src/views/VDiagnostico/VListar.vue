<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
            <hr>

<button type="button" class="btn btn-outline-primary" @click="toggleModal">Agregar Diagnostico</button>

    <div ref="modal" class="modal fade" :class="{show, 'd-block': active}" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar Medicamento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
          <form @submit.prevent="onFormSubmit">
            <table class="table table-bordered">
                    <tr>
                        <th>Campo</th>
                        <th>Datos</th>
                    </tr>
                    <tr>
                        <td>Codigo:</td>
                        <td>
                            <input class="form-control" required="required" type="text" placeholder="Digite Codigo" v-model="diag.diaCodigo" />
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Nombre" v-model="diag.diaNombre"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align:center;">
                            <input type="submit" name="submit" value="Agregar" class="btn btn-info" />
                        </td>
                    </tr>
                </table>
                </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="active" class="modal-backdrop fade show"></div>

    <div class="col-md-12"><br/>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Còdigo</th>
                        <th>Nombre</th>
                        <th>Ópciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="d in dia" :key="d.key">
                        <td>{{ d.diaCodigo }}</td>
                        <td>{{ d.diaNombre }}</td>
                        <td>
                            <router-link :to="{name: 'edi_dia', params: {id: d.key}}" class="btn btn-outline-primary">Editar
                            </router-link>
                            <button @click.prevent="deleteDiagnostico(d.key)" class="btn btn-outline-danger">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../../firebaseDb';

    
    
    export default {
        data() {
            return {
                titulo: 'Lista Diagnostico',
                dia: [],
                active: false,
                show: false,
                diag: {
                }
            }
        },
        created() {
            db.collection('diagnostico').onSnapshot((snapshotChange) => {
                this.dia = [];
                snapshotChange.forEach((doc) => {
                    this.dia.push({
                        key: doc.id,
                        diaCodigo: doc.data().diaCodigo,
                        diaNombre: doc.data().diaNombre
                    })
                });
            })
        },
        methods: {
            deleteDiagnostico(id){
              if (window.confirm("¿De verdad quieres borrar?")) {
                db.collection("diagnostico").doc(id).delete().then(() => {
                    console.log("Documento eliminado!");
                })
                .catch((error) => {
                    console.error(error);
                })
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
                event.preventDefault()
                db.collection('diagnostico').add(this.diag).then(() => {
                    alert("Medicamento creado correctamente!");
                    this.diag.diaCodigo = ''
                    this.diag.diaNombre = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>
