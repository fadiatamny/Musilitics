<template>
    <div class="container">
        <h6 style="margin: 0; margin-bottom: 10px">Top Genres</h6>

        <MTable
            :rows="genres"
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
import type { SpotifyGenre } from '@/types'

export default defineComponent({
    name: 'SpotifyArtistsTable',
    props: {
        genres: {
            type: Array as PropType<SpotifyGenre[]>,
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
    padding: 0 20px;
}
</style>
