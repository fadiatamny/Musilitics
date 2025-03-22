<template>
    <div class="dashboard-container" :style="computedStyles">
        <div
            style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            "
        >
            <div
                style="
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 10px;
                "
            >
                <q-skeleton type="QAvatar" />
                <q-skeleton type="text" width="200px" height="50px" />
            </div>

            <QBtn v-if="isError" flat @click="$emit('logout')">
                <QIcon name="close" color="red" />
            </QBtn>
            <q-skeleton v-else type="QBtn" />
        </div>
        <q-separator inset />
        <q-skeleton height="200px" square />
        <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 20px">
            <q-skeleton height="200px" square />
            <q-skeleton height="200px" square />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QSkeleton, QBtn, QIcon } from 'quasar'
import { toRefs, computed } from 'vue'

export default defineComponent({
    name: 'SkeletonDashboard',
    components: {
        QSkeleton,
        QBtn,
        QIcon
    },
    props: {
        isError: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            required: true
        }
    },
    setup(props: { color: string }) {
        const { color } = toRefs(props)

        const computedStyles = computed(() => ({
            '--neon-color': color.value
        }))

        return {
            computedStyles
        }
    }
})
</script>

<style scoped lang="scss">
.dashboard-container {
    display: grid;
    grid-template-rows: auto auto 1fr;
    gap: 20px;
    padding: 20px;

    color: var(--neon-color, #1db954);
    border: 2px solid var(--neon-color, #1db954);
    box-shadow: 0 0 5vw rgba(180, 180, 255, 0.3);
    backdrop-filter: blur(1vw) saturate(1.8);
    -webkit-backdrop-filter: blur(1vw) saturate(1.8);
    border-radius: 20px;
    background: var(--card-background);
}
</style>
