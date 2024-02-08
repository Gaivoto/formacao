<template>
</template>

<script>
import Tr from '@/i18n/translation.js'

export default {
    name: "Analytics",
    data() {
        return {

        }
    },
    setup() {
        return { Tr };
    },
    created() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "Login", params: { locale: Tr.guessDefaultLocale() } });
        } else if(this.$store.getters.getUser.type != 'creator' || this.$store.getters.getUser.id != this.$route.params.id) {
            alert(Tr.guessDefaultLocale())
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
        }
    }
}
</script>

<style scoped>
</style>