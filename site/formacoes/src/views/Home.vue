<template>
    <div class="home-wrapper">
        <div class="home-left">
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
        this.slides = [
            {
                id: 1,
                name: "Course Course Course Course Course Course Course 1",
                description: "desc 1 amongus desc 1 amongus desc 1 amongus desc 1 amongusdesc 1 amongusdesc 1 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-12-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Criador 1"
                },
                tag: "Recomendado para si",
                show: true
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
                    name: "Criador 1"
                },
                tag: "Em Destaque",
                show: false
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
                    name: "Criador 1"
                },
                tag: "Mais Vendido",
                show: false
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
                    name: "Criador 1"
                },
                tag: "Novidade",
                show: false
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
                    name: "Criador 1"
                },
                tag: "Mais Recomendações",
                show: false
            }
        ];

        this.recommended = [
            {
                id: 1,
                name: "Course Course Course Course Course Course Course 1",
                description: "desc 1 amongus desc 1 amongus desc 1 amongus desc 1 amongusdesc 1 amongusdesc 1 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-12-2022",
                duration: "23h 12min",
                creator: {
                    image: "bingus",
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
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
                    name: "Criador 1"
                }
            }
        ];
        
        axios({
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/criadores/home`
        })
        .then(value => {
            value.data.creators.forEach(c => this.creators.push(c));
            this.creators = value.data.creators;
        })
        .catch(error => {
            if(error.code) console.log(error.response.data);
            else console.log(error);
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

    @media (max-width: 1300px) {
        .home-right {
            width: 350px;
            min-width: 350px;
        }
    }

    @media (max-width: 1050px) {
        .home-wrapper {
            display: block;
        }

        .home-left {
            margin-bottom: 24px;
        }

        .home-right {
            width: 100%;
        }
    }

    @media (max-width: 800px) {
        .home-wrapper {
            padding: 24px 16px 0px 16px;
        }
    }
</style>