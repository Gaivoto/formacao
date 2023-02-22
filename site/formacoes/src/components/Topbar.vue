<template>
    <div class="wrapper">
        <div class="topbar-text" :class="{ 'topbar-text-logged': this.isUserLogged, 'topbar-text-not-logged': !this.isUserLogged }">
            <router-link :to="Tr.i18nRoute({ name: 'Home' })">
                <p class="logo">Guide Line</p>
            </router-link>
            <p class="hifen"> - </p>
            <p class="page-name"> {{ this.getTranslatedPageName }}</p>
        </div>

        <div class="searchbar-container" v-on:click.stop>
            <div class="searchbar">
                <input type="text" ref="topSearchbar" v-on:input="filterSearchbar" v-on:keydown.enter="goToSearchItem" :placeholder='$t("topbar.search")'>
                <span class="material-icons search-icon">search</span>
            </div> 
            <div ref="topSearchbarResults" class="searchbar-results" :class="{ 'd-none': !searchOpen }">
                <div class="no-results" v-if="this.noResults">
                    <span class="material-icons search-icon">warning</span>
                    <p>{{ $t("topbar.noResults") }}</p>    
                </div>
                <SearchbarResult v-for="item in this.searchResults" :key="item.id + item.type" v-bind:item="item" v-on:click="toggleSearch"/>
            </div>  
        </div>
        
        <div class="topbar-right" v-if="this.isUserLogged">
            <router-link class="user-wrapper" :to="Tr.i18nRoute({ name: 'Perfil do Utilizador', params: { id: this.getUserId } })" :key="this.getUserId">
                <div class="username">
                    <p>{{ this.$store.getters.getUser.username }}</p>
                </div>
                <div class="image-wrapper">
                    <img id="profile-image" :src="this.imageUrl" />    
                </div>
            </router-link>
            <div class="notif-container" v-on:click="toggleNotifs" v-on:click.stop>
                <span class="material-icons notif-icon" :class="{ unread: showNotif }">notifications<div :class="{ notif: showNotif }"></div></span>
            </div>
        </div>

        <div class="topbar-right" v-if="!this.isUserLogged">
            <router-link class="topbar-btn" :to="Tr.i18nRoute({ name: 'Cursos', params: { locale: Tr.guessDefaultLocale() } })">
                <p class="text">{{ $t("topbar.courses") }}</p>
            </router-link>
            <router-link class="topbar-btn" :to="Tr.i18nRoute({ name: 'Login', params: { locale: Tr.guessDefaultLocale() } })">
                <p class="text">{{ $t("topbar.login") }}</p>
            </router-link>
        </div>

        <div ref="notifList" class="notif-list" :class="{ 'd-none': !notifsOpen }">
            <div class="no-notifications" v-if="!this.hasNotifs">
                <span class="material-icons search-icon">notifications_off</span>
                <p>Não existem notificações.</p>    
            </div>
            <NotificationListItem v-for="notif in this.notifications" :key="notif.id" v-bind:notification="notif"/>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NotificationListItem from './NotificationListItem.vue';
import SearchbarResult from './SearchbarResult.vue';
import Tr from '@/i18n/translation.js';

