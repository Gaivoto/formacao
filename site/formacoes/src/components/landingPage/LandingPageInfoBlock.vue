<template>
    <div :class="imgPosition">
        <div class="photo">
            <img :src="picturePath" />
        </div>
        <div class="text">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPageInfoBlock",
    props: {
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
    }
}
</script>

<style scoped>
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