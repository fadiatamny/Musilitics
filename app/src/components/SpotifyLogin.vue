<template>
  <div>
    <button @click="loginWithSpotify">Login with Spotify</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "SpotifyLogin",
  setup() {
    const loginWithSpotify = () => {
      const authUrl = `${import.meta.env.VITE_BACKEND_URI}/api/auth/spotify`;
      window.open(authUrl, "_blank", "width=500,height=600");
    };

    const handleAuthMessage = (event: MessageEvent) => {
      debugger;

      if (event.origin !== import.meta.env.VITE_BACKEND_URI) {
        console.warn("Received message from untrusted origin:", event.origin);
        return;
      }

      const data = event.data;
      if (data.status === "success") {
        console.log("Spotify login successful, token:", data.token);
      } else {
        console.error("Spotify login failed.");
      }
    };

    onMounted(() => {
      window.addEventListener("message", handleAuthMessage);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("message", handleAuthMessage);
    });

    return {
      loginWithSpotify,
    };
  },
});
</script>
