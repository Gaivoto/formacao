<template>
    <div class="user-profile-diploma-card">
        <img :src="this.imageUrl">
        <p>{{ this.diploma.name }}</p>
    </div>
</template>

<script>
export default {
    name: 'UserProfileDiplomaCard',
    props: {
        props: {
            diploma: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: ""
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.diploma.image}.jpg`, import.meta.url).href;
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
    .user-profile-diploma-card {
        padding: 16px;
    }

    img {
        height: 120px;
        width: 120px;
        object-fit: cover;
    }
</style>
