<template>
    <q-btn
        outline
        class="neon-btn"
        :style="generatedStyle"
        @click="$emit('click')"
        :disabled="disabled"
    >
        <slot>
            {{ label }}
        </slot>
        <q-tooltip v-if="tooltip && tooltip.length">{{ tooltip }}</q-tooltip>
    </q-btn>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue'

export default defineComponent({
    name: 'NeonButton',
    props: {
        label: {
            type: String,
            required: false,
            default: ''
        },
        color: {
            type: String,
            required: true
        },
        tooltip: {
            type: String,
            required: false,
            default: null
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    setup(props) {
        const { color } = toRefs(props)

        const generatedStyle = computed<Record<string, string>>(() => {
            return {
                '--neon-button-color': color.value
            }
        })

        return {
            generatedStyle
        }
    }
})
</script>

<style scoped lang="scss">
.neon-btn {
    color: var(--neon-button-color, #1db954);
    box-shadow: 0 0 8px var(--neon-button-color, #1db954);
    border: 2px solid var(--neon-button-color, #1db954);

    &:hover {
        box-shadow: 0 0 20px var(--neon-button-color, #1db954);
    }
}
</style>
