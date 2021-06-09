<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
            <hr>

<button type="button" class="btn btn-outline-primary" @click="toggleModal">Agregar N° Prescripción</button>

    <div ref="modal" class="modal fade" :class="{show, 'd-block': active}" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Agregar N° Prescripción</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="toggleModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
          <form @submit.prevent="agregar">
            <table class="table table-bordered">
                    <tr>
                        <th>Campo</th>
                        <th>Datos</th>
                    </tr>
                    <tr>
                        <td>Numeración Inicial:</td>
                        <td>
                            <input class="form-control" required="required" type="text" placeholder="Digite Numeración Inicial"
                             v-model="numeracion.numInicial" />
                        </td>
                    </tr>
                    <tr>
                        <td>Numeración Final:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Numeración Final"
                             v-model="numeracion.numFinal"/>
                        </td>
                    </tr>
                    <tr>
                        <td>Año:</td>
                        <td>
                            <input class="form-control" type="text" required="required" placeholder="Digite Año" 
                            v-model="numeracion.numYear"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align:center;">
                            <input type="submit" name="submit" value="Agregar Numeración" class="btn btn-info" />
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
                        <th>Cantidad Inicial</th>
                        <th>Cantidad Final</th>
                        <th>Año</th>
                        <th>Total Formatos</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="n in num" :key="n.key">
                        <td>{{ n.numInicial }}</td>
                        <td>{{ n.numFinal }}</td>
                        <td>{{ n.numYear }}</td>
                        <td>{{ n.numFinal  -  n.numInicial }}</td>
                        <td v-if="n.numEstado == 'activo'">
                            <p style="background:#5DB4E7;">{{ n.numEstado }}</p>
                        </td>
                        <td v-else>
                            <p style="background:#E8354E;">{{ n.numEstado }}</p>
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
            titulo: 'Información N° Prescripción',
                num: [],
                active: false,
                show: false,
                numeracion: {
                },
            }
        },
        created() {
            db.collection('numeracion').onSnapshot((snapshotChange) => {
                this.num = [];
                snapshotChange.forEach((doc) => {
                    this.num.push({
                        key: doc.id,
                        numInicial: doc.data().numInicial,
                        numFinal: doc.data().numFinal,
                        numYear: doc.data().numYear,
                        numEstado: doc.data().numEstado

                    })
                });
            })
        },
        methods: {

             agregar() {     

                    db.collection("numeracion").add({
                        numInicial:this.numeracion.numInicial,
                        numFinal:this.numeracion.numFinal,
                        numYear:this.numeracion.numYear,
                        numEstado:'activo',
                        numContador:this.numeracion.numInicial
                                        
                    })
                    .then(() => {
                        alert("Nueva Numeración Registrada correctamente!"); 
                        this.numeracion.numInicial = '',
                        this.numeracion.numFinal =  '',
                        this.numeracion.numYear =  ''
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
      
        }
    }
</script>
