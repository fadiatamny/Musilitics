<template>
    <div class="container">
        <h5 style="margin: 0; margin-bottom: 10px">Top Videos</h5>

        <MTable
            :rows="tracks"
            :columns="columns"
            row-key="rank"
            style="height: 340px"
        >
            <template #name="{ row }">
                <div
                    class="flex items-center clickable full-width"
                    style="gap: 10px"
                    @click="openTab(row.link)"
                >
                    <QAvatar>
                        <img
                            :src="row.image ?? '/default-album-cover.jpg'"
                            width="32px"
                            height="32px"
                            style="
                                border-radius: 50%;
                                background: var(--profile-background);
                            "
                            alt="Profile Image"
                        />
                    </QAvatar>
                    <p
                        style="
                            margin: 0;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            width: calc(100% - 50px);
                        "
                    >
                        {{ row.name }}
                    </p>
                </div>
            </template>

            <template #artist="{ row }">
                <div
                    class="flex items-center clickable full-width"
                    style="gap: 10px"
                    @click="openTab(row.artist.link)"
                >
                    <img
                        src="@/assets/default-profile.svg"
                        width="32"
                        height="32"
                        style="
                            border-radius: 50%;
                            background: var(--profile-background);
                            position: absolute;
                            top: 6px;
                            left: 6px;
                        "
                        alt="Default Cover"
                    />
                    <img
                        :src="row.artist.image"
                        @error="(e: any) => (e.target.style.display = 'none')"
                        width="32"
                        height="32"
                        style="
                            border-radius: 50%;
                            background: var(--profile-background);
                            position: absolute;
                            top: 6px;
                            left: 6px;
                        "
                        alt="Profile Image"
                    />
                    <p style="margin: 0; margin-left: 32px">
                        {{ row.artist.name }}
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
import type { YoutubeTrack } from '@/types'

export default defineComponent({
    name: 'YoutubeTracksTable',
    props: {
        tracks: {
            type: Array as PropType<YoutubeTrack[]>,
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
                label: 'Video',
                align: 'left',
                sortable: true
            },
            {
                name: 'artist',
                field: 'artist',
                label: 'Channel',
                align: 'left',
                sortable: true
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
