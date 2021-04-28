<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
            <hr>

<button type="button" class="btn btn-primary" @click="toggleModal">Agregar Medicamento</button>

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
                            <input class="form-control" required="required" type="text" placeholder="Digite Codigo" v-model="medi.medCodigo" />
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Nombre" v-model="medi.medNombre"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Concentración:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Concentración" v-model="medi.medConcentracion"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Presentación:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Presentación" v-model="medi.medPresentacion"/>
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
                        <th>Concentraciòn</th>
                        <th>Presentaciòn</th>
                        <th>Ópciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="m in med" :key="m.key">
                        <td>{{ m.medCodigo }}</td>
                        <td>{{ m.medNombre }}</td>
                        <td>{{ m.medConcentracion }}</td>
                        <td>{{ m.medPresentacion }}</td>
                        <td>
                            <router-link :to="{name: 'edi_med', params: {id: m.key}}" class="btn btn-primary">Editar
                            </router-link>
                            <button @click.prevent="deleteMedicamento(m.key)" class="btn btn-danger">Eliminar</button>
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
                titulo: 'Lista Medicamento',
                med: [],
                active: false,
                show: false,
                medi: {
                }
            }
        },
        created() {
            db.collection('medicamento').onSnapshot((snapshotChange) => {
                this.med = [];
                snapshotChange.forEach((doc) => {
                    this.med.push({
                        key: doc.id,
                        medCodigo: doc.data().medCodigo,
                        medConcentracion: doc.data().medConcentracion,
                        medNombre: doc.data().medNombre,
                        medPresentacion: doc.data().medPresentacion
                    })
                });
            })
        },
        methods: {
            deleteMedicamento(id){
              if (window.confirm("¿De verdad quieres borrar?")) {
                db.collection("medicamento").doc(id).delete().then(() => {
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
                db.collection('medicamento').add(this.medi).then(() => {
                    alert("Medicamento creado correctamente!");
                    this.medi.medCodigo = ''
                    this.medi.medConcentracion = ''
                    this.medi.medNombre = ''
                    this.medi.medPresentacion = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>
