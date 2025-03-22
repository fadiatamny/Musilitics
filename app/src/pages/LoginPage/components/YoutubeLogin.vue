<template>
    <NeonButton @click="loginWithYoutube" color="#ff0000">
        Login with Youtube
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NeonButton } from '@/components'
import { loginWithYoutube } from '@/utils/youtubeUtils'

export default defineComponent({
    name: 'YoutubeLogin',
    components: {
        NeonButton
    },
    setup() {
        return {
            loginWithYoutube
        }
    }
})
</script>

<style scoped lang="scss"></style>
