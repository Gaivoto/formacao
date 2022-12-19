<template>
  <div class="videopage-wrapper">
    <VideoPlayerVideo v-bind:videoname="this.videoname" />
    <div class="list-container">
      <VideoList
        v-for="vid in this.videos"
        :key="vid.id"
        v-bind:video="vid"
        :getName="getVideoName"
      />
    </div>
  </div>
</template>


<script>
import VideoList from "../components/videoPlayer/VideoList.vue";
import VideoPlayerVideo from "../components/videoPlayer/VideoPlayerVideo.vue";
export default {
  name: "VideoPlayer",
  data() {
    return {
      videoname: "Video1",
    };
  },
  methods: {
    getVideoName(videoname) {
      this.videoname = videoname;
    },
  },
  components: {
    VideoList,
    VideoPlayerVideo,
  },
  created() {
    (this.course = {
      id: 1,
      image: "tomasGostosa",
      name: "nameCourse",
      creatorName: "seuku miyadora",
      description: "description2",
      category: "category1",
      price: "55.80 R$",
    }),
      (this.videos = [
        {
          id: 1,
          image: "tomasGostosa",
          name: "Video1",
          description:
            "description1 description1 description1 description1 description1 description1 description1 description1 description1 ",
          duration: "15 min",
        },
        {
          id: 2,
          image: "tomasGostosa",
          name: "Video2",
          description: "description2",
          duration: "16 min",
        },
        {
          id: 3,
          image: "tomasGostosa",
          name: "Video3",
          description: "description3",
          duration: "17 min",
        },
        /*{
          id: 4,
          image: "tomasGostosa",
          name: "video4",
          description: "description4",
          duration: "18 min",
        },
        {
          id: 5,
          image: "tomasGostosa",
          name: "video5",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 6,
          image: "tomasGostosa",
          name: "video6",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 7,
          image: "tomasGostosa",
          name: "video7",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 8,
          image: "tomasGostosa",
          name: "video8",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 9,
          image: "tomasGostosa",
          name: "video8",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 10,
          image: "tomasGostosa",
          name: "video8",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 11,
          image: "tomasGostosa",
          name: "video8",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 12,
          image: "tomasGostosa",
          name: "video8",
          description: "description5",
          duration: "2 hours ",
        },
        {
          id: 13,
          image: "tomasGostosa",
          name: "video8",
          description: "description5",
          duration: "2 hours ",
        },*/
      ]);
  },
};
</script>

<style scoped>
.videopage-wrapper {
  display: flex;
  background-color: red;
}
.list-container {
  background-color: rgb(9, 255, 0);
  overflow-x: hidden;
  overflow-y: scroll;
  width: 30%;
  max-height: 650px;
}
</style>
