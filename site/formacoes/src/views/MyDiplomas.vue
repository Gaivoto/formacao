<template>
    <div class="diplomas-wrapper">
<<<<<<< HEAD
        <div>
            <!--Topbar-->
        </div>
        <div class="filter">
            <DiplomaFilter v-bind:diplomas="this.diplomas" v-on:filter="filter" />
        </div>
        <div class="row">
            <DiplomaCard v-for="diploma in this.diplomasDisplay" :key="diploma.id" v-bind:diploma="diploma"
                class="col-xl-6 col-md-6" />
        </div>
        <Pagination v-on:change-page="changePage" v-bind:page="this.page" v-bind:numberOfPages="numberOfPages" />
    </div>
</template>


<script>
import DiplomaCard from "../components/myDiplomas/DiplomaCard.vue";
import DiplomaFilter from "../components/myDiplomas/DiplomaFilter.vue";
import Pagination from "../components/paginations/Pagination.vue";

export default {
    data: () => {
        return {
            diplomas: [],
            diplomasFiltered: [],
            diplomasDisplay: [],
            page: 1
        }
    },
    created() {
        this.diplomas = [
            {
                id: 1,
                image: 'tomasGostosa',
                name: 'texto1',
                desc: 'description2 description2 description2 description2 description2 description2 description2 v description2 description2 description2 description2 description2description2 description2 description2 description2 description2 description2',
                category: 'cat1',
                date: "15-09-2022"
            },
            {
                id: 2,
                image: 'tomasGostosa',
                name: 'abc',
                desc: 'description2',
                category: 'cat2',
                date: "11-02-2021"
            },
            {
                id: 3,
                image: 'tomasGostosa',
                name: 'def',
                desc: 'description3',
                category: 'cat2',
                date: "17-07-2022"
            },
            {
                id: 4,
                image: 'tomasGostosa',
                name: 'ghi',
                desc: 'description4',
                category: 'cat14',
                date: "05-12-2022"
            },
            {
                id: 5,
                image: 'tomasGostosa',
                name: 'jkl',
                desc: 'description2',
                category: 'cat1',
                date: "28-01-2022"
            },
            {
                id: 6,
                image: 'tomasGostosa',
                name: 'mno',
                desc: 'description2',
                category: 'cat1',
                date: "22-08-2022"
            },
            {
                id: 7,
                image: 'tomasGostosa',
                name: 'pqr',
                desc: 'description2',
                category: 'cat1',
                date: "27-09-2022"
            },
            {
                id: 8,
                image: 'tomasGostosa',
                name: 'stu',
                desc: 'description2',
                category: 'cat1',
                date: "12-11-2022"
            },
            {
                id: 9,
                image: 'tomasGostosa',
                name: 'vxy',
                desc: 'description2',
                category: 'cat1',
                date: "04-05-2022"
            },
            {
                id: 10,
                image: 'tomasGostosa',
                name: 'stu',
                desc: 'description2',
                category: 'cat1',
                date: "16-10-2020"
            },
        ]
    },

=======
        <DiplomaFilter v-bind:categories="this.categories" v-on:filter="filter" />
        <div class="row">
            <DiplomaCard v-for="diploma in this.diplomasDisplay" :key="diploma.id" v-bind:diploma="diploma" v-bind:user="this.user" v-bind:sidebar="this.sidebar"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("myDiplomas.noResults") }}</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:numberOfPages="numberOfPages" />
    </div>
</template>

<script>
import axios from "axios";
import DiplomaCard from "../components/myDiplomas/DiplomaCard.vue";
import DiplomaFilter from "../components/myDiplomas/DiplomaFilter.vue";
import Pagination from "../components/paginations/Pagination.vue";
import Tr from '@/i18n/translation.js';

