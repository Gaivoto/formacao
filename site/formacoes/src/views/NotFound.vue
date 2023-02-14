<template>
  <div></div>
</template>

<script>
export default {
    name: 'NotFound',
    created() {
        if(this.$store.getters.getUser.id) this.$router.push({ name: 'Home' });
        else this.$router.push({ name: 'Landing' });
    }
}
</script>

<style>

</style>