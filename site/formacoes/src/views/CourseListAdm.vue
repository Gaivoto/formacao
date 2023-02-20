<template>
    <div class="courses-list-wrapper">
        <CourseListAdmFilter v-on:filter="filter" v-bind:categories="this.categories"/>
        <div class="results">
            <CourseListAdmCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course" v-on:changeStateCourse="changeStateCourse" v-on:changeStateVideo="changeStateVideo"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("courseListAdm.noResults") }}</p>    
            </div>
        </div>
        <Pagination2 v-bind:totalItems="this.coursesFiltered.length" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
import axios from 'axios'
import CourseListAdmFilter from '../components/courseListAdm/CourseListAdmFilter.vue'
import CourseListAdmCourseCard from '../components/courseListAdm/CourseListAdmCourseCard.vue'
import Pagination2 from '../components/paginations/Pagination2.vue'
import Tr from '@/i18n/translation.js'

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
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
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
                console.log(value)
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);

                this.filter(this.filterInfo);
            })
            .catch(error => {
                if(error.code) {
                    console.log(error.response.data);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
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
                console.log(value)
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);

                this.filter(this.filterInfo);
            })
            .catch(error => {
                if(error.code) {
                    console.log(error.response.data);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
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
        }
    }
}
</script>

<style scoped>
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
</style>