<template>
  <button
    class="vid"
    :class="{ vidOpen: open }"
    v-on:click="getName(video.name)"
  >
    <div class="left-side">
      <div class="closedInfo">
        <div class="descrbelow">
          <img class="img" :src="this.imageUrl" />
          <div class="text">
            <p>{{ video.name }}</p>
            <p>{{ video.duration }}</p>
          </div>
        </div>
        <p v-show="open">{{ video.description }}</p>
      </div>
    </div>

    <div class="right-side">
      <button @click="open = !open">\/</button>
    </div>
  </button>
</template>

<script>
export default {
  data: () => {
    return {
      open: false,
      imageUrl: "",
    };
  },
  props: {
    video: {
      type: Object,
      required: true,
    },
    getName: Function,
  },
  created() {
    this.imageUrl = new URL(
      `../../assets/${this.video.image}.jpg`,
      import.meta.url
    ).href;
  },
};
</script>

<style scoped>
.vid {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(15, 108, 151);
  height: fit-content;
}
.vidOpen {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: rgb(228, 5, 5);
  height: fit-content;
}
.left-side {
  /*display: flex;
  justify-content: start;
  height: 100%;*/
}

.closedInfo {
  display: block;
  justify-content: start;
  height: 100%;
}

.img {
  height: 60px;
  width: 60px;
  object-fit: cover;
}

.text {
  display: flex;
}

.descrbelow {
  display: flex;
}
</style>