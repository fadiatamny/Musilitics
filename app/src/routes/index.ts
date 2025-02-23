import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { LoginPage, HomePage } from '@/pages'

function isLoggedIn(): boolean {
    return (
        sessionStorage.getItem('spotifyLogin') === 'true' ||
        sessionStorage.getItem('youtubeLogin') === 'true'
    )
}

const routes: Array<RouteRecordRaw> = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/login', name: 'Login', component: LoginPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    if (to.name !== 'Login' && !isLoggedIn()) {
        next({ name: 'Login' })
    } else if (to.name === 'Login' && isLoggedIn()) {
        next({ name: 'Home' })
    } else {
        next()
    }
})

export default router
