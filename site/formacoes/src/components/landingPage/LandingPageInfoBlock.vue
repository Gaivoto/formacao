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
        padding: 0px 5%;
    }

    .left {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .right {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction:row-reverse;
    }

    .photo { 
        height: 400px;
        width: 400px;
    }

    img {
        max-width: 100%;
        height: auto;
    }

    .text {
        align-self: center;
        height: fit-content;
        width: 50%;
        padding-left: 48px;
    }

    .text p {
        color: var(--light);
    }

    .text p:first-child {
        font-size: 36px;
    }
</style>