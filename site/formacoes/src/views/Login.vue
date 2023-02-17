<template>
    <div ref="mycontainer" class="login-container">
        <div class="forms-container">
            <div class="signin-signup">
                <!--Login Form-->
                <div class="sign-in-form form">
                    <h2 class="title">Iniciar Sessão</h2>
                    <div class="input-field">
                        <span class="material-icons">person</span>
                        <input ref="loginUsername" type="text" placeholder="Nome de Utilizador" />
                    </div>
                    <div class="input-field">
                        <span class="material-icons">lock</span>
                        <input ref="loginPassword" type="password" placeholder="Palavra-Passe" />
                    </div>
                    <input v-on:click="login" type="submit" value="Entrar" class="btn solid" />
                </div>
                <!--Registo Form-->
                <div class="sign-up-form form">
                    <h2 class="title">Criar Conta</h2>
                    <div class="input-field">
                        <span class="material-icons">person</span>
                        <input ref="registerUsername" type="text" placeholder="Nome de Utilizador" />
                    </div>
                    <div class="input-field">
                        <span class="material-icons">mail</span>
                        <input ref="registerEmail" type="email" placeholder="E-mail" />
                    </div>
                    <div class="input-field">
                        <span class="material-icons">lock</span>
                        <input ref="registerPassword" type="password" placeholder="Palavra-Passe" />
                    </div>
                    <input v-on:click="register" type="submit" class="btn" value="Registar" />
                </div>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>Novo aqui ?</h3>
                    <p>
                    Crie já uma conta e venha conhecer os nossos cursos.
                    </p>
                    <button v-on:click="signupbtn" ref="signupbtn" class="btn transparent bruv" id="sign-up-btn">
                    Criar Conta
                    </button>
                </div>
                <img src="../assets/loginimg2.svg" class="image boneco-left" :class="{ 'hidden': !this.loginMode }" alt="" />
            </div>

            <div class="panel right-panel">
                <div class="content">
                    <h3>Já tem conta ?</h3>
                    <p>
                    Faça inicio de sessão com a sua conta existente e venha aprender.
                    </p>
                    <button v-on:click="signinbtn" ref="signinbtn" class="btn transparent bruv" id="sign-in-btn">
                    Iniciar Sessão
                    </button>
                </div>
                <img src="../assets/loginimg3.svg" class="image boneco-right" :class="{ 'hidden': this.loginMode }" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Tr from '@/i18n/translation.js';

export default {
    name: "Login",
    data() {
        return {
            state: "login"
        }
    },
    setup() {
        return { Tr };
    },
    created() {
        if(this.$store.getters.getUser.id) {
            this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
        } else {
            window.addEventListener('keydown', (e) => {
                if(e.key == 'Enter' && this.state == 'login') this.login();
            });
        }
    },
    computed: {
        loginMode() {
            if(this.state == "login") return true;
            return false;
        }
    },
    methods: {
        signupbtn() {
            this.state = "registo"
            this.$refs.mycontainer.classList.add("sign-up-mode");
        },
        signinbtn() {
            this.state = "login"
            this.$refs.mycontainer.classList.remove("sign-up-mode");  
        },
        login() {
            if(this.$refs.loginUsername.value != "" && this.$refs.loginPassword.value != "") {
                axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_HOST}/auth/login`,
                    data: {
                        username: this.$refs.loginUsername.value,
                        password: this.$refs.loginPassword.value
                    }
                })
                .then(value => {
                    this.$store.commit('setUser', value.data.user);
                    this.$store.commit('setRefreshToken', value.data.refresh_token);
                    this.$store.commit('setAccessToken', value.data.access_token);
                    this.$router.push({ name: "Home", params: { locale: Tr.guessDefaultLocale() } });
                })
                .catch(error => {
                    if(error.code) {
                        console.log(error.response.data);
                        this.$emit("open-modal", error.response.data.message);
                    } else console.log(error);
                });
                } else {
                    this.$emit("open-modal", "Password/username vazios.");
                }
        },
        register() {
            if(this.$refs.registerUsername.value == "" || this.$refs.registerPassword.value == "" || this.$refs.registerEmail.value == "") {
                this.$emit("open-modal", "Preencha todos os campos para efetuar registo.");
            } else if(!this.$refs.registerEmail.value.includes('@')) {
                this.$emit("open-modal", "O email deve ser válido.");
            } else {
                axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_HOST}/users/`,
                    data: {
                        username: this.$refs.registerUsername.value,
                        password: this.$refs.registerPassword.value,
                        email: this.$refs.registerEmail,
                        name: "User X",
                        description: "",
                        image: "image/default"
                    }
                })
                .then(value => {
                    this.$emit("open-modal", value.data.message);
                    this.signinbtn();
                })
                .catch(error => {
                    if(error.code) {
                        console.log(error.response.data);
                        this.$emit("open-modal", error.response.data.message);
                    } else console.log(error);
                });
            }
        }
    }
}

