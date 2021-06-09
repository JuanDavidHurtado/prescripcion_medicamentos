<template>
<div class="container">

    <h2>{{ titulo }}</h2>

   


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
                user: {},
                medica: [],
                diagnos: [],
                paciente: [],
                pre: {
                },
                nume: []
                
            }
        },
        methods: {
            
            agregar() {  
                    
                    const numCont1 = this.nume[0].numContador+=1
                    db.collection("prescripcion").add({
                        usuMedico:this.user.uid,
                        usuPaciente:this.selec,
                        idMedicamento:this.selec1,
                        idDiagnostico:this.selec2,
                        preDosis:this.pre.preDosis,
                        preFecha:new Date(),
                        preDiaTratamiento:this.pre.preDiaTratamiento,
                        preAdvertencia:this.pre.preAdvertencia, 
                        idNumeracion:this.nume[0],
                        preContador:numCont1                                      
                    })
                    if (this.nume[0].numFinal == this.nume[0].numContador) {

                        var estado = 'inactivo';
                        db.collection("numeracion")
                        .doc(this.nume[0].key)
                        .update({numEstado: estado})
                        
                    }

                    const numCont = numCont1//this.nume[0].numContador
                    db.collection("numeracion")
                    .doc(this.nume[0].key)
                    .update({numContador: numCont})

                    .then(() => {
                        alert("Formato  de prescripcion creado correctamente!"); 
                        this.selec = '',
                        this.selec1 = '',
                        this.selec2 = '',
                        this.pre.preDosis = '',
                        this.pre.preDiaTratamiento =  '',
                        this.pre.preAdvertencia =  '',
                        this.$router.replace('/home')           
                    }).catch((error) => {
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
          })
         /*  db.collection('users')
                    .where('user_id', '==', user.id)
                    .get() 
                    .then(querySnapshot => { 
                        if(querySnapshot.docChanges().length === 0){ 
                            //Add new user to DB db.collection
                            ('users').add(user); } 
                            
                            }).catch((err) => { console.log(err); 
                        });*/
          db.collection("numeracion").where("numEstado", "==", "activo")
            .get()
            .then((querySnapshot) => {
                this.nume = [];
                 querySnapshot.forEach((doc) => {

                     console.log(doc);

                      this.nume.push({
                        key: doc.id,
                        numInicial: doc.data().numInicial,
                        numFinal: doc.data().numFinal,
                        numYear: doc.data().numYear,
                        numEstado: doc.data().numEstado,
                        numContador: doc.data().numContador,
                    })     
                });
            })
            .catch((error) => {
                 console.log("Error getting documents: ", error);
            });

         
         db.collection("persona").where("tipoRol.rolNombre", "==", "paciente").onSnapshot((snapshotChange) => {
                this.paciente = [];
                snapshotChange.forEach((doc) => {
                    this.paciente.push({
                        key: doc.id,
                        perNombre: doc.data().perNombre,
                        perApellido: doc.data().perApellido
                    })
                });
         })

    
        db.collection('medicamento').onSnapshot((snapshotChange) => {
                this.medica = [];
                snapshotChange.forEach((doc) => {
                    this.medica.push({
                        key: doc.id,
                        medNombre: doc.data().medNombre,
                        medConcentracion: doc.data().medConcentracion
                    })
                });
        })
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

