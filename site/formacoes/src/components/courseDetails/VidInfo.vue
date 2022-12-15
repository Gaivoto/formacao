<template>
    <div class="vid" :class="{'vidOpen': open}">
        <div class="left-side">
            <div class="picture">
                <img :src="this.imageUrl"/>
            </div>
            <div class="text">
                <p>{{ video.name }}</p>
                <p>{{ video.duration }}</p>
                <p v-show="open">{{ video.description }}</p>
            </div>
        </div>
        <div class="right-side">
            <button @click="open = !open">abre de sesamo</button>
        </div>
    </div>
</template>

<script>

export default {
    data: () => {
        return {
            open: false,
            imageUrl: ""
        }
    },
    props: {
    video: {
        type: Object,
        required: true
    }
  },
  created() {
    this.imageUrl = new URL(`../../assets/${this.video.image}.jpg`, import.meta.url).href;
  }
    
}
</script>

<style scoped>
    .vid {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: rgb(15, 108, 151);
        height: 33%;
        width: 100%;
    }
    .vidOpen {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background-color: rgb(228, 5, 5);
        height: 53%;
        width: 100%;
    }
    .left-side {
        display: flex;
        justify-content: start;
        height: 100%;
    }
    .picture {
        height: 65%;
        width: 65%;
    }
    img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
</style>