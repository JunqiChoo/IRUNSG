import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import router from '../Router/router.js'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import App from './App.vue'
import 'vue-toastification/dist/index.css' 
import 'leaflet/dist/leaflet.css';

createApp(App).use(Toast).use(router).mount('#app')
