<template>
    <div class="notification-wrapper">
        <img :src="this.imageUrl">
        <p>{{ this.notification.message }}</p>
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
            imageUrl: ""
        }
    },
    created(){
        this.imageUrl = new URL(`../assets/${this.notification.image}.jpg`, import.meta.url).href;
    }
}
</script>

<style scoped>
    .notification-wrapper {
        display: flex;
        gap: 16px;
        padding: 8px;
        margin: 8px 0px;

        background-color: grey;
    }

    .notification-wrapper img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border-radius: 50%;
    }
</style>