<template>
<<<<<<< HEAD
    <div :class="imgPosition">
        <div class="photo">
            <img :src="picturePath" />
        </div>
        <div class="text">
            <p>{{ text }}</p>
=======
    <div class="info-block-wrapper" :class="this.info.side">
        <div class="photo">
            <img :src="this.imageUrl" />
        </div>
        <div class="text">
            <p>{{ this.info.title }}</p>
            <p>{{ this.info.text }}</p>
>>>>>>> origin/development
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPageInfoBlock",
    props: {
<<<<<<< HEAD
        imgPosition: {
            imgPosition: String,
            required: true,
        },
        text: {
            text: String,
            required: true,
        },
        picturePath: {
            picturePath: String,
            required: true,
        }
=======
        info: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            imageUrl: ""
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.info.image}.jpg`, import.meta.url).href;
>>>>>>> origin/development
    }
}
</script>

<style scoped>
<<<<<<< HEAD
=======
    .info-block-wrapper {
        margin-bottom: 48px;
        padding: 0px 5%;
    }

>>>>>>> origin/development
    .left {
        width: 100%;
        display: flex;
        justify-content: space-between;
<<<<<<< HEAD
        background-color: rgb(18, 18, 107);
=======
>>>>>>> origin/development
    }

    .right {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction:row-reverse;
<<<<<<< HEAD
        background-color: rgb(80, 80, 76);
    }

    .photo { 
        height: 30%;
        width: 30%;
=======
    }

    .photo { 
        height: 400px;
        width: 400px;
>>>>>>> origin/development
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .text {
        align-self: center;
        height: fit-content;
        width: 50%;
<<<<<<< HEAD
=======
        padding-left: 48px;
    }

    .text p {
        color: var(--light);
    }

    .text p:first-child {
        font-size: 36px;
>>>>>>> origin/development
    }
</style>