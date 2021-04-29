<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
            <hr>

<button type="button" class="btn btn-primary" @click="toggleModal">Agregar Entidad</button>

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
                        <td>Nit:</td>
                        <td>
                            <input class="form-control" required="required" type="text" placeholder="Digite Nit" v-model="entidad.entNit" />
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Nombre" v-model="entidad.entNombre"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Correo:</td>
                        <td>
                            <input class="form-control" type="email" required="required" placeholder="Digite correo" v-model="entidad.entCorreo"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Representante Legal:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Representante Legal" v-model="entidad.entRepLegal"/>
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
                        <th>Nit</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Representante legal</th>
                        <th>Ópciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="e in ent" :key="e.key">
                        <td>{{ e.entNit }}</td>
                        <td>{{ e.entNombre }}</td>
                        <td>{{ e.entCorreo }}</td>
                        <td>{{ e.entRepLegal }}</td>
                        <td>
                            <router-link :to="{name: 'edi_ent', params: {id: e.key}}" class="btn btn-primary">Editar
                            </router-link>
                            <button @click.prevent="deleteEntidad(e.key)" class="btn btn-danger">Eliminar</button>
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
                titulo: 'Lista Entidad',
                ent: [],
                active: false,
                show: false,
                entidad: {
                }
            }
        },
        created() {
            db.collection('entidad').onSnapshot((snapshotChange) => {
                this.ent = [];
                snapshotChange.forEach((doc) => {
                    this.ent.push({
                        key: doc.id,
                        entNit: doc.data().entNit,
                        entNombre: doc.data().entNombre,
                        entCorreo: doc.data().entCorreo,
                        entRepLegal: doc.data().entRepLegal
                    })
                });
            })
        },
        methods: {
            deleteEntidad(id){
              if (window.confirm("¿De verdad quieres borrar?")) {
                db.collection("entidad").doc(id).delete().then(() => {
                    console.log("Entidad eliminado!");
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
                db.collection('entidad').add(this.entidad).then(() => {
                    alert("entidad creado correctamente!");
                    this.entidad.entNit = ''
                    this.entidad.entNombre = ''
                    this.entidad.entCorreo = ''
                    this.entidad.entRepLegal = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>
