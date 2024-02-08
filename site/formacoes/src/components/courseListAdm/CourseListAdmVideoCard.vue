<template>
<<<<<<< HEAD
    <div class="video-card-container">
        <div class="video-card-left">
            <img :src="this.imageUrl">
            <div>
                <router-link :to="{ name: 'Vídeo', params: { id: this.courseId } }"><p>Nome: {{ this.video.name }}</p></router-link>
                <p>Estado: {{ this.video.state }}</p>
            </div>
        </div>
        <button v-if="showButton1" v-on:click="changeState('Ativo')">ATIVAR</button>
        <button v-if="showButton2" v-on:click="changeState('Inativo')">DESATIVAR</button>
        <div v-if="showButton3and4" class="button-wrapper">
            <button v-on:click="changeState('Ativo')">APROVAR</button>
            <button v-on:click="changeState('Rejeitado')">REJEITAR</button>
        </div>
        <button v-if="showButton5" v-on:click="changeState('Pendente')">TORNAR PENDENTE</button>
=======
    <div class="video-card">
        <div class="video-card-left">
            <img :src="this.imageUrl">
            <div>
                <router-link :to="Tr.i18nRoute({ name: 'Vídeo', params: { id: this.courseId, idVid: this.video.id, locale: Tr.guessDefaultLocale() } })"><p>{{ this.video.title }}</p></router-link>
            </div>
            <div>
                <p>{{ $t("courseListAdm.state") }}: {{ this.translatedState }}</p>
                <p>{{ $t("courseListAdm.date") }}: {{ this.formatedDate }}</p>
            </div>
        </div>
        <div class="video-card-right">
            <button v-if="showButton1" v-on:click="changeState('Ativo')">{{ $t("courseListAdm.activate") }}</button>
            <button v-if="showButton2" v-on:click="changeState('Inativo')">{{ $t("courseListAdm.deactivate") }}</button>
            <div v-if="showButton3and4" class="button-wrapper">
                <button v-on:click="changeState('Ativo')">{{ $t("courseListAdm.approve") }}</button>
                <button v-on:click="changeState('Rejeitado')">{{ $t("courseListAdm.reject") }}</button>
            </div>
            <button v-if="showButton5" v-on:click="changeState('Pendente')">{{ $t("courseListAdm.makePending") }}</button>      
        </div>
>>>>>>> origin/development
    </div>
</template>

<script>
<<<<<<< HEAD
=======
import Tr from '@/i18n/translation.js'

>>>>>>> origin/development
export default {
    name: 'CourseListAdmVideoCard',
    props: {
        courseId: {
            type: Number,
            required: true
        },
        video: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: ""
        }
    },
<<<<<<< HEAD
=======
    setup() {
        return { Tr };
    },
>>>>>>> origin/development
    created(){
        this.imageUrl = new URL(`../../assets/${this.video.image}.jpg`, import.meta.url).href;
    },
    computed: {
        showButton1(){
            if(this.video.state == "Inativo") return true;
            return false;
        },
        showButton2() {
            if(this.video.state == "Ativo") return true;
            return false;
        },
        showButton3and4() {
            if(this.video.state == "Pendente") return true;
            return false;
        },
        showButton5() {
            if(this.video.state == "Rejeitado") return true;
            return false;
<<<<<<< HEAD
=======
        },
        formatedDate() {
            return this.video.date.substring(8, 10) + "/" + this.video.date.substring(5, 7) + "/" + this.video.date.substring(0, 4) + " " + this.video.date.substring(11, 19);
        },
        translatedState() {
            switch(this.video.state) {
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
>>>>>>> origin/development
        }
    },
    methods: {
        changeState(state) {
            this.$emit("changeStateVideo", {id: this.video.id, state: state});
        }
    }
}
</script>

<style scoped>
<<<<<<< HEAD
    .video-card-container {
        margin-left: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
=======
    .video-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 16px 40px 16px 16px;
        background: var(--mobalytics-card);
>>>>>>> origin/development
    }

    .video-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    .video-card-left img {
<<<<<<< HEAD
        height: 80px;
    }

    button {
        background: grey;
        height: 50px;
        width: 120px;
=======
        height: 110px;
        width: 110px;
        border-radius: 8px;
        object-fit: cover;
    }

    .video-card-left p {
        color: var(--light);
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .video-card-left > div > a > p {
        color: var(--primary);
        font-size: 20px;
        width: 360px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
>>>>>>> origin/development
    }

    .button-wrapper {
        display: flex;
        gap: 16px;
    }
<<<<<<< HEAD
=======

    @media (max-width: 1650px) {

        .video-card-right {
            width: 120px;
        }

        .button-wrapper {
            display: block;
            width: 120px;
        }

        .button-wrapper button:first-child {
            margin-bottom: 16px;
        }

        .video-card-left > div > a > p {
            width: 260px;
        }

        .video-card-left {
            gap: 40px;
        }
    }

    @media (max-width: 1450px) {

        .video-card-left > div > a > p {
            width: 200px;
        }

        .video-card-left img {
            width: 90px;
            height: 90px;
        }

        .video-card-left > div:last-child {
            min-width: 160px;
        }
    }

    @media (max-width: 1250px) {

        .video-card-left > div > a > p {
            width: 160px;
            -webkit-line-clamp: 3;
        }

        .video-card-left {
            gap: 20px;
        }

        .video-card-left > div:last-child {
            min-width: 120px;
        }
    }

    @media (max-width: 1150px) {
        .video-card-right {
            width: 90px;
        }

        .button-wrapper {
            width: 90px;
        }

        button {
            width: 90px;
        }
    }
>>>>>>> origin/development
</style>