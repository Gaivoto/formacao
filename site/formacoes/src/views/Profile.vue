<template>
  <div class="profile-wrapper">
    <UserProfileInfo
      v-bind:user="this.user"
      v-on:alterar-dados="alterarDadosUser"
    />
    <div class="profile-bottom" v-if="!this.isUserAdm">
      <div>
        <router-link :to="{ name: 'Meus Cursos', params: { id: 1 } }"
          >Os meus cursos</router-link
        >
        <div class="profile-list">
          <UserProfileCourseCard
            v-for="course in this.courses"
            :key="course.id"
            v-bind:course="course"
          />
        </div>
      </div>
      <div>
        <router-link :to="{ name: 'Meus Diplomas', params: { id: 1 } }"
          >Os meus diplomas</router-link
        >
        <div class="profile-list last-list">
          <UserProfileDiplomaCard
            v-for="diploma in this.diplomas"
            :key="diploma.id"
            v-bind:diploma="diploma"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserProfileInfo from "../components/profile/UserProfileInfo.vue";
import UserProfileCourseCard from "../components/profile/UserProfileCourseCard.vue";
import UserProfileDiplomaCard from "../components/profile/UserProfileDiplomaCard.vue";

export default {
  name: "Profile",
  components: {
    UserProfileInfo,
    UserProfileCourseCard,
    UserProfileDiplomaCard,
  },
  data() {
    return {
      user: {
        username: "",
        name: "",
        email: "",
        description: "",
        image: "",
        type: "",
      },
      courses: [],
      diplomas: [],
    };
  },
  created() {
    axios({
      method: "get",
      url: `${import.meta.env.VITE_HOST}/users/${
        this.$store.getters.getUser.id
      }`,
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
        refreshtoken: this.$store.getters.getRefreshToken,
      },
    })
      .then((value) => {
        this.user = value.data;
        this.courses = value.data.courses;
        this.diplomas = value.data.diplomas;
        console.log(this.diplomas);
      })
      .catch((error) => {
        if (error.code) console.log(error.response.data);
        else console.log(error);
      });
  },
  computed: {
    isUserAdm() {
      if (
        this.$store.getters.getUser.type &&
        this.$store.getters.getUser.type == "admin"
      )
        return true;
      return false;
    },
  },
  methods: {
    alterarDadosUser(info) {
      if (info.name != "" && info.description != "") {
        axios({
          method: "put",
          url: `${import.meta.env.VITE_HOST}/users/${
            this.$store.getters.getUser.id
          }`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
            refreshtoken: this.$store.getters.getRefreshToken,
          },
          data: {
            name: info.name,
            description: info.description,
            image: "../images/etc",
          },
        })
          .then((value) => {
            //falta meter modals depois falando q a conta foi criada e pedindo pra fazer login
            if (value.data.access_token)
              this.$store.commit("setAccessToken", value.data.access_token);
          })
          .catch((error) => {
            if (error.code) console.log(error.response.data);
            else console.log(error);
          });
      }
    },
  },
};
</script>

<style scoped>
.profile-wrapper {
  padding: 24px 48px 0px 48px;
}

.profile-bottom {
  background-color: var(--mobalytics-card);
  padding: 16px 0px;
  border-radius: 8px;
  box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
}

.profile-bottom > div > a {
  color: var(--primary);
  font-size: 20px;
  margin-left: 24px;
  margin-bottom: 16px;
}

.profile-list {
  display: flex;
  margin: 0px 32px 24px 32px;
  padding-bottom: 16px;
  border-radius: 8px;
  overflow-x: scroll;
  overflow-y: hidden;
}

.last-list {
  margin-bottom: 12px;
}

.profile-list::-webkit-scrollbar {
  width: 10px;
  background: var(--mobalytics-card);
}

.profile-list::-webkit-scrollbar-thumb {
  background: var(--mobalytics-back);
  border-radius: 8px;
}

@media (max-width: 1050px) {
  .profile-list {
    margin: 0px 16px 24px;
  }
}

@media (max-width: 800px) {
  .profile-wrapper {
    padding: 24px 16px 0px 16px;
  }
}
</style>