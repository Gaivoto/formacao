<template>
    <div class="home-wrapper">
        <div class="home-left">
            <p>{{ $t("page.teste") }}</p>
            <div class="home-scroller">
                <HomeSlideshow v-bind:slides="this.slides" />
            </div>
            <div class="home-courses">
                <div class="courses-header">
                    <p>Cursos</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: typeOpen }" v-on:click="typeOpen=!typeOpen">{{ this.type }}</div>
                        <div class="items" :class="{ selectHide: !typeOpen }">
                            <div v-on:click="changeDiv('Recomendados')">Recomendados</div>
                            <div v-on:click="changeDiv('Destaques')">Destaques</div>
                            <div v-on:click="changeDiv('Mais Vendidos')">Mais Vendidos</div>
                            <div v-on:click="changeDiv('Novidades')">Novidades</div>
                            <div v-on:click="changeDiv('Outros')">Outros</div>
                        </div>
                    </div>   
                </div>
                <div ref="recommended" class="home-row-wrapper">
                    <div class="row">
                        <HomeCourseCard v-for="course in this.recommended" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
                    </div>
                </div>
                <div ref="hottest" class="home-row-wrapper d-none">
                    <div class="row">
                        <HomeCourseCard v-for="course in this.hottest" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
                    </div>
                </div>
                <div ref="sold" class="home-row-wrapper d-none">
                    <div class="row">
                        <HomeCourseCard v-for="course in this.mostSold" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
                    </div>
                </div>
                <div ref="recent" class="home-row-wrapper d-none">
                    <div class="row">
                        <HomeCourseCard v-for="course in this.recent" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
                    </div>
                </div>
                <div ref="other" class="home-row-wrapper d-none">
                    <div class="row">
                        <HomeCourseCard v-for="course in this.other" :key="course.id" v-bind:course="course" v-bind:sidebar="this.sidebar"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="home-right">
            <div class="home-graph">
                <img src="../assets/placeholder.png">
            </div>
            <div class="home-creators" :class="{ 'right-expanded': this.rightOpen }">
                <div>
                    <p>Maiores Criadores</p>
                    <p :class="{ 'd-none': this.rightOpen }" v-on:click="rightOpen=true">Ver Mais</p>
                    <p :class="{ 'd-none': !this.rightOpen }" v-on:click="rightOpen=false">Ver Menos</p>
                </div>
                <div>
                    <HomeCreatorItem v-for="creator in this.creators" :key="creator" v-bind:creator="creator" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import HomeCourseCard from "../components/home/HomeCourseCard.vue";
import HomeCreatorItem from "../components/home/HomeCreatorItem.vue";
import HomeSlideshow from "../components/home/HomeSlideshow.vue";

export default {
    name: "Home",
    components: {
        HomeCourseCard,
        HomeCreatorItem,
        HomeSlideshow
    },
    props: {
        sidebar: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            slides: [],
            recommended: [],
            hottest: [],
            mostSold: [],
            recent: [],
            other: [],
            creators: [],
            typeOpen: false,
            type: "Recomendados",
            rightOpen: false
        }
    },
    created() {
        axios({
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/cursos/home`
        })
        .then(value => {
            value.data.recomendados.forEach(c => this.recommended.push(c));
            this.slides.push({...value.data.recomendados[0]});
            value.data.destaques.forEach(c => this.hottest.push(c));
            this.slides.push({...value.data.destaques[0]});
            value.data.maisVendidos.forEach(c => this.mostSold.push(c));
            this.slides.push({...value.data.maisVendidos[0]});
            value.data.recentes.forEach(c => this.recent.push(c));
            this.slides.push({...value.data.recentes[0]});
            value.data.outros.forEach(c => this.other.push(c));
            this.slides.push({...value.data.outros[0]});

            for(let i = 0; i < this.slides.length; i++) {
                this.slides[i].show = false;
                this.slides[i].id += `-${i}`;
            }
        })
        .catch(error => {
            if(error.code) {
                this.$emit("open-modal", error.response.data.message);
                console.log(error.response.data);
            } else console.log(error);
        });
        
        axios({
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/criadores/home`
        })
        .then(value => {
            value.data.creators.forEach(c => this.creators.push(c));
        })
        .catch(error => {
            if(error.code) {
                this.$emit("open-modal", error.response.data.message);
                console.log(error.response.data);
            } else console.log(error);
        });
    },
    methods: {
        changeDiv(div) {
            this.type = div;
            this.typeOpen = false;

            this.$refs.recommended.classList.add('d-none');
            this.$refs.hottest.classList.add('d-none');
            this.$refs.sold.classList.add('d-none');
            this.$refs.recent.classList.add('d-none');
            this.$refs.other.classList.add('d-none');

            switch(div) {
                case 'Recomendados':
                    this.$refs.recommended.classList.remove("d-none");
                    break;
                case 'Destaques':
                    this.$refs.hottest.classList.remove("d-none");
                    break;
                case 'Mais Vendidos':
                    this.$refs.sold.classList.remove("d-none");
                    break;
                case 'Novidades':
                    this.$refs.recent.classList.remove("d-none");
                    break;
                case 'Outros':
                    this.$refs.other.classList.remove("d-none");
                default:
                    break;
            }
        }
    }

}
</script>

