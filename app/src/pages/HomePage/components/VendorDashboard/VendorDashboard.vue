<template>
    <div
        v-if="!loading"
        class="dashboard-container"
        :style="hidden ? `disaply: none` : ''"
    >
        <UserProfile :profile="profileData" @logout="handleLogout" />
        <q-separator inset />
        <TracksTable :tracks="[]" />
        <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 20px">
            <ArtistsTable :artists="[]" />
            <GenresTable :genres="[]" />
        </div>
    </div>
    <SkeletonDashboard v-else />
</template>

<script lang="ts">
import { config } from '@/config'
import { defineComponent, onMounted, ref } from 'vue'
import {
    UserProfile,
    ArtistsTable,
    GenresTable,
    TracksTable,
    SkeletonDashboard
} from './components'

import { deleteCookie, fetchSpottifyData } from '@/utils'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'VendorDashboard',
    components: {
        UserProfile,
        ArtistsTable,
        GenresTable,
        TracksTable,
        SkeletonDashboard
    },
    props: {
        vendor: {
            type: String,
            required: true
        },
        expanded: {
            type: Boolean,
            default: false
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    setup(props: { vendor: string }) {
        const { vendor } = toRefs(props)
        const router = useRouter()

        const profileData = ref<{ name: string; image: string } | null>(null)
        const loading = ref(true)

        const handleLogout = () => {
            const vendorName = vendor.value as 'spotify' | 'youtube'
            const { cookieName } = config[vendorName]

            deleteCookie(cookieName)

            router.push({ name: 'Login' })
        }

        onMounted(async () => {
            const { profile } = await fetchSpottifyData()

            profileData.value = profile
            loading.value = false
        })

        return {
            profileData,
            loading,
            handleLogout
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

    border: 2px solid var(--neon-button-color, #1db954);
    box-shadow: 0 0 5vw rgba(180, 180, 255, 0.3);
    backdrop-filter: blur(1vw) saturate(1.8);
    -webkit-backdrop-filter: blur(1vw) saturate(1.8);
    border-radius: 20px;
    background: var(--card-background);
}
</style>
