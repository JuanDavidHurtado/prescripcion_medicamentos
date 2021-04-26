<template>
<div class="col-lg-3">
     <form @submit.prevent="login">
        <div class="alert alert-danger" role="alert" v-if="error">
     {{ error }}
   </div>
                

                <div class="form-group">
                    <label>Login</label>
                    <input type="text" v-model="email" class="form-control" placeholder="Correo eléctronico"/>
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" v-model="password" class="form-control" placeholder="Contraseña"/>
                </div>


                <div class="form-group">
                    <button class="btn btn-primary btn-block">Iniciar Sesión</button>
                </div>
</form>

</div>
  
</template>

<script>

 import firebase from 'firebase';

 export default {

  data(){
      return{
          email:'',
          password:'',
          error:''
        }
      },
          name:'login',

       methods:{

      login(){
      this.error = ''

      if(this.email && this.password) {

            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {

            this.$router.push({name: 'home'})

            }).catch(err => {

              this.error = err.message
        })

        }else{

        this.error = 'Todos los campos son requeridos'

        }
      }
    }
 }

</script>
