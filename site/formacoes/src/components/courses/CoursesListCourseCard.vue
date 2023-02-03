<template>
    <div class="course-card-container col-12 col-md-6 col-xl-3" :class="{ shake: this.hoverImg }">
        <div class="course-card">
            <router-link :to="{ name: 'Curso', params: { id: this.course.id } }">
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
                        <p>{{ this.calculatedDuration }}</p>
                    </div>
                </div>   
                <hr>
                <router-link class="card-creator-div" :to="{ name: 'Perfil do Utilizador', params: { id: this.course.idCr } }">
                    <img :src="this.creatorImageUrl">
                    <p>{{ this.course.nameCr }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoursesListCourseCard',
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: "",
            creatorImageUrl: ""
        }
    },
    created(){
        this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
        this.creatorImageUrl = new URL(`../../assets/${this.course.imageCr}.jpg`, import.meta.url).href;
    },
    computed: {
        calculatedDuration() {
            return Math.floor(this.course.duration) + "h " + Math.round((this.course.duration - Math.floor(this.course.duration)) * 60) + "min";
        }
    }
}
</script>

<style scoped>
    .course-card {
        z-index: 1;
        padding: 24px 16px;
        border-radius: 12px;
        margin-bottom: 24px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        background: var(--mobalytics-card);
        transition: 0.5s;
    }

    .course-card:hover {
        transform: scale(1.02);
        transition: 0.5s;
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
        font-size: 22px;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
        margin-bottom: 16px;
        width: fit-content;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
        color: var(--light);
        font-size: 20px;
    }

    .card-info-div > div > p {
        color: var(--light);
        margin-bottom: 0px;
    }

    .card-info-div p:first-child {
        color: var(--light);
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

    @media (max-width: 600px) {
        .course-card-container {
            padding: 0px;
        }
    }

    @media (max-width: 500px) {
        .course-card {
            padding: 12px 8px;
        }
        .course-card > a > img {
            height: 160px;
            margin: 16px;
            width: 90%;
        }

        .card-info p.card-info-title {
            margin-bottom: 2px;
        }

        .card-info p.card-info-category {
            margin-bottom: 4px;
        }

        .card-info-div p {
            margin-bottom: 6px !important;
        }

        .course-card hr {
            margin: 6px 0px;
        }
    }

    @media (max-width: 400px) {
        .course-card > a > img {
            margin: 0px;
            margin-bottom: 12px;
            width: 100%;
        }
    }
</style>