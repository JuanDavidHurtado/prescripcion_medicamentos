<style module>
footer {
  background-color: #e0ebeb;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  /*color: white;*/
}
</style>

<template>
  <div v-if="user"><br>
    <footer class="text-center" :class="$style.footer">
      <!-- Copyright -->
      <div style="color: black;">
        Copyright © 2021<a style="color: black;"
          target="blank"
          href="https://www.ipsnuevapopayan.com/"
        >
          Ips Nueva Popayán</a
        >
        Todos los Derechos Reservados
      </div>

      <div style="color: black;">Desarrollado por <b>Estudiantes de Ingenieria de Sistemas</b></div>
      <!-- Copyright -->
    </footer>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>


