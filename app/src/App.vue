<template>
    <q-layout view="hhh lpp fff">
        <q-header elevated class="transparent">
            <q-toolbar>
                <q-avatar size="64px">
                    <img src="./assets/logo-box.png" />
                </q-avatar>
                <q-toolbar-title class="text-glow text-h5">
                    Musilitics
                </q-toolbar-title>

                <q-btn
                    class="text-glow"
                    dense
                    flat
                    round
                    :icon="darkMode ? 'dark_mode' : 'light_mode'"
                    @click="toggleDarkMode"
                />
            </q-toolbar>
        </q-header>

        <q-page-container>
            <div style="padding: 15px 15px; width: 100vw; height: 90vh">
                <router-view />
            </div>
        </q-page-container>

        <q-footer
            elevated
            class="transparent text-center"
            style="color: var(--subtext-color); padding-top: 10px"
        >
            <p>
                © 2025 Musilitics. All rights reserved. | Designed for music
                lovers 🎵
            </p>
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
    setup() {
        const $q = useQuasar()
        const darkMode = ref($q.dark.isActive)

        onMounted(() => {
            darkMode.value = sessionStorage.getItem('darkMode') === 'true'

            $q.dark.set(darkMode.value)
        })

        const toggleDarkMode = () => {
            darkMode.value = !darkMode.value
            $q.dark.set(darkMode.value)
            sessionStorage.setItem('darkMode', darkMode.value.toString())
        }

        return {
            darkMode,
            toggleDarkMode
        }
    }
})
</script>

<style lang="scss" scoped></style>
