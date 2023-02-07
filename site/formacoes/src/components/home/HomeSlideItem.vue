<template>
    <div class="slide-wrapper" :style="{ 'background-image': 'URL(' + this.imageUrl + ')' }">
        <p class="tag">{{ this.item.tag }}</p>
        <p class="title">{{ this.item.name }}</p>
        <div>
            <img :src="this.creatorImageUrl">
            <p>{{ this.item.nameCr }}</p>
        </div>
        <div>
            <router-link :to="{ name: 'Curso', params: { id: this.item.id.substring(0, this.item.id.length - 2) } }">
                <button>Ver Curso</button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeSlideItem",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            imageUrl: "",
            creatorImageUrl: ""
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.item.image}.jpg`, import.meta.url).href;
        this.creatorImageUrl = new URL(`../../assets/${this.item.imageCr}.jpg`, import.meta.url).href;
    }
}
</script>

<style>
    .slide-wrapper {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 400px;
        overflow: hidden;
        border-radius: 8px;
        padding: 32px;
    }

    .slide-wrapper .tag {
        font-size: 32px;
        font-weight: 650;
        margin-bottom: 8px;
    }

    .slide-wrapper .title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 130px;
        color: var(--primary);
    }
    
    .slide-wrapper p {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .slide-wrapper div {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 16px;
        width: 100%;
    }

    .slide-wrapper img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
        opacity: 1;
    }

    .slide-wrapper div p {
        margin-bottom: 0px;
        font-size: 18px;
    }

    .slide-wrapper button {
        background: var(--primary);
        color: var(--light);
        height: 48px;
        width: 110px;
        border: none;
        border-radius: 16px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
    }
</style>