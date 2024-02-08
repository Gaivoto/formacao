<template>
    <div class="courses-list-wrapper">
<<<<<<< HEAD
        <CourseListAdmFilter v-on:filter="filter"/>
        <div>
            <CourseListAdmCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course" v-on:changeStateCourse="changeStateCourse" v-on:changeStateVideo="changeStateVideo"/>
        </div>
        <Pagination2 v-bind:totalItems="this.coursesFiltered.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
=======
        <CourseListAdmFilter v-on:filter="filter" v-bind:categories="this.categories"/>
        <div class="results">
            <CourseListAdmCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course" v-on:changeStateCourse="changeStateCourse" v-on:changeStateVideo="changeStateVideo"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("courseListAdm.noResults") }}</p>    
            </div>
        </div>
        <Pagination2 v-bind:totalItems="this.coursesFiltered.length" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
>>>>>>> origin/development
    </div>
</template>

<script>
<<<<<<< HEAD
import CourseListAdmFilter from '../components/courseListAdm/CourseListAdmFilter.vue'
import CourseListAdmCourseCard from '../components/courseListAdm/CourseListAdmCourseCard.vue'
import Pagination2 from '../components/paginations/Pagination2.vue'
=======
import axios from 'axios'
import CourseListAdmFilter from '../components/courseListAdm/CourseListAdmFilter.vue'
import CourseListAdmCourseCard from '../components/courseListAdm/CourseListAdmCourseCard.vue'
import Pagination2 from '../components/paginations/Pagination2.vue'
import Tr from '@/i18n/translation.js'
>>>>>>> origin/development

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
<<<<<<< HEAD
            coursesDisplay: []
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
                subscriptions: 13,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Ativo",
                videos: [
                    {
                        id: 1,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 2,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 2,
                name: "Course 2",
                description: "desc 2 amongus",
                image: "bingus",
                price: 12,
                category: "cat13",
                date: "05-11-2022",
                subscriptions: 1311,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Ativo",
                videos: [
                    {
                        id: 3,
                        name: "v1",
                        state: "Pendente",
                        image: "bingus"
                    },
                    {
                        id: 4,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022",
                subscriptions: 133,
                creator: {
                    id: 2,
                    name: "Amogus"
                },
                state: "Inativo",
                videos: [
                    {
                        id: 5,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 6,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat12",
                date: "05-09-2022",
                subscriptions: 1,
                creator: {
                    id: 2,
                    name: "Amogus"
                },
                state: "Pendente",
                videos: [
                    {
                        id: 7,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 8,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 5,
                name: "Course 5",
                description: "desc 5 amongus",
                image: "bingus",
                price: 5,
                category: "cat1",
                date: "05-08-2022",
                subscriptions: 13123,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Ativo",
                videos: [
                    {
                        id: 9,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 10,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 6,
                name: "Course 6",
                description: "desc 6 amongus",
                image: "bingus",
                price: 25,
                category: "cat1",
                date: "05-07-2022",
                subscriptions: 3,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Ativo",
                videos: [
                    {
                        id: 11,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 12,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat10",
                date: "05-06-2022",
                subscriptions: 131,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Ativo",
                videos: [
                    {
                        id: 13,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 14,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 8,
                name: "Course 8",
                description: "desc 8 amongus",
                image: "bingus",
                price: 10,
                category: "cat1",
                date: "05-05-2022",
                subscriptions: 132,
                creator: {
                    id: 2,
                    name: "Amogus"
                },
                state: "Inativo",
                videos: [
                    {
                        id: 15,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 16,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat11",
                date: "05-04-2022",
                subscriptions: 71,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Ativo",
                videos: [
                    {
                        id: 17,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 18,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 10,
                name: "Course 10",
                description: "desc 10 amongus",
                image: "bingus",
                price: 15,
                category: "cat1",
                date: "05-03-2022",
                subscriptions: 100,
                creator: {
                    id: 2,
                    name: "Amogus"
                },
                state: "Pendente",
                videos: [
                    {
                        id: 19,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 20,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 11,
                name: "Course 11",
                description: "desc 11 amongus",
                image: "bingus",
                price: 2,
                category: "cat1",
                date: "05-01-2022",
                subscriptions: 20,
                creator: {
                    id: 2,
                    name: "Amogus"
                },
                state: "Inativo",
                videos: [
                    {
                        id: 21,
                        name: "v1",
                        state: "Ativo",
                        image: "bingus"
                    },
                    {
                        id: 22,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            },
            {
                id: 12,
                name: "Course 12",
                description: "desc 12 amongus",
                image: "bingus",
                price: 120,
                category: "cat1",
                date: "05-02-2022",
                subscriptions: 0,
                creator: {
                    id: 1,
                    name: "Bingus"
                },
                state: "Rejeitado",
                videos: [
                    {
                        id: 23,
                        name: "v1",
                        state: "Inativo",
                        image: "bingus"
                    },
                    {
                        id: 24,
                        name: "v2",
                        state: "Ativo",
                        image: "bingus"
                    },
                ]
            }
        ];

        this.coursesDisplay = this.courses.slice(0, this.itemsPerPage);
    },
    methods: {
        filter(filter) {
            this.coursesDisplay = [];
            this.coursesFiltered = [...this.courses];

            if(filter.name) {
                this.coursesFiltered = this.coursesFiltered.filter(course => course.name.toLowerCase().includes(filter.name.toLowerCase()) || course.creator.name.toLowerCase().includes(filter.name.toLowerCase()));
            }

            if(filter.category != 'all') {
                this.coursesFiltered = this.coursesFiltered.filter(course => course.category == filter.category);
            }

            if(filter.state != 'all') {
                this.coursesFiltered = this.coursesFiltered.filter(course => course.state == filter.state);
            }

            switch(filter.order) {
                case "price-desc":
                    this.coursesFiltered.sort((a, b) => a.price < b.price ? 1 : (b.price < a.price ? -1 : 0));
                    break;
                case "price-asc":
                    this.coursesFiltered.sort((a, b) => (a.price > b.price ? 1 : (b.price > a.price) ? -1 : 0));
                    break;
                case "subs-desc":
                    this.coursesFiltered.sort((a, b) => a.subscriptions < b.subscriptions ? 1 : (b.subscriptions < a.subscriptions ? -1 : 0));
                    break;
                case "subs-asc":
                    this.coursesFiltered.sort((a, b) => a.subscriptions > b.subscriptions ? 1 : (b.subscriptions > a.subscriptions ? -1 : 0));
=======
            coursesDisplay: [],
            categories: [],
            filterInfo: {}
        }
    },
    setup() {
        return { Tr };
    },
    created(){
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type != "admin") {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/cursos`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                }
            })
            .then(value => {
                value.data.courses.forEach(c => this.courses.push(c));

                this.coursesFiltered = [...this.courses];
                this.coursesDisplay = this.courses.slice(0, this.itemsPerPage);

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

            if(filter.state != this.$t("courseListAdm.allM")) {
                if(filter.state == this.$t("states.pending")) {
                    this.coursesFiltered = [];
                    this.courses.forEach(course => {
                        if(course.state == "Pendente") this.coursesFiltered.push(course);
                        else {
                            course.videos.forEach(vid => {
                                if(vid.state == "Pendente") this.coursesFiltered.push(course);
                            });    
                        }
                    });
                } else {
                    this.coursesFiltered = this.courses.filter(course => course.state == this.translateStatePt(filter.state));
                }
            }

            if(filter.name) {
                this.coursesFiltered = this.coursesFiltered.filter(course => course.name.toLowerCase().includes(filter.name) || course.nameCr.toLowerCase().includes(filter.name));
            }

            if(filter.category != this.$t("courseListAdm.allF")) {
                this.coursesFiltered = this.coursesFiltered.filter(course => course.category == filter.category);
            }

            switch(filter.order) {
                case this.$t("order.mostExpensive"):
                    this.coursesFiltered.sort((a, b) => a.price < b.price ? 1 : (b.price < a.price ? -1 : 0));
                    break;
                case this.$t("order.cheapest"):
                    this.coursesFiltered.sort((a, b) => (a.price > b.price ? 1 : (b.price > a.price) ? -1 : 0));
                    break;
                case this.$t("order.newest"):
                    this.coursesFiltered.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : new Date(b.date) < new Date(a.date) ? -1 : 0);
                    break;
                case this.$t("order.oldest"):
                    this.coursesFiltered.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : new Date(b.date) > new Date(a.date) ? -1 : 0);
>>>>>>> origin/development
                    break;
                default:
                    break;
            }

            this.currentPage = 1;
            this.coursesDisplay = this.coursesFiltered.slice(0, this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.coursesDisplay = this.coursesFiltered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
        changeStateCourse(info) {
            this.courses.forEach(course => {
                if(course.id == info.id) {
                    course.state = info.state;
<<<<<<< HEAD
                    course.videos.forEach(video => {
                        video.state = info.state;
                    });
                }
            });
            //change course state on db

            this.notifyCreator();
        },
        changeStateVideo(info) {
            this.courses.forEach(course => {
                course.videos.forEach(video => {
                    if(video.id == info.id) video.state = info.state;
                });
            });
            //change video state on db

            this.notifyCreator();
        },
        notifyCreator() {
            //notify creator
=======
                }
            });
            
            axios({
                method: 'put',
                url: `${import.meta.env.VITE_HOST}/cursos/adm/${info.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                },
                data: {
                    state: info.state
                }
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);

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
        },
        changeStateVideo(info) {
            let id_course;

            this.courses.forEach(course => {
                course.videos.forEach(video => {
                    if(video.id == info.id) {
                        video.state = info.state;
                        id_course = course.id;
                    }
                });
            });

            axios({
                method: 'put',
                url: `${import.meta.env.VITE_HOST}/videos/adm/${info.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                },
                data: {
                    state: info.state,
                    id_course: id_course
                }
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);

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
        },
        translateStatePt(state) {
            switch(state) {
                case this.$t("states.inactive"):
                    return "Inativo";
                case this.$t("states.active"):
                    return "Ativo";
                case this.$t("states.pending"):
                    return "Pendente";
                case this.$t("states.denied"):
                    return "Rejeitado";
            }
>>>>>>> origin/development
        }
    }
}
</script>

<style scoped>
<<<<<<< HEAD
=======
    .courses-list-wrapper {
        padding: 24px 32px 0px 32px;
    }

    .results { 
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

    @media (max-width: 1050px) {
        .results {
            padding: 0px;
        }
	}

    @media (max-width: 800px) {
        .courses-list-wrapper {
            padding: 24px 16px 0px 16px;
        }
	}
>>>>>>> origin/development
</style>