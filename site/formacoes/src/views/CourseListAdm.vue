<template>
    <div class="courses-list-wrapper"><!--
        <CourseListAdmFilter v-on:filter="filter"/>
        <div>
            <CourseListAdmCourseCard v-for="user in this.usersDisplay" :key="user.id" v-bind:user="user" v-on:changeState="changeState"/>
        </div>-->
        <Pagination2 v-bind:totalItems="this.usersFiltered.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
import CourseListAdmFilter from '../components/courseListAdm/CourseListAdmFilter.vue'
import CourseListAdmCourseCard from '../components/courseListAdm/CourseListAdmCourseCard.vue'
import Pagination2 from '../components/paginations/Pagination2.vue'

export default {
    name: 'CourseListAdm',
    components: {
        CourseListAdmFilter,
        CourseListAdmCourseCard,
        Pagination2
    },
    data(){
        return {
            currentPage: 1,
            itemsPerPage: 5,
            courses: [],
            coursesFiltered: [],
            coursesDisplay: []
        }
    },
    created(){
        this.courses = [

        ];

        this.coursesDisplay = this.courses.slice(0, this.itemsPerPage);
    },
    methods: {
        filter(filter) {
            this.coursesDisplay = [];
            this.coursesFiltered = [...this.users];

            if(filter.name) {
                this.coursesFiltered = this.coursesFiltered.filter(course => course.name.toLowerCase().includes(filter.name.toLowerCase()) || course.creator.name.toLowerCase().includes(filter.name.toLowerCase()));
            }

            if(filter.type != 'all') {
                this.coursesFiltered = this.coursesFiltered.filter(user => user.type == filter.type);
            }

            if(filter.state != 'all') {
                this.coursesFiltered = this.coursesFiltered.filter(user => user.state == filter.state);
            }

            this.currentPage = 1;
            this.coursesDisplay = this.coursesFiltered.slice(0, this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.coursesDisplay = this.coursesFiltered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
        changeState(info) {

            //change course state on db

            this.notifyCreator();
        },
        notifyCreator() {
            //notify creator
        }
    }
}
</script>

<style scoped>
    .courses-list-wrapper {
        width: 100%;
    }
</style>