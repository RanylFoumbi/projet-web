import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Home from '../Home.vue'
import store from '../store'

const routes: any = [
    { path: '/:pathMatch(.*)*', component: Login },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _, next) => {
    if (to.matched.some((record: any) => record.meta.requiresAuth)) {
        if (!store.state.auth.user) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
