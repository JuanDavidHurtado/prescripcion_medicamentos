import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './plugins/fontawesome';
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import VuePaginate from 'vue-paginate';

import firebase from 'firebase';


Vue.use(VuePaginate);



Vue.config.productionTip = false

let app = null

firebase.auth().onAuthStateChanged(() => {

    if (!app) {

        app = new Vue({
            router,
            render: h => h(App)
        }).$mount("#app")

    }
})


