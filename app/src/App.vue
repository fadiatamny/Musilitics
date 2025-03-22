<template>
    <q-layout view="hhh lpp fff">
        <q-header elevated class="transparent">
            <q-toolbar>
                <q-avatar size="64px">
                    <img src="@/assets/logo-box.png" />
                </q-avatar>
                <q-toolbar-title class="text-glow text-h5">
                    Musilitics
                </q-toolbar-title>

                <div class="flex justify-center">
                    <div v-if="isHome" class="flex justify-center">
                        <q-btn
                            v-if="isNotLoggedIn('youtube')"
                            class="text-glow"
                            dense
                            flat
                            round
                            icon="img:src/assets/youtube.svg"
                            @click="loginWithYoutube"
                        />
                        <q-btn
                            v-if="isNotLoggedIn('spotify')"
                            class="text-glow"
                            dense
                            flat
                            round
                            icon="img:src/assets/spotify.svg"
                            @click="loginWithSpotify"
                        />
                    </div>

                    <q-separator
                        vertical
                        v-if="
                            isHome &&
                            (isNotLoggedIn('youtube') ||
                                isNotLoggedIn('spotify'))
                        "
                        style="margin: 0 15px"
                    />
                    <q-btn
                        class="text-glow"
                        dense
                        flat
                        round
                        :icon="darkMode ? 'dark_mode' : 'light_mode'"
                        @click="toggleDarkMode"
                    />
                </div>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <div style="padding: 15px 15px; width: 100vw; height: 90vh">
                <router-view />
            </div>
        </q-page-container>

        <q-footer
            elevated
            class="transparent text-center"
            style="color: var(--subtext-color); padding-top: 10px"
        >
            <p>
                © 2025 Musilitics. All rights reserved. | Designed for music
                lovers 🎵
            </p>
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import {
    ref,
    defineComponent,
    onMounted,
    computed,
    nextTick,
    onBeforeUnmount,
    watch
} from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import router from '@/routes'
import {
    cookieExists,
    handleLoginEvent,
    loginWithSpotify,
    loginWithYoutube
} from '@/utils'
import { config } from '@/config'

export default defineComponent({
    setup() {
        const $q = useQuasar()
        const darkMode = ref($q.dark.isActive)
        const route = useRoute()

        onMounted(() => {
            darkMode.value = sessionStorage.getItem('darkMode') === 'true'

            $q.dark.set(darkMode.value)
        })

        const toggleDarkMode = () => {
            darkMode.value = !darkMode.value
            $q.dark.set(darkMode.value)
            sessionStorage.setItem('darkMode', darkMode.value.toString())
        }

        const isHome = computed(() => route.path === '/')

        const handleAuthMessage = (event: MessageEvent) => {
            if (handleLoginEvent(event)) {
                nextTick(() => {
                    router.push({ name: 'Home', force: true, replace: true })
                })
            }
        }

        const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

        const vendors = ref<string[]>([])
        const cookieSnapshot = ref(document.cookie)

        watch(
            cookieSnapshot,
            () => {
                const newVendors = []

                if (cookieExists(config.spotify.cookieName)) {
                    newVendors.push('spotify')
                }
                if (cookieExists(config.youtube.cookieName)) {
                    newVendors.push('youtube')
                }

                vendors.value = newVendors
            },
            { immediate: true }
        )

        onMounted(() => {
            window.addEventListener('message', handleAuthMessage)

            intervalId.value = setInterval(() => {
                const currentCookie = document.cookie
                if (cookieSnapshot.value !== currentCookie) {
                    cookieSnapshot.value = currentCookie
                }
            }, 300)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('message', handleAuthMessage)
            if (intervalId.value) {
                clearInterval(intervalId.value)
            }
        })

        const isNotLoggedIn = (provider: 'spotify' | 'youtube') => {
            return !vendors.value.includes(provider)
        }

        return {
            darkMode,
            toggleDarkMode,
            isHome,
            loginWithSpotify,
            loginWithYoutube,
            isNotLoggedIn
        }
    }
})
</script>

<style lang="scss" scoped></style>
