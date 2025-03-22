<template>
    <NeonButton @click="loginWithYoutube" color="#ff0000">
        Login with Youtube
    </NeonButton>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { NeonButton } from '@/components'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'
import { handleLoginEvent } from '@/utils'

export default defineComponent({
    name: 'YoutubeLogin',
    components: {
        NeonButton
    },
    setup() {
        const router = useRouter()

        const loginWithYoutube = () => {
            const authUrl = `${import.meta.env.VITE_BACKEND_URI}/api/auth/youtube`
            window.open(authUrl, '_blank', 'width=500,height=600')
        }

        const handleAuthMessage = (event: MessageEvent) => {
            if (handleLoginEvent(event)) {
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
            loginWithYoutube
        }
    }
})
</script>

<style scoped lang="scss"></style>
