<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Actualizar usuario</h3>
            <form @submit.prevent="onUpdateForm">
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
                    <input type="text" class="form-control" v-model="user.usu_pwd" required>
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <input type="text" class="form-control" v-model="user.usu_rol" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Actalizar Usuario</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    
    import { db } from '../../firebaseDb';

    export default {
        data() {
            return {
                user: {
                }
            }
        },
        created() {
            let dbRef = db.collection('usuario').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.user = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('usuario').doc(this.$route.params.id)
                .update(this.user).then(() => {
                    console.log("Usuario actualizado con éxito!");
                    this.$router.push('/listar')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>