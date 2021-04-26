import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase';



Vue.config.productionTip = false

let app = null

firebase.auth().onAuthStateChanged(() => {
  
    if (!app) {

    	new Vue({	
        router,
        render: h => h(App)
        }).$mount("#app")

    }
})


