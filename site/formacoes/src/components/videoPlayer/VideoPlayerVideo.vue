<template>
  <div class="videoplayer">
    <video class="video" controls :src="this.videoPath"></video>
  </div>
</template>
  
<script>
export default {
  name: "VideoPlayerVideo",
  props: {
    video: {
      type: String,
      required: true,
    },
  },
  computed: {
    videoPath() {
      return new URL(`../../assets/${this.video}.mp4`, import.meta.url).href;
    },
  },
};
</script>
  
<style>
  .videoplayer {
    background-color: black;
    max-height: 100%;
  }

  .video {
    width: 100%;
    max-height: inherit;
    height: 100%;
    border-radius: 8px;
  }
</style>