import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

const store = new Vuex.Store({
    state: {
        user: {
        },
        tokens: {
            accessToken: "",
            refreshToken: ""
        },
        locale: "pt"
    },
    getters: {
        getUser(state){
            return state.user;
        },
        getAccessToken(state) {
            return state.tokens.accessToken;
        },
        getRefreshToken(state) {
            return state.tokens.refreshToken;
        },
        getLocale(state) {
            return state.locale;
        }
    },
    mutations: {
        setUser(state, user){
            state.user = user;
        },
        setAccessToken(state, token){
            state.tokens.accessToken = token
        },
        setRefreshToken(state, token){
            state.tokens.refreshToken = token;
        },
        setLocale(state, locale) {
            state.locale = locale;
        },
        resetUser(state) {
            state.user = {};
            state.tokens.refreshToken = "";
            state.tokens.accessToken = "";
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store