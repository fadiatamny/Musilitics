<template>
    <div class="container">
        <div class="overlay">Coming Soon!</div>
        <h6 style="margin: 0; margin-bottom: 10px">Top Genres</h6>

        <MTable
            :rows="[]"
            :columns="columns"
            row-key="rank"
            :rowsPerPage="3"
            style="height: 245px"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { type QTableProps } from 'quasar'
import { MTable } from '@/components'
import type { YoutubeGenre } from '@/types'

export default defineComponent({
    name: 'YoutubeArtistsTable',
    props: {
        genres: {
            type: Array as PropType<YoutubeGenre[]>,
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
                name: 'genre',
                field: 'genre',
                label: 'Genre',
                align: 'left',
                sortable: true
            }
        ]

        return {
            columns
        }
    }
})
</script>

<style scoped lang="scss">
.container {
    position: relative;
    padding: 0 20px;
    height: 100%;
    width: 100%;
}

.overlay {
    position: absolute;
    z-index: 5;
    top: 32%;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 35%;
    width: 85%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--text-color);
    background-color: var(--overlay-background);
    box-shadow: 0 0 1vw var(--overlay-background);
    backdrop-filter: blur(1vw) saturate(1.8);
    -webkit-backdrop-filter: blur(1vw) saturate(1.8);
    font-size: 24px;
    font-weight: bold;
}
</style>
