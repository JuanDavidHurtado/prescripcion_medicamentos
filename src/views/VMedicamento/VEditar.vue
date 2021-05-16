<template>

<div class="container">
    <h2>{{ titulo }}</h2><hr>
       
        <form @submit.prevent="onUpdateForm">    

        <div class="form-group">
                    <label>Código</label>
                    <input type="text" class="form-control" v-model="med.medCodigo" required>
        </div>  

        <div class="form-row">
    
            <div class="form-group col-md-4">

            <label>Nombre:</label>
            <input type="text" class="form-control" v-model="med.medNombre" required>
                
                    
            </div>

            <div class="form-group col-md-4">

            <label>Concentración:</label>
 
            <input type="text" class="form-control" v-model="med.medConcentracion" required>
                    
            </div>

            <div class="form-group col-md-4">

            <label>Presentación</label>
 
            <input type="text" class="form-control" v-model="med.medPresentacion" required>
                    
            </div>

        </div>
        <br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">Actalizar Farmacia</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_med">Regresar</router-link>
                
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
                titulo: 'Actualizar Medicamento',
                med: {
                }
            }
        },
        created() {
            let dbRef = db.collection('medicamento').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.med = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('medicamento').doc(this.$route.params.id)
                .update(this.med).then(() => {
                    console.log("Medicamento actualizado con éxito!");
                    this.$router.push('/lis_med')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>