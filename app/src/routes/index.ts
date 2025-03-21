import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { LoginPage, HomePage } from '@/pages'
import { cookieExists } from '@/utils'
import { config } from '@/config'

const spotifyCookieName = config.spotify.cookieName || 'spotifyCookie'
const youtubeCookieName = config.youtube.cookieName || 'youtubeCookie'

function isLoggedIn(): boolean {
    return cookieExists(spotifyCookieName) || cookieExists(youtubeCookieName)
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
