<template>
<div class="container">

    <h2>{{ titulo }}</h2><hr>

    <form @submit.prevent="agregar">
        <div class="form-group">
                    <input type="text" class="form-control" hidden v-model="user.uid">
        </div>
       
        <div class="form-row">
    
            <div class="form-group col-md-4">

            <label>Paciente:</label>
                <select class="form-control" v-model="selec" required> 
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option v-for="p in paciente" :key="p.key" :value="p"> {{ p.perNombre +" "+ p.perApellido }} </option>
                </select>                   
            </div>

            <div class="form-group col-md-4">

            <label>Medicamento:</label>
 
            <select class="form-control" v-model="selec1" required> 
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option v-for="m in medica" :key="m.key" :value="m"> {{ m.medNombre +" "+ m.medConcentracion }} </option>
            </select>
                    
            </div>

            <div class="form-group col-md-4">

                <label>Diagnostico:</label>
                <select class="form-control" v-model="selec2" required> 
                    <option selected disabled value="null">---Seleccione Opcion---</option>
                    <option v-for="d in diagnos" :key="d.key" :value="d"> {{ d.diaCodigo +" "+ d.diaNombre }} </option>
                </select>
               
                   
            </div>

        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label>Dosis</label>
                <input type="text" class="form-control" placeholder="Digite Dosis" v-model="pre.preDosis" required>
            </div>

          

           <div class="form-group col-md-6">
                <label>Tratamiento</label>
                <input type="text" class="form-control" placeholder="Digite Tratamiento" v-model="pre.preDiaTratamiento" required>
                
           </div>
        </div>
        <div class="form-group">
                    <label for="inputAddress2">Advertencia</label>
                    <textarea  required v-model="pre.preAdvertencia" type="text" class="form-control" placeholder="Descripción Advertencia" rows="3"></textarea>
        </div>
        <br>

        <div class="form-row">
            <div class="form-group col-md-6">
                <button class="btn btn-outline-primary btn-block">Registrar</button>
            </div>

            <div class="form-group col-md-6">
              
                <router-link class="btn btn-outline-success btn-block" to="/home">Regresar</router-link>
                
            </div>
        </div>

    </form>
</div>

</template>

<script>
    
    import {db} from '../../firebaseDb';
    import firebase from 'firebase';
  

   
    export default {
        data() {
            return {
                titulo: 'Diligenciar Prescripción',
                selec: null,
                selec1: null,
                selec2: null,
                user: null,
                medica: [],
                diagnos: [],
                paciente: [],
                pre: {
                }
            }
        },
        methods: {
            agregar() {           
                    db.collection("prescripcion").add({
                        usuMedico:this.user.uid,
                        usuPaciente:this.selec.key,
                        idMedicamento:this.selec1.key,
                        idDiagnostico:this.selec2.key ,
                        preDosis:this.pre.preDosis,
                        preFecha:new Date(),
                        preDiaTratamiento:this.pre.preDiaTratamiento,
                        preAdvertencia:this.pre.preAdvertencia,  
                                        
                    })
                    .then(() => {
                        alert("Prescripcion creado correctamente!"); 
                        this.selec = '',
                        this.selec1 = '',
                        this.selec2 = '',
                        this.pre.preDosis = '',
                        this.pre.preDiaTratamiento =  '',
                        this.pre.preAdvertencia =  ''            
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            
            
        },
        created() {

          firebase.auth().onAuthStateChanged(user => {

            if(user) {

            this.user = user

            } else {
               this.user = null
            }
          }),
         
         db.collection("persona").where("tipoRol", "==", "paciente").onSnapshot((snapshotChange) => {
                this.paciente = [];
                snapshotChange.forEach((doc) => {
                    this.paciente.push({
                        key: doc.id,
                        perNombre: doc.data().perNombre,
                        perApellido: doc.data().perApellido
                    })
                });
        }),

    
        db.collection('medicamento').onSnapshot((snapshotChange) => {
                this.medica = [];
                snapshotChange.forEach((doc) => {
                    this.medica.push({
                        key: doc.id,
                        medNombre: doc.data().medNombre,
                        medConcentracion: doc.data().medConcentracion
                    })
                });
        }),
        db.collection('diagnostico').onSnapshot((snapshotChange) => {
                this.diagnos = [];
                snapshotChange.forEach((doc) => {
                    this.diagnos.push({
                        key: doc.id,
                        diaCodigo: doc.data().diaCodigo,
                        diaNombre: doc.data().diaNombre
                    })
                });
        })
    }
       
    }
</script>

