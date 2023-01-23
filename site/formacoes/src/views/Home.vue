<template>
    <div class="home-wrapper">
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
            </div>
        </div>
    </div>
</template>

<script>
import HomeCourseCard from "../components/home/HomeCourseCard.vue";

export default {
    name: "Home",
    components: {
        HomeCourseCard
    },
    data() {
        return {
            recommended: [],
            hottest: [],
            mostSold: [],
            recent: [],
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

            this.$refs.recommended.classList.add('d-none');
            this.$refs.hottest.classList.add('d-none');
            this.$refs.sold.classList.add('d-none');
            this.$refs.recent.classList.add('d-none');
            this.$refs.other.classList.add('d-none');

            switch(div) {
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
    }
</style>