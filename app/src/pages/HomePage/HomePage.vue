<template>
    <div
        style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
        "
    >
        <div class="container">
            <VendorDashboard
                class="item"
                vendor="spotify"
                :class="isExpanded('spotify') ? 'expanded' : ''"
                :hidden="expanded !== '' && !isExpanded('spotify')"
                @expand="expanded = 'spotify'"
            />
            <!-- <VendorDashboard
                class="item"
                vendor="youtube"
                :class="isExpanded('youtube') ? 'expanded' : ''"
                :hidden="expanded !== '' && !isExpanded('youtube')"
                @expand="expanded = 'youtube'"
            /> -->
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { VendorDashboard } from './components'

export default {
    name: 'LoginPage',
    components: {
        VendorDashboard
    },
    setup() {
        const expanded = ref('')

        const isExpanded = (id: string) => {
            return expanded.value === id
        }

        return {
            expanded,
            isExpanded
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 90%;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    .item {
        transition: all 0.3s ease;

        &.expanded,
        &:only-child {
            grid-column: 1 / -1;
        }
    }

    &:has(.item.expanded),
    &:has(.item:only-child) {
        grid-template-columns: 1fr;
    }
}
</style>
