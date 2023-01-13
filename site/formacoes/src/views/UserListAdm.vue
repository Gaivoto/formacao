<template>
    <div class="user-list-wrapper">
        <UserListAdmFilter v-on:filter="filter"/>
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
                name: "Bingus Bingus1234123123123",
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
    computed: {
        noResults() {
            if(this.usersFiltered.length == 0) return true;
            return false;  
        }
    },
    methods: {
        filter(filter) {
            this.usersDisplay = [];
            this.usersFiltered = [...this.users];

            if(filter.name) {
                this.usersFiltered = this.usersFiltered.filter(user => user.name.toLowerCase().includes(filter.name) || user.username.toLowerCase().includes(filter.name));
            }

            if(filter.type != 'Todos') {
                this.usersFiltered = this.usersFiltered.filter(user => user.type == filter.type);
            }

            if(filter.state != 'Todos') {
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