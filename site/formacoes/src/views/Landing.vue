
<template>
    <div class="landing-page-wrapper">
        <TopbarLandingPage/>
        <div class="info-blocks-wrapper">
<<<<<<< HEAD
            <LandingPageInfoBlock class="landing-blocks" v-bind:imgPosition="side2" v-bind:picturePath="image1" v-bind:text="text1"/>
            <LandingPageInfoBlock class="landing-blocks" v-bind:imgPosition="side1" v-bind:picturePath="image2" v-bind:text="text2"/>
=======
            <h1>{{ $t("page.teste") }}</h1>
            <LanguageSwitcher></LanguageSwitcher>
            <LandingPageMainSection />
            <LandingPageInfoBlock v-for="ib in this.infoBlocks" :key="ib.id" class="landing-blocks" v-bind:info="ib" />
            <LandingPageSocials />
            <LandingPageGetStarted />
>>>>>>> origin/development
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
import LandingPageInfoBlock from '../components/landingPage/LandingPageInfoBlock.vue';
import TopbarLandingPage from '../components/landingPage/TopbarLandingPage.vue'

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
        TopbarLandingPage
    },

=======
import TopbarLandingPage from '../components/landingPage/TopbarLandingPage.vue';
import LandingPageInfoBlock from '../components/landingPage/LandingPageInfoBlock.vue';
import LandingPageSocials from '../components/landingPage/LandingPageSocials.vue';
import LandingPageGetStarted from '../components/landingPage/LandingPageGetStarted.vue';
import LandingPageMainSection from '../components/landingPage/LandingPageMainSection.vue';
import LanguageSwitcher from '../components/LanguageSwitcher.vue';
import Tr from '@/i18n/translation.js';

export default {
    name: "LandingPage",
    components: {
        TopbarLandingPage,
        LandingPageInfoBlock,
        LandingPageSocials,
        LandingPageGetStarted,
        LandingPageMainSection,
        LanguageSwitcher
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
    setup() {
        return { Tr };
    },
    created() {
        if(this.$store.getters.getUser.id) {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            
        }
    }
>>>>>>> origin/development
}
</script>

<style scoped>
    .landing-page-wrapper {
        margin-top: 0px;
    }
<<<<<<< HEAD
    .info-blocks-wrapper {
        padding: 0 10%;
=======

    .info-blocks-wrapper {
        padding: 130px 40px 24px 40px;
>>>>>>> origin/development
        width: 100%;
    }
</style>
