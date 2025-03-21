<template>
    <q-table
        title="Top Artists"
        :rows="artists"
        :columns="columns"
        row-key="artistName"
        flat
        bordered
    />
</template>

<script setup lang="ts">
import { type QTableProps } from 'quasar'

defineProps<{
    artists: Array<{
        artistName: string
        popularity: number
        rankingGenres: string
    }>
}>()

const columns: QTableProps['columns'] = [
    { name: 'artistName', label: 'Artist Name', field: 'artistName' },
    { name: 'popularity', label: 'Popularity', field: 'popularity' },
    { name: 'rankingGenres', label: 'Genres', field: 'rankingGenres' }
]
</script>
