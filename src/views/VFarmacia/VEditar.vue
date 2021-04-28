<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Actualizar Farmacia</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Nit</label>
                    <input type="text" class="form-control" v-model="farma.farNit" required>
                </div>

                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="farma.farNombre" required>
                </div>

                <div class="form-group">
                    <label>Departamento</label>
                    <input type="text" class="form-control" v-model="farma.farDepartamento" required>
                </div>

                <div class="form-group">
                    <label>Municipio</label>
                    <input type="text" class="form-control" v-model="farma.farMunicipio" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Actalizar Farmacia</button>
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
                farma: {
                }
            }
        },
        created() {
            let dbRef = db.collection('farmacia').doc(this.$route.params.id);
            dbRef.get().then((doc) => {
                this.farma = doc.data();
            }).catch((error) => {
                console.log(error)
            })
        },
        methods: {
            onUpdateForm(event) {
                event.preventDefault()
                db.collection('farmacia').doc(this.$route.params.id)
                .update(this.farma).then(() => {
                    console.log("Farmacia actualizado con éxito!");
                    this.$router.push('/lis_far')
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>