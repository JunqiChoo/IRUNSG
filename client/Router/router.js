import { createRouter, createWebHistory } from 'vue-router'

import Login from "../src/components/Login.vue"
import Register from "../src/components/Register.vue"
import Home from "../src/components/Home.vue"

const routes = [
  
    { path: '/login',
        name: 'Login', 
        component: Login 
    },
    { path: '/register',
        name: 'Register', 
        component: Register 
    }
    ,
    { path: '/home',
        name: 'Home', 
        component: Home 
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router