<style scoped>
    .home-wrapper {
        padding: 24px 48px 24px 48px;
        display: flex;
        gap: 24px;
    }

    .home-left {
        width: 100%;
    }

    .home-scroller {
        border-radius: 8px;
        background-color: var(--mobalytics-susge);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
        height: 400px;
        margin-bottom: 24px;
    }

    .home-scroller img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .home-courses {
        padding: 24px 24px 0px;
        background-color: var(--mobalytics-susge);
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
    }

    .courses-header {
        display: flex;
        gap: 32px;
        align-items: center;
        margin-bottom: 24px;
        padding-left: 16px;
    }

    .courses-header p {
        color: var(--primary);
        font-size: 24px;
        margin-bottom: 0px;
    }

    .home-right {
        width: 500px;
        min-width: 500px;
    }

    .home-graph {
        height: 400px;
        width: 100%;
        background-color: var(--mobalytics-susge);
        padding: 16px;
        border-radius: 8px;
        margin-bottom: 24px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
    }

    .home-graph img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    .home-creators.right-expanded {
        height: 1000px;
        -webkit-transition: height 0.5s linear;
        -moz-transition: height 0.5s linear;
        -ms-transition: height 0.5s linear;
        -o-transition: height 0.5s linear;
        transition: height 0.5s linear;
    }

    .home-creators {
        border-radius: 8px;
        padding: 16px;
        background-color: var(--mobalytics-susge);
        height: 630px;
        overflow: hidden;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
        -webkit-transition: height 0.5s linear;
        -moz-transition: height 0.5s linear;
        -ms-transition: height 0.5s linear;
        -o-transition: height 0.5s linear;
        transition: height 0.5s linear;
    }

    .home-creators > div:first-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 12px;
    }

    .home-creators > div > p {
        color: var(--light);
        font-size: 18px;
        cursor: pointer;
    }

    .home-creators > div > p:first-child {
        color: var(--primary);
        font-size: 24px;
        cursor: default;
    }

    /* 

        SELECT

    */

    .custom-select {
        position: relative;
        width: 240px;
        text-align: left;
        height: 40px;
        line-height: 40px;
    }

    .custom-select .selected {
        background-color: var(--mobalytics-card);
        border-radius: 8px;
        color: var(--light);
        padding-left: 1em;
        cursor: pointer;
        margin-bottom: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
    }

    .custom-select .selected:after {
        position: absolute;
        content: "";
        top: 18px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: var(--light) transparent transparent transparent;
    }

    .custom-select .items {
        color: var(--light);
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        background-color: var(--mobalytics-card);
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 2px;
        max-height: 300px;
    }

    .custom-select .items::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .custom-select .items::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .custom-select .items div {
        padding-left: 1em;
        cursor: pointer;
    }

    .custom-select .items div:hover {
        background-color: var(--mobalytics-back);
    }

    .selectHide {
        display: none;
    }

    @media (max-width: 1600px) {
        .home-right {
            width: 400px;
            min-width: 400px;
        }
    }

    @media (max-width: 1400px) {
        .home-right {
            width: 350px;
            min-width: 350px;
        }
    }

    @media (max-width: 1350px) {
        .home-wrapper {
            display: block;
        }

        .home-left {
            margin-bottom: 24px;
        }

        .home-right {
            width: 100%;
            display: flex;
            gap: 32px;
        }

        .home-right .home-creators {
            min-width: 350px;
        }

        .home-right .home-graph {
            height: 500px;
        }
    }

    @media (max-width: 1000px) {
        .home-right {
            display: block;
        }

        .home-right .home-graph {
            height: 400px;
        }
    }

    @media (max-width: 800px) {
        .home-wrapper {
            padding: 24px 16px 0px 16px;
        }
    }

    @media (max-width: 500px) {
        .home-courses .courses-header {
            display: block;
        }

        .home-courses .courses-header > p {
            margin-bottom: 18px;
        }

        .home-right, .home-right .home-creators {
            min-width: 250px;
        }

        .home-creators > div:first-child > p:not(:first-child) {
            display: none;
        }

        .home-creators {
            height: 600px;
        }
    }
</style>