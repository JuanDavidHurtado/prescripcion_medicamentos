<template>
<div class="container">
    <h2>{{ titulo }}</h2><hr>
       
        <form @submit.prevent="onUpdateForm">      

        <div class="form-row">
    
            <div class="form-group col-md-4">

            <label>Codigo:</label>
            <input type="text" class="form-control" v-model="ent.entNit" required>
                
                    
            </div>

            <div class="form-group col-md-4">

            <label>Nombre:</label>
 
            <input type="text" class="form-control" v-model="ent.entNombre" required>
                    
            </div>

            <div class="form-group col-md-4">

            <label>Correo Eléctronico:</label>
 
            <input type="email" class="form-control" v-model="ent.entCorreo" required>
                    
            </div>

        </div>

        <div class="form-group">
                    <label>Representante Legal</label>
                    <input type="text" class="form-control" v-model="ent.entRepLegal">
        </div>
        <br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">Actalizar Entidad</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_ent">Regresar</router-link>
                
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
                titulo: 'Actualizar Entidad',
                ent: {
                }
            }
        },
        created() {
            let dbRef = db.collection('entidad').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.ent = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('entidad').doc(this.$route.params.id)
                .update(this.ent).then(() => {
                    console.log("Entidad actualizado con éxito!");
                    this.$router.push('/lis_ent')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>