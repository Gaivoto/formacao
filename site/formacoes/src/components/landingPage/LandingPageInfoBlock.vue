<template>
    <div class="info-block-wrapper" :class="this.info.side">
        <div class="photo">
            <img :src="this.imageUrl" />
        </div>
        <div class="text">
            <p>{{ this.info.title }}</p>
            <p>{{ this.info.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPageInfoBlock",
    props: {
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
    }
}
</script>

<style scoped>
    .info-block-wrapper {
        margin-bottom: 48px;
    }

    .left {
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: rgb(18, 18, 107);
    }

    .right {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction:row-reverse;
        background-color: rgb(80, 80, 76);
    }

    .photo { 
        height: 30%;
        width: 30%;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .text {
        align-self: center;
        height: fit-content;
        width: 50%;
    }
</style>