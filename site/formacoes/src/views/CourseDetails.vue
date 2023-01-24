<template>
    <div class="course-details-wrapper">
        <div class="course-details-content">
            <CourseDetHeader class="course-header" v-bind:course="this.course" />
            <p>Conteúdo:</p>
            <div class="vid-container">
                <VidInfo v-for="vid in this.videos" :key="vid.id" v-bind:video="vid" v-bind:courseID="this.course.id"/>
            </div>
        </div>
    </div>
</template>

<script>
import CourseDetHeader from "../components/courseDetails/CourseDetHeader.vue";
import VidInfo from "../components/courseDetails/VidInfo.vue";

export default {
    name: "CourseDetails",
    components: {
        CourseDetHeader,
        VidInfo,
    },
    created() {
        this.course = {
            id: 1,
            image: "placeholder",
            name: "teste 1 teste 2 teste 2 teste 2 teste 2teste 2 teste 2 teste 2 teste 2teste 2 teste 2teste 2 teste 2teste 2teste 2teste 2 teste 2 teste 2 teste 2",
            creatorName: "seuku miyadora",
            description: `O curso de Python possui 60 aulas, neste curso o aluno aprenderá a linguagem Python. 

Nele é mostrado como desenvolver usando os comandos e a sintaxe Python atualizada seguindo a documentação estipulada pelos criadores da linguagem.

Esta é uma das linguagens que mais crescem no mundo, pois com Python é possível
desenvolver sistemas, jogos, aplicativos mobile e muito mais.`,
            category: "category1",
            price: "55.80 R$",
        }
        this.videos = [
            {
                id: 1,
                image: "placeholder",
                name: "video1 video1 video1video1 video1 video1 video1video1 video1  video1 video1video1video1 video1",
                description: "description1 description1 description1 description1 description1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1 description1 dedescription1 description1 description1description1 description1 description1 description1 description1 description1 description1 description1 description1 description1 v description1",
                duration: "0:15:23",
            },
            {
                id: 2,
                image: "placeholder",
                name: "video2",
                description: "iption1 description1 description1 description1 description1 desiption1 description1 description1 description1 description1 desiption1 description1 description1 description1 description1 desiption1 description1 description1 description1 description1 des",
                duration: "0:16:12",
            },
            {
                id: 3,
                image: "placeholder",
                name: "video3",
                description: "description3",
                duration: "0:17:46",
            },
            {
                id: 4,
                image: "placeholder",
                name: "video4",
                description: "description4",
                duration: "0:18:52",
            },
            {
                id: 5,
                image: "placeholder",
                name: "video5",
                description: "description5",
                duration: "2:00:00",
            }
        ];
    }
};
</script>

<style scoped>
    .course-details-wrapper {
        padding: 24px 48px 0px 48px;
    }

    .course-details-content {
        background-color: var(--mobalytics-card);
        border-radius: 8px;
        padding: 24px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        margin-bottom: 24px;
    }

    .course-details-content p {
        color: var(--primary);
        font-size: 22px;
        margin-left: 12px;
    }

    .vid-container {
        border-radius: 8px;
        margin: 12px;
        background-color: var(--mobalytics-back);
        overflow-x: hidden;
        overflow-y: scroll;
        height: 440px;
    }

    .vid-container::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .vid-container::-webkit-scrollbar-thumb {
        background: var(--mobalytics-susge);
        border-radius: 8px;
    }

    @media (max-width: 1200px) {
        .vid-container {
            height: 600px;
        }
    }

    @media (max-width: 800px) {
        .course-details-wrapper {
            padding: 24px 24px 0px 24px;
        }

        .course-details-content {
            padding: 12px;
        }

        .vid-container {
            height: 700px;
        }
    }

    @media (max-width: 400px) {
        .course-details-content {
            padding: 4px;
        }
    }
</style>
