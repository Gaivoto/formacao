<template>
    <div class="user-card-container">
        <div class="user-card">
            <div class="user-card-left">
                <img :src="this.imageUrl">
                <div class="first-left-div">
                    <p>{{ this.user.username }}</p>
                    <p>Nome: {{ this.user.name }}</p>
                </div>
                <div>
                    <p>Tipo: {{ this.user.type }}</p>
                    <p>Estado: {{ this.user.state }}</p>
                </div>    
            </div>
            <button v-on:click="changeState">{{ this.buttonText }}</button>    
        </div>
    </div>
</template>

<script>
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
    created(){
        this.imageUrl = new URL(`../../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    computed: {
        buttonText() {
            if(this.user.state == "Ativo") return "DESATIVAR";
            else return "ATIVAR";
        }
    },
    methods: {
        changeState() {
            if(this.user.state == "Ativo") this.$emit("changeState", {id: this.user.id, state: "Inativo"});
            else this.$emit("changeState", {id: this.user.id, state: "Ativo"});
        }
    }
}
</script>

<style scoped>
    .user-card-container {
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
    }

    .user-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

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
        margin-bottom: 30px;
    }

    .user-card-left > .first-left-div > p:first-child {
        color: var(--primary);
        font-size: 24px;
        margin-bottom: 16px;
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
</style>