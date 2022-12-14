<template>
  <div class="wrapper justify-content-between">
    <h3>Nome da pagina</h3>
    <div class="user-wrapper">
      <img id="profile-image" :src="this.imageUrl" />
      <h3>{{ this.user.username }}</h3>
    </div>
  </div>
</template>
  
  <script>
import { ref } from "vue";

export default {
  name: "Topbar",
  props: {
    name,
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
      `../../assets/${this.user.image}.jpg`,
      import.meta.url
    ).href;
  },
};
</script>
  
  <style lang="scss" scoped>
.wrapper {
  background-color: lightgrey;
  display: flex;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-right: 5%;
  padding-left: 5%;
  margin-bottom: 2%;
}

.user-wrapper {
  display: flex;
}

#profile-image {
  height: 70%;
  width: 70%;
  border-radius: 50%;
  object-fit: cover;
}
</style>