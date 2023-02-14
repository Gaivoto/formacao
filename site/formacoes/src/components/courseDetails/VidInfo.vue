<template>
    <router-link class="vid" :class="{ 'clickable': this.clickable }" :to="{ name: 'Vídeo', params: { id: this.courseID, idVid: this.video.id } }">
        <img :src="this.imageUrl">
        <div class="text">
            <div class="text-left">
                <p class="vid-title">{{ video.title }}</p>
                <p>{{ this.calculatedDuration }} min</p>
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
        },
        clickable: {
            type: Boolean,
            required: true
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.video.image}.jpg`, import.meta.url).href;
    },
    computed: {
        calculatedDuration() {
            return Math.floor(this.video.duration / 60)+':'+Math.floor(this.video.duration % 60);
        }
    }
}
</script>

<style scoped>
    .vid {
        padding: 16px 32px 8px 16px;
        display: flex;
        gap: 24px;
        background-color: var(--mobalytics-back);
        cursor: default;
    }

    .vid.clickable {
        cursor: pointer;
    }

    .vid.clickable:hover {
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
        width: 400px;
        margin-bottom: 36px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
        max-height: 48px;
        margin-top: 16px;
    }

    @media (max-width: 1450px) {
        .text .vid-title {
            width: 300px;
        }
    }

    @media (max-width: 1350px) {
        .vid .text {
            display: block;
            padding: 0px;
        }

        .text .vid-title {
            width: 100%;
            margin-bottom: 16px;
        }

        .text > p {
            max-width: 100%;
        }
    }

    @media (max-width: 1250px) {
        .text > p {
            max-width: 400px;
        }
    }

    @media (max-width: 950px) {
        .text > p {
            -webkit-line-clamp: 3;
            max-height: 72px;
        }
    }

    @media (max-width: 750px) {
        .vid img {
            display: none;
        }
    }

    @media (max-width: 600px) {
        .text > p {
            -webkit-line-clamp: 4;
            max-height: 96px;
        }
    }
</style>