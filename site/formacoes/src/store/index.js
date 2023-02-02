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
        }
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
        }
    },
    mutations: {
        setUser(state, user){
            state.user = user;
            console.log("a")
            console.log(state.user)
        },
        setAccessToken(state, token){
            state.tokens.accessToken = token;
        },
        setRefreshToken(state, token){
            state.tokens.refreshToken = token;
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store