<template>
    <div class="notification-wrapper" v-on:mouseenter="toggleBack" v-on:mouseleave="toggleBack" :class="{ notifBack: showBack }">
        <div>
            <img :src="this.imageUrl">
            <p>{{ this.notificationMessage }}</p>    
        </div>
        <p>{{ this.formatedDate }}</p>
    </div>
</template>

<script>
export default {
    name: 'NotificationListItem',
    props: {
        notification: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            imageUrl: "",
            showBack: false
        }
    },
    created(){
        this.imageUrl = new URL(`../assets/${this.notification.image}.jpg`, import.meta.url).href;
    },
    computed: {
        formatedDate() {
            return this.notification.date.substring(11, 19) + " " + this.notification.date.substring(8, 10) + "/" + this.notification.date.substring(5, 7) + "/" + this.notification.date.substring(0, 4);
        },
        notificationMessage() {
            if(this.$store.getters.getUser.id == this.notification.id_creator) {
                if(this.notification.id_video == null){
                    return this.notification.message = "O estado do Curso: " + this.notification.course_name + " foi alterado para " + this.notification.change_state.toLowerCase(); + ".";
                } 
                else {
                    return this.notification.message = "O estado do vídeo " + this.notification.video_title + " foi alterado para " + this.notification.change_state.toLowerCase(); + ".";
                }
            }
            else {
                if(id_video == null) {
                    return this.notification.message = "O criador " + this.notification.creator_name + " postou um novo curso chamado " + this.notification.course_name; + "."
                } 
                else {
                    return this.notification.message = "O criador " + this.notification.creator_name + " postou um novo vídeo chamado" + this.notification.video_title + " no curso " + this.notification.course_name + "."
                }
            }
        }
    },
    methods: {
        toggleBack() {
            this.showBack = !this.showBack;
        }
    }
}
</script>

<style scoped>
    .notification-wrapper {
        padding: 16px 12px;
    }

    .notifBack {
       background-color: var(--mobalytics-card); 
    }

    .notification-wrapper > div {
        display: flex;
        gap: 16px;
        margin-bottom: 12px;
    }

    .notification-wrapper img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 50%;
    }

    .notification-wrapper p {
        color: var(--light);
        margin: 0px;
    }

    .notification-wrapper > p {
        text-align: right;
        padding: 0px 12px;
    }
</style>