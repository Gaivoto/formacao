<template>
    <div class="vid" v-on:click="changeVideo">
        <img class="img" :src="this.imageUrl" />
        <div class="text">
            <p class="videoname">{{ video.title }}</p>
            <p class="videoduration">{{ calculatedDuration }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "VideoList",
    data() {
        return {
            open: false,
            imageUrl: "",
        }
    },
    props: {
        video: {
            type: Object,
            required: true,
        }
    },
    created() {
        this.imageUrl = new URL(`../../assets/${this.video.image}.jpg`,import.meta.url).href;
    },
    methods: {
        changeVideo() {
            this.$emit('changeVideo', this.video);
        }
    },
    computed: {
        calculatedDuration() {
            return Math.floor(this.video.duration / 60)+':'+Math.floor(this.video.duration % 60);
        }
    }
}
</script>

<style scoped>
    .vid {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: var(--mobalytics-back);
        height: fit-content;
        width: 100%;
        z-index: 1;
        cursor: pointer;
    }

    .vid:hover {
        background-color: var(--mobalytics-card);
    }

    .img {
        height: 80px;
        width: 80px;
        object-fit: cover;
        border-radius: 8px;
    }

    .text {
        margin-left: 20px;
        width: 100%;
        padding: 8px 0px;
    }

    .text .videoname {
        color: var(--primary);
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .text .videoduration {
        color: var(--light);
        margin-bottom: 0px;
    }
</style>