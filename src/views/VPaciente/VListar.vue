<style module>
.th {
  font-size: small
}
</style>

<template>
  <div>
    <h4>{{ titulo }}</h4>
    <hr />

    <router-link class="btn btn-primary" to="/agr_pac" style="background-color: #7752CA;"
      ><font-awesome-icon icon="plus" /> Agregar Paciente</router-link
    >
    <div class="col-md-12">
      <br />
      <table class="table table-sm table-bordered">
        <thead>
          <tr :class="$style.th">
            <th>Regimen</th>
            <th>Eps</th>
            <th>Nombres</th>
            <th>Tipo Documento</th>
            <th>Documento</th>
            <th>Fecha Nacimiento</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Departamento</th>
            <th>Municipio</th>
            <th>Opcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pac" :key="p.key" :class="$style.th">
            <td>{{ p.perRegimen }}</td>
            <td>{{ p.perEntidad }}</td>
            <td>{{ p.perNombre + " " + p.perApellido }}</td>
            <td>{{ p.perTipDocumento }}</td>
            <td>{{ p.perDocumento }}</td>
            <td>{{ p.perFecNacimiento }}</td>
            <td>{{ p.perTelefono }}</td>
            <td>{{ p.perCorreo }}</td>
            <!--td>{{ p.perDepartamento.depNombre }}</td>
            <td>{{ p.perMunicipio.munNombre }}</td-->
            <td>{{ p.perDepartamento }}</td>
            <td>{{ p.perMunicipio }}</td>
            <td>
              <router-link
                :to="{ name: 'edi_pac', params: { id: p.key } }"
                style="color: #7752CA;" 
              >
                <font-awesome-icon icon="edit" />
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
      titulo: "LISTA PACIENTE",
      pac: [],
    };
  },
  created() {
    db.collection("paciente")
      //.where("tipoRol", "==", "paciente")
      .onSnapshot((snapshotChange) => {
        this.pac = [];
        snapshotChange.forEach((doc) => {
          this.pac.push({
            key: doc.id,
            perRegimen: doc.data().perRegimen,
            perEntidad: doc.data().perEntidad,
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
          });
        });
      });
  },
};
</script>
