<template>
    <div class="main-section-wrapper">
        <p>Titulo</p>
        <p class="primary">Formação</p>
        <p>Titulo 2</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod giat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
</template>

<script>
export default {
    name: "LandingPageMainSection"
}
</script>

<style>
    .main-section-wrapper {
        text-align: center;
        margin: 36px 0px 100px 0px;
    }

    .main-section-wrapper p {
        color: var(--light);
        font-size: 46px;
        margin-bottom: 12px;
    }

    .main-section-wrapper p.primary {
        color: var(--primary);
    }

    .main-section-wrapper p:last-child {
        color: var(--light);
        font-size: 24px;
        width: 50%;
        margin: auto;
        margin-top: 40px;
    }
</style>