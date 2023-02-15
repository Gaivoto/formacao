import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import i18n from './i18n'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'pattern.css'

createApp(App)
    .use(router)
    .use(store)
    .use(i18n)
    .mount('#app')