export default {
    name: "MyDiplomas",
>>>>>>> origin/development
    components: {
        DiplomaCard,
        DiplomaFilter,
        Pagination
    },
<<<<<<< HEAD
    computed: {
        numberOfPages() {
            return Math.ceil(this.diplomasFiltered.length / 6);
=======
    props: {
        sidebar: {
            type: Boolean,
            required: true
        }
    },  
    data() {
        return {
            diplomas: [],
            diplomasFiltered: [],
            diplomasDisplay: [],
            categories: [],
            page: 1,
            diplomasPerPage: 6,
            filterInfo: {},
            user: {}
        }
    },
    setup() {
        return { Tr };
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type == 'admin' || this.$store.getters.getUser.id != this.$route.params.id) {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/diplomas/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                }
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                value.data.diplomas.forEach(d => this.diplomas.push(d));

                this.diplomasFiltered = [...this.diplomas];

                for (var i = (this.page - 1) * this.diplomasPerPage; i < this.page * this.diplomasPerPage; i++) {
                    if (this.diplomasFiltered[i]) {
                        this.diplomasDisplay.push(this.diplomasFiltered[i]);
                    }
                }

                this.getCategories();

                this.filter(this.filterInfo);
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    this.$emit("open-modal", error.response.data.message);
                    if(error.code == 401) {
			            this.$store.commit('resetUser');
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    }
                } else console.log(error);
            });

            axios({
                method: "get",
                url: `${import.meta.env.VITE_HOST}/users/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then((value) => {
                this.user = value.data;
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    this.$emit("open-modal", error.response.data.message);
                    if(error.code == 401) {
			            this.$store.commit('resetUser');
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    }
                } else console.log(error);
            });
        }
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.diplomasFiltered.length / this.diplomasPerPage);
        },
        noResults() {
            if(this.diplomasFiltered.length == 0) return true;
            return false;  
>>>>>>> origin/development
        }
    },
    methods: {
        filter(filter) {
<<<<<<< HEAD
            this.diplomasDisplay = [];
            this.diplomasFiltered = [];

            if (filter.name) {
                this.diplomas.forEach(d => {
                    if (d.name.includes(filter.name) && d.category == filter.category) {
                        this.diplomasFiltered.push(d);
                    }
                });
            } else {
                this.diplomas.forEach(d => {
                    if (d.category == filter.category) {
                        this.diplomasFiltered.push(d);
                    }
                });
            }

            switch (filter.order) {
                case "date-new":
                    this.diplomasFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "date-old":
                    this.diplomasFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
=======
            this.filterInfo = filter;
            this.diplomasDisplay = [];
            this.diplomasFiltered = [...this.diplomas];

            if(filter.name) {
                this.diplomasFiltered = this.diplomasFiltered.filter(d => d.course.toLowerCase().includes(filter.name) || d.creator.toLowerCase().includes(filter.name));
            }

            if(filter.category != this.$t("myDiplomas.allF")) {
                this.diplomasFiltered = this.diplomasFiltered.filter(d => d.category == filter.category);
            }

            switch (filter.order) {
                case this.$t("order.newest"):
                    this.diplomasFiltered.sort((a, b) => a.date < b.date ? 1 : b.date < a.date ? -1 : 0);
                    break;
                case this.$t("order.oldest"):
                    this.diplomasFiltered.sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
>>>>>>> origin/development
                    break;
                default:
                    break;
            }

<<<<<<< HEAD
            for (var i = (this.page - 1) * 6; i < this.page * 6; i++) {
=======
            for (var i = (this.page - 1) * this.diplomasPerPage; i < this.page * this.diplomasPerPage; i++) {
>>>>>>> origin/development
                if (this.diplomasFiltered[i]) {
                    this.diplomasDisplay.push(this.diplomasFiltered[i]);
                }
            }
        },
        changePage(page) {
            this.page = page;

            this.diplomasDisplay = [];

<<<<<<< HEAD
            for (var i = (this.page - 1) * 6; i < this.page * 6; i++) {
=======
            for (var i = (this.page - 1) * this.diplomasPerPage; i < this.page * this.diplomasPerPage; i++) {
>>>>>>> origin/development
                if (this.diplomasFiltered[i]) {
                    this.diplomasDisplay.push(this.diplomasFiltered[i]);
                }
            }
<<<<<<< HEAD
=======
        },
        getCategories() {
            this.diplomas.forEach(d => {
                let exists = false;

                this.categories.forEach(cat => {
                    if (d.category == cat.name) {
                        exists = true;
                    }
                });

                if (!exists) {
                    this.categories.push({id: this.categories.length, name: d.category});
                }
            });
>>>>>>> origin/development
        }
    }

}

</script>

<style scoped>
<<<<<<< HEAD
    .row {
        margin: 0px;
    }
=======
    .diplomas-wrapper {
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
        .diplomas-wrapper {
            padding: 24px 16px 0px 16px;
        }
	}
>>>>>>> origin/development
</style>
