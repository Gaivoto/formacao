<template>
    <div class="videopage-wrapper">
        <div class="video-left">    
            <p class="video-title">{{ this.video.title }}</p>
            <VideoPlayerVideo class="video-player" v-bind:video="this.video.name" />
            <p class="desc-text">{{ $t("videoPlayer.description") }}:</p>
            <span class="video-desc">{{ this.video.description }}</span>
        </div>
        <div class="list-container">
            <VideoList v-for="vid in this.videos" :key="vid.id" v-bind:video="vid" v-bind:courseID="courseId" v-on:changeVideo="changeVideo"/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import VideoList from "../components/videoPlayer/VideoList.vue";
import VideoPlayerVideo from "../components/videoPlayer/VideoPlayerVideo.vue";
import Tr from '@/i18n/translation.js';

export default {
    name: "VideoPlayer",
    components: {
        VideoList,
        VideoPlayerVideo,
    },
    data() {
        return {
            video: {},
            videos: [],
            courseId: "",
        };
    },
    setup() {
        return { Tr };
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            axios({
                method: `get`,
                url: `${import.meta.env.VITE_HOST}/cursos/${this.$route.params.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then((value) => {
                if (value.data.access_token) this.$store.commit("setAccessToken", value.data.access_token);
                if(!value.data.course.access) {
                    this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                } else {
                    let existe = false;
                    this.videos = value.data.course.videos;
                    this.courseId = value.data.course.id;
                    for (let i = 0; i < this.videos.length; i++) {
                        if (this.videos[i].id == this.$route.params.idVid) {
                            existe = true;
                            this.video = this.videos[i];
                        }
                    }
                    if(!existe) {
                        this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                    }
                }
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.data.message == "Curso não existe.") {
                        this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        if(error.response.status == 401) {
			                this.$store.commit('resetUser');
                            this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                        } else {
                            this.$emit("open-modal", error.response.data.message);
                        }
                    }
                } else console.log(error);
            });

        }
    },
    methods: {
        changeVideo(id) {
            this.videos.forEach((v) => {
                if (v.id == id) {
                    this.video = v;
                }
            });
        },
    }
};
</script>

<style scoped>
    .videopage-wrapper {
        padding: 24px 48px 0px 48px;
        display: flex;
        height: 90vh;
        gap: 32px;
    }

    .video-left {
        width: auto;

        background-color: var(--mobalytics-card);
        padding: 24px 32px;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 6px 4px;
    }

    .video-left .video-title {
        color: var(--primary);
        font-size: 22px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .video-left .video-player {
        height: 72%;
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
        min-width: 400px;
        width: 400px;
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

    @media (max-width: 1500px) {
        .video-left .video-player {
            height: 68%;
        }

        .video-left .video-desc {
            -webkit-line-clamp: 5;
        }
    }

    @media (max-width: 1400px) {
        .video-left .video-player {
            height: 65%;
        }

  .video-left .video-desc {
    -webkit-line-clamp: 6;
  }
  .list-container {
    min-width: 300px;
    width: 300px;
  }
}

@media (max-width: 1250px) {
  .videopage-wrapper {
    display: block;
    height: fit-content;
    padding-bottom: 24px;
  }

        .video-left {
            margin-bottom: 24px;
        }

  .video-left .video-player {
    height: 55vh;
    max-height: 55vh;
    
  }

        .list-container {
            width: 100%;
            min-width: 100%;
            max-height: 50vh;
            box-shadow: rgba(20, 14, 49, 0.6) -4px 0px 10px 4px;
        }
    }

@media (max-width: 1024px) {
  .video-left .video-player {
    height: 50vh;
  }

  .video-left .video-desc {
    -webkit-line-clamp: 10;
  }
}

@media (max-width: 800px) {
  .videopage-wrapper {
    padding: 24px 16px 0px 16px;
  }

  .video-left {
    padding: 20px;
  }
}

    @media (max-width: 500px) {
        .video-left .video-player {
            height: 40vh;
        }

        .video-left .video-desc {
            -webkit-line-clamp: 10;
        }
    }

    @media (max-width: 450px) {
        .video-left .video-player {
            height: 35vh;
        }

        .video-left .video-desc {
            -webkit-line-clamp: 10;
        }
    }
</style>