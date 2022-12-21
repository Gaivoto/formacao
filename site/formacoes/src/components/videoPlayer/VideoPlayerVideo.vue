<template>
  <div class="videoplayer">
    <video class="video" controls :src="this.videoPath"></video>
  </div>
</template>
  
  <script>
export default {
  name: "VideoPlayerVideo",
  props: {
    videoname: {
      type: String,
      required: true,
    },
  },
  computed: {
    videoPath() {
      return new URL(`../../assets/${this.videoname}.mp4`, import.meta.url)
        .href;
    },
  },
};
</script>
  
  <style>
.videoplayer {
  background-color: black;

  max-height: 500px;
}

.video {
  width: 100%;
  max-height: inherit;
}
</style>