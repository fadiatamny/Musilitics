<template>
    <NeonButton @click="loginWithYoutube" color="#ff0000">
        Login with Youtube
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NeonButton } from '@/components'

export default defineComponent({
    name: 'YoutubeLogin',
    components: {
        NeonButton
    },
    setup() {
        const loginWithYoutube = () => {
            const authUrl = `${import.meta.env.VITE_BACKEND_URI}/api/auth/youtube`
            window.open(authUrl, '_blank', 'width=500,height=600')
        }

        return {
            loginWithYoutube
        }
    }
})
</script>

<style scoped lang="scss"></style>
