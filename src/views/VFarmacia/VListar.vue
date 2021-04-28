<template>
<div class="container">
<h2>{{ titulo }}</h2>
<hr>


<button type="button" class="btn btn-primary" @click="toggleModal">Agregar Farmacia</button>

    <div ref="modal" class="modal fade" :class="{show, 'd-block': active}" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar Farmacia</h5>
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
                            <input class="form-control" required="required" type="text" placeholder="Digite Nit" v-model="farma.farNit" />
                        </td>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Nombre" v-model="farma.farNombre"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Departamento:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Departamento" v-model="farma.farDepartamento"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Ciudad:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Municipio" v-model="farma.farMunicipio"/>
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
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Ópciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="f in far" :key="f.key">
                        <td>{{ f.farNit }}</td>
                        <td>{{ f.farNombre }}</td>
                        <td>{{ f.farDepartamento }}</td>
                        <td>{{ f.farMunicipio }}</td>
                        <td>
                            <router-link :to="{name: 'edi_far', params: {id: f.key}}" class="btn btn-primary">Editar
                            </router-link>
                            <button @click.prevent="deleteFarmacia(f.key)" class="btn btn-danger">Eliminar</button>
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
                titulo: 'Lista Farmacia',
                farma: {
                },
                far: [],
                active: false,
                show: false
                
            }
        },
        created() {
            db.collection('farmacia').onSnapshot((snapshotChange) => {
                this.far = [];
                snapshotChange.forEach((doc) => {
                    this.far.push({
                        key: doc.id,
                        farNit: doc.data().farNit,
                        farNombre: doc.data().farNombre,
                        farDepartamento: doc.data().farDepartamento,
                        farMunicipio: doc.data().farMunicipio
                    })
                });
            })
        },
        methods: {

            onFormSubmit(event) {
                event.preventDefault()
                db.collection('farmacia').add(this.farma).then(() => {
                    alert("Farmacia creado correctamente!");
                    this.farma.farNit = ''
                    this.farma.farNombre = ''
                    this.farma.farDepartamento = ''
                    this.farma.farMunicipio = ''
                }).catch((error) => {
                    console.log(error);
                });
            },

            deleteFarmacia(id){
              if (window.confirm("¿De verdad quieres borrar?")) {
                db.collection("farmacia").doc(id).delete().then(() => {
                    console.log("farmacia eliminado!");
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
            }
        }
    }
</script>