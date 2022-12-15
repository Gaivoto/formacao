<template>
    <div class="course-card-container">
        <div class="course-card">
            <div class="course-card-left">
                <img :src="this.imageUrl">
                <div>
                    <router-link :to="{ name: 'courseDetails', params: { id: this.course.id } }"><p>Nome: {{ this.course.name }}</p></router-link>
                    <p>Criador: {{ this.course.creator.name }}</p>
                </div>
                <div>
                    <p>Preço: {{ this.course.price }}</p>
                    <p>Inscrições: {{ this.course.subscriptions }}</p>
                </div>    
                <div>
                    <p>Categoria: {{ this.course.category }}</p>
                    <p>Estado: {{ this.course.state }}</p>
                </div>    
            </div>
            <div class="course-card-right">
                <img src="../../assets/chevron_down.png" v-on:click="toggleVideos">
                <button v-if="showButton1" v-on:click="changeStateCourse('Ativo')">ATIVAR</button>
                <button v-if="showButton2" v-on:click="changeStateCourse('Inativo')">DESATIVAR</button>
                <div v-if="showButton3and4" class="button-wrapper">
                    <button v-on:click="changeStateCourse('Ativo')">APROVAR</button>
                    <button v-on:click="changeStateCourse('Rejeitado')">REJEITAR</button>
                </div>
                <button v-if="showButton5" v-on:click="changeStateCourse('Pendente')">TORNAR PENDENTE</button>     
            </div>
        </div>
        <div ref="pendingNotif" :class="{ notif: showNotif }"></div>
        <div ref="videoList" class="d-none">
            <CourseListAdmVideoCard v-for="video in this.course.videos" :key="video.id" v-bind:video="video" v-bind:courseId="this.course.id" v-on:changeStateVideo="changeStateVideo"/>
        </div>
    </div>
</template>

<script>
import CourseListAdmVideoCard from './CourseListAdmVideoCard.vue'

export default {
    name: 'CourseListAdmCourseCard',
    components: {
        CourseListAdmVideoCard
    },
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: ""
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
    },
    computed: {
        showButton1(){
            if(this.course.state == "Inativo") return true;
            return false;
        },
        showButton2() {
            if(this.course.state == "Ativo") return true;
            return false;
        },
        showButton3and4() {
            if(this.course.state == "Pendente") return true;
            return false;
        },
        showButton5() {
            if(this.course.state == "Rejeitado") return true;
            return false;
        },
        showNotif() {
            let pending = false

            this.course.videos.forEach(video => {
                if(video.state == "Pendente") pending = true;
            });

            return pending;
        }
    },
    methods: {
        changeStateCourse(state) {
            this.$emit("changeStateCourse", {id: this.course.id, state: state});
        },
        changeStateVideo(info) {
            this.$emit("changeStateVideo", info);
        },
        toggleVideos() {
            this.$refs.videoList.classList.toggle("d-none");
        }
    }
}
</script>

<style scoped>
    .course-card-container {
        position: relative;
    }

    .course-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
    }

    .course-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    .course-card-right {
        display: flex;
        align-items: center;
        gap: 40px;
    }

    button {
        background: grey;
        height: 50px;
        width: 120px;
    }

    .button-wrapper {
        display: flex;
        gap: 16px;
    }

    .notif {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: red;

        position: absolute;
        top: 16px;
        right: 16px;
    }
</style>