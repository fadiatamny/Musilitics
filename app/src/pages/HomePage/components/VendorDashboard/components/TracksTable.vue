<template>
    <q-table
        title="Top Tracks"
        :rows="tracks"
        :columns="columns"
        row-key="trackName"
        flat
        bordered
    />
</template>

<script setup lang="ts">
import { type QTableProps } from 'quasar'

defineProps<{
    tracks: Array<{
        trackName: string
        artistName: string
        albumName: string
        popularity: number
        ranking: number
    }>
}>()

const columns: QTableProps['columns'] = [
    { name: 'trackName', label: 'Track Name', field: 'trackName' },
    { name: 'artistName', label: 'Artist Name', field: 'artistName' },
    { name: 'albumName', label: 'Album Name', field: 'albumName' },
    { name: 'popularity', label: 'Popularity', field: 'popularity' },
    { name: 'ranking', label: 'Ranking', field: 'ranking' }
]
</script>
