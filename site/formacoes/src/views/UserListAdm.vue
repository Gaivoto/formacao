<template>
    <div class="user-list-wrapper">
        <UserListAdmFilter v-on:filter="filter" />
        <div class="results">
            <UserListAdmUserCard v-for="user in this.usersDisplay" :key="user.id" v-bind:user="user" v-on:changeState="changeState"/>
            <div class="no-results" :class="{ 'd-none': !noResults }">
                <span class="material-icons search-icon">warning</span>
                <p>Não existem resultados para a pesquisa.</p>
            </div>
        </div>
        <Pagination2 v-bind:totalItems="this.usersFiltered.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
import axios from "axios";
import UserListAdmFilter from "../components/userListAdm/UserListAdmFilter.vue";
import UserListAdmUserCard from "../components/userListAdm/UserListAdmUserCard.vue";
import Pagination2 from "../components/paginations/Pagination2.vue";

export default {
    name: "UserListAdm",
    components: {
        UserListAdmFilter,
        UserListAdmUserCard,
        Pagination2,
    },
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
            users: [],
            usersFiltered: [],
            usersDisplay: [],
            filterInfo: {}
        }
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login" });
        } else if(this.$store.getters.getUser.type != "admin") {
            this.$router.push({ name: "Home"});
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
                    if (u.type == "user") u.type = "Utilizador";
                    else if (u.type == "admin") u.type = "Admin";
                    else u.type = "Criador";
                });

                this.usersFiltered = [...this.users];
                this.usersDisplay = this.users.slice(0, this.itemsPerPage);
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

            if (filter.type != "Todos") {
                this.usersFiltered = this.usersFiltered.filter((user) => user.type == filter.type);
            }

            if (filter.state != "Todos") {
                this.usersFiltered = this.usersFiltered.filter((user) => user.state == filter.state);
            }

            this.currentPage = 1;
            this.usersDisplay = this.usersFiltered.slice(0, this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.usersDisplay = this.usersFiltered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
        changeState(info) {
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
                    this.$emit("open-modal", error.response.data.message);
                    console.log(error.response.data);
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
</style>