<template>
    <div class="user-card-container">
        <div class="user-card-left">
            <img :src="this.imageUrl">
            <div>
                <p>{{ this.user.name }}</p>
                <p>{{ this.user.username }}</p>
            </div>
            <div>
                <p>{{ this.user.type }}</p>
                <p>{{ this.user.state }}</p>
            </div>    
        </div>
        <button v-on:click="changeState">{{ this.buttonText }}</button>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
    }

    .user-card-left {
        display: flex;
        align-items: center;
        gap: 80px;
    }

    button {
        background: grey;
        height: 40px;
        width: 120px;
    }
</style>