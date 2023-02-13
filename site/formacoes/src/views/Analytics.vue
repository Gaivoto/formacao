<template>
</template>

<script>
export default {
    name: "Analytics",
    data() {
        return {

        }
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login" });
        } else if(this.$store.getters.getUser.type != 'creator' || this.$store.getters.getUser.id != this.$route.params.id) {
            this.$router.push({ name: "Home" });
        } else {
        }
    }
}
</script>

<style scoped>
</style>