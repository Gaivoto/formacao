<template>
    <div class="header-wrapper">
        <div class="left-side">
            <div class="picture">
                <img :src="this.imageUrl"/>
            </div>
            <div class="text">
                <p>{{ course.name }}</p>
                <p>{{ course.creatorName }}</p>
                <p>{{ course.category }}</p>
                <p>{{ course.price }}</p>
                <button>Comprar</button>
            </div>
        </div>
        <div class="right-side">
            <p>Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição Descrição </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
    course: {
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
    this.imageUrl = new URL(`../../assets/${this.course.image}.jpg`, import.meta.url).href;
  }
    
}
</script>

<style scoped>
.header-wrapper {
    padding: 2%;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
}
.left-side {
    display: flex;
    justify-content: start;
}
.picture {
    height: 50%;
    width: 50%;
}
img {
    height: 100%;
    width: 100%;
}
.text {
    padding-left: 10px;
}
.right-side {
    max-width: 50%;
}
</style>