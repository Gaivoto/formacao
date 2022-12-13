<template>
    <div class="course-card-container">
        <div class="course-card-left">
            <img :src="this.imageUrl">
            <div>
                <p>{{ this.course.name }}</p>
                <p>{{ this.course.creator.name }}</p>
            </div>
            <div>
                <p>{{ this.course.price }}</p>
                <p>{{ this.course.subscriptions }}</p>
            </div>    
            <div>
                <p>{{ this.course.category }}</p>
                <p>{{ this.course.state }}</p>
            </div>    
        </div>
        <button v-on:click="changeState">{{ this.buttonText }}</button>
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
        buttonText() {
            if(this.course.state == "Ativo") return "DESATIVAR";
            else return "ATIVAR";
        }
    },
    methods: {
        changeState() {
            if(this.course.state == "Ativo") this.$emit("changeState", {id: this.course.id, state: "Inativo"});
            else this.$emit("changeState", {id: this.course.id, state: "Ativo"});
        }
    }
}
</script>

<style scoped>
    .user-card-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
    }

    .user-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    button {
        background: grey;
        height: 40px;
        width: 120px;
    }
</style>