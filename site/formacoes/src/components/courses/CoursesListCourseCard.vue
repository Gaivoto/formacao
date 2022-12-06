<template>
    <div class="course-card-container col-lg-4 col-md-6">
        <div class="course-card">
            <img :src="this.imageUrl">
            <p>{{ this.course.name }}</p>
            <p>{{ this.course.description }}</p>
            <p>{{ this.course.price }} €</p>  
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoursesListCourseCard',
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
        background-color: green;
        padding: 16px;
    }

    .course-card img {
        width: 100%;
    }
</style>