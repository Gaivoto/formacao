<template>
  <div class="wrapper">
    <div class="page-name">
      <h3>{{ this.$route.name }}</h3>
    </div>

    <div class="user-wrapper">
      <img id="profile-image" :src="this.imageUrl" />
      <h3>{{ this.user.username }}</h3>
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "Topbar",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        username: "",
        name: "",
        country: "",
        description: "",
        image: "",
      },
      imageUrl: "",
    };
  },
  created() {
    this.user.username = "Amogus Sus";
    this.user.name = "Bruh ?";
    this.user.country = "Portugal";
    this.user.description = "Boa descrição bruvkek";
    this.user.image = "bingus";
    this.imageUrl = new URL(
      `../../../assets/${this.user.image}.jpg`,
      import.meta.url
    ).href;
  },
};
</script>
  
  <style lang="scss" scoped>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  background-color: grey;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-right: 5%;
  padding-left: 5%;
  margin-bottom: 2%;
}

.page-name {
  width: 50%;
}
.user-wrapper {
  width: 50%;
  display: flex;
}

#profile-image {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>