import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faPlus, faEdit, faUser, faTrash, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faPlus, faEdit, faUser, faTrash, faEnvelope, faLock)

Vue.component('font-awesome-icon', FontAwesomeIcon)