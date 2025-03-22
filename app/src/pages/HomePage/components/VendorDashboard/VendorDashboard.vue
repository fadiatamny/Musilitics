<template>
    <div
        v-if="!loading && !error"
        style="min-width: 70%; max-width: 70%; width: 100%"
        :style="hidden ? `disaply: none` : ''"
    >
        <div class="dashboard-container">
            <UserProfile :profile="profileData" @logout="handleLogout" />
            <q-separator inset />
            <TracksTable :tracks="tracksData" />
            <q-separator inset />
            <div
                style="
                    display: grid;
                    grid-template-columns: 3fr 1fr;
                    gap: 20px;
                    height: 20%;
                "
            >
                <ArtistsTable :artists="artistsData" />
                <GenresTable :genres="genresData" />
            </div>
        </div>
    </div>
    <SkeletonDashboard
        v-else
        @logout="handleLogout"
        :isError="!!error"
        style="min-width: 70%; max-width: 70%; width: 100%"
    />
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
import type {
    SpotifyTrack,
    SpotifyProfile,
    SpotifyArtist,
    SpotifyGenre
} from '@/types'

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

        const profileData = ref<SpotifyProfile | null>(null)
        const tracksData = ref<SpotifyTrack[]>([])
        const artistsData = ref<SpotifyArtist[]>([])
        const genresData = ref<SpotifyGenre[]>([])
        const error = ref<unknown | null>(null)
        const loading = ref(true)

        const handleLogout = () => {
            const vendorName = vendor.value as 'spotify' | 'youtube'
            const { cookieName } = config[vendorName]

            deleteCookie(cookieName)

            router.push({ name: 'Login' })
        }

        onMounted(async () => {
            try {
                const { profile, tracks, artists, genres } =
                    await fetchSpottifyData()

                profileData.value = profile
                tracksData.value = tracks
                artistsData.value = artists
                genresData.value = genres
                loading.value = false
            } catch (e) {
                error.value = e
            }
        })

        return {
            loading,
            error,
            handleLogout,
            profileData,
            tracksData,
            artistsData,
            genresData
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
    width: 100%;

    border: 2px solid var(--neon-button-color, #1db954);
    box-shadow: 0 0 5vw rgba(180, 180, 255, 0.3);
    backdrop-filter: blur(1vw) saturate(1.8);
    -webkit-backdrop-filter: blur(1vw) saturate(1.8);
    border-radius: 20px;
    background: var(--card-background);
}
</style>
