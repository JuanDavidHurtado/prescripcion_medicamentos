import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faPlus, faEdit, faUser, faTrash, faEnvelope, faLock, faAmbulance,
    faUserEdit, faUsers, faUserNurse, faUserTimes, faUserMd, faUserCircle, faBriefcaseMedical, faCapsules, 
    faCalendarAlt, faClipboardList, faSearch, faHandHoldingMedical, faHandshake, faHeadSideMask} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faPlus, faEdit, faUser, faTrash, faEnvelope, faLock, faAmbulance, faUserEdit, faUsers,
    faUserNurse, faUserTimes, faUserMd, faUserCircle, faBriefcaseMedical, faCapsules, faCalendarAlt, 
    faClipboardList, faSearch, faHandHoldingMedical, faHandshake, faHeadSideMask)
Vue.component('font-awesome-icon', FontAwesomeIcon)