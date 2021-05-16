<template>
<div id="app">

    <VBarraMenu/>

<div class="container mt-5">
    <router-view></router-view>
</div>

    <VFooter/>

</div>

</template>




<script>
    
  import VBarraMenu from './views/VLayout/VBarraMenu';
  import VFooter from './views/VLayout/VFooter';
  
  export default {

  components: {

        VBarraMenu,
        VFooter
    }   
 }   
</script>
