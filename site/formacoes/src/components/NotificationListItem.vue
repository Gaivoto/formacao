<template>
    <div class="notification-wrapper" v-on:mouseenter="toggleBack" v-on:mouseleave="toggleBack" :class="{ notifBack: showBack }">
        <div>
            <img :src="this.imageUrl">
            <p>{{ this.notification.message }}</p>    
        </div>
        <p>{{  this.notification.date }}</p>
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