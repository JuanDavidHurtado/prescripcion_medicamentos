<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Agregar Usuario</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="user.usu_nombre" required>
                </div>

                <div class="form-group">
                    <label>Login</label>
                    <input type="text" class="form-control" v-model="user.usu_login" required>
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="password" class="form-control" v-model="user.usu_pwd" required>
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <input type="text" class="form-control" v-model="user.usu_rol" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Guardar</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    
    import {db} from '../../firebaseDb';

   
    export default {
        data() {
            return {
                user: {
                }
            }
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('usuario').add(this.user).then(() => {
                    alert("Usuario creado correctamente!");
                    this.user.usu_nombre = ''
                    this.user.usu_login = ''
                    this.user.usu_pwd = ''
                    this.user.usu_rol = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

