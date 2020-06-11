import Vue from 'vue'
import VueRouter from 'vue-router'
import ConvenView from '../views/ConvenView'
import MultiTwitchView from "../views/MultiTwitchView";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/conven',
    name: 'Home',
    component: ConvenView,
  },
  {
    path: '/twitch',
    name: 'About',
    component: MultiTwitchView,
  },
  {
    path : '*',
    redirect : '/conven'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;