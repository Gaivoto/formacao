<template>
<<<<<<< HEAD
    <router-link :to="{ name: 'Curso', params: { id: this.course.id } }" class="user-profile-course-card col-md-2">
        <img :src="this.imageUrl">
        <p>{{ this.course.name }}</p>
        <div>
            <progress id="progress" :value="this.course.progress" max="100"></progress>
=======
    <router-link :to="Tr.i18nRoute({ name: 'Curso', params: { id: this.course.id_course,  locale: Tr.guessDefaultLocale() } })" class="user-profile-course-card">
        <img :src="this.imageUrl" />
        <p>{{ this.course.course }}</p>
        <div>
            <progress class="prog" id="progress" :value="this.course.progress" max="100"></progress>
>>>>>>> origin/development
            <p>{{ this.course.progress }} %</p>
        </div>
    </router-link>
</template>

<script>
<<<<<<< HEAD
export default {
    name: 'UserProfileCourseCard',
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
    }
}
</script>

<style lang="scss" scoped>
    .user-profile-course-card {
        padding: 16px;
=======
import Tr from '@/i18n/translation.js'
export default {
    name: "UserProfileCourseCard",
    props: {
        course: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            imageUrl: "",
        }
    },
    setup() {
        return { Tr };
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
    }
    
};
</script>

<style scoped>
    .user-profile-course-card {
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        height: 220px;
        min-width: 196px;
>>>>>>> origin/development
    }

    img {
        height: 120px;
        width: 120px;
        object-fit: cover;
<<<<<<< HEAD
=======
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 6px 2px;
    }

    p {
        color: var(--light);
        margin-bottom: 4px;
        max-width: 160px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .user-profile-course-card div {
        text-align: center;
    }

    .prog {
        height: 12px;
        width: 75%;
        margin: 0px;
        border-radius: 8px;
        background: var(--light);
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 6px 2px;
    }

    .prog::-moz-progress-bar {
        background: var(--primary);
    }

    .prog::-webkit-progress-bar {
        background: transparent;
    }

    .prog::-webkit-progress-value {
        background: var(--primary);
        border-radius: 8px;
    }

    @media (max-width: 1050px) {
        .user-profile-course-card {
            padding: 16px 0px;
            min-width: 164px;
        }
>>>>>>> origin/development
    }
</style>
