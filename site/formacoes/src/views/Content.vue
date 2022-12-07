<template>
    <div class="table-wrapper">
        <table>
            <tr>
                <th></th>
                <th class="column-large">
                    <div>
                        <p>Nome</p>
                        <div>
                            <img src="../assets/chevron_up.png">
                            <img src="../assets/chevron_down.png">
                        </div>    
                    </div>
                </th>
                <th class="column-small">
                    <div>
                        <p>Data</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('date-asc')">
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('date-desc')">                        
                        </div>
                    </div>
                </th>
                <th class="column-small">
                    <div>
                        <p>Inscrições</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('subs-asc')">
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('subs-desc')">                        
                        </div>    
                    </div>
                </th>
                <th class="column-small">
                    <div>
                        <p>Nº Videos</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('nvids-asc')">
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('nvids-desc')">                        
                        </div>   
                    </div>
                </th>
                <th class="column-small">
                    <div>
                        <p>Duração</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('duration-asc')">
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('duration-desc')">                        
                        </div>    
                    </div>
                </th>
            </tr>
            <tbody>
                <ContentTableRow v-for="course in this.displayCourses" :key="course.id" v-bind:course="course" class="table-row-component"/>
            </tbody>
        </table>
        <ContentPagination v-bind:totalCourses="this.courses.length" v-bind:currentPage="this.currentPage" v-bind:coursesPerPage="this.coursesPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
import ContentTableRow from '../components/content/ContentTableRow.vue'
import ContentPagination from '../components/content/ContentPagination.vue'

export default {
    name: 'Content',
    components: {
        ContentTableRow,
        ContentPagination
    },
    data(){
        return {
            currentPage: 1,
            coursesPerPage: 5,
            courses: [],
            displayCourses: []
        }
    },
    created(){
        this.courses = [
            {
                id: 1,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 8123,
                numberOfVideos: 5,
                image: "bingus",
                date: "01/10/2022",
                duration: "1:21:10"
            },
            {
                id: 2,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 123,
                numberOfVideos: 2,
                image: "bingus",
                date: "01/11/2022",
                duration: "40:23"
            },
            {
                id: 3,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 412,
                numberOfVideos: 4,
                image: "bingus",
                date: "01/12/2022",
                duration: "50:33"
            },
            {
                id: 4,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 1234,
                numberOfVideos: 14,
                image: "bingus",
                date: "02/12/2022",
                duration: "5:32:58"
            },
            {
                id: 5,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 0,
                numberOfVideos: 1,
                image: "bingus",
                date: "03/12/2022",
                duration: "10:31"
            }
        ]

        this.displayCourses = this.courses.slice(0, this.coursesPerPage);
    },
    methods: {
        orderTable(order) {
            switch(order) {
                case "date-asc":
                    this.courses.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "date-desc":
                    this.courses.sort((a, b) => (new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2))) ? 1 : ((new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2))) ? -1 : 0));
                    break;
                case "subs-asc":
                    this.courses.sort((a, b) => (a.subscriptions > b.subscriptions ? 1 : (b.subscriptions > a.subscriptions) ? -1 : 0));
                    break;
                case "subs-desc":
                    this.courses.sort((a, b) => (a.subscriptions < b.subscriptions ? 1 : (b.subscriptions < a.subscriptions) ? -1 : 0));
                    break;
                case "nvids-asc":
                    this.courses.sort((a, b) => (a.numberOfVideos > b.numberOfVideos ? 1 : (b.numberOfVideos > a.numberOfVideos) ? -1 : 0));
                    break;
                case "nvids-desc":
                    this.courses.sort((a, b) => (a.numberOfVideos < b.numberOfVideos ? 1 : (b.numberOfVideos < a.numberOfVideos) ? -1 : 0));
                    break;
                case "duration-asc":
                    this.courses.sort((a, b) => (parseInt(a.duration.replaceAll(":", "")) > parseInt(b.duration.replaceAll(":", "")) ? 1 : (parseInt(b.duration.replaceAll(":", "")) > parseInt(a.duration.replaceAll(":", ""))) ? -1 : 0));
                    break;
                case "duration-desc":
                    this.courses.sort((a, b) => (parseInt(a.duration.replaceAll(":", "")) < parseInt(b.duration.replaceAll(":", "")) ? 1 : (parseInt(b.duration.replaceAll(":", "")) < parseInt(a.duration.replaceAll(":", ""))) ? -1 : 0));
                    break;
                default:
                    break;
            }

            this.displayCourses = this.courses.slice((this.currentPage - 1) * this.coursesPerPage, this.currentPage * this.coursesPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.displayCourses = this.courses.slice((this.currentPage - 1) * this.coursesPerPage, this.currentPage * this.coursesPerPage);
        }
    }
}
</script>

<style lang="scss" scoped>
    .table-wrapper {
        width: 100%;
        padding: 32px 5%;
    }

    .table-wrapper table {
        width: 100%;
    }

    table th > div {
        padding: 8px 16px;

        display: flex;
        gap: 12px;
        text-align: center;
    }

    table th > div > div {
        width: 12px;
        height: 26px;
    }

    table th p {
        margin: 0px;
    }

    table th img {
        height: 12px;
        width: 12px;

        cursor: pointer;
    }

    table th img:first-child {
        margin-top: -12px;
    }

    table th img:last-child {
        margin-top: -36px;
    }

    table tbody .table-row-component:nth-child(2n) {
        background-color: grey;
    }

    table tbody .table-row-component:nth-child(2n + 1) {
        background-color: goldenrod;
    }

    .column-large {
        width: 30%;
        background-color: red;
    }

    .column-small {
        width: 15%;
        background-color: blue;
    }
</style>