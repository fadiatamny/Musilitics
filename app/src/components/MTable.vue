<template>
    <q-table
        :rows="rows"
        :columns="columns"
        :row-key="rowKey"
        flat
        bordered
        :rows-per-page-options="[rowsPerPage]"
        style="background-color: var(--card-background);"
    >
        <template v-slot:body="props">
            <q-tr
                :props="props"
                style="height: 48px; padding-top: 0; padding-bottom: 0"
            >
                <q-td
                    v-for="col in columns"
                    :key="col.name"
                    :props="props"
                    style="height: 48px; padding-top: 0; padding-bottom: 0"
                >
                    <slot :name="col.name" :row="props.row">
                        {{ getRowValue(props.row, col) }}
                    </slot>
                </q-td>
            </q-tr>
        </template>

        <slot />
    </q-table>
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
        },
        rowsPerPage: {
            type: Number,
            default: 5
        }
    },
    setup() {
        const getRowValue = (row: any, col: any) => {
            return row[col.field]
        }

        return {
            getRowValue
        }
    }
})
</script>

<style scoped lang="scss"></style>
