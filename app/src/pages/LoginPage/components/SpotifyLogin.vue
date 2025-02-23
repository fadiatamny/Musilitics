<template>
    <NeonButton @click="loginWithSpotify" color="#1db954">
        Login with Spotify
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { NeonButton } from '@/components'

export default defineComponent({
    name: 'SpotifyLogin',
    components: {
        NeonButton
    },
    setup() {
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

            const data = event.data
            if (data.status === 'success') {
                console.log('Spotify login successful, token:', data.token)
            } else {
                console.error('Spotify login failed.')
            }
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
