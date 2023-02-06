<template>
    <div class="course-details-wrapper">
        <div class="course-details-content">
            <CourseDetHeader class="course-header" v-bind:course="this.course" />
            <p v-if:="this.userHasAccess">Conteúdo:</p>
            <div v-if:="this.userHasAccess" class="vid-container">
                <VidInfo v-for="vid in this.videos" :key="vid.id" v-bind:video="vid" v-bind:courseID="this.course.id"/>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import CourseDetHeader from "../components/courseDetails/CourseDetHeader.vue";
import VidInfo from "../components/courseDetails/VidInfo.vue";

export default {
    //AQUI AINDA FALTA VERIFICAR SE O CRIADOR TA ENTRANDO NUM CURSO Q É DELE
    name: "CourseDetails",
    components: {
        CourseDetHeader,
        VidInfo,
    },
    data() {
        return  {
            course: {},
            user: this.$store.getters.getUser
        }
    },
    created() {
        axios({
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/cursos/${this.$route.params.id}`,
            headers: {
                Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                refreshtoken: this.$store.getters.getRefreshToken
            }
        })
        .then(value => {
            if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
            if(value.data.course.id_creator == this.$store.getters.getUser.id) {
                value.data.course.creator = true;
                value.data.course.access = true;
            }
            else {
                value.data.course.creator = false;
            }
            this.course = value.data.course;
            this.videos = value.data.course.videos;
            this.compra = value.data.course.access
        })
        .catch(error => {
            if(error.code) console.log(error.response.data);
            else console.log(error);
        });
    },
    computed: {
        getUser() {
            this.user = this.$store.getter.getUser;
        },
        userHasAccess() {
            if(this.course.access || (this.$store.getters.getUser.type && this.$store.getters.getUser.type == 'admin')) return true;
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

    @media (max-width: 1200px) {
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
