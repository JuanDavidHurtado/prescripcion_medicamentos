<template>
<div id="app">

    <VBarraMenu/>

<div class="container mt-5">
    <router-view></router-view>
</div>

</div>

</template>




<script>
    
  import VBarraMenu from './views/VLayout/VBarraMenu';
  
  export default {

  components: {

        VBarraMenu
    }   
 }   
</script>
