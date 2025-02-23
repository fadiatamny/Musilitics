<template>
    <div>home</div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            isSignedIn: {
                spotify: false,
                youtube: false
            }
        }
    },
    methods: {
        loginSpotify() {
            // Replace with your real Spotify login logic
            // For demo, just set the state to 'true':
            this.isSignedIn.spotify = true
        },
        loginYouTube() {
            // Future: implement YouTube login here
        }
    }
}
</script>

<style scoped></style>
