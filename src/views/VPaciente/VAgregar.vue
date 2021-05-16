<template>
<div class="container">

    <h2>{{ titulo }}</h2><hr>

    <form @submit.prevent="agregar">
       
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

            <select class="form-control" v-model="selec"> 
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option>Cédula de Ciudadanía</option>
                    <option>Tarjeta de Identidad</option>
                    <option>Cédula de Extranjeria</option>
                    <option>PEP</option>
            </select>
                    
            </div>

            <div class="form-group col-md-3">

            <label>Documento:</label>
 
            <input type="text" required class="form-control" placeholder="Digite Docmento" v-model="pac.perDocumento">
                    
            </div>

        </div>

         <div class="form-row">

             <div class="form-group col-md-4">
                <label>Fecha Nacimiento</label>
                <input type="date" required class="form-control" placeholder="Digite Fecha Nacimiento" v-model="pac.perFecNacimiento">
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
                <button class="btn btn-outline-primary btn-block">Registrar</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_pac">Regresar</router-link>
                
            </div>
        </div>

    </form>
</div>

</template>

<script>
    
    import {db} from '../../firebaseDb';

    export default {
        data() {
            return {
                titulo: 'Agregar Paciente',
                selec: null,
                pac: {
                }
            }
        },
        methods: {
            agregar() {           
                    db.collection("persona").add({
                        perNombre:this.pac.perNombre,
                        perApellido:this.pac.perApellido,
                        perTipDocumento:this.selec,
                        perDocumento:this.pac.perDocumento,
                        perFecNacimiento:this.pac.perFecNacimiento,
                        perTelefono:this.pac.perTelefono,
                        perCorreo:this.pac.perCorreo,
                        perDepartamento:this.pac.perDepartamento,
                        perMunicipio:this.pac.perMunicipio,
                        tipoRol:'paciente'
                                        
                    })
                    .then(() => {
                        alert("Paciente creado correctamente!"); 
                        this.pac.perNombre = '',
                        this.pac.perApellido =  '',
                        this.selec =  '',
                        this.pac.perDocumento = '',
                        this.pac.perFecNacimiento = '',
                        this.pac.perTelefono = '',
                        this.pac.perCorreo = '',
                        this.pac.perDepartamento = '',
                        this.pac.perMunicipio = ''  
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
    }
</script>

