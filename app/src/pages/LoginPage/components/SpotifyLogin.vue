<template>
    <NeonButton @click="loginWithSpotify" color="#1db954">
        Login with Spotify
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NeonButton } from '@/components'
import { loginWithSpotify } from '@/utils'

export default defineComponent({
    name: 'SpotifyLogin',
    components: {
        NeonButton
    },
    setup() {
        return {
            loginWithSpotify
        }
    }
})
</script>

<style scoped lang="scss"></style>
