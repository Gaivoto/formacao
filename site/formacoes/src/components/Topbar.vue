<template>
    <div class="topBar"> 
        <div class="logo">
            <router-link class="topBarButton" to="/">
                <span class="text">Formação Johnson</span>
            </router-link>

        </div>
        <div class="rightSide">
            <router-link class="topBarButton" to="/">
                <span class="text">Cursos</span>
            </router-link>

            <input class="searchBox" type="text" placeholder="Pesquisar cursos..."/>
            <router-link class="topBarButton" to="/">
                <span class="text">Login</span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.topBar {
    width: 100%;
    height: fit-content;
    padding-top: 22px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
}
.logo {
    font-size: 35px;
}
.rightSide {
    width: 400px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
}
.topBarButton {
    text-decoration: none;
}
</style>
