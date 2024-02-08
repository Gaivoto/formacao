<template>
<<<<<<< HEAD
    <div class="table-wrapper">
        <table>
            <tr>
                <th></th>
                <th class="column-large">
                    <div>
                    <p>Nome</p>
                        <div>
                            <img src="../assets/chevron_up.png" />
                            <img src="../assets/chevron_down.png" />
                        </div>
                    </div>
                </th>
                <th class="column-small">
                    <div>
                    <p>Data</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('date-asc')"/>
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('date-desc')"/>
                        </div>
                    </div>
                </th>
                <th class="column-small">
                    <div>
                    <p>Inscrições</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('subs-asc')"/>
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('subs-desc')"/>
                        </div>
                    </div>
                </th>
                <th class="column-small">
                    <div>
                    <p>Nº Videos</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('nvids-asc')"/>
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('nvids-desc')"/>
                        </div>
                    </div>
                </th>
                <th class="column-small">
                    <div>
                    <p>Duração</p>
                        <div>
                            <img src="../assets/chevron_up.png" v-on:click="orderTable('duration-asc')"/>
                            <img src="../assets/chevron_down.png" v-on:click="orderTable('duration-desc')"/>
                        </div>
                    </div>
                </th>
            </tr>
            <tbody>
                <ContentTableRow v-for="course in this.displayCourses" :key="course.id" v-bind:course="course" class="table-row-component"/>
            </tbody>
        </table>
    <Pagination2 v-bind:totalItems="this.courses.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
=======
    <div class="content-wrapper">
        <div class="table-wrapper">
            <div class="table-content" :class="{ 'invert-colors': this.isTableLengthEven }">
                <table class="table" ref="table">
                    <tr>
                        <th></th>
                        <th class="column-large">
                            <div>
                                <p>{{ $t('content.name') }}</p>
                            </div>
                        </th>
                        <th class="column-small">
                            <div>
                                <p>{{ $t('content.date') }}</p>
                                <div>
                                    <span class="material-icons" v-on:click="orderTable('date-asc')">expand_less</span>
                                    <span class="material-icons" v-on:click="orderTable('date-desc')">expand_more</span>
                                </div>
                            </div>
                        </th>
                        <th class="column-small column-right">
                            <div>
                                <p>{{ $t('content.state') }}</p>
                                <div>
                                    <span class="material-icons" v-on:click="orderTable('state-asc')">expand_less</span>
                                    <span class="material-icons" v-on:click="orderTable('state-desc')">expand_more</span>
                                </div>
                            </div>
                        </th>
                        <th class="column-small column-right">
                            <div>
                                <p>{{ $t('content.rating') }}</p>
                                <div>
                                    <span class="material-icons" v-on:click="orderTable('rating-asc')">expand_less</span>
                                    <span class="material-icons" v-on:click="orderTable('rating-desc')">expand_more</span>
                                </div>
                            </div>
                        </th>
                        <th class="column-small column-right">
                            <div>
                                <p>{{ $t('content.nVids') }}</p>
                                <div>
                                    <span class="material-icons" v-on:click="orderTable('nvids-asc')">expand_less</span>
                                    <span class="material-icons" v-on:click="orderTable('nvids-desc')">expand_more</span>
                                </div>
                            </div>
                        </th>
                        <th class="column-small column-right">
                            <div>
                                <p>{{ $t('content.duration') }}</p>
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
        </div>
        <Pagination2 v-bind:totalItems="this.courses.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
>>>>>>> origin/development
    </div>
</template>

<script>
<<<<<<< HEAD
import ContentTableRow from "../components/content/ContentTableRow.vue";
import Pagination2 from "../components/paginations/Pagination2.vue";
=======
import axios from 'axios';
import ContentTableRow from "../components/content/ContentTableRow.vue";
import Pagination2 from "../components/paginations/Pagination2.vue";
import Tr from '@/i18n/translation.js';
>>>>>>> origin/development

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
<<<<<<< HEAD
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
                description: "monkey",
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
            }
        ];

        this.displayCourses = this.courses.slice(0, this.itemsPerPage);
