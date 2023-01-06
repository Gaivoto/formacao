<template>
    <div class="videopage-wrapper">
        <div class="video-left">
            <p class="video-title">{{ this.video.name }}</p>
            <VideoPlayerVideo class="video-player" v-bind:video="this.video.name" />
            <p class="desc-text">Descrição:</p>
            <span class="video-desc">{{ this.video.description }}</span>
        </div>
        <div class="list-container">
            <VideoList v-for="vid in this.videos" :key="vid.id" v-bind:video="vid" v-on:changeVideo="changeVideo"/>
        </div>
    </div>
</template>

<script>
import VideoList from "../components/videoPlayer/VideoList.vue";
import VideoPlayerVideo from "../components/videoPlayer/VideoPlayerVideo.vue";

export default {
    name: "VideoPlayer",
    components: {
        VideoList,
        VideoPlayerVideo,
    },
    data() {
        return {
            video: {
                id: "",
                image: "",
                name: "",
                description: "",
                duration: "",
            }
        }
    },
    methods: {
        changeVideo(video) {
            this.video = video;
        }
    },
    created() {
        this.course = {
            id: 1,
            image: "tomasGostosa",
            name: "nameCourse",
            creatorName: "seuku miyadora",
            description: "description2",
            category: "category1",
            price: "55.80 R$",
        }

        this.videos = [
            {
                id: 1,
                image: "bingus",
                name: "Video1",
                description: "video mostrando uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburndo uma cria de hamburguer ma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguma cria de hamburguselvagem alimentando se pela primeira vez sozinha",
                duration: "15 min",
            },
            {
                id: 2,
                image: "tomasGostosa",
                name: "Video2",
                description: "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
                duration: "16 min",
            },
            {
                id: 3,
                image: "bingus",
                name: "Video3",
                description: "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
                duration: "17 min",
            },
            {
                id: 4,
                image: "bingus",
                name: "Video1",
                description: "video mostrando uma cria de hamburguer selvagem alimentando se pela primeira vez sozinha",
                duration: "15 min",
            },
            {
                id: 5,
                image: "tomasGostosa",
                name: "Video2",
                description: "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
                duration: "16 min",
            },
            {
                id: 6,
                image: "bingus",
                name: "Video3",
                description: "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
                duration: "17 min",
            },
            {
                id: 7,
                image: "bingus",
                name: "Video1",
                description: "video mostrando uma cria de hamburguer selvagem alimentando se pela primeira vez sozinha",
                duration: "15 min",
            },
            {
                id: 8,
                image: "tomasGostosa",
                name: "Video2",
                description:    "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
                duration: "16 min",
            },
            {
                id: 9,
                image: "bingus",
                name: "Video3",
                description:    "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
                duration: "17 min",
            },
            {
                id: 8,
                image: "tomasGostosa",
                name: "Video2",
                description:    "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
                duration: "16 min",
            },
            {
                id: 9,
                image: "bingus",
                name: "Video3",
                description:    "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
                duration: "17 min",
            },
            {
                id: 8,
                image: "tomasGostosa",
                name: "Video2",
                description:    "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
                duration: "16 min",
            },
            {
                id: 9,
                image: "bingus",
                name: "Video3",
                description:    "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
                duration: "17 min",
            }
        ];

        this.video = this.videos[0];
    }
}
</script>

<style scoped>
    .videopage-wrapper {
        padding: 24px 48px 0px 48px;
        display: flex;
        height: 88vh;
        gap: 32px;
    }

    .video-left {
        width: 75%;

        background-color: var(--mobalytics-card);
        padding: 24px 32px;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 6px 4px;
    }

    .video-left .video-title {
        color: var(--primary);
        font-size: 22px;
    }

    .video-left .video-player {
        height: 75%;
        border-radius: 8px;
        margin-bottom: 24px;
    }

    .video-left .desc-text {
        color: var(--primary);
        font-size: 20px;
        margin-bottom: 8px;
    }

    .video-left .video-desc {
        color: var(--light);
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .list-container {
        overflow-x: hidden;
        overflow-y: scroll;
        width: 25%;
        max-height: 100%;
        box-shadow: rgba(20, 14, 49, 0.6) -4px 4px 4px 4px;
        border-radius: 8px;
    }

    .list-container::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .list-container::-webkit-scrollbar-thumb {
        background: var(--mobalytics-card);
        border-radius: 8px;
    }
</style>
