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

<style scoped>

    .user-profile-diploma-card {
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        height: 170px;
        min-width: 196px;
    }

    img {
        height: 120px;
        width: 120px;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 12px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 6px 2px;
    }

    p {
        color: var(--light);
        margin-bottom: 0px;
        max-width: 160px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    @media (max-width: 1050px) {
        
        .user-profile-diploma-card {
            padding: 16px 0px;
            min-width: 164px;
        }
    }
</style>
