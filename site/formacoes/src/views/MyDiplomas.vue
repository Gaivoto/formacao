<template>
    <div class="diplomas-wrapper">
        <DiplomaFilter v-bind:diplomas="this.diplomas" v-on:filter="filter" />
        <div class="row">
            <DiplomaCard v-for="diploma in this.diplomasDisplay" :key="diploma.id" v-bind:diploma="diploma"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>Não existem resultados para a pesquisa.</p>    
            </div>
        </div>
        <Pagination v-on:change-page="changePage" v-bind:page="this.page" v-bind:numberOfPages="numberOfPages" />
    </div>
</template>

<script>
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
    data() {
        return {
            diplomas: [],
            diplomasFiltered: [],
            diplomasDisplay: [],
            page: 1,
            diplomasPerPage: 6
        }
    },
    created() {
        this.diplomas = [
            {
                id: 1,
                category: 'cat1',
                date: "15-09-2022",
                creator: "Ze Bitola",
                course: "Course 1"
            },
            {
                id: 2,
                category: 'cat2',
                date: "11-02-2021",
                creator: "Ze Bitola",
                course: "Course 2"
            },
            {
                id: 3,
                category: 'cat2',
                date: "17-07-2022",
                creator: "Ze Bitola",
                course: "Course 3"
            },
            {
                id: 4,
                category: 'cat14',
                date: "05-12-2022",
                creator: "Ze Bitola",
                course: "Course 4"
            },
            {
                id: 5,
                category: 'cat1',
                date: "28-01-2022",
                creator: "Ze Bitola",
                course: "Course 5"
            },
            {
                id: 6,
                category: 'cat1',
                date: "22-08-2022",
                creator: "Ze Bitola",
                course: "Course 6"
            },
            {
                id: 7,
                category: 'cat1',
                date: "27-09-2022",
                creator: "Ze Bitola",
                course: "Course 7"
            },
            {
                id: 8,
                category: 'cat1',
                date: "12-11-2022",
                creator: "Ze Bitola",
                course: "Course 8"
            },
            {
                id: 9,
                category: 'cat1',
                date: "04-05-2022",
                creator: "Ze Bitola",
                course: "Course 9"
            },
            {
                id: 10,
                category: 'cat1',
                date: "16-10-2020",
                creator: "Ze Bitola",
                course: "Course 10"
            },
        ]
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
            this.diplomasDisplay = [];
            this.diplomasFiltered = [...this.diplomas];

            if(filter.name) {
                this.diplomasFiltered = this.diplomasFiltered.filter(d => d.course.toLowerCase().includes(filter.name));
            }

            if(filter.category != "Todas") {
                this.diplomasFiltered = this.diplomasFiltered.filter(d => d.category == filter.category);
            }

            switch (filter.order) {
                case "Mais recente":
                    this.diplomasFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "Mais antigo":
                    this.diplomasFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
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
        }
    }

}

</script>

<style scoped>
    .diplomas-wrapper {
        padding: 24px 24px 0px 24px;
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
</style>
