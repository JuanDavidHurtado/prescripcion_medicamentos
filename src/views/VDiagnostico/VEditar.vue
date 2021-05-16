<template>
<div class="container">
    <h2>{{ titulo }}</h2><hr>
       
        <form @submit.prevent="onUpdateForm">      

        <div class="form-row">
    
            <div class="form-group col-md-6">

            <label>Codigo:</label>
            <input type="text" class="form-control" v-model="Diag.diaCodigo" required>
                
                    
            </div>

            <div class="form-group col-md-6">

            <label>Nombre:</label>
 
            <input type="text" class="form-control" v-model="Diag.diaNombre" required>
                    
            </div>

        </div>
        <br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">Actalizar Diagnostico</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_dia">Regresar</router-link>
                
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
                titulo: 'Actualizar Diagnostico',
                Diag: {
                }
            }
        },
        created() {
            let dbRef = db.collection('diagnostico').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.Diag = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('diagnostico').doc(this.$route.params.id)
                .update(this.Diag).then(() => {
                    console.log("Diagnostico actualizado con éxito!");
                    this.$router.push('/lis_dia')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>