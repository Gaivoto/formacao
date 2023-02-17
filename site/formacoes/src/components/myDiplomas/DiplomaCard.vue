<template>
    <div class="diploma-card-container col-12 col-md-6" :class="{ 'col-xl-3': !this.sidebar, 'col-xl-4': this.sidebar }">
        <div class="diploma-wrapper">
            <div class="diploma-card">
                <img class="logo" src="../../assets/logo3.png">
                <div class="download">
                    <span class="material-icons">download</span>
                </div>
                <div class="top-right"></div>
                <div class="bottom-left"></div>
                <div class="diploma-text">
                    <p class="certificado-text">CERTIFICADO</p>
                    <p class="formacao-text">DE FORMAÇÃO</p>
                    <p class="data">{{ this.formatedDate }}</p>
                    <p class="user">{{ this.user.name }}</p>
                    <p class="curso-text">Completou com sucesso a formação</p>
                    <p class="curso">{{ this.diploma.course }}</p>
                    <p class="formador">{{ this.diploma.creator }}</p>
                    <p class="formador-text">Formador</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        diploma: {
            type: Object,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
        sidebar: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            imageUrl: ""
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.diploma.image}.jpg`, import.meta.url).href;
    },
    computed: {
        formatedDate() {
            return this.diploma.date.substring(8, 10) + "/" + this.diploma.date.substring(5, 7) + "/" + this.diploma.date.substring(0, 4);
        }
    }
};
</script>

<style scoped>
    .diploma-wrapper {
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 36px;
    }

    .diploma-card {
        position: relative;
        display: flex;
        background: url("../../assets/certificate_bg.jpg");
        background-size: 400px;
        padding: 80px 20px 0px 20px;
        border-radius: 8px;
        height: fit-content;
        box-shadow: rgba(20, 14, 49, 1) 10px 10px 10px 4px;
    }

    .logo {
        position: absolute;
        left: 40px;
        top: 40px;
        height: 30px;
    }

    .download {
        position: absolute;
        right: 30px;
        bottom: 30px;
        background: rgba(20, 20, 20, 0.15);
        padding: 8px 8px 0px 8px;
        box-shadow: rgba(20, 14, 49, 0.2) 0px 2px 5px 4px;
        cursor: pointer;
    }

    .download span {
        font-size: 32px;
        color: var(--mobalytics-susge);
    }

    .top-right {
        position: absolute;
        right: 20px;
        top: 20px;
        height: 80px;
        width: 80px;
        border-top: 3px solid var(--mobalytics-back);
        border-right: 3px solid var(--mobalytics-back);
    }

    .bottom-left {
        position: absolute;
        left: 20px;
        bottom: 20px;
        height: 80px;
        width: 80px;
        border-bottom: 3px solid var(--mobalytics-back);
        border-left: 3px solid var(--mobalytics-back);
    }

    .diploma-text {
        width: 100%;
        text-align: center;
    }

    .certificado-text {
        font-size: 30px;
        margin-bottom: 0px;
    }

    .user {
        width: 80%;
        margin: auto;
        font-size: 26px;
        margin-bottom: 0px;
        border-bottom: 2px solid var(--mobalytics-susge);
    }

    .curso-text {
        margin-bottom: 4px;
    }

    .curso {
        margin-bottom: 40px;
        font-size: 20px;
    }

    .formador {
        width: fit-content;
        margin: auto;
        font-size: 24px;
        margin-bottom: 0px;
        border-bottom: 2px solid var(--mobalytics-susge);
    }

    .formador-text {
        width: fit-content;
        margin: auto;
        margin-bottom: 52px;
    }

    @media (max-width: 1500px) {
        .diploma-card-container {
            padding: 0px;
        }

        .curso {
            margin-bottom: 10px;
        }
    }

    @media (max-width: 600px) {
        .diploma-card-container {
            padding: 0px;
        }

        .download {
            padding: 8px 4px 0px 4px;
        }

        .download span {
            font-size: 26px;
        }
    }
</style>