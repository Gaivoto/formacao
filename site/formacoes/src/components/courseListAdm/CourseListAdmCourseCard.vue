<template>
    <div class="course-card-container">
        <div class="course-card" :class="{ 'videos-open': this.videosOpen }">
            <div class="course-card-left">
                <router-link :to="Tr.i18nRoute({ name: 'Curso', params: { id: this.course.id, locale: Tr.guessDefaultLocale() } })">
                    <img :src="this.imageUrl">
                </router-link>
                <div>
                    <div class="first-left-div">
                        <router-link :to="Tr.i18nRoute({ name: 'Curso', params: { id: this.course.id, locale: Tr.guessDefaultLocale() } })"><p>{{ this.course.name }}</p></router-link>
                        <p>{{ $t("courseListAdm.creator") }}: {{ this.course.nameCr }}</p>
                    </div>
                    <div>
                        <p>{{ $t("courseListAdm.rating") }}: {{ this.roundedRating }}</p>
                        <p>{{ $t("courseListAdm.catAbr") }}: {{ this.course.category }}</p>
                    </div> 
                </div>
                <div>
                    <div>
                        <p>{{ $t("courseListAdm.state") }}: {{ this.translatedState }}</p>
                        <p>{{ $t("courseListAdm.date") }}: {{ this.formatedDate }}</p>
                    </div>
                </div> 
            </div>
            <div class="course-card-right">
                <button v-if="showButton1" v-on:click="changeStateCourse('Ativo')">{{ $t("courseListAdm.activate") }}</button>
                <button v-if="showButton2" v-on:click="changeStateCourse('Inativo')">{{ $t("courseListAdm.deactivate") }}</button>
                <div v-if="showButton3and4" class="button-wrapper">
                    <button v-on:click="changeStateCourse('Ativo')">{{ $t("courseListAdm.approve") }}</button>
                    <button v-on:click="changeStateCourse('Rejeitado')">{{ $t("courseListAdm.reject") }}</button>
                </div>
                <button v-if="showButton5" v-on:click="changeStateCourse('Pendente')">{{ $t("courseListAdm.makePending") }}</button>     
            </div>
        </div>
        <div ref="pendingNotif" v-if="showNotif" class="pending-div">
            <span class="material-icons notif-icon">report</span>
        </div>
        <div class="open-videos-div">
            <span class="material-icons open-videos-icon" v-on:click="toggleVideos" :class="{ mirrored: this.videosOpen}">expand_more</span>
        </div>
        <div ref="videoList" class="video-list" :class="{ closed: !this.videosOpen }">
            <CourseListAdmVideoCard v-for="video in this.course.videos" :key="video.id" v-bind:video="video" v-bind:courseId="this.course.id" v-on:changeStateVideo="changeStateVideo"/>
        </div>
    </div>
</template>

<script>
import CourseListAdmVideoCard from './CourseListAdmVideoCard.vue'
import Tr from '@/i18n/translation.js'

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
            imageUrl: "",
            videosOpen: false
        }
    },
    setup() {
        return { Tr };
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
        },
        formatedDate() {
            return this.course.date.substring(8, 10) + "/" + this.course.date.substring(5, 7) + "/" + this.course.date.substring(0, 4) + " " + this.course.date.substring(11, 19);
        },
        translatedState() {
            switch(this.course.state) {
                case "Ativo": 
                    return this.$t('states.active');
                case "Inativo": 
                    return this.$t('states.inactive');
                case "Rejeitado": 
                    return this.$t('states.rejected');
                case "Pendente": 
                    return this.$t('states.pending');
                default:
                    return "Erro";
            }
        },
        roundedRating() {
            let score = parseFloat(this.course.rating.toString()).toFixed(2);

            if (score == 0.00) return '-.--';
            else return parseFloat(this.course.rating.toString()).toFixed(2);
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
            this.videosOpen = !this.videosOpen;
        }
    }
}
</script>

