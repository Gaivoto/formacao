<template>
    <div class="topbar-wrapper">
        <div class="topbar"> 
            <div class="logo">
                <img src="../../assets/vue.svg">
                <p class="text">Formação Johnson</p>
            </div>
            <div class="right-side">
                <p class="text">Acerca de nós</p>
                <p class="text">Como começar</p>
                <router-link class="topbar-btn" to="/courses">
                    <p class="text">Cursos</p>
                </router-link>
                <router-link class="topbar-btn" to="/login">
                    <p class="text">Login</p>
                </router-link>
            </div>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "TopbarLandingPage",
}
</script>

<style scoped>
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
</style>
