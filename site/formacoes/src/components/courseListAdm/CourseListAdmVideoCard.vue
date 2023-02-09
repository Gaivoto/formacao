<template>
    <div class="video-card">
        <div class="video-card-left">
            <img :src="this.imageUrl">
            <div>
                <router-link :to="{ name: 'Vídeo', params: { id: this.courseId, idVid: this.video.id } }"><p>{{ this.video.title }}</p></router-link>
            </div>
            <div>
                <p>Estado: {{ this.video.state }}</p>
                <p>Data: {{ this.formatedDate }}</p>
            </div>
        </div>
        <div class="video-card-right">
            <button v-if="showButton1" v-on:click="changeState('Ativo')">ATIVAR</button>
            <button v-if="showButton2" v-on:click="changeState('Inativo')">DESATIVAR</button>
            <div v-if="showButton3and4" class="button-wrapper">
                <button v-on:click="changeState('Ativo')">APROVAR</button>
                <button v-on:click="changeState('Rejeitado')">REJEITAR</button>
            </div>
            <button v-if="showButton5" v-on:click="changeState('Pendente')">TORNAR PENDENTE</button>      
        </div>
    </div>
</template>

<script>
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
        },
        formatedDate() {
            return this.video.date.substring(8, 10) + "/" + this.video.date.substring(5, 7) + "/" + this.video.date.substring(0, 4) + " " + this.video.date.substring(11, 19);
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
    .video-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        padding: 16px 40px 16px 16px;
        background: var(--mobalytics-card);
    }

    .video-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    .video-card-left img {
        height: 110px;
        width: 110px;
        border-radius: 8px;
        object-fit: cover;
    }

    .video-card-left p {
        color: var(--light);
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
    }

    .button-wrapper {
        display: flex;
        gap: 16px;
    }

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
</style>