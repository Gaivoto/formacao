<template>
    <div class="wrapper">
        <div class="topbar-text">
            <p class="page-name">{{ this.$route.name }}</p>
        </div>

        <div class="searchbar-container">
            <div class="searchbar">
                <input type="text" placeholder="Pesquisar...">
                <span class="material-icons search-icon">search</span>
            </div> 
            <div class="searchbar-results">
                <div class="no-results">
                    <span class="material-icons search-icon">warning</span>
                    <p>Não existem resultados para a pesquisa.</p>    
                </div>
            </div>  
        </div>

        <div class="topbar-right">
            <router-link class="user-wrapper" :to="{ name: 'Perfil do Utilizador', params: { id: 1 } }">
                <div class="topbar-text">
                    <p>{{ this.user.username }}</p>
                </div>
                <div class="image-wrapper">
                    <img id="profile-image" :src="this.imageUrl" />    
                </div>
            </router-link>
            <div class="notif-container" v-on:click="toggleNotifs">
                <span class="material-icons notif-icon" :class="{ unread: showNotif }">notifications<div :class="{ notif: showNotif }"></div></span>
            </div>
        </div>

        <div ref="notifList" class="notif-list d-none">
            <NotificationListItem v-for="notif in this.notifications" :key="notif.id" v-bind:notification="notif"/>
        </div>
    </div>
</template>

<script>
import NotificationListItem from './NotificationListItem.vue'

export default {
    name: "Topbar",
    components: {
        NotificationListItem
    },
    props: {
        user: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            user: {},
            imageUrl: "",
            notifications: []
        }
    },
    created() {
        this.user.username = "Amogus Sus";
        this.user.name = "Bruh ?";
        this.user.country = "Portugal";
        this.user.description = "Boa descrição bruvkek";
        this.user.image = "bingus";

        this.notifications = [
            {
                id: 1,
                image: "bingus",
                message: "notificação 1",
                read: true,
                date: "12/12/2022 13:45"
            },
            {
                id: 2,
                image: "bingus",
                message: "notificação 2",
                read: false,
                date: "12/12/2022 13:45"
            },
            {
                id: 3,
                image: "bingus",
                message: "notificação 3",
                read: false,
                date: "12/12/2022 13:45"
            },
            {
                id: 4,
                image: "bingus",
                message: "asdf asdfiojo is sdfiojo is qwie dqwd diassdfiojo is qwie dqwd diasqwie dqwd dias iuhdf iqwe ask",
                read: true,
                date: "12/12/2022 13:45"
            },
            {
                id: 5,
                image: "bingus",
                message: "notificação 3",
                read: false,
                date: "12/12/2022 13:45"
            },
            {
                id: 6,
                image: "bingus",
                message: "asdf asdfiojo is sdfiojo is qwie dqwd diassdfiojo is qwie dqwd diasqwie dqwd dias iuhdf iqwe ask",
                read: true,
                date: "12/12/2022 13:45"
            }
        ];
        
        this.imageUrl = new URL(`../assets/${this.user.image}.jpg`, import.meta.url).href;
    },
    computed: {
        showNotif() {
			let unread = false;

			this.notifications.forEach(notif => {
				if(!notif.read) unread = true;
			});

			return unread;
		}
    },
    methods: {
        toggleNotifs() {
            this.$refs.notifList.classList.toggle("d-none");

            this.notifications.forEach(n => n.read = true);
        }
    }
}
</script>
 
<style scoped>
    .page-name {
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
        color: white !important;
        font-family: "Poppins";
        min-width: 300px;
    }

    .searchbar input::placeholder {
        color: white;
    }

    .searchbar input:focus {
        outline: none;
    }

    .search-icon {
        font-size: 28px;
        color: white;
    }

    .searchbar-results {
        position: absolute;
        left: 0px;
        top: 56px;
        width: 100%;
        padding: 16px;
        border-radius: 8px;

        background-color: var(--mobalytics-back);
    }

    .searchbar-results .no-results {
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        width: 8px;
        height: 8px;
        background: var(--mobalytics-back);
        border-radius: 0px 8px 8px 0px;
    }

    .notif-list::-webkit-scrollbar-thumb {
        background: var(--mobalytics-card);
        border-radius: 8px;
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
</style>