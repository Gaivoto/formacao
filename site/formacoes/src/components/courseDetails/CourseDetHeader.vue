<template>
  <div class="header-wrapper">
    <div class="left-side">
      <img :src="this.imageUrl" />
      <div class="text">
        <p>{{ this.course.name }}</p>
        <p>{{ this.course.creatorName }}</p>
        <p>{{ this.course.category }}</p>
        <p>{{ this.course.price }}</p>
        <button @click="open = !open">COMPRAR</button>
        <button
          v-show="open"
          @click="$router.push(`/courses/${this.course.id}/videos`)"
        >
          VER VIDEOS
        </button>
      </div>
    </div>
    <div class="right-side">
      <p>
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição
        Descrição Descrição Descrição Descrição Descrição Descrição Descrição
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: "",
      open: false,
    };
  },
  created() {
    this.imageUrl = new URL(
      `../../assets/${this.course.image}.jpg`,
      import.meta.url
    ).href;
  },
};
</script>

<style scoped>
.header-wrapper {
  padding: 16px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
}
.left-side {
  display: flex;
  justify-content: start;
}

img {
  height: 200px;
  width: 200px;
}
.text {
  padding-left: 10px;
}
.right-side {
  max-width: 50%;
}
</style>