<style scoped>
    .course-card-container {
        position: relative;
        padding: 16px 16px 32px 16px;
        height: auto;
    }

    .course-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 16px 40px 16px 16px;
        border-radius: 8px;
        background: var(--mobalytics-card);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .course-card.videos-open {
        border-radius: 8px 8px 0px 8px;
    }

    .course-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    .course-card-left > div {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    .course-card-left > div > div {
        width: 200px;
    }

    .course-card-left img {
        height: 140px;
        width: 140px;
        border-radius: 8px;
        object-fit: cover;
    }

    .course-card-left p {
        color: var(--light);
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .course-card-left .first-left-div {
        width: 490px;
    }

    .course-card-left .first-left-div p {
        width: 490px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .course-card-left > div > div > a > p {
        color: var(--primary);
        font-size: 24px;
    }

    .course-card-right {
        align-items: center;
        gap: 40px;
    }

    button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
    }

    .button-wrapper {
        display: block;
    }

    .pending-div {
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .notif-icon {
        font-size: 36px;
        color: var(--primary);
        animation: tilt-shaking 0.3s infinite;
    }

    @keyframes tilt-shaking {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(10deg); }
        50% { transform: rotate(0eg); }
        75% { transform: rotate(-10deg); }
        100% { transform: rotate(0deg); }
    }

    .open-videos-div {
        position: absolute;
        bottom: 8px;
        right: 80px;

        background: var(--mobalytics-card);
        border-radius: 50%;
        height: 60px;
        width: 60px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 10px 10px 0px;
    }

    .open-videos-icon {
        object-fit: cover;
        font-size: 60px;
        color: var(--light);
        cursor: pointer;
        transition: 0.5s;
    }

    .video-list {
        overflow: hidden;
        margin-left: 160px;
        border-radius: 0px 8px 0px 0px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 11px 10px 4px;
        -webkit-transition: max-height 0.5s linear;
        -moz-transition: max-height 0.5s linear;
        -ms-transition: max-height 0.5s linear;
        -o-transition: max-height 0.5s linear;
        transition: max-height 0.5s linear;
    }

    .video-list.closed {
        overflow: hidden;
        max-height: 0px !important;
        box-shadow: none !important;
        -webkit-transition: max-height 0.5s linear, box-shadow 0s linear 0.5s;
        -moz-transition: max-height 0.5s linear, box-shadow 0s linear 0.5s;
        -ms-transition: max-height 0.5s linear, box-shadow 0s linear 0.5s;
        -o-transition: max-height 0.5s linear, box-shadow 0s linear 0.5s;
        transition: max-height 0.5s linear, box-shadow 0s linear 0.5s;
    }

    .mirrored {
        transform: rotate(180deg);
        transition: 0.5s;
    }

    @media (max-width: 1950px) {
        .button-wrapper {
            width: 120px;
        }

        .course-card-right {
            width: 120px;
        }

        .button-wrapper button:first-child {
            margin-bottom: 16px;
        }
    }

    @media (max-width: 1750px) {

        .course-card {
            padding-top: 24px;
            padding-bottom: 24px;
        }

        .course-card-left > div {
            display: block;
        }

        .course-card-left > div:last-child > div:first-child {
            padding-top: 52px;
        }

        .course-card-left {
            gap: 40px;
        }

        .course-card-left .first-left-div {
            width: 390px;
        }

        .course-card-left .first-left-div p {
            width: 390px;
        }
	}

    @media (max-width: 1450px) {
        .course-card-left .first-left-div {
            width: 310px;
        }

        .course-card-left .first-left-div p {
            width: 310px;
        }
    }

    @media (max-width: 1350px) {

        .course-card-left .first-left-div {
            width: 290px;
        }

        .course-card-left .first-left-div p {
            width: 290px;
        }

        .course-card-left img {
            width: 120px;
            height: 120px;
        }

        .course-card-container {
            padding-left: 0px;
            padding-right: 0px;
        }

        .course-card-left {
            gap: 20px;
        }

        .pending-div {
            right: -16px;
        }

        .video-list {
            margin-left: 80px;
        }
    }

    @media (max-width: 1250px) {

        .course-card-left .first-left-div {
            width: 210px;
        }

        .course-card-left .first-left-div p {
            width: 210px;
        }

        .video-card {
            gap: 20px;
        }

        .course-card-left > div:last-child > div {
            width: 140px;
        }
    }

    @media (max-width: 1150px) {
        .course-card-right {
            width: 90px;
        }

        .button-wrapper {
            width: 90px;
        }

        button {
            width: 90px;
        }
    }
</style>