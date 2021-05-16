<template>
    <div class="container">
        <h2>{{ titulo }}</h2>
            <hr>

<router-link class="btn btn-outline-primary" to="/agr_pac">Agregar Paciente</router-link>
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
                        <th>Correo</th>
                        <th>Departamento</th>
                        <th>Municipio</th>
                        <th>Opcion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="p in pac" :key="p.key">
                        <td>{{ p.perNombre }}</td>
                        <td>{{ p.perApellido }}</td>
                        <td>{{ p.perTipDocumento }}</td>
                        <td>{{ p.perDocumento }}</td>
                        <td>{{ p.perFecNacimiento }}</td>
                        <td>{{ p.perTelefono }}</td>
                        <td>{{ p.perCorreo }}</td>
                        <td>{{ p.perDepartamento }}</td>
                        <td>{{ p.perMunicipio }}</td>
                        <td>
                            <router-link :to="{name: 'edi_pac', params: {id: p.key}}" class="btn btn-outline-primary">Editar
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
                titulo: 'Lista Pacientes',
                pac: [],
                medi: {
                }
            }
        },
        created() {
             db.collection("persona").where("tipoRol", "==", "paciente").onSnapshot((snapshotChange) => {
                this.pac = [];
                snapshotChange.forEach((doc) => {
                    this.pac.push({
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
