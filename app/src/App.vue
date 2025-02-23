<template>
    <q-layout view="hhh lpp fff">
        <q-header elevated class="transparent">
            <q-toolbar>
                <!-- <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" /> -->
                <q-avatar size="64px">
                    <!-- <img src="./assets/logo.png" /> -->
                    <img src="./assets/logo-box.png" />
                </q-avatar>
                <q-toolbar-title class="text-glow text-h5">
                    Musilitics
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <!-- todo: cleanup this file -->
        <!-- <q-drawer
            show-if-above
            v-model="leftDrawerOpen"
            side="left"
            bordered
            dark
            mini
            overlay
        >
        </q-drawer> -->

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
import { ref, defineComponent } from 'vue'

export default defineComponent({
    setup() {
        const leftDrawerOpen = ref(false)

        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    }
})
</script>

<style lang="scss" scoped></style>
