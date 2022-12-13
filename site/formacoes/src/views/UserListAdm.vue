<template>
    <div class="user-list-wrapper">
        <UserListAdmFilter v-on:filter="filter"/>
        <div>
            <UserListAdmUserCard v-for="user in this.usersDisplay" :key="user.id" v-bind:user="user" v-on:changeState="changeState"/>
        </div>
        <Pagination2 v-bind:totalItems="this.usersFiltered.length" v-bind:currentPage="this.currentPage" v-bind:itemsPerPage="this.itemsPerPage" v-on:changePage="changePage"/>
    </div>
</template>

<script>
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
        return {
            currentPage: 1,
            itemsPerPage: 5,
            users: [],
            usersFiltered: [],
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
            }

            this.currentPage = 1;
            this.usersDisplay = this.usersFiltered.slice(0, this.itemsPerPage);
        },
        changePage(page) {
            this.currentPage = page;

            this.usersDisplay = this.usersFiltered.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
        },
        changeState(info) {
            this.users.forEach(user => {
                if(user.id == info.id) user.state = info.state;
            });

            //change user state on db
        }
    }
}
</script>

<style scoped>
    .user-list-wrapper {
        width: 100%;
    }
</style>