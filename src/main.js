import { createApp } from 'vue'
import router from './router/index.js'
import App from './App.vue'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import * as CoIcons from 'oh-vue-icons/icons/co'
const Co = Object.values({...CoIcons})
addIcons(...Co)

import { VueResponsiveness } from 'vue-responsiveness'
// import "bootstrap/dist/css/bootstrap.css"
// import "bootstrap/dist/js/bootstrap.js"

import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(VueResponsiveness)
app.component('v-icon', OhVueIcon)
app.mount('#app')

// createApp(App).use(router).mount('#app')
