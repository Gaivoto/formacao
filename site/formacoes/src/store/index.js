import Vuex from 'vuex'

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
        },
        setAccessToken(state, token){
            state.tokens.accessToken = token;
        },
        setRefreshToken(state, token){
            state.tokens.refreshToken = token;
        }
    }
})

export default store