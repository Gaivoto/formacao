<template>
    <div class="courses-wrapper">
        <MyCoursesFilter v-on:filter="filter" v-bind:categories="this.categories"/>
        <div class="row">
            <MyCoursesCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("myCourses.warning") }}</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:numberOfPages="numberOfPages"/>
    </div>
</template>

<script>
import axios from 'axios';
import MyCoursesFilter from '../components/myCourses/MyCoursesFilter.vue'
import MyCoursesCourseCard from '../components/myCourses/MyCoursesCourseCard.vue'
import Pagination from '../components/paginations/Pagination.vue'
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'

export default {
    name: 'Courses',
    components: {
        MyCoursesFilter,
        MyCoursesCourseCard,
        Pagination
    },
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
                console.log(this.courses)
                
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

    @media (max-width: 800px) {
        .courses-wrapper {
            padding: 24px 16px 0px 16px;
        }
	}
</style>