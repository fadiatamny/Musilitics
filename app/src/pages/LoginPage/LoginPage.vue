<template>
    <div class="container">
        <div class="glowy-card">
            <div
                class="row item-center justify-center"
                style="flex-direction: column; align-content: center"
            >
                <div
                    class="row item-center justify-center"
                    style="
                        flex-direction: column;
                        width: 100%;
                        align-content: center;
                    "
                >
                    <q-avatar size="64px">
                        <img src="@/assets/logo-box.png" />
                    </q-avatar>
                </div>
                <div
                    class="row item-center justify-center"
                    style="flex-direction: column; text-align: center"
                >
                    <div class="text-h5">
                        Welcome to
                        <span class="text-glow text-h5">Musilitics</span>!
                    </div>
                    <div class="text-subtitle1">
                        Sign in to start deep dive into your favorite music.
                    </div>
                </div>
            </div>
            <div class="row" style="flex-direction: column; gap: 16px">
                <SpotifyLogin />
                <YoutubeLogin />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { YoutubeLogin, SpotifyLogin } from './components'

export default defineComponent({
    name: 'LoginPage',
    components: {
        SpotifyLogin,
        YoutubeLogin
    },
    setup() {
    }
})
</script>

<style scoped lang="scss">
.container {
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
}

.glowy-card {
    display: flex;
    flex-direction: column;
    gap: 5vh;
    padding: 5vw;
    background: var(--login-card-background);
    box-shadow: 0 0 5vw var(--login-card-shadow);
    backdrop-filter: blur(1vw) saturate(1.8);
    -webkit-backdrop-filter: blur(1vw) saturate(1.8);
    border-radius: 20px;
    border: 2px solid var(--login-card-border);
}
</style>
