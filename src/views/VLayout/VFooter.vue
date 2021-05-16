<template>
<div v-if="user">
<footer style="
  position:relative; height: 100%; background: #f1f1f1; text-align: center;">
  <div style = "padding:25px;">
        Prescripción de Medicamentos de Control Especial. &copy; Todos los derechos reservados.
        <br>
        Sitio Web Desarrollado por **************************.
   </div>
</footer>
</div>
</template>
<script>
    
    import firebase from 'firebase';
   
    export default {
        data() {

        return  {

        user: null
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
    }
 }   
</script>


