<template>
    <router-link :to="Tr.i18nRoute({ name: this.route, params: { id: this.item.id, locale: Tr.guessDefaultLocale() } })" :key="this.item.id" class="result-wrapper" v-on:mouseenter="toggleBack" v-on:mouseleave="toggleBack" :class="{ resultBack: showBack }">
        <img :src="this.imageUrl">
        <div>
            <p>{{ this.item.name }}</p>
            <p>{{ this.item.resultType }}</p>
        </div>
    </router-link>
</template>

<script>
import Tr from '@/i18n/translation.js'
export default {
    name: 'SearchbarResult',
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: "",
            showBack: false
        }
    },
    created(){
        this.imageUrl = new URL(`../assets/${this.item.image}.jpg`, import.meta.url).href;
    },
    setup() {
        return { Tr };
    },
    computed: {
        route() {
           if(this.item.resultType == "Curso") return "Curso";
           return "Perfil do Utilizador";
        }
    },
    methods: {
        toggleBack() {
            this.showBack = !this.showBack;
        }
    }
}
</script>

<style scoped>
    .result-wrapper {
        padding: 16px 12px 16px 16px;
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .resultBack {
        background-color: var(--mobalytics-card); 
    }

    .result-wrapper > div {
        margin-bottom: 12px;
    }

    .result-wrapper > div > p {
        font-size: 16px;
        color: var(--light);
        margin: 0px;
    }

    .result-wrapper > div > p:first-child {
        font-size: 22px;
        color: var(--primary);

        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .result-wrapper img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 8px;
    }
</style>