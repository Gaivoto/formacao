<template>
    <div class="course-details-wrapper">
        <CourseDetHeader v-bind:course="this.course" />
        <div class="vid-container">
            <VidInfo v-for="vid in this.videos" :key="vid.id" v-bind:video="vid"/>
        </div>
    </div>
</template>

<script>
import CourseDetHeader from '../components/courseDetails/CourseDetHeader.vue';
import VidInfo from '../components/courseDetails/VidInfo.vue';
export default {
    components: {
        CourseDetHeader,
        VidInfo
    },
    created() {
        this.course = 
            {
                id: 1,
                image: 'tomasGostosa',
                name: 'nameCourse',
                creatorName: 'seuku miyadora',
                description: 'description2',
                category: 'category1',
                price: '55.80 R$',
                
            },
            this.videos = [
            {
                id: 1,
                image: 'tomasGostosa',
                name: 'video1',
                description: 'description1',
                duration: '15 min'
            },
            {
                id: 2,
                image: 'tomasGostosa',
                name: 'video2',
                description: 'description2',
                duration: '16 min'
            },
            {
                id: 3,
                image: 'tomasGostosa',
                name: 'video3',
                description: 'description3',
                duration: '17 min'
            },
            {
                id: 4,
                image: 'tomasGostosa',
                name: 'video4',
                description: 'description4',
                duration: '18 min'
            },
            {
                id: 5,
                image: 'tomasGostosa',
                name: 'video5',
                description: 'description5',
                duration: '2 hours '
            },
            
        ]
    }
    
}
</script>

<style scoped>
.course-details-wrapper {
    height: 100vh;
}
.vid-container {
    padding: 1%;
    background-color: rgb(9, 255, 0);
    overflow-x: hidden;
    overflow-y: auto;
    height: 45%;
}
</style>
