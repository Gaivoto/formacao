
<template>
    <div class="landing-page-wrapper">
        <TopbarLandingPage/>
        <div class="info-blocks-wrapper">
            <LandingPageMainSection />
            <LandingPageInfoBlock v-for="ib in this.infoBlocks" :key="ib.id" class="landing-blocks" v-bind:info="ib" />
            <LandingPageSocials />
            <LandingPageGetStarted />
        </div>
    </div>
</template>

<script>
import TopbarLandingPage from '../components/landingPage/TopbarLandingPage.vue';
import LandingPageInfoBlock from '../components/landingPage/LandingPageInfoBlock.vue';
import LandingPageSocials from '../components/landingPage/LandingPageSocials.vue';
import LandingPageGetStarted from '../components/landingPage/LandingPageGetStarted.vue';
import LandingPageMainSection from '../components/landingPage/LandingPageMainSection.vue';

export default {
    name: "LandingPage",
    components: {
        TopbarLandingPage,
        LandingPageInfoBlock,
        LandingPageSocials,
        LandingPageGetStarted,
        LandingPageMainSection
    },
    data() { 
        return {
            infoBlocks: [
                {
                    id: 1,
                    title: "section 1 title title",
                    side: "right",
                    image: "placeholder",
                    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    id: 2,
                    title: "section 2 title title",
                    side: "left",
                    image: "placeholder",
                    text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }
            ]
        }
    },
    created() {
        if(this.$store.getters.getUser.id) {
            this.$router.push({ name: "Home" });
        } else {
            
        }
    }
}
</script>

<style scoped>
    .landing-page-wrapper {
        margin-top: 0px;
    }

    .info-blocks-wrapper {
        padding: 130px 40px 24px 40px;
        width: 100%;
    }
</style>
