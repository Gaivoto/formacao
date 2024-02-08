<template>
<<<<<<< HEAD
    <div class="vid" :class="{'vidOpen': open}">
        <div class="left-side">
            <img :src="this.imageUrl"/>
            <div class="text">
                <p>{{ video.name }}</p>
                <p>{{ video.duration }}</p>
                <p v-show="open">{{ video.description }}</p>
            </div>
        </div>
        <div class="right-side">
            <button @click="open = !open">abre de sesamo</button>
        </div>
    </div>
</template>

<script>

export default {
    data: () => {
        return {
            open: false,
            imageUrl: ""
        }
    },
=======
    <router-link class="vid" :class="{ 'clickable': this.clickable }" :to="Tr.i18nRoute({ name: 'Vídeo', params: { id: this.courseID, idVid: this.video.id, locale: Tr.guessDefaultLocale() } })">    
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
import Tr from '@/i18n/translation.js'
export default {
    data: () => {
        return {
            imageUrl: ""
        }
    },
    setup() {
        return { Tr };
    },
>>>>>>> origin/development
    props: {
        video: {
            type: Object,
            required: true
<<<<<<< HEAD
=======
        },
        courseID: {
            type: Number,
            required: true
        },
        clickable: {
            type: Boolean,
            required: true
>>>>>>> origin/development
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.video.image}.jpg`, import.meta.url).href;
<<<<<<< HEAD
=======
    },
    computed: {
        calculatedDuration() {
            return Math.floor(this.video.duration / 60)+':'+Math.floor(this.video.duration % 60);
        }
>>>>>>> origin/development
    }
}
</script>

<style scoped>
    .vid {
<<<<<<< HEAD
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: rgb(15, 108, 151);
        height: 140px;
    }
    .vidOpen {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: rgb(228, 5, 5);
        height: 200px;
    }
    .left-side {
        display: flex;
        justify-content: start;
        height: 100%;
    }

    .img {
        height: 120px;
        width: 120px;
        object-fit: cover;
=======
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
>>>>>>> origin/development
    }
</style>