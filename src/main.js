// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(router)
app.use(Quasar, { plugins: {} })

app.mount('#app')
