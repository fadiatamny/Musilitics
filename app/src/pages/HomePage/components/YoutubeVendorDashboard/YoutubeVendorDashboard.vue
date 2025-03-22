<template>
    <div
        v-if="!loading && !error"
        style="min-width: 70%; max-width: 70%; width: 100%"
        :style="computedStyles"
    >
        <div class="dashboard-container">
            <YoutubeUserProfile :profile="profileData" @logout="handleLogout" />
            <q-separator inset />
            <YoutubeTracksTable :tracks="tracksData" />
            <q-separator inset />
            <div
                style="
                    display: grid;
                    grid-template-columns: 3fr 1fr;
                    gap: 20px;
                    height: 20%;
                "
            >
                <YoutubeArtistsTable :artists="artistsData" />
                <YoutubeGenresTable :genres="genresData" />
            </div>
        </div>
    </div>
    <SkeletonDashboard
        v-else
        @logout="handleLogout"
        :isError="!!error"
        style="min-width: 70%; max-width: 70%; width: 100%"
        color="#FF0000"
    />
</template>

<script lang="ts">
import { config } from '@/config'
import { defineComponent, onMounted, ref } from 'vue'
import {
    YoutubeUserProfile,
    YoutubeArtistsTable,
    YoutubeGenresTable,
    YoutubeTracksTable
} from './components'
import { SkeletonDashboard } from '../shared'

import { deleteCookie, fetchYoutubeData } from '@/utils'
import { toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import type {
    YoutubeArtist,
    YoutubeGenre,
    YoutubeProfile,
    YoutubeTrack
} from '@/types'

export default defineComponent({
    name: 'YoutubeVendorDashboard',
    components: {
        YoutubeUserProfile,
        YoutubeArtistsTable,
        YoutubeGenresTable,
        YoutubeTracksTable,
        SkeletonDashboard
    },
    props: {
        expanded: {
            type: Boolean,
            default: false
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    setup(props: { hidden: boolean }) {
        const { hidden } = toRefs(props)
        const router = useRouter()

        const profileData = ref<YoutubeProfile | null>(null)
        const tracksData = ref<YoutubeTrack[]>([])
        const artistsData = ref<YoutubeArtist[]>([])
        const genresData = ref<YoutubeGenre[]>([])
        const error = ref<unknown | null>(null)
        const loading = ref(true)

        const computedStyles = computed(() => ({
            display: hidden.value ? 'none' : 'block'
        }))

        const handleLogout = () => {
            deleteCookie(config.youtube.cookieName)

            router.push({ name: 'Login' })
        }

        onMounted(async () => {
            try {
                const { profile, tracks, artists, genres } =
                    await fetchYoutubeData()

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
            computedStyles,
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

    border: 2px solid #ff0000;
    box-shadow: 0 0 5vw rgba(180, 180, 255, 0.3);
    backdrop-filter: blur(1vw) saturate(1.8);
    -webkit-backdrop-filter: blur(1vw) saturate(1.8);
    border-radius: 20px;
    background: var(--card-background);
}
</style>
