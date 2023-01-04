<template>
    <div class="content-wrapper">
        <div class="table-wrapper">
            <table class="table">
                <tr>
                    <th></th>
                    <th class="column-large">
                        <div>
                            <p>Nome</p>
                        </div>
                    </th>
                    <th class="column-small">
                        <div>
                            <p>Data</p>
                            <div>
                                <span class="material-icons" v-on:click="orderTable('date-asc')">expand_less</span>
                                <span class="material-icons" v-on:click="orderTable('date-desc')">expand_more</span>
                            </div>
                        </div>
                    </th>
                    <th class="column-small column-right">
                        <div>
                            <p>Inscrições</p>
                            <div>
                                <span class="material-icons" v-on:click="orderTable('subs-asc')">expand_less</span>
                                <span class="material-icons" v-on:click="orderTable('subs-desc')">expand_more</span>
                            </div>
                        </div>
                    </th>
                    <th class="column-small column-right">
                        <div>
                            <p>Nº Videos</p>
                            <div>
                                <span class="material-icons" v-on:click="orderTable('nvids-asc')">expand_less</span>
                                <span class="material-icons" v-on:click="orderTable('nvids-desc')">expand_more</span>
                            </div>
                        </div>
                    </th>
                    <th class="column-small column-right">
                        <div>
                            <p>Duração</p>
                            <div>
                                <span class="material-icons" v-on:click="orderTable('duration-asc')">expand_less</span>
                                <span class="material-icons" v-on:click="orderTable('duration-desc')">expand_more</span>
                            </div>
                        </div>
                    </th>
                </tr>
                <tbody>
                    <ContentTableRow v-for="course in this.displayCourses" :key="course.id" v-bind:course="course" class="table-row-component"/>
                </tbody>
            </table>
        </div>
        <Pagination2 v-bind:totalItems="this.courses.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
import ContentTableRow from "../components/content/ContentTableRow.vue";
import Pagination2 from "../components/paginations/Pagination2.vue";

export default {
    name: "Content",
    components: {
        ContentTableRow,
        Pagination2,
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
            courses: [],
            displayCourses: [],
        }
    },
    created() {
        this.courses = [
            {
                id: 1,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 8123,
                numberOfVideos: 5,
                image: "bingus",
                date: "01/10/2022",
                duration: "1:21:10",
            },
            {
                id: 2,
                name: "Bingus Amogus",
                description: "monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey monkey",
                subscriptions: 123,
                numberOfVideos: 2,
                image: "bingus",
                date: "01/11/2022",
                duration: "40:23",
            },
            {
                id: 3,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 412,
                numberOfVideos: 4,
                image: "bingus",
                date: "01/12/2022",
                duration: "50:33",
            },
            {
                id: 4,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 1234,
                numberOfVideos: 14,
                image: "bingus",
                date: "02/12/2022",
                duration: "5:32:58",
            },
            {
                id: 5,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 0,
                numberOfVideos: 1,
                image: "bingus",
                date: "03/12/2022",
                duration: "10:31",
            },
            {
                id: 6,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 1234,
                numberOfVideos: 14,
                image: "bingus",
                date: "02/12/2022",
                duration: "5:32:58",
            },
            {
                id: 7,
                name: "Bingus Amogus",
                description: "monkey",
                subscriptions: 0,
                numberOfVideos: 1,
                image: "bingus",
                date: "03/12/2022",
                duration: "10:31",
            }
        ];

        this.displayCourses = this.courses.slice(0, this.itemsPerPage);
    },
    methods: {
        orderTable(order) {
            switch (order) {
                case "date-asc":
                    this.courses.sort((a, b) =>
                        new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2) ) ? 1 : new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date( a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) ? -1 : 0
                    );
                    break;
                case "date-desc":
                    this.courses.sort((a, b) =>
                        new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) > new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) ? 1 : new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) > new Date( a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) ? -1 : 0
                    );
                    break;
                case "subs-asc":
                    this.courses.sort((a, b) =>
                        a.subscriptions > b.subscriptions ? 1 : b.subscriptions > a.subscriptions ? -1 : 0
                    );
                    break;
                case "subs-desc":
                    this.courses.sort((a, b) =>
                        a.subscriptions < b.subscriptions ? 1 : b.subscriptions < a.subscriptions ? -1 : 0
                    );
                    break;
                case "nvids-asc":
                    this.courses.sort((a, b) =>
                        a.numberOfVideos > b.numberOfVideos ? 1 : b.numberOfVideos > a.numberOfVideos ? -1 : 0
                    );
                    break;
                case "nvids-desc":
                    this.courses.sort((a, b) =>
                        a.numberOfVideos < b.numberOfVideos ? 1 : b.numberOfVideos < a.numberOfVideos ? -1 : 0
                    );
                    break;
                case "duration-asc":
                    this.courses.sort((a, b) =>
                        parseInt(a.duration.replaceAll(":", "")) > parseInt(b.duration.replaceAll(":", "")) ? 1 : parseInt(b.duration.replaceAll(":", "")) > parseInt(a.duration.replaceAll(":", "")) ? -1 : 0
                    );
                    break;
                case "duration-desc":
                    this.courses.sort((a, b) =>
                        parseInt(a.duration.replaceAll(":", "")) < parseInt(b.duration.replaceAll(":", "")) ? 1 : parseInt(b.duration.replaceAll(":", "")) < parseInt(a.duration.replaceAll(":", "")) ? -1 : 0
                    );
                    break;
                default:
                    break;
            }

            this.displayCourses = this.courses.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.displayCourses = this.courses.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        }
    }
}
</script>

<style scoped>
    .content-wrapper {
        padding: 24px 48px 0px 48px;
    }

    .table-wrapper {
        min-height: 80vh;
        margin-bottom: 24px;
    }

    .table {
        width: 100%;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .table th {
        background-color: var(--mobalytics-susge);
    }

    .table th > div {
        padding: 8px 16px;
        height: 60px;

        display: flex;
        gap: 12px;
        align-items: center;
    }

    .table th > div > div {
        position: relative;
    }

    .table th p {
        margin: 0px;
        color: var(--light);
        font-size: 18px;
        font-weight: 500;
        margin: 0px;
    }

    .table th span {
        color: var(--light);
        cursor: pointer;
        font-size: 20px;
    }

    .table th span:first-child {
        position: absolute;
        top: -18px;
        left: -4px;
    }

    .table th span:last-child {
        position: absolute;
        top: -2px;
        left: -4px;
    }

    .table tbody .table-row-component {
        border: none;
    }

    .table tbody .table-row-component:nth-child(2n) {
        background-color: var(--mobalytics-card);
    }

    .table tbody .table-row-component:nth-child(2n + 1) {
        background-color: var(--mobalytics-back);
    }

    .table .column-large {
        width: 30%;
    }

    .table .column-small {
        width: 15%;
    }

    .table .column-right {
        padding-right: 24px;
    }

    .table .column-right div {
        float: right;
    }
</style>