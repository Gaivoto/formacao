<template>
    <div class="wrapper">
        <div class="topbar-text">
            <p class="page-name">{{ this.$route.name }}</p>
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
                read: true
            },
            {
                id: 2,
                image: "bingus",
                message: "notificação 2",
                read: false
            },
            {
                id: 3,
                image: "bingus",
                message: "notificação 3",
                read: false
            },
            {
                id: 4,
                image: "bingus",
                message: "asdf asdfiojo is qwie dqwd dias iuhdf iqwe ask",
                read: true
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
        color: var(--light);
        font-size: 24px;
        font-weight: 500;
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
        top: 84px;
        right: 8px;

        max-height: 400px;
        width: 300px;

        background-color: lightblue;

        padding: 8px;

        overflow-y: scroll;
        overflow-x: hidden;
    }

    .wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
	    background-color: var(--dark);

        padding: 8px 24px;
        
        width: 100%;
        border-radius: 8px;
        box-shadow: 2px 2px 2px var(--primary-alt);
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
        border: 2px solid var(--primary);

        height: 50px;
        width: 50px;

        padding: 2px;
    }

    #profile-image {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        object-fit: cover;
    }
</style>