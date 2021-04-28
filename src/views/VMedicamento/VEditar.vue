<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Actualizar usuario</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="med.medCodigo" required>
                </div>

                <div class="form-group">
                    <label>Login</label>
                    <input type="text" class="form-control" v-model="med.medNombre" required>
                </div>

                <div class="form-group">
                    <label>Contraseña</label>
                    <input type="text" class="form-control" v-model="med.medConcentracion" required>
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <input type="text" class="form-control" v-model="med.medPresentacion" required>
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
                med: {
                }
            }
        },
        created() {
            let dbRef = db.collection('medicamento').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.med = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('medicamento').doc(this.$route.params.id)
                .update(this.med).then(() => {
                    console.log("Medicamento actualizado con éxito!");
                    this.$router.push('/lis_med')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>