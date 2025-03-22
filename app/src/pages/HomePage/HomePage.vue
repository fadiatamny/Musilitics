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
                v-for="(vendor, index) of vendors"
                :key="index"
                class="item"
                :vendor="vendor"
                :class="isExpanded(vendor) ? 'expanded' : ''"
                :hidden="expanded !== '' && !isExpanded(vendor)"
                @expand="expanded = vendor"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { VendorDashboard } from './components'
import { cookieExists } from '@/utils'
import { config } from '@/config'

export default {
    name: 'LoginPage',
    components: {
        VendorDashboard
    },
    setup() {
        const expanded = ref('')
        const vendors: string[] = []

        if (cookieExists(config.spotify.cookieName)) {
            vendors.push('spotify')
        }

        if (cookieExists(config.youtube.cookieName)) {
            vendors.push('youtube')
        }

        const isExpanded = (id: string) => {
            return expanded.value === id
        }

        return {
            expanded,
            isExpanded,
            vendors
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    padding: 5vh 5vw;
    height: 100%;
    width: 100%;
    display: grid;
    gap: 5rem;
    place-items: center;

    .item {
        transition: all 0.3s ease;
    }

    overflow: scroll;
}
</style>
