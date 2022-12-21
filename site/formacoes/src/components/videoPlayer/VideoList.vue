<template>
  <!--<button class="vid" :class="{ vidOpen: open }" v-on:click="getName(video)">-->
  <button class="vid" v-on:click="getName(video)">
    <div class="left-side">
      <div class="closedInfo">
        <div class="descrbelow">
          <img class="img" :src="this.imageUrl" />
          <div class="text">
            <p class="videoname">{{ video.name }}</p>
            <p class="videoduration">{{ video.duration }}</p>
          </div>
        </div>
        <!--<p v-show="open">{{ video.description }}</p>-->
      </div>
    </div>

    <!--<div class="right-side">
      <button class="insidebtn" @click="open = !open">\/</button>
    </div>-->
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
  width: 100%;
  z-index: 1;
}
.vidOpen {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background-color: lightblue;
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
  border-radius: 50%;
}

.text {
  display: flex;
  margin-left: 20px;
  width: 100%;
  justify-content: space-between;
}

.descrbelow {
  display: flex;
}

.insidebtn {
  z-index: 2;
}
</style>