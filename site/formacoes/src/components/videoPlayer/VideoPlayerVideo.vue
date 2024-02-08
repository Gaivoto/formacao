<template>
  <div class="videoplayer">
    <video class="video" controls :src="this.videoPath"></video>
  </div>
</template>
  
<<<<<<< HEAD
  <script>
export default {
  name: "VideoPlayerVideo",
  props: {
    videoname: {
=======
<script>
export default {
  name: "VideoPlayerVideo",
  props: {
    video: {
>>>>>>> origin/development
      type: String,
      required: true,
    },
  },
  computed: {
    videoPath() {
<<<<<<< HEAD
      return new URL(`../../assets/${this.videoname}.mp4`, import.meta.url)
        .href;
=======
      return new URL(`../../assets/${this.video}.mp4`, import.meta.url).href;
>>>>>>> origin/development
    },
  },
};
</script>
  
<<<<<<< HEAD
  <style>
.videoplayer {
  background-color: black;

  max-height: 500px;
}

.video {
  width: 100%;
  max-height: inherit;
}
=======
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
>>>>>>> origin/development
</style>