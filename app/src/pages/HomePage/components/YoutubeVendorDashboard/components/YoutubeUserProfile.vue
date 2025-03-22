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
                    :src="profileImage"
                    alt="Profile Image"
                    class="profile-image"
                    style="background: var(--profile-background)"
                />
            </QAvatar>
            <span class="profile-name text-glow">{{ profileName }}</span>
        </div>
        <QBtn flat @click="$emit('logout')">
            <QIcon name="close" color="red" />
        </QBtn>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import { QAvatar, QIcon, QBtn } from 'quasar'
import type { YoutubeProfile } from '@/types'
import { toRefs } from 'vue'

export default defineComponent({
    name: 'YoutubeUserProfile',
    props: {
        profile: {
            type: Object as PropType<YoutubeProfile | null>,
            required: true
        }
    },
    components: {
        QAvatar,
        QIcon,
        QBtn
    },
    setup(props: { profile: YoutubeProfile | null }) {
        const { profile } = toRefs(props)

        const profileImage = computed(
            () => profile.value?.image ?? '@/assets/default-profile.svg'
        )

        const profileName = computed(() => profile.value?.name ?? 'Guest')

        return {
            profileImage,
            profileName
        }
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

    color: #ff0000;
    box-shadow: 0 0 8px #ff0000;
    border: 2px solid #ff0000;
}

.profile-name {
    font-size: 1.2rem;
}
</style>
