import { createApp } from 'vue'
import App from '@/App.vue'

// quasar
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/en-GB'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

// flag icons
import 'flag-icons/css/flag-icons.min.css'

// pinia store
import { createPinia } from 'pinia'

const pinia = createPinia()

// i18n
import { createI18n } from 'vue-i18n'
import translations from '@/assets/json/translations.json'

const i18n = createI18n({
  fallbackLocale: 'en-GB',
  messages: translations,
})

// create app
createApp(App)
  .use(pinia)
  .use(i18n)
  .use(Quasar, {
    plugins: { Notify },
    lang: quasarLang,
  })
  .mount('#app')
