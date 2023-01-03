<template>
    <div class="video-card">
        <div class="video-card-left">
            <img :src="this.imageUrl">
            <div>
                <router-link :to="{ name: 'Vídeo', params: { id: this.courseId } }"><p>{{ this.video.name }}</p></router-link>
            </div>
            <div>
                <p>Estado: {{ this.video.state }}</p>
                <p>Data: {{ this.video.date }}</p>
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
</style>