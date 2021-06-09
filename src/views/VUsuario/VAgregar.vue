<template>
<div class="container">

    <h2>{{ titulo }} <small style="color: #C6462B;">(campo requerido *)</small></h2><hr>

    <form @submit.prevent="agr_usu">
       
        <div class="form-row">
    
            <div class="form-group col-md-3">

            <label>Nombre: <small style="color: #C6462B;">*</small></label>
                <input type="text" required class="form-control" placeholder="Digite Nombre completo" v-model="usuCuenta.perNombre">
                    
            </div>
              <div class="form-group col-md-3">

            <label>Apellido:<small style="color: #C6462B;">*</small></label>
 
            <input type="text" required class="form-control" placeholder="Digite Apellido" v-model="usuCuenta.perApellido">
                    
            </div>
            
            <div class="form-group col-md-3">

            <label>Tipo de Documento: <small style="color: #C6462B;">*</small></label>

            <select class="form-control" v-model="selec" required> 
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option>Cédula de Ciudadanía</option>
                    <option>Tarjeta de Identidad</option>
                    <option>Cédula de Extranjeria</option>
                    <option>PEP</option>
            </select>
                    
            </div>

            <div class="form-group col-md-3">

                 <label>Documento: <small style="color: #C6462B;">*</small></label>
 
            <input type="text" required class="form-control" placeholder="Digite Docmento" v-model="usuCuenta.perDocumento">
                    
            </div>


        </div>
         <div class="form-row">

             <div class="form-group col-md-6">
                <label>Fecha Nacimiento <small style="color: #C6462B;">*</small></label>
                <input type="date" required class="form-control" placeholder="Digite Fecha Nacimiento" v-model="usuCuenta.perFecNacimiento">
            </div>

            <div class="form-group col-md-6">
                <label>Teléfono <small style="color: #C6462B;">*</small></label>
                <input type="text" required class="form-control" placeholder="Digite Teléfono" v-model="usuCuenta.perTelefono">
            </div>
        </div>
        <div class="form-row">

             <div class="form-group col-md-6">
                <label>Departamento <small style="color: #C6462B;">*</small></label>
                <input type="text" required class="form-control" placeholder="Digite Departamento" v-model="usuCuenta.perDepartamento">
            </div>          

           <div class="form-group col-md-6">
                <label>Municipio <small style="color: #C6462B;">*</small></label>
                <input type="text" required class="form-control" placeholder="Digite Municipio" v-model="usuCuenta.perMunicipio">
                
           </div>
        </div>


         <div class="form-row">

             <div class="form-group col-md-6">
                <label>Login <small style="color: #C6462B;">*</small></label>
                <input required type="email" class="form-control" placeholder="Digite Correo Eléctronico" v-model="email">
            </div>

            <div class="form-group col-md-6">
                <label>Contraseña <small style="color: #C6462B;">*</small></label>
                <input type="password" class="form-control" required placeholder="Digite Contraseña" v-model="password">
            </div>
        </div>
        
         <div class="form-row">

             <div class="form-group col-md-6">
                <label>Rol <small style="color: #C6462B;">*</small></label>
                <select class="form-control" v-model="selec1" required>  
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option v-for="r in rol" :key="r.key" :value="r"> {{ r.rolNombre }} </option>          
            </select>
            </div>
            <div class="form-group col-md-6">

                <label>Especialidad:</label>
                <select class="form-control" v-model="selec2"> 
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option v-for="e in esp" :key="e.key" :value="e"> {{ e.espCups +" "+ e.espNombre }} </option>
                </select>
               
                   
            </div>
        </div><br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">Registrar</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/lis_usu">Regresar</router-link>
                
            </div>
        </div>

    </form>
</div>

</template>

<script>
    
   import {db} from '../../firebaseDb';
   
   //import firebase from 'firebase';

    export default {
        data() {
            return {
                titulo: 'Agregar Usuario',
                usuCuenta: {
                },
                //name:'',
                selec: null,
                selec1: null,
                selec2: null,
                email: '',
                password: '',
                esp: [],
                rol: []

            }
        },
        name: 'agr_usu',
        methods: {
           agr_usu() {
             
//agrego cuenta autenticada con firebase
           /*    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {*/
                    //agrego el usuario persona
                  
                        db.collection("persona").add({
                     //   idUsuario:this.uid,
                        perNombre:this.usuCuenta.perNombre,
                        perApellido:this.usuCuenta.perApellido,
                        perTipDocumento:this.selec,
                        perDocumento:this.usuCuenta.perDocumento,
                        perFecNacimiento:this.usuCuenta.perFecNacimiento,
                        perTelefono:this.usuCuenta.perTelefono,
                        perDepartamento:this.usuCuenta.perDepartamento,
                        perMunicipio:this.usuCuenta.perMunicipio,
                        tipoRol:this.selec1,
                        idEspecialidad:this.selec2

                                        
                    })
                    .then(() => {
                        alert("Cuenta de usuario creado correctamente!"); 
                         this.usuCuenta.perNombre = ''
                         this.usuCuenta.perApellido = ''
                         this.selec = ''
                         this.usuCuenta.perFecNacimiento = ''
                         this.usuCuenta.perTelefono = ''
                         this.usuCuenta.perDepartamento = ''
                         this.usuCuenta.perApellido = ''
                         this.usuCuenta.perMunicipio = ''
                         this.email = ''
                         this.password = ''
                         this.selec1 = ''
                         this.selec2 = ''
                          router.push('/lis_usu')
                 //   this.$router.replace('/lis_usu')

                });

             /*   }).catch((error) => {
                        console.log(error);
                });*/
      }
    },
     created() {

          db.collection('especialidad').onSnapshot((snapshotChange) => {
                this.esp = [];
                snapshotChange.forEach((doc) => {
                    this.esp.push({
                        key: doc.id,
                        espCups: doc.data().espCups,
                        espNombre: doc.data().espNombre
                    })
                });
        }),
        db.collection('rol')
        .where("rolNombre", "!=", "paciente")  
        .onSnapshot((snapshotChange) => {
                this.rol = [];
                snapshotChange.forEach((doc) => {
                    this.rol.push({
                        key: doc.id,
                        rolNombre: doc.data().rolNombre
                    })
                });
        })


         
        

    }
 }
</script>

