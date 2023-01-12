<template>
    <div class="socials-wrapper">
        <div>
            <div>
                <img src="../../assets/facebook.svg">
                <div class="facebook">
                    <p>Follow us</p>
                    <p>Formação Johnson</p>
                </div>
            </div>
            <div>
                <img src="../../assets/instagram.svg">
                <div class="instagram">
                    <p>Follow us</p>
                    <p>Formação Johnson</p>
                </div>
            </div>
            <div>
                <img src="../../assets/twitter.svg">
                <div class="twitter">
                    <p>Follow us</p>
                    <p>Formação Johnson</p>
                </div>
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPageSocials"
}
</script>

<style>
    .socials-wrapper {
        margin-top: 120px;
        margin-bottom: 48px;
    }

    .socials-wrapper > div {
        display: flex;
        justify-content: space-between;
        margin: auto;
        width: 80%;
    }

    .socials-wrapper > div > div {
        display: flex;
    }

    .socials-wrapper > div > div > img {
        height: 80px; 
        width: 80px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 0px;
        margin-right: 12px;
        border-radius: 8px;
    }

    .socials-wrapper > div > div > div > p {
        color: var(--light);
        width: fit-content;
        margin-bottom: 0px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 0px;
    }

    .socials-wrapper > div > div > div > p:first-child {
        font-size: 14px;
        padding: 4px 18px 4px 12px;
        margin-bottom: 6px;
        border-radius: 4px 100px 4px 4px;
    }

    .socials-wrapper > div > div > div > p:last-child {
        font-size: 24px;
        padding: 4px 12px;
        border-radius: 4px;
    }

    .socials-wrapper .facebook > p {
        background-color: #3b5998;
    }

    .socials-wrapper .instagram > p {
        background-color: #7434a4;
    }

    .socials-wrapper .twitter > p {
        background-color: #2cace4;
    }
</style>