import { createRouter, createWebHistory } from 'vue-router'

import Login from "../src/components/Login.vue"
import Register from "../src/components/Register.vue"

const routes = [
  {
    path: '/',
        name: 'Login', 
        component: Login 

  },
    { path: '/login',
        name: 'Login', 
        component: Login 
    },
    { path: '/register',
        name: 'Register', 
        component: Register 
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router