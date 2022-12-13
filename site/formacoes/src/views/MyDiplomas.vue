<template>
    <div>
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
                description: 'description2',
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

    components: {
        DiplomaCard,
        DiplomaFilter,
        Pagination
    },
    computed: {
        numberOfPages() {
            return Math.ceil(this.diplomasFiltered.length / 6);
        }
    },
    methods: {
        filter(filter) {
            this.diplomasDisplay = [];
            this.diplomasFiltered = [];
            
            if(filter.name) {
                this.diplomas.forEach(d => {
                    if(d.name.includes(filter.name) && d.category == filter.category) {
                        this.diplomasFiltered.push(d);
                    }
                });
            } else {
                this.diplomas.forEach(d => {
                    if(d.category == filter.category) {
                        this.diplomasFiltered.push(d);
                    }
                });
            }

            switch(filter.order) {
                case "date-new":
                    this.diplomasFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "date-old":
                    this.diplomasFiltered.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                default:
                    break;
            }

            for(var i = (this.page - 1) * 6; i < this.page * 6; i++) {   
                if(this.diplomasFiltered[i]){
                    this.diplomasDisplay.push(this.diplomasFiltered[i]);
                } 
            }
        },
        changePage(page) {
            this.page = page;
            
            this.diplomasDisplay = [];

            for(var i = (this.page - 1) * 6; i < this.page * 6; i++) {   
                if(this.diplomasFiltered[i]){
                    this.diplomasDisplay.push(this.diplomasFiltered[i]);
                } 
            }
        }
    }

}

</script>

<style scoped>
.row {
    margin: 0px;
}
</style>
