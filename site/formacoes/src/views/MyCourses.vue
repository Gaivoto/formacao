<template>
    <div class="courses-wrapper">
        <MyCoursesFilter v-on:filter="filter" v-bind:courses="this.courses"/>
        <div class="row">
            <MyCoursesCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>Não existem resultados para a pesquisa.</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:numberOfPages="numberOfPages"/>
    </div>
</template>

<script>
import MyCoursesFilter from '../components/myCourses/MyCoursesFilter.vue'
import MyCoursesCourseCard from '../components/myCourses/MyCoursesCourseCard.vue'
import Pagination from '../components/paginations/Pagination.vue'

export default {
    name: 'Courses',
    components: {
        MyCoursesFilter,
        MyCoursesCourseCard,
        Pagination
    },
    data(){
        return {
            courses: [],
            coursesFiltered: [],
            coursesDisplay: [],
            page: 1,
            coursesPerPage: 2
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
                date: "05-12-2022",
                duration: "23h 12min",
                progress: 20,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 2,
                name: "Course 2",
                description: "desc 2 amongus",
                image: "bingus",
                price: 12,
                category: "cat1",
                date: "05-11-2022",
                duration: "23h 12min",
                progress: 90,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat1",
                date: "05-09-2022",
                duration: "23h 12min",
                progress: 66,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 5,
                name: "Course 5",
                description: "desc 5 amongus",
                image: "bingus",
                price: 5,
                category: "cat1",
                date: "05-08-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 6,
                name: "Course 6",
                description: "desc 6 amongus",
                image: "bingus",
                price: 25,
                category: "cat1",
                date: "05-07-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-06-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 8,
                name: "Course 8",
                description: "desc 8 amongus",
                image: "bingus",
                price: 10,
                category: "cat1",
                date: "05-05-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat1",
                date: "05-04-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 10,
                name: "Course 10",
                description: "desc 10 amongus",
                image: "bingus",
                price: 15,
                category: "cat1",
                date: "05-03-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 11,
                name: "Course 11",
                description: "desc 11 amongus",
                image: "bingus",
                price: 2,
                category: "cat1",
                date: "05-01-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 12,
                name: "Course 12",
                description: "desc 12 amongus",
                image: "bingus",
                price: 120,
                category: "cat1",
                date: "05-02-2022",
                duration: "23h 12min",
                progress: 48,
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            }
        ];
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.coursesFiltered.length / this.coursesPerPage);
        },
        noResults() {
            if(this.coursesFiltered.length == 0) return true;
            return false;  
        }
    },
    methods: {
        filter(filter) {
            this.coursesDisplay = [];
            this.coursesFiltered = [...this.courses];

            if(filter.name) {
                this.coursesFiltered = this.coursesFiltered.filter(c => c.name.toLowerCase().includes(filter.name) || c.creator.name.toLowerCase().includes(filter.name));
            }

            if(filter.category != "Todas") {
                this.coursesFiltered = this.coursesFiltered.filter(c => c.category == filter.category);
            }

            switch(filter.order) {
                case "Mais recente":
                    this.coursesFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "Mais antigo":
                    this.coursesFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "Preço decrescente":
                    this.coursesFiltered.sort((a, b) => a.price < b.price ? 1 : (b.price < a.price ? -1 : 0));
                    break;
                case "Preço crescente":
                    this.coursesFiltered.sort((a, b) => (a.price > b.price ? 1 : (b.price > a.price) ? -1 : 0));
                    break;
                case "Progresso decrescente":
                    this.coursesFiltered.sort((a, b) => a.progress < b.progress ? 1 : (b.progress < a.progress ? -1 : 0));
                    break;
                case "Progresso crescente":
                    this.coursesFiltered.sort((a, b) => a.progress > b.progress ? 1 : (b.progress > a.progress ? -1 : 0));
                    break;
                default:
                    break;
            }

            for(var i = (this.page - 1) * this.coursesPerPage; i < this.page * this.coursesPerPage; i++) {   
                if(this.coursesFiltered[i]){
                    this.coursesDisplay.push(this.coursesFiltered[i]);
                } 
            }
        },
        changePage(page) {
            this.page = page;
            
            this.coursesDisplay = [];

            for(var i = (this.page - 1) * this.coursesPerPage; i < this.page * this.coursesPerPage; i++) {   
                if(this.coursesFiltered[i]){
                    this.coursesDisplay.push(this.coursesFiltered[i]);
                } 
            }
        }
    }
}
</script>

<style scoped>
    .courses-wrapper {
        padding: 24px 32px 0px 32px;
    }

    .row {
        margin: 0px;
        padding: 0px 8px;
        min-height: 70vh;
    }

    .no-results {
        padding-top: 100px;
        width: 100%;
        text-align: center;
    }

    .no-results .material-icons {
        font-size: 200px;
        color: var(--light);
    }

    .no-results p {
        color: var(--light);
        font-size: 40px;
    }

    @media (max-width: 900px) {
        .row {
            padding: 0px;
        }
    }

    @media (max-width: 600px) {
        .courses-wrapper {
            padding: 24px 16px 0px 16px;
        }
	}
</style>