<template>
    <div class="course-details-wrapper">
        <div class="course-details-content">
            <CourseDetHeader class="course-header" v-bind:course="this.course" v-bind:creator="this.creator" v-bind:compra="this.compra" />
            <p>Conteúdo:</p>
            <div class="vid-container">
                <VidInfo v-for="vid in this.videos" :key="vid.id" v-bind:video="vid" v-bind:courseID="this.course.id" v-bind:clickable="this.creator || this.access"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import CourseDetHeader from "../components/courseDetails/CourseDetHeader.vue";
import VidInfo from "../components/courseDetails/VidInfo.vue";

export default {
    name: "CourseDetails",
    components: {
        CourseDetHeader,
        VidInfo,
    },
    data() {
        return  {
            course: {},
            videos: [],
            creator: false,
            access: false,
            compra: false
        }
    },
    created() {
        let request = {
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/cursos/${this.$route.params.id}`
        }

        if(this.$store.getters.getUser.id != "") {
            request.headers = {
                Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                refreshtoken: this.$store.getters.getRefreshToken
            }
        }

        axios(request)
        .then(value => {
            if (value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
            if (value.data.course.id_creator == this.$store.getters.getUser.id) this.creator = true;

            this.course = value.data.course;
            this.videos = value.data.course.videos;
            this.access = value.data.course.access;

            if(this.$store.getters.getUser.type && this.$store.getters.getUser.type != 'admin' && !this.creator && !this.access) this.compra = true;
        })
        .catch(error => {
            if (error.code) {
                console.log(error.response.data);
                if(error.response.data.message == "Curso não existe.") {
                    this.$router.push({ name: "Home" });
                } else {
                    this.$emit("open-modal", error.response.data.message);
                }
            } else console.log(error);
        });
    },
    beforeRouteLeave(to, from){
        if(to.name == "Vídeo" && !this.access && !this.creator && this.$store.getters.getUser.type != 'admin') return false;
    },
    computed: {
        userHasAccess() {
            if(this.access || this.creator || (this.$store.getters.getUser.type && this.$store.getters.getUser.type == 'admin')) return true;
            return false;
        }
    }
};
</script>

<style scoped>
    .course-details-wrapper {
        padding: 24px 48px 0px 48px;
    }

    .course-details-content {
        background-color: var(--mobalytics-card);
        border-radius: 8px;
        padding: 24px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        margin-bottom: 24px;
    }

    .course-details-content p {
        color: var(--primary);
        font-size: 22px;
        margin-left: 12px;
    }

    .vid-container {
        border-radius: 8px;
        margin: 12px;
        background-color: var(--mobalytics-back);
        overflow-x: hidden;
        overflow-y: scroll;
        height: 440px;
        position: relative;
        transform: scale(1);
    }

    .vid-container::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .vid-container::-webkit-scrollbar-thumb {
        background: var(--mobalytics-susge);
        border-radius: 8px;
    }

    .no-access {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;   
        background-color: red;
    }

    @media (max-width: 1400px) {
        .vid-container {
            height: 600px;
        }
    }

    @media (max-width: 800px) {
        .course-details-wrapper {
            padding: 24px 24px 0px 24px;
        }

        .course-details-content {
            padding: 12px;
        }

        .vid-container {
            height: 700px;
        }
    }

    @media (max-width: 400px) {
        .course-details-content {
            padding: 4px;
        }
    }
</style>
