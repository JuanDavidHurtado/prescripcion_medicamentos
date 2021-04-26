<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Login</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Ópciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.key">
                        <td>{{ user.usu_nombre }}</td>
                        <td>{{ user.usu_login }}</td>
                        <td>{{ user.usu_pwd }}</td>
                        <td>{{ user.usu_rol }}</td>
                        <td>
                            <router-link :to="{name: 'editar', params: {id: user.key}}" class="btn btn-primary">Edit
                            </router-link>
                            <button @click.prevent="deleteUser(user.key)" class="btn btn-danger">Delete</button>
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
                Users: []
            }
        },
        created() {
            db.collection('usuario').onSnapshot((snapshotChange) => {
                this.Users = [];
                snapshotChange.forEach((doc) => {
                    this.Users.push({
                        key: doc.id,
                        usu_nombre: doc.data().usu_nombre,
                        usu_login: doc.data().usu_login,
                        usu_pwd: doc.data().usu_pwd,
                        usu_rol: doc.data().usu_rol
                    })
                });
            })
        },
        methods: {
            deleteUser(id){
              if (window.confirm("¿De verdad quieres borrar?")) {
                db.collection("usuario").doc(id).delete().then(() => {
                    console.log("Documento eliminado!");
                })
                .catch((error) => {
                    console.error(error);
                })
              }
            }
        }
    }
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>