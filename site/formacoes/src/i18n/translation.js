import i18n from "@/i18n"
import store from '../store/index.js'

const Trans = {
    get defaultLocale() {
        return import.meta.env.VITE_DEFAULT_LOCALE;
    },

    get supportedLocales() {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",");
    },

    get currentLocale() {
        return i18n.global.locale.value;
    },

    set currentLocale(newLocale) {
        i18n.global.locale.value = newLocale;
    },

    switchLanguage(newLocale) {
        Trans.currentLocale = newLocale;
        document.querySelector("html").setAttribute("lang", newLocale)
        store.commit('setLocale', newLocale);
    },

    isLocaleSupported(locale) {
        return Trans.supportedLocales.includes(locale);
    },

    getUserLocale() {
        const locale = window.navigator.language || window.navigator.userLanguage || Trans.defaultLocale;

        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getPersistedLocale() {
        const persistedLocale = store.getters.getLocale;

        if(Trans.isLocaleSupported(persistedLocale)) {
            return persistedLocale;
        } else {
            return null;
        }
    },

    guessDefaultLocale() {
        const userPersistedLocale = Trans.getPersistedLocale();

        if(userPersistedLocale) {
            return userPersistedLocale;
        }

        const userPreferredLocale = Trans.getUserLocale();

        if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale;
        }

        if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion;
        }

        return Trans.defaultLocale;
    },

    async routeMiddleware(to, _from, next) {
        const paramLocale = to.params.locale

        if(!Trans.isLocaleSupported(paramLocale)) {
            return next(Trans.guessDefaultLocale())
        }

        Trans.switchLanguage(paramLocale)

        return next()
    },

    i18nRoute(to) {
        return {
            ...to,
            params: {
                locale: Trans.currentLocale,
                ...to.params
            }
        }
    }
}

export default Trans