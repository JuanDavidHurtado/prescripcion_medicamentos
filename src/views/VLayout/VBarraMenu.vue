<template v-if="user">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="nav-link pr-3" to="/home">Prescripcion medicamentos</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto" >
      <li class="nav-item">
        <a class="nav-link">Medicamentos</a>
      </li>
      <li class="nav-item">
        <router-link class="nav-link pr-3" to="/login">Iniciar Sesión</router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          usuarios
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item"><router-link class="nav-link pr-3" to="/usuario">Agregar usuario</router-link></a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item"><router-link class="nav-link" to="/listar">Listar usuario</router-link></a>
        </div>
      </li>
    </ul>
    <form class="form-inline" >
    <button class="btn btn-outline-success my-2 my-sm-0" @click.prevent = "logout">
    {{ user.email }} </button>
  </form>

  </div>
</nav>
</template>

<template v-else>

<router-link class="nav-link pr-3" to="/login">Iniciar Sesión</router-link>

</template>

<script>
    
    import firebase from 'firebase';
   
    export default {
        data() {

        return  {

        user: null
            }
        },
        methods: {
           logout(){

            firebase.auth().signOut().then(()=> {

              this.$router.push({name:'login'})

            })
          }, 
        },

        created() {

          firebase.auth().onAuthStateChanged(user => {

            if(user) {

            this.user = user

            } else {
               this.user = null
            }
          })
    }
 }   
</script>

