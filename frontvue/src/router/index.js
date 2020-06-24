import Vue from 'vue'
import VueRouter from 'vue-router'
import ConvenView from '../views/ConvenView'
import MultiTwitchView from "../views/MultiTwitchView";
import ConvenEditView from "../views/ConvenEditView";
import LoginView from "../views/LoginView";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/conven',
    name: 'Home',
    component: ConvenView,
  },
  {
    path: '/conEdit',
    name: 'cEdit',
    component: ConvenEditView,
  },
  {
    path: '/twitch',
    name: 'About',
    component: MultiTwitchView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
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