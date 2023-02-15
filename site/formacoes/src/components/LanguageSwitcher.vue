<template>
    <div class="custom-select">
        <div class="selected" :class="{ open: localeOpen }" v-on:click="localeOpen=!localeOpen">{{ this.currentLocale }}</div>
        <div class="items" :class="{ selectHide: !localeOpen }">
            <div v-for="locale in this.locales" :key="`locale-${locale}`" v-on:click="switchLanguage(locale)">{{ locale }}</div>
        </div>
    </div>  
</template>

<script>
import { useI18n } from 'vue-i18n'
import Tr from "@/i18n/translation"

export default {
    name: "LanguageSwitcher",
    data() {
        return {
            locales: [],
            currentLocale: Tr.guessDefaultLocale(),
            localeOpen: false
        }
    },
    created() {
        const { t, locale } = useI18n();
        this.locales = Tr.supportedLocales;

        return { t, locale }
    },
    methods: {
        async switchLanguage(newLocale) {
            this.localeOpen = false;

            Tr.switchLanguage(newLocale)
                .then(value => {
                    this.currentLocale = Tr.guessDefaultLocale();
                })
                .catch(error => {
                    console.log(error);
                });

            try {
                await this.$router.replace({ params: { locale: newLocale } })
            } catch(e) {
                console.log(e);
                this.$router.push("/");
            }
        },
        getCurrentLocale() {
            return this.$store.getters.getLocale;
        }
    }

    //t(`locale.${sLocale}`)
}
</script>

<style scoped>
    .custom-select {
        position: relative;
        width: 240px;
        text-align: left;
        height: 48px;
        line-height: 48px;
    }

    .custom-select .selected {
        background-color: var(--mobalytics-card);
        border-radius: 8px;
        color: var(--light);
        padding-left: 1em;
        cursor: pointer;
        margin-bottom: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .custom-select .selected:after {
        position: absolute;
        content: "";
        top: 22px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: var(--light) transparent transparent transparent;
    }

    .custom-select .items {
        color: var(--light);
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        background-color: var(--mobalytics-card);
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        max-height: 300px;
    }

    .custom-select .items::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .custom-select .items::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .custom-select .items div {
        padding-left: 1em;
        cursor: pointer;
    }

    .custom-select .items div:hover {
        background-color: var(--mobalytics-back);
    }

    .selectHide {
        display: none;
    }
</style>