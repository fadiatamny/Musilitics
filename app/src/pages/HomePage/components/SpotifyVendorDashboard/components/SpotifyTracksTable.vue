<template>
    <div class="container">
        <h5 style="margin: 0; margin-bottom: 10px">Top Tracks</h5>

        <MTable
            :rows="tracks"
            :columns="columns"
            row-key="rank"
            style="height: 340px"
        >
            <template #name="{ row }">
                <div
                    class="flex items-center clickable"
                    style="gap: 10px"
                    @click="openTab(row.link)"
                >
                    <p style="margin: 0">
                        {{ row.name }}
                    </p>
                </div>
            </template>
            <template #artist="{ row }">
                <div
                    class="flex items-center clickable"
                    style="gap: 10px"
                    @click="openTab(row.artist.link)"
                >
                    <p style="margin: 0">
                        {{ row.artist.name }}
                    </p>
                </div>
            </template>
            <template #album="{ row }">
                <div
                    class="flex items-center clickable full-width"
                    style="gap: 10px"
                    @click="openTab(row.album.link)"
                >
                    <img
                        :src="row.album.image ?? '/default-album-cover.jpg'"
                        width="32px"
                        height="32px"
                        style="
                            border-radius: 50%;
                            background: var(--profile-background);
                        "
                        alt="Profile Image"
                    />
                    <p
                        style="
                            margin: 0;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            width: calc(100% - 50px);
                        "
                    >
                        {{ row.album.name }}
                    </p>
                </div>
            </template>
        </MTable>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type QTableProps } from 'quasar'
import { MTable } from '@/components'
import type { SpotifyTrack } from '@/types'

export default defineComponent({
    name: 'SpotifyTracksTable',
    props: {
        tracks: {
            type: Array as PropType<SpotifyTrack[]>,
            required: true
        }
    },
    components: {
        MTable
    },
    setup() {
        const columns: QTableProps['columns'] = [
            {
                name: 'rank',
                field: 'rank',
                label: '#',
                align: 'left',
                sortable: true,
                headerStyle: 'width: 50px'
            },
            {
                name: 'name',
                field: 'name',
                label: 'Name',
                align: 'left',
                sortable: true
            },
            {
                name: 'artist',
                field: 'artist.name',
                label: 'Artist',
                align: 'left',
                sortable: true,
                headerStyle: 'width: 25%'
            },
            {
                name: 'album',
                field: 'album.name',
                label: 'Album',
                align: 'left',
                sortable: true,
                headerStyle: 'width: 25%'
            },
            {
                name: 'popularity',
                field: 'popularity',
                label: 'Popularity',
                align: 'left',
                sortable: true,
                headerStyle: 'width: 50px'
            }
        ]

        const openTab = (albumLink: string) => {
            window.open(albumLink, '_blank')
        }

        return {
            columns,
            openTab
        }
    }
})
</script>

<style scoped lang="scss">
.container {
    padding: 0 20px;
}
</style>
