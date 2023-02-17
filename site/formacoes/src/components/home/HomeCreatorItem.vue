<template>
    <div class="item-wrapper">
        <div class="item-left">
            <img :src="this.imageUrl">
            <div class="item-text">
                <p>{{ this.creator.name }}</p>
                <p>@{{ this.creator.username }}</p>
            </div>
        </div>
        <router-link :to="Tr.i18nRoute({ name: 'Perfil do Utilizador', params: { id: this.creator.id, locale: Tr.guessDefaultLocale() } })"><button>Ver</button></router-link>
    </div>
</template>

<script>
import Tr from '@/i18n/translation.js'
export default {
    name: "HomeCreatorItem",
    props: {
        creator: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            imageUrl: ""
        }
    },
    setup() {
        return { Tr };
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.creator.image}.jpg`, import.meta.url).href;
    }
}
</script>

<style>
    .item-wrapper {
        padding: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }

    .item-left {
        display: flex;
        gap: 12px;
        width: auto;
    }

    .item-left img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
        object-fit: cover;
    }

    .item-text p {
        color: var(--light);
        margin: 0px;
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .item-text p:first-child {
        margin-bottom: 4px;
        font-size: 20px;
    }

    .item-wrapper button {
        background: var(--primary);
        color: var(--light);
        height: 32px;
        width: 60px;
        border: none;
        border-radius: 16px;
    }

    @media (max-width: 500px) {
        .item-left img {
            display: none;
        }
    }
</style>