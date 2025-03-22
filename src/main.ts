import { createApp } from 'vue'
import App from './App.vue'

// Quasar
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-GB'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

createApp(App)
    .use(Quasar, {
        plugins: {},
        lang: quasarLang,
    })
    .mount('#app')
