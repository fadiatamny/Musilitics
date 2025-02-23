<template>
    <NeonButton
        @click="() => {}"
        color="#ff0000"
        disabled
        tooltip="Coming soon!"
    >
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
        return {}
    }
})
</script>

<style scoped lang="scss"></style>
