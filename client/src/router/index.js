import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/HomeView.vue'
import Host from '@/views/HostView.vue'
import Play from '@/views/PlayView.vue'
import Join from '@/views/JoinView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/host',
    name: 'host',
    component: Host
  },
  {
    path: '/play',
    name: 'play',
    component: Play
  },
  {
    path: '/join',
    name: 'join',
    component: Join
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