export default {
    name: "Topbar",
    components: {
        NotificationListItem,
        SearchbarResult
    },
    props: {
        notifsOpen: {
            type: Boolean,
            required: true
        },
        searchOpen: {
            type: Boolean,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isMounted: false,
            user: this.$store.getters.getUser,
            imageUrl: "",
            notifications: [],
            searchResults: [],
            creators: [],
            courses: []
        }
    },
    setup() {
        return { Tr };
    },
    mounted() {
        this.isMounted = true;
    }, 
    created() {
        if(this.$store.getters.getUser.id) {
            axios({
                method: `get`,
                url: `${import.meta.env.VITE_HOST}/notifications/user/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                }
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                value.data.notifications.forEach(n => this.notifications.push(n));
                this.notifications.forEach((u) => {
                    if (u.change_state == "Ativo") u.change_state = this.$t("states.active");
                    else if(u.change_state == "Inativo") u.change_state = this.$t("states.inactive");
                    else if(u.change_state == "Pendente") u.change_state = this.$t("states.pending");
                    else u.change_state = this.$t("states.rejected");
                });
            })
            .catch(error => {
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

        axios({
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/cursos`
        })
        .then(value => {
            value.data.courses.forEach(c => this.courses.push(c));
            this.courses.forEach(c => c.resultType = "Curso");
        })
        .catch(error => {
            if (error.code) {
                console.log(error.response.data);
                this.$emit("open-modal", error.response.data.message);
            } else console.log(error);
        });

        axios({
            method: `get`,
            url: `${import.meta.env.VITE_HOST}/criadores`
        })
        .then(value => {
            value.data.criadores.forEach(c => this.creators.push(c));
            this.creators.forEach(c => c.resultType = "Criador");
        })
        .catch(error => {
            if (error.code) {
                console.log(error.response.data);
                this.$emit("open-modal", error.response.data.message);
            } else console.log(error);
        });
        
        this.imageUrl = new URL(`../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    computed: {
        showNotif() {
			let unread = false;

			this.notifications.forEach(notif => {
				if(notif.state == "false") unread = true;
			});

			return unread;
		},
        noResults() {
            if(this.isMounted){
                let filter = this.$refs.topSearchbar.value;

                if(this.searchResults.length == 0 && filter != "") return true;
                return false;    
            }
        },
        getUser() {
            this.user = this.$store.getter.getUser;
        },
        getUserId() {
            if(this.$store.getters.getUser.id) return this.$store.getters.getUser.id;
            return 0;
        },
        hasNotifs() {
            return (this.notifications.length > 0);
        },
        isUserLogged() {
            if(this.$store.getters.getUser.id) return true;
            return false;
        },
        getTranslatedPageName() {
            switch(this.$route.name) {
                case "Landing":
                    return this.$t("pages.landing");
                case "NotFound":
                    return this.$t("pages.notFound");
                case "Home":
                    return this.$t("pages.home");
                case "Curso":
                    return this.$t("pages.course");
                case "Cursos":
                    return this.$t("pages.courses");
                case "Conteúdo":
                    return this.$t("pages.content");
                case "Workshop":
                    return this.$t("pages.workshop");
                case "Estatísticas":
                    return this.$t("pages.analytics");
                case "Login":
                    return this.$t("pages.login");
                case "Perfil do Utilizador":
                    return this.$t("pages.profile");
                case "Meus Cursos":
                    return this.$t("pages.myCourses");
                case "Meus Diplomas":
                    return this.$t("pages.myDiplomas");
                case "Preferências":
                    return this.$t("pages.settings");
                case "Vídeo":
                    return this.$t("pages.video");
                case "Lista de Users":
                    return this.$t("pages.userList");
                case "Lista de Cursos":
                    return this.$t("pages.courseList")
            }
        }
    },
    methods: {
        toggleNotifs() {
            this.$emit("toggleNotifs");

            this.notifications.forEach(n => n.state = true);

            axios({
                method: `put`,
                url: `${import.meta.env.VITE_HOST}/notifications/user/${this.$store.getters.getUser.id}`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken
                }
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
            })
            .catch(error => {
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
        toggleSearch() {
            this.$emit("toggleSearch");
        },
        filterSearchbar(){
            this.$emit("openSearch");
            let filter = this.$refs.topSearchbar.value.toLowerCase();

            this.searchResults = [];

            if(filter != ""){
                this.creators.forEach(cr => {
                    if(cr.username.toLowerCase().includes(filter) || cr.name.toLowerCase().includes(filter) || this.$t("topbar.creator").toLowerCase().includes(filter)) this.searchResults.push(cr);
                });

                this.courses.forEach(co => {
                    if(co.name.toLowerCase().includes(filter) || co.category.toLowerCase().includes(filter) || this.$t("topbar.course").toLowerCase().includes(filter)) this.searchResults.push(co);
                });
            }
        },
        goToSearchItem() {
            let filter = this.$refs.topSearchbar.value.toLowerCase();

            this.creators.forEach(c => {
                if(c.name.toLowerCase() == filter || c.username.toLowerCase() == filter) {
                    this.$router.push({ name: 'Perfil do Utilizador', params: { id: c.id, locale: Tr.guessDefaultLocale() } });
                }
            });

            this.courses.forEach(c => {
                if(c.name.toLowerCase() == filter) {
                    this.$router.push({ name: 'Curso', params: { id: c.id, locale: "?" } });
                }
            });
        }
    }
}
</script>
 
<style scoped>
    .topbar-text {
        display: flex;
        gap: 6px;
    }

    .topbar-text p {
        color: var(--primary) !important;
        font-size: 24px;
        font-weight: 500;
    }

    .searchbar-container {
        position: relative;
    }

    .searchbar {
        background-color: var(--mobalytics-card);
        padding: 6px 16px 6px 20px;
        align-items: center;
        display: flex;
        gap: 12px;
        border-radius: 20px;
        font-family: "Poppins";
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .searchbar input {
        background: none;
        border: none;
        color: var(--light) !important;
        font-family: "Poppins";
        width: 400px;
    }

    .searchbar input::placeholder {
        color: var(--light);
    }

    .searchbar input:focus {
        outline: none;
    }

    .search-icon {
        font-size: 28px;
        color: var(--light);
    }

    .searchbar-results {
        position: absolute;
        left: 0px;
        top: 56px;
        width: 100%;
        max-height: 500px;
        border-radius: 8px;

        overflow-y: scroll;

        background-color: var(--mobalytics-back);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .searchbar-results::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .searchbar-results::-webkit-scrollbar-thumb {
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .searchbar-results .no-results {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 16px;
        gap: 16px;
    }

    .searchbar-results .no-results p {
        margin: 0px;
    }

    .notif-container {
        height: 30px;

        cursor: pointer;
    }

    .notif-icon {
        position: relative;
        font-size: 28px;
        color: var(--light);
    }

    .unread {
        animation: tilt-shaking 0.3s infinite;
    }

    @keyframes tilt-shaking {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(10deg); }
        50% { transform: rotate(0eg); }
        75% { transform: rotate(-10deg); }
        100% { transform: rotate(0deg); }
    }

    .notif {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: red;

        border: 2px solid var(--dark);

        position: absolute;
        bottom: 0px;
        right: 0px;
    }

    .notif-list {
        position: absolute;
        top: 100px;
        right: 40px;

        max-height: 400px;
        width: 400px;
        border-radius: 8px;

        background-color: var(--mobalytics-back);
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;

        overflow-y: scroll;
        overflow-x: hidden;
    }
    
    .notif-list::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .notif-list::-webkit-scrollbar-thumb {
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .notif-list .no-notifications {
        padding: 24px 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
    }

    .wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
	    background-color: var(--mobalytics-susge);

        padding: 8px 24px;
        
        width: 100%;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .wrapper p {
        color: var(--light);
        margin-bottom: 0px;
        font-family: "Poppins";
    }

    .wrapper .topbar-text {
        padding: 2px 0px;
        border-radius: 8px;
    }

    .wrapper .topbar-right {
        display: flex;
        align-items: center;
        gap: 36px;
    }

    .user-wrapper {
        display: flex;
        gap: 24px;
        align-items: center;
    }

    .image-wrapper {
        border-radius: 50%;
        border: var(--mobalytics-back) 4px solid;

        height: 50px;
        width: 50px;
    }

    #profile-image {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        object-fit: cover;
    }

    .topbar-btn p {
        font-size: 22px;
        color: var(--primary);
    }

    @media (max-width: 1500px) {
		.topbar-text-logged .logo  {
			display: none;
		}	

        .topbar-text .hifen {
            display: none;
        }

        .topbar-text-not-logged .page-name {
            display: none;
        }
	}

    @media (max-width: 1350px) {
		.user-wrapper .username {
			display: none;
		}	
	}

    @media (max-width: 1350px) {
		.searchbar input {
			width: 300px;
		}	
	}

    @media (max-width: 1150px) {
		.wrapper .topbar-text-logged {
			display: none;
		}	
	}

    @media (max-width: 800px) {
		.searchbar input {
			width: 250px;
		}	

        .notif-list {
            right: 16px;
        }
	}

    @media (max-width: 750px) {
		.searchbar input {
			width: 200px;
		}	
	}

    @media (max-width: 700px) {
        .topbar-right .topbar-btn:first-child {
            display: none;
        }
    }

    @media (max-width: 600px) {
        .searchbar input {
			width: 160px;
		}	

        .notif-list {
            right: 8px;
        }

        .wrapper {
            padding: 12px 14px;
        }

		.user-wrapper {
			display: none;
		}	
	}

    @media (max-width: 550px) {
        .wrapper .topbar-text-not-logged {
			display: none;
		}	
    }

    @media (max-width: 500px) {
		.notif-list {
			width: 300px;
		}	
	}
</style>