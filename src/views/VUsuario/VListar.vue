<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
            <hr>

<router-link class="btn btn-outline-primary" to="/agr_usu">Agregar Usuario</router-link>
    <div class="col-md-12"><br/>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Tipo Docmento</th>
                        <th>Documento</th>
                        <th>Fecha Nacimiento</th>
                        <th>Teléfono</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Opcion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="u in usuario" :key="u.key">
                        <td>{{ u.perNombre }}</td>
                        <td>{{ u.perApellido }}</td>
                        <td>{{ u.perTipDocumento }}</td>
                        <td>{{ u.perDocumento }}</td>
                        <td>{{ u.perFecNacimiento }}</td>
                        <td>{{ u.perTelefono }}</td>
                        <td>{{ u.perDepartamento }}</td>
                        <td>{{ u.perMunicipio }}</td>
                        <td>
                            <router-link :to="{name: 'edi_usu', params: {id: u.key}}" class="btn btn-outline-primary">Editar
                            </router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { db } from '../../firebaseDb';

    
    
    export default {
        data() {
            return {
                titulo: 'Lista Usuario',
                usuario: []
            }
        },
        created() {
             db.collection("persona").where("tipoRol.rolNombre", "!=", "paciente").onSnapshot((snapshotChange) => {
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
                        perMunicipio: doc.data().perMunicipio
                    })
                });
            })
        }
    }
</script>
