<template>
    <q-table
        title="Top Genres"
        :rows="genres"
        :columns="columns"
        row-key="genreName"
        flat
        bordered
    />
</template>

<script setup lang="ts">
import { type QTableProps } from 'quasar'

defineProps<{
    genres: Array<{
        genreName: string
    }>
}>()

const columns: QTableProps['columns'] = [
    { name: 'genreName', label: 'Genre', field: 'genreName' }
]
</script>
