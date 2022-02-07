<style module>
.th {
  font-size: small
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
  background-color: #7752CA;
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

    <router-link class="btn btn-primary" to="/agr_pac" style="background-color: #7752CA;"
      ><font-awesome-icon icon="plus" /> Agregar</router-link
    >
    <div class="col-md-12">
      <br />
      <paginate ref="paginator" name="pac" :list="pac" :per="4">
      <table class="table table-sm table-bordered">
        <thead>
          <tr :class="$style.th">
            <th>Regimen</th>
            <th>Ips</th>
            <th>Nombres</th>
            <th>Tipo Documento</th>
            <th>Documento</th>
            <th>Fecha Nacimiento</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Eps</th>
            <th>Departamento</th>
            <th>Municipio</th>
            <th>Opcion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in paginated('pac')" :key="p.key" :class="$style.th">
            <td>{{ p.perRegimen }}</td>
            <td>{{ p.perEntidad }}</td>
            <td>{{ p.perNombre + " " + p.perApellido }}</td>
            <td>{{ p.perTipDocumento }}</td>
            <td>{{ p.perDocumento }}</td>
            <td>{{ p.perFecNacimiento }}</td>
            <td>{{ p.perTelefono }}</td>
            <td>{{ p.perCorreo }}</td>
            <td>{{ p.perEps }}</td>
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
      </paginate>
       <paginate-links 
        for="pac"
        :show-step-links="true"
        :simple="{
          next: 'Siguiente',
          prev: 'Anterior'
        }"
      ></paginate-links>

    </div>
  </div>
</template>

<script>
import { db } from "../../firebaseDb";

export default {
  data() {
    return {
      titulo: "LISTA PACIENTE",
      paginate: ["pac"],
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
            perEps: doc.data().perEps,
            perDepartamento: doc.data().perDepartamento,
            perApellido: doc.data().perApellido,
            perMunicipio: doc.data().perMunicipio,
          });
        });
      });
  },
};
</script>
