<template>
<<<<<<< HEAD
    <div class="topBar"> 
        <div class="logo">
            <img src="../../assets/vue.svg">
            <span class="text">Formação Johnson</span>
        </div>
        <div class="rightSide">
            <span class="text">Acerca de nós</span>
            <router-link class="topBarButton" to="/courses">
                <span class="text">Cursos</span>
            </router-link>
        </div>

        <router-link class="topBarButton" to="/login">
            <span class="text">Login</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "TopbarLandingPage",
    data() {
        return {
        }
    }
=======
    <div class="topbar-wrapper">
        <div class="topbar"> 
            <div class="logo">
                <img src="../../assets/vue.svg">
                <p class="text">Formação Johnson</p>
            </div>
            <div class="right-side">
                <p class="text">Acerca de nós</p>
                <p class="text">Como começar</p>
                <router-link class="topbar-btn" :to="Tr.i18nRoute({ name: 'Cursos', params: { locale: Tr.guessDefaultLocale() } })">
                    <p class="text">Cursos</p>
                </router-link>
                <router-link class="topbar-btn" :to="Tr.i18nRoute({ name: 'Login', params: { locale: Tr.guessDefaultLocale() } })">
                    <p class="text">Login</p>
                </router-link>
            </div>
        </div>
    </div>
    
</template>

<script>
import Tr from '@/i18n/translation.js'
export default {
    name: "TopbarLandingPage",
    setup() {
        return { Tr };
    },
>>>>>>> origin/development
}
</script>

<style scoped>
<<<<<<< HEAD

.topBar {
    width: 100%;
    height: fit-content;
    padding: 20px 80px 10px 80px;
    display: flex;
    justify-content: space-between;
}
.logo {
    font-size: 35px;
}
.rightSide {
    gap: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
}
.topBarButton {
    text-decoration: none;
}
=======
    .topbar-wrapper {
		position: fixed;
		padding: 16px 32px 8px 32px;
		z-index: 1;
		width: 100%;
		background: var(--mobalytics-back);
    }
    
    .topbar {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
	    background-color: var(--mobalytics-susge);

        padding: 16px 40px;
        
        width: 100%;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .topbar p {
        color: var(--light);
        margin-bottom: 0px;
        font-family: "Poppins";
        font-size: 24px;
    }

    .logo {
        display: flex;
        gap: 24px;
    }

    .logo .text {
        color: var(--primary) !important;
    }

    .right-side {
        gap: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 30px;
    }

    .right-side .topbar-btn p:hover {
        color: var(--primary);
    }
>>>>>>> origin/development
</style>
