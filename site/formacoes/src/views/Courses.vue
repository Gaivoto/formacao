<template>
    <div class="courses-wrapper">
        <CoursesListFilter v-on:filter="filter"/>
        <div class="row">
            <CoursesListCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course"/>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:page="this.page" v-bind:numberOfPages="numberOfPages"/>
    </div>
</template>

<script>
import CoursesListFilter from '../components/courses/CoursesListFilter.vue'
import CoursesListCourseCard from '../components/courses/CoursesListCourseCard.vue'
import Pagination from '../components/Pagination.vue'

export default {
    name: 'Courses',
    components: {
        CoursesListFilter,
        CoursesListCourseCard,
        Pagination
    },
    data(){
        return {
            courses: [],
            coursesFiltered: [],
            coursesDisplay: [],
            page: 1
        }
    },
    created(){
        this.courses = [
            {
                id: 1,
                name: "Course 1",
                description: "desc 1 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-12-2022"
            },
            {
                id: 2,
                name: "Course 2",
                description: "desc 2 amongus",
                image: "bingus",
                price: 12,
                category: "cat1",
                date: "05-11-2022"
            },
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022"
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat1",
                date: "05-09-2022"
            },
            {
                id: 5,
                name: "Course 5",
                description: "desc 5 amongus",
                image: "bingus",
                price: 5,
                category: "cat1",
                date: "05-08-2022"
            },
            {
                id: 6,
                name: "Course 6",
                description: "desc 6 amongus",
                image: "bingus",
                price: 25,
                category: "cat1",
                date: "05-07-2022"
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-06-2022"
            },
            {
                id: 8,
                name: "Course 8",
                description: "desc 8 amongus",
                image: "bingus",
                price: 10,
                category: "cat1",
                date: "05-05-2022"
            },
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat1",
                date: "05-04-2022"
            },
            {
                id: 10,
                name: "Course 10",
                description: "desc 10 amongus",
                image: "bingus",
                price: 15,
                category: "cat1",
                date: "05-03-2022"
            },
            {
                id: 11,
                name: "Course 11",
                description: "desc 11 amongus",
                image: "bingus",
                price: 2,
                category: "cat1",
                date: "05-01-2022"
            },
            {
                id: 12,
                name: "Course 12",
                description: "desc 12 amongus",
                image: "bingus",
                price: 120,
                category: "cat1",
                date: "05-02-2022"
            },
        ]
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.coursesFiltered.length / 6);
        }
    },
    methods: {
        filter(filter) {
            this.coursesDisplay = [];
            this.coursesFiltered = [];
            
            if(filter.name) {
                this.courses.forEach(c => {
                    if(c.name.includes(filter.name) && c.category == filter.category) {
                        this.coursesFiltered.push(c);
                    }
                });
            } else {
                this.courses.forEach(c => {
                    if(c.category == filter.category) {
                        this.coursesFiltered.push(c);
                    }
                });
            }

            switch(filter.order) {
                case "date-new":
                    this.coursesFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "date-old":
                    this.coursesFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "price-desc":
                    this.coursesFiltered.sort((a, b) => a.price < b.price ? 1 : (b.price < a.price ? -1 : 0));
                    break;
                case "price-asc":
                    this.coursesFiltered.sort((a, b) => (a.price > b.price ? 1 : (b.price > a.price) ? -1 : 0));
                    break;
                default:
                    break;
            }

            for(var i = (this.page - 1) * 6; i < this.page * 6; i++) {   
                if(this.coursesFiltered[i]){
                    this.coursesDisplay.push(this.coursesFiltered[i]);
                } 
            }
        },
        changePage(page) {
            this.page = page;
            
            this.coursesDisplay = [];

            for(var i = (this.page - 1) * 6; i < this.page * 6; i++) {   
                if(this.coursesFiltered[i]){
                    this.coursesDisplay.push(this.coursesFiltered[i]);
                } 
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .courses-wrapper {
        width: 100%;
    }

    .row {
        margin: 0px;
    }
</style>