<template>
    <div class="header-wrapper">
        <div class="left-side">
            <img :src="this.imageUrl" />
            <div class="text">
                <p>{{ this.course.name }}</p>
                <p>{{ $t("courseDetails.creator") }} {{ this.course.creatorName }}</p>
                <p>{{ $t("courseDetails.category") }} {{ this.course.category }}</p>
                <p>{{ $t("courseDetails.price") }}{{ this.course.price }}</p>
                <button v-if:="this.compra">{{ $t("courseDetails.purchase") }}</button>
                <div v-if="this.canRate" ref="rating" class="rating">
                    <span v-for="n in 5" :key="n" class="material-icons" v-on:click="this.rateCourse(n)" v-on:mouseenter="this.hoverRating(n)" v-on:mouseleave="this.defaultRating">star</span>
                </div>
                <router-link v-if:="this.creator" :to="Tr.i18nRoute({ name: 'Workshop', params: { id: this.getUserId, idCourse: this.course.id, locale: Tr.guessDefaultLocale() } })">
                    <button>{{ $t("courseDetails.editCourse") }}</button> 
                </router-link>
            </div>
        </div>
        <div class="right-side">
            <p>{{ $t("courseDetails.description") }}</p>
            <p>{{ this.course.description }}</p>
        </div>
    </div>
</template>

<script>
import Tr from '@/i18n/translation.js'
export default {
    name: "CourseDetHeader",
    props: {
        course: {
            type: Object,
            required: true,
        },
        creator: {
            type: Boolean,
            required: true
        },
        compra: {
            type: Boolean,
            required: true
        },
        access: {
            type: Boolean,
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
    created() {
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
    },
    mounted() {
        if(this.course.userRating) {
            for(let i = 0; i < this.course.userRating; i++) {
                this.$refs.rating.children[i].classList.add("hovered");
            }
        }
    },
    computed: {
        getUserId() {
            if(this.$store.getters.getUser.id) return this.$store.getters.getUser.id;
            return 0;
        },
        canRate() {
            return (this.$store.getters.getUser.type && this.$store.getters.getUser.type != 'admin' && !this.creator && this.access);
        }
    },
    methods: {
        rateCourse(rating) {
            this.course.userRating = rating;
            this.$emit("rate-course", rating);
        },
        hoverRating(rating) {
            for(let i = 0; i < 5; i++) {
                this.$refs.rating.children[i].classList.remove("hovered");
            }

            for(let i = 0; i < rating; i++) {
                this.$refs.rating.children[i].classList.add("hovered");
            }
        },
        defaultRating() {
            for(let i = 0; i < 5; i++) {
                this.$refs.rating.children[i].classList.remove("hovered");
            }  

            if(this.course.userRating) {                
                for(let i = 0; i < this.course.userRating; i++) {
                    this.$refs.rating.children[i].classList.add("hovered");
                }
            }
        }
    }
}
</script>

<style scoped>
    .header-wrapper {
        padding: 16px;
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: space-between;
    }

    .header-wrapper p {
        color: var(--light);
    }

    .left-side {
        display: flex;
        justify-content: start;
        margin-right: 24px;
    }

    img {
        height: 220px;
        width: 220px;
        border-radius: 8px;
        object-fit: cover;
    }

    .text {
        padding-left: 36px;
        width: 360px;
    }

    .text p:first-child {
        color: var(--primary);
        font-size: 24px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
    }

    .right-side {
        width: auto;
        padding-top: 8px;
    }

    .right-side p:first-child {
        color: var(--primary);
    }

    .right-side p:nth-child(2) {
        white-space: pre-wrap;
    }

    .rating span {
        font-size: 36px;
        color: var(--light);
        cursor: pointer;
    }

    .rating .hovered {
        color: var(--primary);
    }

    @media (max-width: 1400px) {
        .header-wrapper {
            display: block;
        }

        .left-side {
            margin-bottom: 36px;
        }

        .right-side {
            margin-bottom: 36px;
        }
    }

    @media (max-width: 750px) {
        .left-side {
            display: block;
            margin-right: 0px;
        }

        .left-side img {
            margin-bottom: 24px;
        }

        .text {
            padding: 0px;
        }
    }

    @media (max-width: 500px) {
        .text {
            width: 100%;
        }
    }

    @media (max-width: 400px) {
        .left-side img {
            width: 100%;
        }
    }
</style>