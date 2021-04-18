<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Agregar Usuario</h3>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    <label>Nombre</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Correo eléctronico</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <label>Teléfono</label>
                    <input type="text" class="form-control" v-model="user.phone" required>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Guardar</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
    
    //import { db } from './firebaseDb.js';

    import firebase from 'firebase';


    const firebaseConfig = {

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
    
    apiKey: "AIzaSyAEBMx_ABx7UIKDWZPNiyZqUDTbIFU1wIQ",
    authDomain: "pre-med-ffbb1.firebaseapp.com",
    projectId: "pre-med-ffbb1",
    storageBucket: "pre-med-ffbb1.appspot.com",
    messagingSenderId: "887211409886",
    appId: "1:887211409886:web:7111432aa3ab0e7f409d4f",
    measurementId: "G-L7KJ7X8NM7"
}

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    export const db = firebaseApp.firestore();
   

  



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
                db.collection('users').add(this.user).then(() => {
                    alert("User successfully created!");
                    this.user.name = ''
                    this.user.email = ''
                    this.user.phone = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

