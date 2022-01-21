import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthentication } from '@/composables/auth'
import App from './App.vue'
import './assets/tailwind.css'

import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

function lazy(view) {
  return () => import(`@/views/${view}`)
}

import Login from '@/views/Login.vue'
import Channel from '@/views/Channel.vue'

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

  { 
    path: '/channels/:id',
    name: 'channels.show', 
    component: Channel,
    meta: {
      layout: 'Application'
    }
  },

  { 
    path: '/browse-channels',
    name: 'channel.browser', 
    component: lazy('ChannelBrowser'),
    meta: {
      layout: 'Application'
    }
  },

  // 404
  { path: '/:pathMatch(.*)*', name: '404', redirect: { name: 'login' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const { isLoggedIn } = useAuthentication()

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.auth === undefined ? true : to.meta.auth

  if (requiresAuth && !(await isLoggedIn())) {
    next({ name: 'login' })
  } else {
    next()
  }
})

const app = createApp(App)

import AppLink from '@/components/Common/AppLink.vue'
app.component('AppLink', AppLink)

app.use(router)

app.use(VueTippy, {
  defaultProps: {
    animation: false,
    allowHTML: true,
    delay: [250, 0],
  },
})

app.mount('#app')
