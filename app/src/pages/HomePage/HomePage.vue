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
            <component
                v-for="(vendor, index) of vendors"
                :is="getVendorComponent(vendor)"
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
import { onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { YoutubeVendorDashboard, SpotifyVendorDashboard } from './components'
import { cookieExists } from '@/utils'
import { config } from '@/config'

export default {
    name: 'LoginPage',
    components: {
        YoutubeVendorDashboard,
        SpotifyVendorDashboard
    },
    setup() {
        const expanded = ref('')
        const vendors = ref<string[]>([])
        const cookieSnapshot = ref(document.cookie)

        watch(
            cookieSnapshot,
            () => {
                const newVendors = []

                if (cookieExists(config.spotify.cookieName)) {
                    newVendors.push('spotify')
                }
                if (cookieExists(config.youtube.cookieName)) {
                    newVendors.push('youtube')
                }

                vendors.value = newVendors
            },
            { immediate: true }
        )

        const isExpanded = (id: string) => {
            return expanded.value === id
        }

        const getVendorComponent = (vendor: string) => {
            switch (vendor) {
                case 'youtube':
                    return YoutubeVendorDashboard
                case 'spotify':
                    return SpotifyVendorDashboard
                default:
                    return null
            }
        }

        const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

        onMounted(() => {
            intervalId.value = setInterval(() => {
                const currentCookie = document.cookie
                if (cookieSnapshot.value !== currentCookie) {
                    cookieSnapshot.value = currentCookie
                }
            }, 300)
        })

        onBeforeUnmount(() => {
            if (intervalId.value) {
                clearInterval(intervalId.value)
            }
        })

        return {
            expanded,
            isExpanded,
            vendors,
            getVendorComponent
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
