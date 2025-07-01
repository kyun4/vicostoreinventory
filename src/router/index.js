import {createRouter, createWebHistory} from 'vue-router'
import HelloWorld from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/Products.vue'
import Inventory from '../views/Inventory.vue'
import Profile from '../views/Profile.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
           const { user, login, register, logout } = useAuth()
           if(user != null){
            next()
           }else{
            next('/login')
           }
        }
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        beforeEnter: (to, from, next) => {
           const { user, login, register, logout } = useAuth()
           if(user != null){
            next()
           }else{
            next('/login')
           }
        }
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: Inventory,
        beforeEnter: (to, from, next) => {
           const { user, login, register, logout } = useAuth()
           if(user != null){
            next()
           }else{
            next('/login')
           }
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: (to, from, next) => {
            const { user } = useAuth()
            if(user != null){
                next()
            } else{
                next('/login')
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router