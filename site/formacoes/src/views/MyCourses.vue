<template>
    <div class="courses-wrapper">
<<<<<<< HEAD
        <MyCoursesFilter v-on:filter="filter" v-bind:courses="this.courses"/>
        <div class="row">
            <MyCoursesCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>Não existem resultados para a pesquisa.</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:page="this.page" v-bind:numberOfPages="numberOfPages"/>
=======
        <MyCoursesFilter v-on:filter="filter" v-bind:categories="this.categories"/>
        <div class="row">
            <MyCoursesCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("myCourses.warning") }}</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:numberOfPages="numberOfPages"/>
>>>>>>> origin/development
    </div>
</template>

<script>
<<<<<<< HEAD
import MyCoursesFilter from '../components/myCourses/MyCoursesFilter.vue'
import MyCoursesCourseCard from '../components/myCourses/MyCoursesCourseCard.vue'
import Pagination from '../components/paginations/Pagination.vue'
=======
import axios from 'axios';
import MyCoursesFilter from '../components/myCourses/MyCoursesFilter.vue'
import MyCoursesCourseCard from '../components/myCourses/MyCoursesCourseCard.vue'
import Pagination from '../components/paginations/Pagination.vue'
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'
>>>>>>> origin/development

export default {
    name: 'Courses',
    components: {
        MyCoursesFilter,
        MyCoursesCourseCard,
        Pagination
    },
<<<<<<< HEAD
    data(){
        return {
            courses: [],
            coursesFiltered: [],
            coursesDisplay: [],
            page: 1,
            coursesPerPage: 8
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
=======
    props: {
        sidebar: {
            type: Boolean,
            required: true
        }
    },
    data(){
        return {
            courses: [],
            categories: [],
            coursesFiltered: [],
            coursesDisplay: [],
            page: 1,
            coursesPerPage: 8,
            filterInfo: {}
        }
    },
    setup() {
        const { t } = useI18n()

        return { Tr, t };
    },
    created(){
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type == 'admin' || this.$store.getters.getUser.id != this.$route.params.id) {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/cursos/user/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                }
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);

                value.data.courses.forEach(c => this.courses.push(c));
                
                this.coursesFiltered = [...this.courses];

                for (var i = (this.page - 1) * this.coursesPerPage; i < this.page * this.coursesPerPage; i++) {
                    if (this.coursesFiltered[i]) {
                        this.coursesDisplay.push(this.coursesFiltered[i]);
                    }
                }

                this.getCategories();
                this.filter(this.filterInfo);
            })
            .catch(error => {
                if(error.code) {
                    console.log(error.response.data);
                    this.$emit("open-modal", error.response.data.message);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    }
                } else console.log(error);
            });
        }
>>>>>>> origin/development
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
<<<<<<< HEAD
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
=======
            this.filterInfo = filter;
            this.coursesDisplay = [];
            this.coursesFiltered = [...this.courses];
            if(filter.name) {
                this.coursesFiltered = this.coursesFiltered.filter(c => c.name.toLowerCase().includes(filter.name) || c.nameCr.toLowerCase().includes(filter.name));
            }

            if(filter.category != this.$t("myCourses.allF")) {
                this.coursesFiltered = this.coursesFiltered.filter(c => c.category == filter.category);
            }
            switch(filter.order) {
                case this.$t("myCourses.recentlyAdded"):
                    this.coursesFiltered.sort((a, b) => a.dateBought < b.dateBought ? 1 : b.dateBought < a.dateBought ? -1 : 0);
                    break;
                case this.$t("myCourses.formerlyAdded"):
                    this.coursesFiltered.sort((a, b) => a.dateBought > b.dateBought ? 1 : b.dateBought > a.dateBought ? -1 : 0);
                    break;
                case this.$t("myCourses.descendingProgress"):
                    this.coursesFiltered.sort((a, b) => a.progress < b.progress ? 1 : (b.progress < a.progress ? -1 : 0));
                    break;
                case this.$t("myCourses.ascendingProgress"):
>>>>>>> origin/development
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
<<<<<<< HEAD
=======
        },
        getCategories() {
            this.courses.forEach(c => {
                let exists = false;

                this.categories.forEach(cat => {
                    if (c.category == cat.name) {
                        exists = true;
                    }
                });

                if (!exists) {
                    this.categories.push({id: this.categories.length, name: c.category});
                }
            });
>>>>>>> origin/development
        }
    }
}
</script>

<style scoped>
    .courses-wrapper {
<<<<<<< HEAD
        padding: 24px 24px 0px 24px;
=======
        padding: 24px 32px 0px 32px;
>>>>>>> origin/development
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
<<<<<<< HEAD
=======

    @media (max-width: 900px) {
        .row {
            padding: 0px;
        }
    }

    @media (max-width: 800px) {
        .courses-wrapper {
            padding: 24px 16px 0px 16px;
        }
	}
>>>>>>> origin/development
</style>