import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/tailwind.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

function lazy(view) {
  return import(`@/views/${view}`)
}

import Login from '@/views/Login.vue'

const routes = [
  { 
    path: '/login',
    name: 'login', 
    component: Login,
    meta: {
      auth: false,
      layout: 'Empty'
    }
  },

  // 404
  { path: '/:pathMatch(.*)*', name: '404', redirect: { name: 'login' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)

app.use(VueTippy, {
  defaultProps: {
    animation: false,
    allowHTML: true,
    delay: [250, 0],
  },
})

app.mount('#app')
