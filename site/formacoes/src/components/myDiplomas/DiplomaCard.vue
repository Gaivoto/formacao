<template>
    <div class="diploma-card">
        <div class="picture-wrapper">
            <img :src="this.imageUrl" />
        </div>
        <div class="text-wrapper">
            <p>{{ diploma.name }}</p>
            <p>{{ diploma.desc }} </p>
            <p>{{ diploma.date }} </p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    diploma: {
        type: Object,
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
  }
};
</script>

<style scoped>
.diploma-card {
    display: flex;
    justify-content: start;
    background-color: black;
    padding: 15px;
    border-radius: 10px;
}

.picture-wrapper {
    height: 20%;
    width: 20%;
}

img {
    max-width: 100%;
    height: auto;
}

.text-wrapper {
    width: 90%;
    padding: 10px;
    color: white;
}

.text-wrapper p {
    width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>