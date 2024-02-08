<template>
    <div class="user-card-container">
<<<<<<< HEAD
        <div class="user-card-left">
            <img :src="this.imageUrl">
            <div>
                <p>Nome: {{ this.user.name }}</p>
                <p>Username: {{ this.user.username }}</p>
            </div>
            <div>
                <p>Tipo: {{ this.user.type }}</p>
                <p>Estado: {{ this.user.state }}</p>
            </div>    
        </div>
        <button v-on:click="changeState">{{ this.buttonText }}</button>
=======
        <div class="user-card">
            <div class="user-card-left">
                <img :src="this.imageUrl">
                <div class="first-left-div">
                    <p>{{ this.user.username }}</p>
                    <div>
                        <p>{{ $t("userListAdm.name")}} </p><p>{{ this.user.name }}</p>
                    </div>
                </div>
                <div class="tipEst">
                    <p>{{ $t("userListAdm.type")}} {{ this.user.type }}</p>
                    <p>{{ $t("userListAdm.state")}} {{ this.user.state }}</p>
                </div>    
            </div>
            <button v-on:click="changeState">{{ this.buttonText }}</button>    
        </div>
>>>>>>> origin/development
    </div>
</template>

<script>
<<<<<<< HEAD
=======
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'

>>>>>>> origin/development
export default {
    name: 'UserListAdmUserCard',
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: ""
        }
    },
<<<<<<< HEAD
=======
    setup() {
        const { t } = useI18n()

        return { Tr, t };
    },
>>>>>>> origin/development
    created(){
        this.imageUrl = new URL(`../../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    computed: {
        buttonText() {
<<<<<<< HEAD
            if(this.user.state == "Ativo") return "DESATIVAR";
            else return "ATIVAR";
=======
            if(this.user.state == this.$t("states.active")) return  this.$t("userListAdm.deactivate");
            else return this.$t("userListAdm.activate");
>>>>>>> origin/development
        }
    },
    methods: {
        changeState() {
<<<<<<< HEAD
            if(this.user.state == "Ativo") this.$emit("changeState", {id: this.user.id, state: "Inativo"});
=======
            if(this.user.state == this.$t("states.active")) this.$emit("changeState", {id: this.user.id, state: "Inativo"});
>>>>>>> origin/development
            else this.$emit("changeState", {id: this.user.id, state: "Ativo"});
        }
    }
}
</script>

<style scoped>
    .user-card-container {
<<<<<<< HEAD
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
=======
        position: relative;
        padding: 16px 16px 32px 16px;
    }

    .user-card {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 16px 40px 16px 16px;
        border-radius: 8px;
        background: var(--mobalytics-card);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
>>>>>>> origin/development
    }

    .user-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

<<<<<<< HEAD
    button {
        background: grey;
        height: 40px;
        width: 120px;
=======
    .user-card-left img {
        height: 140px;
        width: 140px;
        border-radius: 8px;
        object-fit: cover;
    }

    .user-card-left p {
        color: var(--light);
    }

    .user-card-left p:first-child {
        margin-bottom: 28px;
    }

    .user-card-left > .first-left-div {
        width: 260px;
    }
    

    .user-card-left > .first-left-div > div {
        display: flex;
        gap: 4px;
    }

    .user-card-left > .first-left-div > div > p{
        margin-bottom: 4px;
    }

    .user-card-left > div > p:last-child {
        margin-bottom: 4px;
    }

    .user-card-left > .first-left-div p:last-child {
        white-space: nowrap;
    }

    .user-card-left > .first-left-div > p:first-child {
        color: var(--primary);
        font-size: 24px;
        margin-bottom: 20px;
    }

    .first-left-div > p, .first-left-div > div > p:last-child {
        text-overflow: ellipsis;
        overflow: hidden;
    }

    button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
    }

    @media (max-width: 1350px) {
        .user-card-left {
            gap: 40px;
        }
    }

    @media (max-width: 1250px) {
        .user-card-left {
            gap: 20px;
        }

        .user-card-left > img {
            width: 120px;
            height: 120px;
        }
    }

    @media (max-width: 1150px) {
        .user-card-left > .first-left-div {
            width: 160px;
        }
>>>>>>> origin/development
    }
</style>