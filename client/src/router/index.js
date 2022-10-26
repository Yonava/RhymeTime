import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Host from '@/views/Host.vue'
import Player from '@/views/Player.vue'
import Join from '@/views/Join.vue'
import Audience from '@/views/Audience.vue'

Vue.use(VueRouter)

// routes
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
    component: Player
  },
  {
    path: '/join',
    name: 'join',
    component: Join
  },
  {
    path: '/audience',
    name: 'audience',
    component: Audience
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
