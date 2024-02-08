<template>
<<<<<<< HEAD
  <div class="course-details-wrapper">
    <CourseDetHeader v-bind:course="this.course" />
    <div class="vid-container">
      <VidInfo v-for="vid in this.videos" :key="vid.id" v-bind:video="vid" />
    </div>
  </div>
</template>

<script>
import CourseDetHeader from "../components/courseDetails/CourseDetHeader.vue";
import VidInfo from "../components/courseDetails/VidInfo.vue";
export default {
  components: {
    CourseDetHeader,
    VidInfo,
  },
  created() {
    (this.course = {
      id: 1,
      image: "tomasGostosa",
      name: "nameCourse",
      creatorName: "seuku miyadora",
      description: "description2",
      category: "category1",
      price: "55.80 R$",
    }),
      (this.videos = [
        {
          id: 1,
          image: "tomasGostosa",
          name: "video1",
          description: "description1",
          duration: "15 min",
        },
        {
          id: 2,
          image: "tomasGostosa",
          name: "video2",
          description: "description2",
          duration: "16 min",
        },
        {
          id: 3,
          image: "tomasGostosa",
          name: "video3",
          description: "description3",
          duration: "17 min",
        },
        {
          id: 4,
          image: "tomasGostosa",
          name: "video4",
          description: "description4",
          duration: "18 min",
        },
        {
          id: 5,
          image: "tomasGostosa",
          name: "video5",
          description: "description5",
          duration: "2 hours ",
        },
      ]);
  },
=======
    <div class="course-details-wrapper">
        <div class="course-details-content">
            <CourseDetHeader class="course-header" v-bind:course="this.course" v-bind:creator="this.creator" v-bind:compra="this.compra" v-bind:rate="this.rate" v-on:rate-course="this.rateCourse" />
            <p>{{ $t("courseDetails.content") }}</p>
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
import Tr from '@/i18n/translation.js';

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
            compra: false,
            rate: false
        }
    },
    setup() {
        return { Tr };
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
            if(this.$store.getters.getUser.type && this.$store.getters.getUser.type != 'admin' && !this.creator && this.access) this.rate = true;
        })
        .catch(error => {
            if (error.code) {
                console.log(error.response.data);
                this.$emit("open-modal", error.response.data.message);
                if(error.response.data.message == "noCourse") {
                    this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                } else if(error.response.status == 401) {
                    this.$store.commit('resetUser');
                    this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                }
            } else console.log(error);
        });
    },
    beforeRouteUpdate(to, from) {
        this.creator = false;
        this.compra = false;

        let request = {
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/cursos/${to.params.id}`
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
                this.$emit("open-modal", error.response.data.message);
                if(error.response.data.message == "noCourse") {
                    this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                } else if(error.response.status == 401) {
                    this.$store.commit('resetUser');
                    this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
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
    },
    methods: {
        rateCourse(rating) {
            axios({
                method: 'put',
                url: `${import.meta.env.VITE_HOST}/cursos/rating/${this.$route.params.id}`,
                data: {
                    idComp: this.course.idCompra,
                    rating: rating
                },
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                }
            })
            .then(value => {
                if (value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
            })
            .catch(error => {
                console.log(error)
                if(error.code) {
                    console.log(error.response.data);
                    this.$emit("open-modal", error.response.data.message);
                } else console.log(error);
            });
        } 
    }
>>>>>>> origin/development
};
</script>

<style scoped>
<<<<<<< HEAD
.course-details-wrapper {
  height: 100vh;
}
.vid-container {
  padding: 1%;
  background-color: rgb(9, 255, 0);
  overflow-x: hidden;
  overflow-y: auto;
  height: 45%;
}
=======
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
>>>>>>> origin/development
</style>
