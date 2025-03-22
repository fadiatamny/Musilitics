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
import { handleLoginEvent } from '@/utils'

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
            if (handleLoginEvent('spotify', event)) {
                nextTick(() => {
                    router.push({ name: 'Home' })
                })
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
