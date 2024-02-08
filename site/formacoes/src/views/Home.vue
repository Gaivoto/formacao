<template>
    <div class="home-wrapper">
<<<<<<< HEAD
        <div class="categories-wrapper">
            <div class="categories-div">
                <p ref="recommendedBtn" class="selected" v-on:click="changeDiv('recommended')">Recomendados</p>
                <p ref="hottestBtn" v-on:click="changeDiv('hottest')">Destaques</p>
                <p ref="soldBtn" v-on:click="changeDiv('sold')">Mais Vendidos</p>
                <p ref="recentBtn" v-on:click="changeDiv('recent')">Novidades</p>    
                <p ref="otherBtn" v-on:click="changeDiv('other')">Outros</p>  
            </div>
        </div>
        <div ref="recommended" class="home-row-wrapper">
            <div class="row">
                <HomeCourseCard v-for="course in this.recommended" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div ref="hottest" class="home-row-wrapper d-none">
            <div class="row">
                <HomeCourseCard v-for="course in this.hottest" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div ref="sold" class="home-row-wrapper d-none">
            <div class="row">
                <HomeCourseCard v-for="course in this.mostSold" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div ref="recent" class="home-row-wrapper d-none">
            <div class="row">
                <HomeCourseCard v-for="course in this.recent" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div ref="other" class="home-row-wrapper d-none">
            <div class="row">
                <HomeCourseCard v-for="course in this.other" :key="course.id" v-bind:course="course"/>
=======
        <div class="home-left">
            <div class="home-scroller">
                <HomeSlideshow v-bind:slides="this.slides" />
            </div>
            <div class="home-courses">
                <div class="courses-header">
                    <p>{{ $t("home.courses") }}</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: typeOpen }" v-on:click="typeOpen=!typeOpen">{{ this.type }}</div>
                        <div class="items" :class="{ selectHide: !typeOpen }">
                            <div v-on:click="changeDiv($t('home.recommended'))">{{ $t("home.recommended") }}</div>
                            <div v-on:click="changeDiv($t('home.trending'))">{{ $t("home.trending") }}</div>
                            <div v-on:click="changeDiv($t('home.bestSellers'))">{{ $t("home.bestSellers") }}</div>
                            <div v-on:click="changeDiv($t('home.recentlyAdded'))">{{ $t("home.recentlyAdded") }}</div>
                            <div v-on:click="changeDiv($t('home.others'))">{{ $t("home.others") }}</div>
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
                    <p>{{ $t("home.bestSellingCreators") }}</p>
                    <p :class="{ 'd-none': this.rightOpen }" v-on:click="rightOpen=true">{{ $t("home.viewMore") }}</p>
                    <p :class="{ 'd-none': !this.rightOpen }" v-on:click="rightOpen=false">{{ $t("home.viewLess") }}</p>
                </div>
                <div>
                    <HomeCreatorItem v-for="creator in this.creators" :key="creator" v-bind:creator="creator" />
                </div>
>>>>>>> origin/development
            </div>
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
import HomeCourseCard from "../components/home/HomeCourseCard.vue";
=======
import axios from "axios";
import HomeCourseCard from "../components/home/HomeCourseCard.vue";
import HomeCreatorItem from "../components/home/HomeCreatorItem.vue";
import HomeSlideshow from "../components/home/HomeSlideshow.vue";
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'
>>>>>>> origin/development

