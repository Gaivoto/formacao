<template>
    <div class="course-card-container">
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
        <button v-if="showButton1" v-on:click="changeState('Ativo')">ATIVAR</button>
        <button v-if="showButton2" v-on:click="changeState('Inativo')">DESATIVAR</button>
        <div v-if="showButton3and4" class="button-wrapper">
            <button v-on:click="changeState('Ativo')">APROVAR</button>
            <button v-on:click="changeState('Rejeitado')">REJEITAR</button>
        </div>
        <button v-if="showButton5" v-on:click="changeState('Pendente')">TORNAR PENDENTE</button>
    </div>
</template>

<script>
export default {
    name: 'CourseListAdmCourseCard',
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
        }
    },
    methods: {
        changeState(state) {
            this.$emit("changeState", {id: this.course.id, state: state});
        }
    }
}
</script>

<style scoped>
    .course-card-container {
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

    button {
        background: grey;
        height: 50px;
        width: 120px;
    }

    .button-wrapper {
        display: flex;
        gap: 16px;
    }
</style>