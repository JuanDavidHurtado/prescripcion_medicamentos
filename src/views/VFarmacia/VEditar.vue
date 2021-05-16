<template>

<div class="container">
    <h2>{{ titulo }}</h2><hr>
       
        <form @submit.prevent="onUpdateForm">    

        <div class="form-group">
                    <label>Nit</label>
                    <input type="text" class="form-control" v-model="farma.farNit" required>
        </div>  

        <div class="form-row">
    
            <div class="form-group col-md-4">

            <label>Nombre:</label>
            <input type="text" class="form-control" v-model="farma.farNombre" required>
                
                    
            </div>

            <div class="form-group col-md-4">

            <label>Departamento:</label>
 
            <input type="text" class="form-control" v-model="farma.farDepartamento" required>
                    
            </div>

            <div class="form-group col-md-4">

            <label>Municipio</label>
 
            <input type="text" class="form-control" v-model="farma.farMunicipio" required>
                    
            </div>

        </div>
        <br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">Actalizar Farmacia</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_far">Regresar</router-link>
                
            </div>
        </div>

    </form>
        
</div>

  
</template>

<script>
    
    import { db } from '../../firebaseDb';

    export default {
        data() {
            return {
                titulo: 'Actualizar Farmacia',
                farma: {
                }
            }
        },
        created() {
            let dbRef = db.collection('farmacia').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.farma = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('farmacia').doc(this.$route.params.id)
                .update(this.farma).then(() => {
                    console.log("Farmacia actualizado con éxito!");
                    this.$router.push('/lis_far')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>