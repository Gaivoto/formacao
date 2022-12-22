<template>
    <div class="course-card-container col-6 col-xl-3" :class="{ shake: this.hoverImg }">
        <div class="course-card">
            <router-link :to="{ name: 'Curso', params: { id: this.course.id } }" v-on:mouseenter="toggleHoverImg" v-on:mouseleave="toggleHoverImg">
                <img :src="this.imageUrl">
            </router-link>
            <div class="card-info">
                <router-link :to="{ name: 'Curso', params: { id: this.course.id } }"><p class="card-info-title">{{ this.course.name }}</p></router-link>
                <p class="card-info-category">{{ this.course.category }}</p>
                <p class="card-info-description">{{ this.course.description }}</p>
                <div class="card-info-div">
                    <p>{{ this.course.price }} €</p>
                    <div>
                        <span class="material-icons duration-icon">schedule</span>
                        <p>{{ this.course.duration }}</p>
                    </div>
                </div>   
                <hr>
                <router-link class="card-creator-div" :to="{ name: 'Perfil do Utilizador', params: { id: 1 } }">
                    <img :src="this.creatorImageUrl">
                    <p>{{ this.course.creator.name }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeCourseCard',
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: "",
            creatorImageUrl: "",
            hoverImg: false
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
        this.creatorImageUrl = new URL(`../../assets/${this.course.creator.image}.jpg`, import.meta.url).href;
    },
    methods: {
        toggleHoverImg() {
            this.hoverImg = !this.hoverImg;
        }
    }
}
</script>

<style scoped>
    .course-card {
        z-index: 1;
        padding: 24px 16px;
        background-color: var(--dark);
        border-radius: 12px;
        margin-bottom: 24px;
        box-shadow: 0 25px 50px 0 rgb(0 0 0 / 10%);
        background: rgb(35,79,109);
        background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    }

    .shake {
        animation: tilt-shaking 0.5s infinite;
    }

    .course-card > a > img {
        border-radius: 8px;
        margin-bottom: 24px;
        height: 260px;
        width: 100%;
        object-fit: cover;
    }

    .card-info {
        padding: 0px 12px;
    }

    .card-info p.card-info-title {
        color: var(--light);
        font-size: 24px;
        font-weight: 650;
        font-family: "Poppins", sans-serif;
        margin-bottom: 16px;
        width: fit-content;
    }

    .card-info p.card-info-title:hover {
        color: var(--primary);
    }

    .card-info p.card-info-category {
        font-size: 18px;
        background-color: var(--grey);
        width: fit-content;
        padding: 2px 8px;
        border-radius: 8px;
        font-family: "Poppins", sans-serif;
        color: var(--light);
    }

    .card-info p.card-info-description {
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        height: 46px;
        color: var(--light-alt);
    }

    .card-info .card-info-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .card-info-div > div {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .card-info-div > div > span {
        color: var(--light-alt);
        font-size: 20px;
    }

    .card-info-div > div > p {
        color: var(--light-alt);
        margin-bottom: 0px;
    }

    .card-info-div p:first-child {
        color: var(--primary);
    }

    .card-info .card-creator-div {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .card-creator-div img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--light);
    }

    .card-creator-div p {
        color: var(--light);
        font-size: 16px;
    }

    .card-info > * > * {
        margin-bottom: 0px;
    }

    hr {
        height: 2px;
        color: var(--light);
    }

    @keyframes tilt-shaking {
        0% { transform: rotate(0deg); }
        12% { transform: rotate(0.25deg); }
        25% { transform: rotate(0.5deg); }
        37% { transform: rotate(0.25deg); }
        50% { transform: rotate(0deg); }
        62% { transform: rotate(-0.25deg); }
        75% { transform: rotate(-0.5deg); }
        87% { transform: rotate(-0.25deg); }
        100% { transform: rotate(0deg); }
    }
</style>