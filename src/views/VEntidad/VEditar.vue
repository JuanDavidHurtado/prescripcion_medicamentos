<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Actualizar Diagnostico</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Codigo</label>
                    <input type="text" class="form-control" v-model="Diag.diaCodigo" required>
                </div>

                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="Diag.diaNombre" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Actalizar Diagnostico</button>
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
                Diag: {
                }
            }
        },
        created() {
            let dbRef = db.collection('diagnostico').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.Diag = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('diagnostico').doc(this.$route.params.id)
                .update(this.Diag).then(() => {
                    console.log("Diagnostico actualizado con éxito!");
                    this.$router.push('/lis_dia')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>