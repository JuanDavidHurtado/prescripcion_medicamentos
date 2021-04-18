<template>
<div id="app">


<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand"><router-link class="nav-link pr-3" to="/">Prescripcion medicamentos</router-link></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          usuarios
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item"><router-link class="nav-link pr-3" to="/usuario">Agregar usuario</router-link></a>
          <a class="dropdown-item"><router-link class="nav-link" to="/listar">Listar usuario</router-link></a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    
    <div class="container mt-5">
      <router-view></router-view>
    </div>

</div>
</template>
