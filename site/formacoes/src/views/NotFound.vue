<template>
    <div></div>
</template>

<script>
import Tr from '@/i18n/translation.js';

export default {
    name: 'NotFound',
    created() {
        if(this.$store.getters.getUser.id) this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        else this.$router.push({ name: "Landing", params: { locale: Tr.guessDefaultLocale() } });
    },
    setup() {
        return { Tr };
    }
}
</script>

<style>

</style>