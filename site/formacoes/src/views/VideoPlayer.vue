<template>
  <div class="videopage-wrapper">
    <div class="videodesc">
      <VideoPlayerVideo v-bind:videoname="this.video.name" />
      <span>{{ this.video.description }}</span>
    </div>
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
      video: {
        id: "",
        image: "",
        name: "",
        description: "",
        duration: "",
      },
    };
  },
  methods: {
    getVideoName(video) {
      this.video = video;
    },
  },
  computed: {},
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
          image: "bingus",
          name: "Video1",
          description:
            "video mostrando uma cria de hamburguer selvagem alimentando se pela primeira vez sozinha",
          duration: "15 min",
        },
        {
          id: 2,
          image: "tomasGostosa",
          name: "Video2",
          description:
            "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
          duration: "16 min",
        },
        {
          id: 3,
          image: "bingus",
          name: "Video3",
          description:
            "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
          duration: "17 min",
        },
        {
          id: 4,
          image: "bingus",
          name: "Video1",
          description:
            "video mostrando uma cria de hamburguer selvagem alimentando se pela primeira vez sozinha",
          duration: "15 min",
        },
        {
          id: 5,
          image: "tomasGostosa",
          name: "Video2",
          description:
            "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
          duration: "16 min",
        },
        {
          id: 6,
          image: "bingus",
          name: "Video3",
          description:
            "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
          duration: "17 min",
        },
        {
          id: 7,
          image: "bingus",
          name: "Video1",
          description:
            "video mostrando uma cria de hamburguer selvagem alimentando se pela primeira vez sozinha",
          duration: "15 min",
        },
        {
          id: 8,
          image: "tomasGostosa",
          name: "Video2",
          description:
            "video mostrando um rapaz meio humano meio notificação tendo uma conversa com a sua mae",
          duration: "16 min",
        },
        {
          id: 9,
          image: "bingus",
          name: "Video3",
          description:
            "lindo video mostrando pessoa a fazer criança rir com as suas habilidades magicas",
          duration: "17 min",
        },
      ]);
  },
};
</script>

<style scoped>
.videopage-wrapper {
  display: flex;
}

.videodesc {
  width: 70%;
  display: block;
}
.list-container {
  background-color: rgb(9, 255, 0);
  overflow-x: hidden;
  overflow-y: scroll;
  width: 30%;
  max-height: 650px;
}
</style>
