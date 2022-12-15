<template>
    <div class="topBar"> 
        <div class="logo">
            <router-link class="topBarButton" to="/">
                <span class="text">Formação Johnson</span>
            </router-link>
        </div>
        <div class="rightSide">
            <router-link class="topBarButton" to="/courses">
                <span class="text">Cursos</span>
            </router-link>

            <input type="text" placeholder="Pesquisar cursos..."/>
            <router-link class="topBarButton" to="/login">
                <span class="text">Login</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopbarLandingPage",
    data() {
        return {
        }
    }
}
</script>

<style scoped>

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
</style>
