<template>
    <div class="user-profile-course-card">
        <img :src="this.imageUrl">
        <p>{{ this.course.name }}</p>
        <div>
            <progress id="progress" :value="this.course.progress" max="100"></progress>
            <p>{{ this.course.progress }} %</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfileCourseCard',
    props: {
        course: {
            course: Object,
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
    .user-profile-course-card {
        padding: 16px;
    }

    img {
        height: 120px;
        width: 120px;
        object-fit: cover;
    }
</style>
