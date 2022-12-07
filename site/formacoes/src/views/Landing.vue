
<template>
<div class="landing-page-wrapper">
    <Topbar/>
    <div class="info-blocks-wrapper">
        <LandingPageInfoBlock class="landing-blocks" v-bind:imgPosition="side2" v-bind:picturePath="image1" v-bind:text="text1"/>
        <LandingPageInfoBlock class="landing-blocks" v-bind:imgPosition="side1" v-bind:picturePath="image2" v-bind:text="text2"/>
    </div>
</div>
</template>

<script>
import LandingPageInfoBlock from '../components/LandingPageInfoBlock.vue';
import Topbar from '../components/Topbar.vue'

export default {
    data: () => { 
        return {
            side1: 'left',
            side2: 'right',
            image1: 'src/assets/tomasGostosa.jpg',
            text1: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            image2: 'src/assets/andreDick.png',
            text2: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    },
    
    components: {
        LandingPageInfoBlock,
        Topbar
    },

}
</script>

<style scoped>
.landing-page-wrapper {
    width: 100%;
}
.info-blocks-wrapper {
    padding: 0 10%;
    width: 100%;
}

</style>
