import { createApp } from 'vue'
import { Quasar } from 'quasar'

import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import './style.css'
import './style-utils.scss'

import App from './App.vue'
import router from './routes'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
    plugins: {},
    config: { dark: true }
})
app.mount('#app')
