<template>
    <div class="user-profile-diploma-card col-md-2">
        <img :src="this.imageUrl">
        <p>{{ this.diploma.name }}</p>
    </div>
</template>

<script>
export default {
    name: 'UserProfileDiplomaCard',
    props: {
        diploma: {
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
        this.imageUrl = new URL(`../../assets/${this.diploma.image}.jpg`, import.meta.url).href;
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
