<template>
    <div class="container">

    <h2>{{ titulo }}</h2><hr>

            <form @submit.prevent="onUpdateForm">
                 <div class="form-row">
    
            <div class="form-group col-md-3">

            <label>Nombre:</label>
                <input type="text" required class="form-control" placeholder="Digite Nombre" v-model="pac.perNombre">
                    
            </div>

            <div class="form-group col-md-3">

            <label>Apellido:</label>
 
            <input type="text" required class="form-control" placeholder="Digite Apellido" v-model="pac.perApellido">
                    
            </div>
            
            <div class="form-group col-md-3">

            <label>Tipo de Documento:</label>

            <input type="text" required class="form-control" placeholder="Digite Docmento" v-model="pac.perTipDocumento">
                    
            </div>

            <div class="form-group col-md-3">

            <label>Documento:</label>
 
            <input type="text" required class="form-control" placeholder="Digite Docmento" v-model="pac.perDocumento">
                    
            </div>

        </div>

         <div class="form-row">

             <div class="form-group col-md-4">
                <label>Fecha Nacimiento</label>
                <input type="text" required class="form-control" placeholder="Digite Fecha Nacimiento" v-model="pac.perFecNacimiento">
            </div>

            <div class="form-group col-md-4">
                <label>Teléfono</label>
                <input type="text" required class="form-control" placeholder="Digite Teléfono" v-model="pac.perTelefono">
            </div>

          

           <div class="form-group col-md-4">
                <label>Correo Eléctronico</label>
                <input type="email" required class="form-control" placeholder="Digite Correo Eléctronico" v-model="pac.perCorreo">
                
           </div>
        </div>

        <div class="form-row">

             <div class="form-group col-md-6">
                <label>Departamento</label>
                <input type="text" required class="form-control" placeholder="Digite Departamento" v-model="pac.perDepartamento">
            </div>          

           <div class="form-group col-md-6">
                <label>Municipio</label>
                <input type="text" required class="form-control" placeholder="Digite Municipio" v-model="pac.perMunicipio">
                
           </div>
        </div>

       
       
        <br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">actualizar</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_pac">Regresar</router-link>
                
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
                titulo: 'Editar Paciente',
                pac: {
                }
            }
        },
        created() {
            let dbRef = db.collection('persona').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.pac = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('persona').doc(this.$route.params.id)
                .update(this.pac).then(() => {
                    console.log("Paciente actualizado con éxito!");
                    this.$router.push('/lis_pac')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>