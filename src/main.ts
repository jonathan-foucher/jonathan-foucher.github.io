import { createApp } from 'vue'
import App from '@/App.vue'

// Quasar
import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/en-GB'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// flag-icons
import 'flag-icons/css/flag-icons.min.css'

// pinia store
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(Quasar, {
    plugins: {},
    lang: quasarLang,
  })
  .mount('#app')
