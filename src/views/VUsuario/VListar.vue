<style module>
.th {
  font-size: small
}
</style>

<template>
  <div>
    <h4>{{ titulo }}</h4>
    <hr />

    <router-link class="btn btn-primary" to="/agr_usu" style="background-color: #7752CA;"
      ><font-awesome-icon icon="plus" /> Agregar Usuario</router-link
    >
    <div class="col-md-12">
      <br />
      <table class="table table-bordered">
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
          <tr v-for="u in usuario" :key="u.key" :class="$style.th">
            <td>{{ u.tipoRol }}</td>
            <td>{{ u.perNombre + u.perApellido }}</td>
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
    </div>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {
      titulo: "LISTA USUARIO",
      usuario: [],
    };
  },
  created() {
    db.collection("persona")
      //.where("tipoRol", "!=", "paciente")
      .onSnapshot((snapshotChange) => {
        this.usuario = [];
        snapshotChange.forEach((doc) => {
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
            tipoRol: doc.data().tipoRol
          });
        });
      });
  },
};
</script>
