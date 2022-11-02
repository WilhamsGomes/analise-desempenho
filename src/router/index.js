import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/atletas',
    name: 'Atletas',
    component: () => import('../views/Atletas.vue')
  },
  {
    path: '/dadosindividuais',
    name: 'DadosIndividuais',
    component: () => import('../views/DadosIndividuais.vue')
  },
  {
    path: '/dadostreino',
    name: 'DadosTreino',
    component: () => import('../views/DadosTreinos.vue')
  },
  {
    path: '/historico',
    name: 'Historico',
    component: () => import('../views/Historico.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
