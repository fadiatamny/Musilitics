<template>
    <NeonButton @click="loginWithSpotify" color="#1db954">
        Login with Spotify
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { NeonButton } from '@/components'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import { config } from '@/config'

type EventData = {
    status: string
    [key: string]: string
}

export default defineComponent({
    name: 'SpotifyLogin',
    components: {
        NeonButton
    },
    setup() {
        const router = useRouter()

        const loginWithSpotify = () => {
            const authUrl = `${import.meta.env.VITE_BACKEND_URI}/api/auth/spotify`
            window.open(authUrl, '_blank', 'width=500,height=600')
        }

        const handleAuthMessage = (event: MessageEvent) => {
            if (event.origin !== import.meta.env.VITE_BACKEND_URI) {
                console.warn(
                    'Received message from untrusted origin:',
                    event.origin
                )
                return
            }

            const { status, [config.spotify.cookieName]: cookieData } =
                (event.data ?? {}) as EventData

            if (!event.data || status !== 'success') {
                console.error('Spotify login failed.')
                return
            }

            document.cookie = `${config.spotify.cookieName}=${cookieData!}; path=/; secure; samesite=strict`
            sessionStorage.setItem('spotifyLogin', 'true')

            nextTick(() => {
                router.push({ name: 'Home' })
            })
        }

        onMounted(() => {
            window.addEventListener('message', handleAuthMessage)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('message', handleAuthMessage)
        })

        return {
            loginWithSpotify
        }
    }
})
</script>

<style scoped lang="scss"></style>