export default {
    name: "Home",
    components: {
<<<<<<< HEAD
        HomeCourseCard
    },
    data() {
        return {
=======
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
>>>>>>> origin/development
            recommended: [],
            hottest: [],
            mostSold: [],
            recent: [],
<<<<<<< HEAD
            other: []
        }
    },
    created() {
        this.recommended = [
            {
                id: 1,
                name: "Course 1",
                description: "desc 1 amongus desc 1 amongus desc 1 amongus desc 1 amongusdesc 1 amongusdesc 1 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-12-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 2,
                name: "Course 2",
                description: "desc 2 amongus",
                image: "bingus",
                price: 12,
                category: "cat1",
                date: "05-11-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat1",
                date: "05-09-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            }
        ];

        this.hottest = [
            {
                id: 6,
                name: "Course 6",
                description: "desc 6 amongus",
                image: "bingus",
                price: 25,
                category: "cat1",
                date: "05-07-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-06-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 8,
                name: "Course 8",
                description: "desc 8 amongus",
                image: "bingus",
                price: 10,
                category: "cat1",
                date: "05-05-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat1",
                date: "05-04-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            }
        ];

        this.mostSold = [
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat1",
                date: "05-09-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 6,
                name: "Course 6",
                description: "desc 6 amongus",
                image: "bingus",
                price: 25,
                category: "cat1",
                date: "05-07-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-06-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            }
        ];

        this.recent = [
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat1",
                date: "05-04-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 10,
                name: "Course 10",
                description: "desc 10 amongus",
                image: "bingus",
                price: 15,
                category: "cat1",
                date: "05-03-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 11,
                name: "Course 11",
                description: "desc 11 amongus",
                image: "bingus",
                price: 2,
                category: "cat1",
                date: "05-01-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 12,
                name: "Course 12",
                description: "desc 12 amongus",
                image: "bingus",
                price: 120,
                category: "cat1",
                date: "05-02-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            }
        ];

        this.other = [
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat1",
                date: "05-04-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 10,
                name: "Course 10",
                description: "desc 10 amongus",
                image: "bingus",
                price: 15,
                category: "cat1",
                date: "05-03-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 11,
                name: "Course 11",
                description: "desc 11 amongus",
                image: "bingus",
                price: 2,
                category: "cat1",
                date: "05-01-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            },
            {
                id: 12,
                name: "Course 12",
                description: "desc 12 amongus",
                image: "bingus",
                price: 120,
                category: "cat1",
                date: "05-02-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Ze Bitola"
                }
            }
        ];
    },
    methods: {
        changeDiv(div) {
            this.$refs.recommendedBtn.classList.remove("selected");
            this.$refs.hottestBtn.classList.remove("selected");
            this.$refs.soldBtn.classList.remove("selected");
            this.$refs.recentBtn.classList.remove("selected");
            this.$refs.otherBtn.classList.remove("selected");
=======
            other: [],
            creators: [],
            typeOpen: false,
            type: "",
            rightOpen: false
        }
    },
    created() {
        this.type = this.t("home.recommended");

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
    setup() {
        const { t } = useI18n();

        return { Tr, t };
    },
    methods: {
        changeDiv(div) {
            this.type = div;
            this.typeOpen = false;
>>>>>>> origin/development

            this.$refs.recommended.classList.add('d-none');
            this.$refs.hottest.classList.add('d-none');
            this.$refs.sold.classList.add('d-none');
            this.$refs.recent.classList.add('d-none');
            this.$refs.other.classList.add('d-none');

            switch(div) {
<<<<<<< HEAD
                case 'recommended':
                    this.$refs.recommendedBtn.classList.add("selected");
                    this.$refs.recommended.classList.remove("d-none");
                    break;
                case 'hottest':
                    this.$refs.hottestBtn.classList.add("selected");
                    this.$refs.hottest.classList.remove("d-none");
                    break;
                case 'sold':
                    this.$refs.soldBtn.classList.add("selected");
                    this.$refs.sold.classList.remove("d-none");
                    break;
                case 'recent':
                    this.$refs.recentBtn.classList.add("selected");
                    this.$refs.recent.classList.remove("d-none");
                    break;
                case 'other':
                    this.$refs.otherBtn.classList.add("selected");
=======
                case this.$t("home.recommended"):
                    this.$refs.recommended.classList.remove("d-none");
                    break;
                case this.$t("home.trending"):
                    this.$refs.hottest.classList.remove("d-none");
                    break;
                case this.$t("home.bestSellers"):
                    this.$refs.sold.classList.remove("d-none");
                    break;
                case this.$t("home.recentlyAdded"):
                    this.$refs.recent.classList.remove("d-none");
                    break;
                case this.$t("home.others"):
>>>>>>> origin/development
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
<<<<<<< HEAD
        padding: 24px 16px 0px 16px;
    }

    .categories-wrapper {
        padding: 16px 24px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 36px;
        width: 100%;
    }

    .categories-div {
        display: flex;
        justify-content: space-evenly;
        padding: 12px 40px;
        background-color: var(--mobalytics-susge);
        border-radius: 8px;
        width: 75%;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .categories-div p {
        text-align: center;
        padding: 12px 40px;
        border-radius: 12px;
        min-width: 200px;
        background-color: var(--mobalytics-card);
        margin: 0px;
        color: var(--light);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        cursor: pointer;
    }

    .categories-div p.selected {
        background-color: var(--mobalytics-back);
        color: var(--primary);
    }

    .home-row-wrapper {
        padding: 16px 24px;
=======
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
>>>>>>> origin/development
    }
</style>