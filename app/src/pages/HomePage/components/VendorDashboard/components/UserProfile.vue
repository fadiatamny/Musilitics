<template>
    <div
        style="
            display: flex;
            align-items: center;
            justify-content: space-between;
        "
    >
        <div class="profile-wrapper">
            <QAvatar>
                <img
                    :src="profile?.image"
                    alt="Profile Image"
                    class="profile-image"
                />
            </QAvatar>
            <span class="profile-name text-glow">{{ profile?.name }}</span>
        </div>
        <QBtn flat @click="$emit('logout')">
            <QIcon name="close" color="red" />
        </QBtn>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { QAvatar, QIcon, QBtn } from 'quasar'

export default defineComponent({
    props: {
        profile: {
            type: Object as PropType<{
                name: string
                image: string
            } | null>,
            required: true
        }
    },
    components: {
        QAvatar,
        QIcon,
        QBtn
    },
    setup() {
    }
})
</script>

<style scoped lang="scss">
.profile-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
}

.profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    color: var(--neon-button-color, #1db954);
    box-shadow: 0 0 8px var(--neon-button-color, #1db954);
    border: 2px solid var(--neon-button-color, #1db954);
}

.profile-name {
    font-size: 1.2rem;
}
</style>
