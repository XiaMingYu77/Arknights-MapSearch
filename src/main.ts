import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import router from './router/router'
import 'amfe-flexible'
import store from './store'


createApp(App)
.use(router)
.use(store)
.mount('#app')
