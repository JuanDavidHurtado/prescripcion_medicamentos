<style module>
body {
  margin: 0;
  margin-bottom: 40px;
}

html {
  min-height: 100%;
  position: relative;
}
</style>

<template>
  <div id="app">
    <html lang="en" :class="$style.html">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body :class="$style.body">
        <VBarraMenu />
        <div class="container mt-5">
          <router-view></router-view>
        </div>
      </body>
    </html>
    <VFooter />
  </div>
</template>

<script>
import VBarraMenu from "./views/VLayout/VBarraMenu";
import VFooter from "./views/VLayout/VFooter";

export default {
  components: {
    VBarraMenu,
    VFooter
  }
};
</script>
