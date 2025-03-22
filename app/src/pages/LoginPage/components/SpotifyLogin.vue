<template>
    <NeonButton @click="loginWithSpotify" color="#1db954">
        Login with Spotify
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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

        return {
            loginWithSpotify
        }
    }
})
</script>

<style scoped lang="scss"></style>
