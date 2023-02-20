<template>
    <div class="profile-wrapper">
        <UserProfileInfo v-bind:user="this.user" v-on:alterar-dados="alterarDadosUser" v-on:createSubscription="createSubscriptionUser" v-on:endSubscription="endSubscription" />
        <div class="profile-bottom" v-if="!this.isUserAdm && this.ownProfile">
            <div>
                <router-link :to="Tr.i18nRoute({ name: 'Meus Cursos', params: { id: this.getUserId } })" class="profile-bottom-title">{{ $t("profile.myCourses") }}</router-link>
                <div class="profile-list">
                    <UserProfileCourseCard v-for="course in this.courses" :key="course.id" v-bind:course="course" />
                    <div class="no-items" v-if="!this.userHasCourses">
                        <span class="material-icons">info</span>
                        <p>{{ $t("profile.noCourses") }}</p>
                    </div>
                </div>
            </div>
            <div>
                <router-link :to="Tr.i18nRoute({ name: 'Meus Diplomas', params: { id: this.getUserId } })" class="profile-bottom-title">{{ $t("profile.myDiplomas") }}</router-link>
                <div class="profile-list last-list">
                    <UserProfileDiplomaCard v-for="diploma in this.diplomas" :key="diploma.id" v-bind:diploma="diploma" />
                    <div class="no-items" v-if="!this.userHasDiplomas">
                        <span class="material-icons">info</span>
                        <p>{{ $t("profile.noDiplomas") }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-bottom creator-courses" v-if="!this.ownProfile">
            <p class="profile-bottom-title">{{ $t("profile.creatorCourses") }}</p>
            <div class="row creator-list">
                <CreatorProfileCourseCard v-for="course in this.courses" :key="course.id" v-bind:course="course" class="col-2" />
                <div class="no-items" v-if="!this.userHasCourses">
                    <span class="material-icons">construction</span>
                    <p>{{ $t("profile.noCreator") }}</p>
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
import CreatorProfileCourseCard from "../components/profile/CreatorProfileCourseCard.vue";
import Tr from '@/i18n/translation.js';

export default {
    name: "Profile",
    components: {
        UserProfileInfo,
        UserProfileCourseCard,
        UserProfileDiplomaCard,
        CreatorProfileCourseCard
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
    setup() {
        return { Tr };
    },
    created() {
        if(this.$route.params.id == this.$store.getters.getUser.id) {
            axios({
                method: "get",
                url: `${import.meta.env.VITE_HOST}/users/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then((value) => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                this.user = value.data;
                value.data.courses.forEach(c => this.courses.push(c));
                value.data.diplomas.forEach(d => this.diplomas.push(d));
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
                    }
                } else console.log(error);
            });
        } else {
            let request = {
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/criadores/${this.$route.params.id}`
            }

            if(this.$store.getters.getUser.id != "") {
                request.headers = {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                }
            }

            axios(request)
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                this.user = value.data.criador;
                value.data.criador.cursos.forEach(c => this.courses.push(c));     
            })
            .catch(error => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.data.message == "Este criador não existe.") {
                        this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        if(error.response.status == 401) {
			                this.$store.commit('resetUser');
                            this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                        } else {
                            this.$emit("open-modal", error.response.data.message);
                        }
                    }
                } else console.log(error);
            });
        }
    },
    beforeRouteUpdate(to, from){
        this.user = {};
        this.courses = [];
        this.diplomas = [];

        if(to.params.id == this.$store.getters.getUser.id) {
            axios({
                method: "get",
                url: `${import.meta.env.VITE_HOST}/users/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then((value) => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                this.user = value.data;
                value.data.courses.forEach(c => this.courses.push(c));
                value.data.diplomas.forEach(d => this.diplomas.push(d));
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
                    }
                } else console.log(error);
            });
        } else {
            let request = {
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/criadores/${to.params.id}`
            }

            if(this.$store.getters.getUser.id != "") {
                request.headers = {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                }
            }

            axios(request)
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                this.user = value.data.criador;
                console.log(value.data)
                value.data.criador.cursos.forEach(c => this.courses.push(c));
            })
            .catch(error => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.data.message == "Este criador não existe.") {
                        this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        if(error.response.status == 401) {
			                this.$store.commit('resetUser');
                            this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                        } else {
                            this.$emit("open-modal", error.response.data.message);
                        }
                    }
                } else console.log(error);
            });
        }
    },
    computed: {
        getUserId() {
            if(this.$store.getters.getUser.id) return this.$store.getters.getUser.id;
            return 0;
        },
        isUserAdm() {
            if (this.$store.getters.getUser.type && this.$store.getters.getUser.type == "admin") return true;
            return false;
        },
        userHasCourses() {
            if(this.courses.length > 0) return true;
            return false;
        },
        userHasDiplomas() {
            if(this.diplomas.length > 0) return true;
            return false;
        },
        ownProfile() {
            return (this.$route.params.id == this.$store.getters.getUser.id);
        }
    },
    methods: {
        alterarDadosUser(info) {
            if (info.name != "") {
                axios({
                    method: "put",
                    url: `${import.meta.env.VITE_HOST}/users/${this.$store.getters.getUser.id}`,
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
                    if (value.data.access_token) this.$store.commit("setAccessToken", value.data.access_token);
                })
                .catch((error) => {
                    if (error.code) {
                        console.log(error.response.data);
                        if(error.response.status == 401) {
			                this.$store.commit('resetUser');
                            this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                        } else {
                            this.$emit("open-modal", error.response.data.message);
                        }
                    } else console.log(error);
                });
            } else {
                this.$emit("open-modal", "Introduza um nome válido.");
            }
        },
        createSubscriptionUser(info) {
            axios({
                method: "post",
                url: `${import.meta.env.VITE_HOST}/subscricoes/`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
                data: {
                    id_subscriber: info.id_subscriber,
                    id_subscribed: info.id_subscribed
                },
            })
            .then((value) => {
                if (value.data.access_token) this.$store.commit("setAccessToken", value.data.access_token);
                this.$emit("open-modal", "Subscrição criada");
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
                    }
                } else console.log(error);
            });
        },
        endSubscription() {
            axios({
                method: "delete",
                url: `${import.meta.env.VITE_HOST}/subscricoes/${this.user.id_subscription}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then((value) => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                this.$emit("open-modal", "Subscrição cancelada");
            })
            .catch((error) => {
                if (error.code) {
                    console.log(error.response.data);
                    if(error.response.status == 401) {
			            this.$store.commit('resetUser');
                        this.$emit("open-modal", "Sessão expirou. Faça login novamente.");
                        this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
                    } else {
                        this.$emit("open-modal", error.response.data.message);
                    }
                } else console.log(error);
            });
        }
    }
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

    .profile-bottom .profile-bottom-title {
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

    .profile-list .no-items {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
        padding: 60px 48px 8px 48px;
    }

    .profile-list .no-items p {
        color: var(--light);
        margin-bottom: 0px;
    }

    .profile-list .no-items span {
        color: var(--light);
        font-size: 60px;
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

    .row {
        margin: 0px;
        padding: 0px 8px;
    }

    .creator-list {
        max-height: 580px;
        overflow-y: scroll;
    }

    .creator-list::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
    }

    .creator-list::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .creator-list .no-items {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
        padding: 48px;
    }

    .creator-list .no-items p {
        color: var(--light);
        margin-bottom: 0px;
    }

    .creator-list .no-items span {
        color: var(--light);
        font-size: 60px;
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

        .profile-list .no-items {
            padding: 60px 8px 8px 8px;
        }

        .creator-list .no-items {
            padding: 32px 16px;
        }
    }
</style>