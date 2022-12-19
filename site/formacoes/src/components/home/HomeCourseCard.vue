<template>
    <router-link :to="{ name: 'Curso', params: { id: this.course.id } }" class="course-card-container col-6 col-md-3">
        <div class="course-card">
            <img :src="this.imageUrl">
            <p>{{ this.course.name }}</p>
            <p>{{ this.course.category }}</p>
            <p>{{ this.course.price }} €</p>  
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'HomeCourseCard',
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
    methods: {
    }
}
</script>

<style lang="scss" scoped>
    .course-card-container {
        padding: 12px;
    }

    .course-card {
        background-color: paleturquoise;
        padding: 16px;
    }

    .course-card img {
        width: 100%;
    }
</style>