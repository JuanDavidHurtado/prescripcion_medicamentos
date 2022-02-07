<style module>
.th {
  font-size: small;
}

.input_txt {
  border: 1px solid #848484;
  padding: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 5px;
  color: #0b2f3a;
  max-width: 558px;
  min-width: 158px;
  text-transform: uppercase;
  float: right;
}
</style>

<style>
.paginate-links {
  width: 100%;
  list-style: none;
  text-align: center;
}
.paginate-links li {
  display: inline;
  background-color: #7752ca;
  color: white;
  padding: 0.3rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  cursor: pointer;
  border-radius: 3px;
  float: right;
}
.paginate-result {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}
</style>

<template>
  <div>
    <h4>{{ titulo }}</h4>
    <hr />
    <div class="col-sm-12">
      <router-link
        class="btn btn-primary"
        to="/agr_usu"
        style="background-color: #7752CA;"
        ><font-awesome-icon icon="plus" /> Agregar</router-link
      >
      <!--input
        type="text"
        :class="$style.input_txt"
        placeholder="Buscar..."
        v-model="buscar"
      /-->
    </div>
    <div class="col-md-12">
      <br />
      <paginate ref="paginator" name="usuario" :list="usuario" :per="4">
        <table class="table table-bordered table-sm">
          <thead>
            <tr :class="$style.th">
              <th>Rol</th>
              <th>Nombres</th>
              <th>Tipo Documento</th>
              <th>Documento</th>
              <th>Fecha Nacimiento</th>
              <th>Teléfono</th>
              <th>Departamento</th>
              <th>Municipio</th>
              <th>Opcion</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="u in paginated('usuario')"
              :key="u.key"
              :class="$style.th"
            >
              <!--p v-for="string in paginated('arrayStrings')" :key="string.id">{{string}}</p-->
              <td>{{ u.tipoRol }}</td>
              <td>{{ u.perNombre + " " + u.perApellido }}</td>
              <td>{{ u.perTipDocumento }}</td>
              <td>{{ u.perDocumento }}</td>
              <td>{{ u.perFecNacimiento }}</td>
              <td>{{ u.perTelefono }}</td>
              <td>{{ u.perDepartamento }}</td>
              <td>{{ u.perMunicipio }}</td>
              <td>
                <router-link
                  :to="{ name: 'edi_usu', params: { id: u.key } }"
                  class="btn btn-primary btn-sm"
                  style="background-color: #7752CA;"
                >
                  <font-awesome-icon icon="edit" /> Editar
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </paginate>
      <paginate-links
        for="usuario"
        :show-step-links="true"
        :simple="{
          prev: 'Anterior',
          next: 'Siguiente'
        }"
      ></paginate-links>
    </div>
    <!---------------------------------------------------->

    <!--div class="col-md-12 text-center">
            <paginate name = "arrayStrings" :list = "arrayStrings" :per = "5">
                <p v-for="string in paginated('arrayStrings')" :key="string.id">{{string}}</p>
            </paginate>
               <paginate-links
                for="arrayStrings"
                :show-step-links="true"
                :simple="{
                    prev: 'Anterior',
                    next: 'Siguiente'  
                }"
               ></paginate-links>
      </div-->
    <!------------------------------------>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {
      paginate: ["usuario"],
      /*arrayStrings:[
        "String1","String2","String3","String4","String5","String6","String7","String8","String9","String10",
        "String11","String12","String13","String14","String15","String16","String17","String18","String19",
        "String20",
      ],*/
      titulo: "LISTA USUARIO",
      // paginate:['usuario'],
      usuario: [],
      buscar: ""
    };
  },

  computed: {
    filtrarUsuario: function() {
      return this.usuario.filter(u => {
        return u.perDocumento.toLowerCase().includes(this.buscar.toLowerCase());
        /*||
          item.noticia_titulo_cas
            .toLowerCase()
            .includes(this.noticia_titulo_cas.toLowerCase()) ||
          item.lanak_titulo_cas
            .toLowerCase()
            .includes(this.noticia_titulo_cas.toLowerCase()) ||
          item.noticia_fecha
            .toLowerCase()
            .includes(this.noticia_titulo_cas.toLowerCase())*/
      });
    }
  },

  created() {
    db.collection("persona")
      //.where("tipoRol", "!=", "paciente")
      .onSnapshot(snapshotChange => {
        this.usuario = [];
        snapshotChange.forEach(doc => {
          this.usuario.push({
            key: doc.id,
            perNombre: doc.data().perNombre,
            perApellido: doc.data().perApellido,
            perTipDocumento: doc.data().perTipDocumento,
            perDocumento: doc.data().perDocumento,
            perFecNacimiento: doc.data().perFecNacimiento,
            perTelefono: doc.data().perTelefono,
            perCorreo: doc.data().perCorreo,
            perDepartamento: doc.data().perDepartamento,
            perApellido: doc.data().perApellido,
            perMunicipio: doc.data().perMunicipio,
            tipoRol: doc.data().tipoRol,
            idUsuario: doc.data().idUsuario
          });
        });
      });
  }
};
</script>
