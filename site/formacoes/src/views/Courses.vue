<template>
    <div class="courses-wrapper">
        <CoursesListFilter v-on:filter="filter" v-bind:categories="this.categories" />
        <div class="row">
            <CoursesListCourseCard v-for="course in this.coursesDisplay" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("courses.warning")}}</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:numberOfPages="numberOfPages"/>
    </div>
</template>

<script>
import axios from 'axios';
import CoursesListFilter from "../components/courses/CoursesListFilter.vue";
import CoursesListCourseCard from "../components/courses/CoursesListCourseCard.vue";
import Pagination from "../components/paginations/Pagination.vue";
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'

export default {
    name: "Courses",
    components: {
        CoursesListFilter,
        CoursesListCourseCard,
        Pagination
    },
    props: {
        sidebar: {
            type: Boolean,
            required: true
        }
    },
    data() {
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
    created() {
        axios({
            method: 'get',
            url: `${import.meta.env.VITE_HOST}/cursos`
        })
        .then(value => {
            value.data.courses.forEach(c => this.courses.push(c));
            console.log(value.data.courses)

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
                this.$emit("open-modal", error.response.data.message);
                console.log(error.response.data);
            } else console.log(error);
        });
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

            switch (filter.order) {
                case this.$t("courses.recentlyAdded"):
                    this.coursesFiltered.sort((a, b) => new Date(a.date) < new Date(b.date) ? 1 : new Date(b.date) < new Date(a.date) ? -1 : 0);
                    break;
                case this.$t("courses.formerlyAdded"):
                    this.coursesFiltered.sort((a, b) => new Date(a.date) > new Date(b.date) ? 1 : new Date(b.date) > new Date(a.date) ? -1 : 0);
                    break;
                case this.$t("courses.priceHighToLow"):
                    this.coursesFiltered.sort((a, b) => a.price < b.price ? 1 : b.price < a.price ? -1 : 0);
                    break;
                case this.$t("courses.priceLowToHigh"):
                    this.coursesFiltered.sort((a, b) => a.price > b.price ? 1 : b.price > a.price ? -1 : 0);
                    break;
                default:
                    break;
            }

            for (var i = (this.page - 1) * this.coursesPerPage; i < this.page * this.coursesPerPage; i++) {
                if (this.coursesFiltered[i]) {
                    this.coursesDisplay.push(this.coursesFiltered[i]);
                }
            }
        },
        changePage(page) {
            this.page = page;

            this.coursesDisplay = [];

            for (var i = (this.page - 1) * this.coursesPerPage; i < this.page * this.coursesPerPage; i++) {
                if (this.coursesFiltered[i]) {
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
};
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