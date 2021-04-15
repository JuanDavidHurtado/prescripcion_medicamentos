<template>
<div id="app">

<nav class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row">
      <div class="container">
        <a class="navbar-brand float-left">Prescripcion medicamentos</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/about">Acerca de</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/usuario">Agregar usuario</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-5">
      <router-view></router-view>
    </div>

</div>
</template>
