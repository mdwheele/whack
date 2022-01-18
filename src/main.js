import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

const app = createApp(App)

app.use(VueTippy, {
  defaultProps: {
    animation: false,
    allowHTML: true,
    delay: [250, 0],
  },
})

app.mount('#app')
