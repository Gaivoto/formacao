<template>
    <div class="topBar"> 
        <div class="logo">
            <router-link class="topBarButton" to="/">
                <span class="text">Formação Johnson</span>
            </router-link>

        </div>
        <div class="rightSide">
            <router-link class="topBarButton" to="/">
                <span class="text">Cursos</span>
            </router-link>

            <div class="notif-container" v-on:click="toggleNotifs">
                <span class="material-icons notif-icon">notifications<div :class="{ notif: showNotif }"></div></span>
            </div>

            <input type="text" placeholder="Pesquisar cursos..."/>
            <router-link class="topBarButton" to="/">
                <span class="text">Login</span>
            </router-link>
        </div>
        <div ref="notifList" class="notif-list d-none">
            <NotificationListItem v-for="notif in this.notifications" :key="notif.id" v-bind:notification="notif"/>
        </div>
    </div>
</template>

<script>
import NotificationListItem from '../NotificationListItem.vue'

export default {
    name: "TopbarLandingPage",
    components: {
        NotificationListItem
    },
    data() {
        return {
            notifications: []
        }
    },
    created() {
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
        ]
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
.notif-container {
    height: 32px;

    cursor: pointer;
}

.notif-icon {
	position: relative;
	font-size: 2rem;
}

.notif {
	width: 14px;
	height: 14px;
	border-radius: 50%;
	background-color: red;

	border: 2px solid white;

	position: absolute;
	bottom: 0px;
	right: 0px;
}

.notif-list {
    position: absolute;
    top: 84px;
    right: 280px;

    max-height: 400px;
    width: 300px;

    background-color: lightblue;

    padding: 8px;

    overflow-y: scroll;
    overflow-x: hidden;
}

.topBar {
    width: 100%;
    height: fit-content;
    padding: 20px 80px 10px 80px;
    display: flex;
    justify-content: space-between;
}
.logo {
    font-size: 35px;
}
.rightSide {
    gap: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
}
.topBarButton {
    text-decoration: none;
}
</style>
