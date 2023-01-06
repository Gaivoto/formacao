<template>
    <router-link class="vid" :class="{'vidOpen': open}" :to="{ name: 'Vídeo', params: { id: this.courseID } }">
        <img :src="this.imageUrl">
        <div class="text">
            <div class="text-left">
                <p class="vid-title">{{ video.name }}</p>
                <p>{{ video.duration }}</p>
            </div>
            <p>{{ video.description }}</p>
        </div>
    </router-link>
</template>

<script>

export default {
    data: () => {
        return {
            imageUrl: ""
        }
    },
    props: {
        video: {
            type: Object,
            required: true
        },
        courseID: {
            type: Number,
            required: true
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.video.image}.jpg`, import.meta.url).href;
    }
}
</script>

<style scoped>
    .vid {
        padding: 16px 32px 8px 16px;
        display: flex;
        gap: 24px;
        background-color: var(--mobalytics-back);
    }

    .vid:hover {
        background-color: var(--mobalytics-susge);
    }

    .vid .text {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 16px 0px;
    }

    .vid img {
        height: 120px;
        width: 120px;
        object-fit: cover;
        border-radius: 8px;
    }

    .text .vid-title {
        color: var(--primary);
        font-size: 18px;
        margin-bottom: 36px;
    }

    .text p {
        color: var(--light);
    }

    .text > p {
        max-width: 60%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 48px;
        margin-top: 16px;
    }
</style>