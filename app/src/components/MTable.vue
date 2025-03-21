<template>
    <q-table
        :title="title"
        :rows="rows"
        :columns="columns"
        :row-key="rowKey"
        flat
        bordered
    />
</template>

<script lang="ts">
import { QTable, type QTableProps } from 'quasar'
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'MTable',
    components: {
        QTable
    },
    props: {
        title: {
            type: String,
            required: true
        },
        rows: {
            type: Array as () => QTableProps['rows'],
            required: true
        },
        rowKey: {
            type: String as () => QTableProps['rowKey'],
            required: true
        },
        columns: {
            type: Array as () => QTableProps['columns'],
            required: true
        }
    },
    setup() {}
})
</script>

<style scoped lang="scss"></style>
