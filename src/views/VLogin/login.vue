<template>
<div class="container">
  <div class="row">
    <div class="col-6" style="padding: 5% 0 0;">
      <h3 style = "color: #007C9B;">SISTEMA DE INFORMACIÓN XXXXX</h3><hr>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
      Earum iste quae cupiditate autem? Quis perspiciatis dolorem a 
      quod laudantium animi ea maxime quos mollitia, praesentium minus doloribus 
      asperiores libero veritatis!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis veritatis voluptates quis laboriosam dolore asperiores illum error dicta repellendus necessitatibus cupiditate inventore, aut dolorum aliquam beatae assumenda minima quibusdam et.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem hic ex quasi vitae quisquam harum amet modi voluptates officia iure, mollitia repellat itaque eius culpa, voluptatem, quo aut sit repellendus!
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolorum deserunt tempore nemo saepe sint voluptatibus necessitatibus eius molestias magnam, reprehenderit, sapiente quis voluptatem dignissimos? Sit culpa provident molestiae veritatis.

    </div>
    <div class="col-1">
     
    </div>
    <div class="col-5">     
      <div style="padding: 20% 0 0; margin: 0 auto 100px; max-width: 400px; " class="row text-center">
  
  <div class="alert alert-danger" role="alert" v-if="error">
            {{ error }}
   </div>

     <div style="box-shadow: 0 0 15px 0 rgba(84, 84, 84, 0.62);" class="col-md-12">

        <form @submit.prevent="login"> 

          <div class="row">
            <div  style="padding-top: 16px;" class="col-md-12" >
              <p style = "font-size:25px; font-weight: bold;"><span style = "color: #007C9B;">INICIO DE SESIÓN</span></p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12" style ="padding-top: 16px; padding-bottom: 16px;">
              <input type="text" v-model="email" class="form-control" placeholder="Correo eléctronico"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12" style ="padding-top: 16px; padding-bottom: 16px;">
             <input type="password" v-model="password" class="form-control" placeholder="Contraseña"/>
            </div>
          </div>

          <div class="row">
             <div class="col-md-12" style ="padding-top: 16px; padding-bottom: 16px;">
                <button class="btn btn-info btn-block">Ingresar</button>
             </div>
          </div>

       </form>

    </div>
 </div>
    </div>
  </div>
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
