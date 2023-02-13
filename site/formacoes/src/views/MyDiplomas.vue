<template>
    <div class="diplomas-wrapper">
        <DiplomaFilter v-bind:categories="this.categories" v-on:filter="filter" />
        <div class="row">
            <DiplomaCard v-for="diploma in this.diplomasDisplay" :key="diploma.id" v-bind:diploma="diploma" v-bind:user="this.user" v-bind:sidebar="this.sidebar"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>Não existem resultados para a pesquisa.</p>    
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

export default {
    name: "MyDiplomas",
    components: {
        DiplomaCard,
        DiplomaFilter,
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
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login" });
        } else if(this.$store.getters.getUser.type == 'admin' || this.$store.getters.getUser.id != this.$route.params.id) {
            this.$router.push({ name: "Home" });
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
        }
    },
    methods: {
        filter(filter) {
            this.filterInfo = filter;
            this.diplomasDisplay = [];
            this.diplomasFiltered = [...this.diplomas];

            if(filter.name) {
                this.diplomasFiltered = this.diplomasFiltered.filter(d => d.course.toLowerCase().includes(filter.name) || d.creator.toLowerCase().includes(filter.name));
            }

            if(filter.category != "Todas") {
                this.diplomasFiltered = this.diplomasFiltered.filter(d => d.category == filter.category);
            }

            switch (filter.order) {
                case "Mais recente":
                    this.diplomasFiltered.sort((a, b) => a.date < b.date ? 1 : b.date < a.date ? -1 : 0);
                    break;
                case "Mais antigo":
                    this.diplomasFiltered.sort((a, b) => a.date > b.date ? 1 : b.date > a.date ? -1 : 0);
                    break;
                default:
                    break;
            }

            for (var i = (this.page - 1) * this.diplomasPerPage; i < this.page * this.diplomasPerPage; i++) {
                if (this.diplomasFiltered[i]) {
                    this.diplomasDisplay.push(this.diplomasFiltered[i]);
                }
            }
        },
        changePage(page) {
            this.page = page;

            this.diplomasDisplay = [];

            for (var i = (this.page - 1) * this.diplomasPerPage; i < this.page * this.diplomasPerPage; i++) {
                if (this.diplomasFiltered[i]) {
                    this.diplomasDisplay.push(this.diplomasFiltered[i]);
                }
            }
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
        }
    }

}

</script>

<style scoped>
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
</style>