=======
    setup() {
        return { Tr };
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type != 'creator' || this.$store.getters.getUser.id != this.$route.params.id) {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            axios({
                method: `get`,
                url: `${import.meta.env.VITE_HOST}/criadores/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                }
            })
            .then(value => {
                value.data.criador.cursos.forEach(c => this.courses.push(c));

                this.displayCourses = this.courses.slice(0, this.itemsPerPage);
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
        isTableLengthEven() {
            if(this.displayCourses.length % 2 == 0) return true;
            return false;
        }
>>>>>>> origin/development
    },
    methods: {
        orderTable(order) {
            switch (order) {
                case "date-asc":
                    this.courses.sort((a, b) =>
<<<<<<< HEAD
                        new Date(a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) < new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2) ) ? 1 : new Date(b.date.substring(6) + "-" + b.date.substring(3, 5) + "-" + b.date.substring(0, 2)) < new Date( a.date.substring(6) + "-" + a.date.substring(3, 5) + "-" + a.date.substring(0, 2)) ? -1 : 0
=======
                        a.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") > b.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") ? 1 : b.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") > a.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") ? -1 : 0
>>>>>>> origin/development
                    );
                    break;
                case "date-desc":
                    this.courses.sort((a, b) =>
<<<<<<< HEAD
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
=======
                        a.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") < b.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") ? 1 : b.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") < a.date.replace("Z", "").replace("T", "").replaceAll(":", "").replaceAll(".", "").replaceAll("-", "") ? -1 : 0
                    );
                    break;
                case "state-asc":
                    this.courses.sort((a, b) =>
                        a.state > b.state ? 1 : b.state > a.state ? -1 : 0
                    );
                    break;
                case "state-desc":
                    this.courses.sort((a, b) =>
                        a.state < b.state ? 1 : b.state < a.state ? -1 : 0
>>>>>>> origin/development
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
<<<<<<< HEAD
                        parseInt(a.duration.replaceAll(":", "")) > parseInt(b.duration.replaceAll(":", "")) ? 1 : parseInt(b.duration.replaceAll(":", "")) > parseInt(a.duration.replaceAll(":", "")) ? -1 : 0
=======
                        a.duration > b.duration ? 1 : b.duration > a.duration ? -1 : 0
>>>>>>> origin/development
                    );
                    break;
                case "duration-desc":
                    this.courses.sort((a, b) =>
<<<<<<< HEAD
                        parseInt(a.duration.replaceAll(":", "")) < parseInt(b.duration.replaceAll(":", "")) ? 1 : parseInt(b.duration.replaceAll(":", "")) < parseInt(a.duration.replaceAll(":", "")) ? -1 : 0
=======
                        a.duration < b.duration ? 1 : b.duration < a.duration ? -1 : 0
>>>>>>> origin/development
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

<<<<<<< HEAD
<style lang="scss" scoped>
    .table-wrapper {
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
=======
<style scoped>
    .content-wrapper {
        padding: 24px 48px 0px 48px;
    }

    .table-wrapper {
        min-height: 84vh;
    }

    .table-content {
        max-width: 100%;
        overflow-x: scroll;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .table-content::-webkit-scrollbar {
        width: 8px;
        background: var(--mobalytics-back);
    }

    .table-content::-webkit-scrollbar-thumb {
        background: var(--mobalytics-card);
    }

    .table-content.invert-colors::-webkit-scrollbar {
        background: var(--mobalytics-card);
    }

    .table-content.invert-colors::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
    }

    .table {
        margin-bottom: 0px;
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
        min-width: 220px;
    }

    .table .column-small {
        width: 15%;
        min-width: 150px;
    }

    .table .column-right {
        padding-right: 24px;
    }

    .table .column-right div {
        float: right;
    }

    @media (max-width: 1100px) {
        .table {
            max-width: 100%;
            overflow-x: scroll;
        }
    }

    @media (max-width: 800px) {
        .content-wrapper {
            padding: 24px 16px 0px 16px;
        }
>>>>>>> origin/development
    }
</style>