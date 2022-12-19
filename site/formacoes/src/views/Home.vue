<template>
    <div class="home-wrapper">
        <div class="home-row-wrapper">
            <p>Recomendados</p>
            <div class="row">
                <HomeCourseCard v-for="course in this.recommended" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div class="home-row-wrapper">
            <p>Mais Comprados no Último Mês</p>
            <div class="row">
                <HomeCourseCard v-for="course in this.hottest" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div class="home-row-wrapper">
            <p>Mais Comprados</p>
            <div class="row">
                <HomeCourseCard v-for="course in this.mostBought" :key="course.id" v-bind:course="course"/>
            </div>
        </div>
        <div class="home-row-wrapper">
            <p>Mais recentes</p>
            <div class="row">
                <HomeCourseCard v-for="course in this.recent" :key="course.id" v-bind:course="course"/>
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
            mostBought: [],
            recent: []
        }
    },
    created() {
        this.recommended = [
            {
                id: 1,
                name: "Course 1",
                description: "desc 1 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-12-2022",
            },
            {
                id: 2,
                name: "Course 2",
                description: "desc 2 amongus",
                image: "bingus",
                price: 12,
                category: "cat1",
                date: "05-11-2022",
            },
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022",
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat1",
                date: "05-09-2022",
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
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-06-2022",
            },
            {
                id: 8,
                name: "Course 8",
                description: "desc 8 amongus",
                image: "bingus",
                price: 10,
                category: "cat1",
                date: "05-05-2022",
            },
            {
                id: 9,
                name: "Course 9",
                description: "desc 9 amongus",
                image: "bingus",
                price: 35,
                category: "cat1",
                date: "05-04-2022",
            }
        ];

        this.mostBought = [
            {
                id: 3,
                name: "Course 3",
                description: "desc 3 amongus",
                image: "bingus",
                price: 50,
                category: "cat1",
                date: "05-10-2022",
            },
            {
                id: 4,
                name: "Course 4",
                description: "desc 4 amongus",
                image: "bingus",
                price: 80,
                category: "cat1",
                date: "05-09-2022",
            },
            {
                id: 6,
                name: "Course 6",
                description: "desc 6 amongus",
                image: "bingus",
                price: 25,
                category: "cat1",
                date: "05-07-2022",
            },
            {
                id: 7,
                name: "Course 7",
                description: "desc 7 amongus",
                image: "bingus",
                price: 20,
                category: "cat1",
                date: "05-06-2022",
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
            },
            {
                id: 10,
                name: "Course 10",
                description: "desc 10 amongus",
                image: "bingus",
                price: 15,
                category: "cat1",
                date: "05-03-2022",
            },
            {
                id: 11,
                name: "Course 11",
                description: "desc 11 amongus",
                image: "bingus",
                price: 2,
                category: "cat1",
                date: "05-01-2022",
            },
            {
                id: 12,
                name: "Course 12",
                description: "desc 12 amongus",
                image: "bingus",
                price: 120,
                category: "cat1",
                date: "05-02-2022",
            }
        ];
    }
}
</script>

<style scoped>
    .home-wrapper {
        padding: 24px 5% 0px 5%;
    }

    .home-row-wrapper {
        margin-bottom: 48px;
    }

    .home-row-wrapper p {
        margin: 0px;
    }
</style>