</script>

<style scoped>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    h2, input {
        font-family: "Poppins", sans-serif !important;
    }

    .content {
        margin: 50px 50px 0 0;
    }

    .login-container {
        position: relative;
        width: 100%;
        background-color: var(--light);
        min-height: 100vh;
        overflow: hidden;
    }

    .forms-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .signin-signup {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 75%;
        width: 50%;
        transition: 1s 0.7s ease-in-out;
        display: grid;
        grid-template-columns: 1fr;
        z-index: 5;
    }

    .form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0rem 5rem;
        transition: all 0.2s 0.7s;
        overflow: hidden;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    .form.sign-up-form {
        opacity: 0;
        z-index: 1;
    }

    .form.sign-in-form {
        z-index: 2;
    }

    .title {
        font-size: 2.2rem;
        color: var(--mobalytics-susge);
        margin-bottom: 10px;
    }

    .input-field {
        max-width: 380px;
        width: 100%;
        background-color: #EEEEEE;
        margin: 10px 0;
        height: 55px;
        border-radius: 55px;
        display: grid;
        grid-template-columns: 15% 85%;
        padding: 0 0.4rem;
        position: relative;
        text-align: center;
        align-items: center;
    }

    .input-field i {
        text-align: center;
        line-height: 55px;
        color: #222831;
        transition: 0.5s;
        font-size: 1.1rem;
    }

    .input-field input {
        background: none;
        outline: none;
        border: none;
        line-height: 1;
        font-weight: 600;
        font-size: 1.1rem;
        color: #393E46;
    }

    .input-field:hover{
        box-shadow: 0 0 0 2px var(--mobalytics-susge);
    }

    .input-field input::placeholder {
        color: #aaa;
        font-weight: 500;
    }

    .input-field .material-icons {
        color: var(--mobalytics-card);
        font-size: 26px;
    }

    .social-text {
        padding: 0.7rem 0;
        font-size: 1rem;
    }

    .social-media {
        display: flex;
        justify-content: center;
    }

    .social-icon {
        height: 46px;
        width: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.45rem;
        color: #333;
        border-radius: 50%;
        border: 1px solid #333;
        text-decoration: none;
        font-size: 1.1rem;
        transition: 0.3s;
    }

    .social-icon:hover {
        color: #00ADB5;
        border-color: #00ADB5;
    }

    .btn {
        width: 150px;
        background-color: var(--mobalytics-back);
        border: none;
        outline: none;
        height: 49px;
        border-radius: 49px;
        color: var(--light);
        text-transform: uppercase;
        font-weight: 600;
        margin: 10px 0;
        cursor: pointer;
        transition: 0.5s;
    }

    .btn:hover {
        color: var(--mobalytics-susge);
        background-color: var(--light);
        border: 1px solid var(--mobalytics-susge);
    }

    .bruv {
        color: var(--light) !important; 
        transition: 0.5s;
    }

    .bruv:hover {
        transform: scale(1.05);
        transition: 0.5s;
        color: var(--light) !important; 
    }

    .panels-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .login-container:before {
        content: "";
        position: absolute;
        height: 3000px;
        width: 3000px;
        top: -10%;
        right: 48%;
        transform: translateY(-50%);
        background: var(--mobalytics-card);
        transition: 1s ease-in-out;
        border-radius: 50%;
        z-index: 6;
    }

    .image {
        width: 70%;
        -webkit-transition: opacity 0.8s linear 1s;
        -moz-transition: opacity 0.8s linear 1s;
        -ms-transition: opacity 0.8s linear 1s;
        -o-transition: opacity 0.8s linear 1s;
        transition: opacity 0.8s linear 1s;
        opacity: 1;
    }

    .hidden {
        -webkit-transition: opacity 0s linear;
        -moz-transition: opacity 0s linear;
        -ms-transition: opacity 0s linear;
        -o-transition: opacity 0s linear;
        transition: opacity 0s linear;
        opacity: 0;
    }

    .boneco-left {
        transform: scale(-1, 1);
        margin-right: -25%;
    }

    .boneco-right {
        margin-right: 45%;
    }

    .panel {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        text-align: center;
        z-index: 6;
    }

    .left-panel {
        pointer-events: all;
        padding: 3rem 17% 2rem 12%;
    }

    .right-panel {
        pointer-events: none;
        padding: 3rem 12% 2rem 17%;
    }

    .panel .content {
        color: var(--light);
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 2.2rem;
    }

    .panel p {
        font-size: 1.3rem;
        padding: 0.7rem 0;
    }

    .btn.transparent {
        margin: 0;
        background: none;
        border: 2px solid var(--light);
        width: 130px;
        height: 41px;
        font-weight: 600;
        font-size: 0.8rem;
    }

    .right-panel .image, .right-panel .content {
        transform: translateX(800px);
    }

    /* ANIMATION */

    .login-container.sign-up-mode:before {
        transform: translate(100%, -50%);
        right: 52%;
    }

    .login-container.sign-up-mode .left-panel .image, .login-container.sign-up-mode .left-panel .content {
        transform: translateX(-800px);
    }

    .login-container.sign-up-mode .signin-signup {
        left: 25%;
    }

    .login-container.sign-up-mode .form.sign-up-form {
        opacity: 1;
        z-index: 2;
    }

    .login-container.sign-up-mode .form.sign-in-form {
        opacity: 0;
        z-index: 1;
    }

    .login-container.sign-up-mode .right-panel .image, .login-container.sign-up-mode .right-panel .content {
        transform: translateX(0%);
    }

    .login-container.sign-up-mode .left-panel {
        pointer-events: none;
    }

    .login-container.sign-up-mode .right-panel {
        pointer-events: all;
    }

    @media (max-width: 870px) {
        .login-container {
            min-height: 800px;
            height: 100vh;
        }

        .signin-signup {
            width: 100%;
            top: 95%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
        }

        .signin-signup, .login-container.sign-up-mode .signin-signup {
            left: 50%;
        }

        .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
        }

        .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
        }

        .right-panel {
            grid-row: 3 / 4;
        }

        .left-panel {
            grid-row: 1 / 2;
        }

        .image {
            width: 200px;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.6s;
            display: none;
        }

        .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
        }

        .panel h3 {
            font-size: 1.2rem;
        }

        .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
        }

        .btn.transparent {
            width: 110px;
            height: 35px;
            font-size: 0.7rem;
        }

        .login-container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        }

        .login-container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
        }

        .login-container.sign-up-mode .left-panel .image, .login-container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
        }

        .login-container.sign-up-mode .right-panel .image, .login-container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
        }

        .right-panel .image, .right-panel .content {
            transform: translateY(300px);
        }

        .login-container.sign-up-mode .signin-signup {
            top: 5%;
            transform: translate(-50%, 0);
        }

        .content {
            margin-right: 0px;
        }
    }

    @media (max-width: 570px) {
        .form {
            padding: 0 1.5rem;
        }

        .image {
            display: none;
        }

        .panel .content {
            padding: 0.5rem 1rem;
        }

        .login-container {
            padding: 1.5rem;
        }

        .login-container:before {
            bottom: 72%;
            left: 50%;
        }

        .login-container.sign-up-mode:before {
            bottom: 28%;
            left: 50%;
        }
    }
</style>