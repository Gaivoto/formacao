<template>
    <div class="user-list-wrapper">
<<<<<<< HEAD
        <UserListAdmFilter v-on:filter="filter"/>
        <div>
            <UserListAdmUserCard v-for="user in this.usersDisplay" :key="user.id" v-bind:user="user" v-on:changeState="changeState"/>
=======
        <UserListAdmFilter v-on:filter="filter" />
        <div class="results">
            <UserListAdmUserCard v-for="user in this.usersDisplay" :key="user.id" v-bind:user="user" v-on:changeState="changeState"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>{{ $t("userListAdm.warning")}}</p>
            </div>
>>>>>>> origin/development
        </div>
        <Pagination2 v-bind:totalItems="this.usersFiltered.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
<<<<<<< HEAD
import UserListAdmFilter from '../components/userListAdm/UserListAdmFilter.vue'
import UserListAdmUserCard from '../components/userListAdm/UserListAdmUserCard.vue'
import Pagination2 from '../components/paginations/Pagination2.vue'

export default {
    name: 'UserListAdm',
    components: {
        UserListAdmFilter,
        UserListAdmUserCard,
        Pagination2
    },
    data(){
=======
import axios from "axios";
import UserListAdmFilter from "../components/userListAdm/UserListAdmFilter.vue";
import UserListAdmUserCard from "../components/userListAdm/UserListAdmUserCard.vue";
import Pagination2 from "../components/paginations/Pagination2.vue";
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'

export default {
    name: "UserListAdm",
    components: {
        UserListAdmFilter,
        UserListAdmUserCard,
        Pagination2,
    },
    data() {
>>>>>>> origin/development
        return {
            currentPage: 1,
            itemsPerPage: 5,
            users: [],
            usersFiltered: [],
<<<<<<< HEAD
            usersDisplay: []
        }
    },
    created(){
        this.users = [
            {
                id: 1,
                name: "Bingus",
                username: "bingoid421",
                type: "Admin",
                image: "bingus",
                state: "Ativo"
            },
            {
                id: 2,
                name: "Amogus",
                username: "sussyboy",
                type: "Criador",
                image: "bingus",
                state: "Ativo"
            },
            {
                id: 3,
                name: "Retard",
                username: "okbuddy",
                type: "Criador",
                image: "bingus",
                state: "Inativo"
            },
            {
                id: 4,
                name: "Aatrox",
                username: "darkinAA",
                type: "Criador",
                image: "bingus",
                state: "Ativo"
            },
            {
                id: 5,
                name: "Caralho",
                username: "ocrlh",
                type: "Utilizador",
                image: "bingus",
                state: "Ativo"
            },
            {
                id: 6,
                name: "Yep Cock",
                username: "andballs",
                type: "Utilizador",
                image: "bingus",
                state: "Ativo"
            },
            {
                id: 7,
                name: "User",
                username: "elutilizador",
                type: "Utilizador",
                image: "bingus",
                state: "Inativo"
            },
        ];

        this.usersDisplay = this.users.slice(0, this.itemsPerPage);
    },
    methods: {
        filter(filter) {
            this.usersDisplay = [];
            this.usersFiltered = [...this.users];

            if(filter.name) {
                this.usersFiltered = this.usersFiltered.filter(user => user.name.toLowerCase().includes(filter.name.toLowerCase()) || user.username.toLowerCase().includes(filter.name.toLowerCase()));
            }

            if(filter.type != 'all') {
                this.usersFiltered = this.usersFiltered.filter(user => user.type == filter.type);
            }

            if(filter.state != 'all') {
                this.usersFiltered = this.usersFiltered.filter(user => user.state == filter.state);
=======
            usersDisplay: [],
            filterInfo: {}
        }
    },
    setup() {
        const { t } = useI18n()

        return { Tr, t };
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type != "admin") {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            let promises = [];

            promises.push(
                axios({
                    method: "get",
                    url: `${import.meta.env.VITE_HOST}/users`,
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                        refreshtoken: this.$store.getters.getRefreshToken,
                    },
                })
            );

            promises.push(
                axios({
                    method: "get",
                    url: `${import.meta.env.VITE_HOST}/criadores`,
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                        refreshtoken: this.$store.getters.getRefreshToken,
                    },
                })
            );

            promises.push(
                axios({
                    method: "get",
                    url: `${import.meta.env.VITE_HOST}/admins`,
                    headers: {
                        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                        refreshtoken: this.$store.getters.getRefreshToken,
                    },
                })
            );

            Promise.all(promises)
            .then((values) => {
                values[0].data.users.forEach((u) => this.users.push(u));
                values[1].data.criadores.forEach((c) => this.users.push(c));
                values[2].data.admins.forEach((a) => this.users.push(a));

                this.users.forEach((u) => {
                    if (u.type == "user") u.type = this.$t("userListAdm.user");
                    else if (u.type == "admin") u.type = this.$t("userListAdm.admin");
                    else u.type = this.$t("userListAdm.creator");
                    if (u.state == "Ativo") u.state = this.$t("states.active");
                    else u.state = this.$t("states.inactive");
                });

                this.usersFiltered = [...this.users];
                this.usersDisplay = this.users.slice(0, this.itemsPerPage);
            })
            .catch((error) => {
                if (error.code) {
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
            if (this.usersFiltered.length == 0) return true;
            return false;
        },
    },
    methods: {
        filter(filter) {
            this.filterInfo = filter;
            this.usersDisplay = [];
            this.usersFiltered = [...this.users];


            if (filter.name) {
                this.usersFiltered = this.usersFiltered.filter((user) => user.name.toLowerCase().includes(filter.name) || user.username.toLowerCase().includes(filter.name));
            }

            if (filter.type != this.$t("userListAdm.all")) {
                this.usersFiltered = this.usersFiltered.filter((user) => user.type == filter.type);
            }

            if (filter.state != this.$t("userListAdm.all")) {
                this.usersFiltered = this.usersFiltered.filter((user) => user.state == filter.state);
>>>>>>> origin/development
            }

            this.currentPage = 1;
            this.usersDisplay = this.usersFiltered.slice(0, this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.usersDisplay = this.usersFiltered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
        changeState(info) {
<<<<<<< HEAD
            this.users.forEach(user => {
                if(user.id == info.id) user.state = info.state;
            });

            //change user state on db
        }
    }
}
</script>

<style scoped>
=======
            this.users.forEach((user) => {
                if (user.id == info.id) user.state = info.state;
            });

            this.filter(this.filterInfo);
    
            axios({
                method: "put",
                url: `${import.meta.env.VITE_HOST}/users/adm/${info.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
                data: {
                    state: info.state,
                },
            })
            .then((value) => {
                if (value.data.access_token)
                this.$store.commit("setAccessToken", value.data.access_token);
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    this.$emit("open-modal", error.response.data.message);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    }
                } else console.log(error);
            });
        },
    },
};
</script>

<style scoped>
    .user-list-wrapper {
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



    @media (max-width: 1000px) {
        .user-list-wrapper {
            padding: 24px 24px 0px 24px;
        }
    }

    @media (max-width: 800px) {
        .user-list-wrapper {
            padding: 24px 16px 0px 16px;
        }
    }
>>>>>>> origin/development
</style>