<template>
    <div class="get-started-wrapper">
        <p>Como começar</p>
        <div>
            <div>
                <div>
                    <p>1</p>
                    <p>Crie uma conta ou faça login</p>
                </div>
                <p>Para começar a utilizar a nossa plataforma é necessário que tenha uma conta. Registe-se ou se já tem uma conta faça login.</p>
                <router-link to="/login">
                    <button>Login</button>
                </router-link>
            </div>
            <div>
                <div>
                    <p>2</p>
                    <p>Escolha um curso</p>
                </div>
                <p>Após ter feito login é lhe disponibilizada uma diversidade de cursos. Procure os que mais lhe interessam, escolha um e siga para o próximo passo.</p>
                <router-link to="/courses">
                    <button>Cursos</button>
                </router-link>
            </div>
            <div>
                <div>
                    <p>3</p>
                    <p>Compre o curso</p>
                </div>
                <p>Depois de escolher um curso ou criador para subscrever siga para o pagamento do mesmo de forma simples, rápida e segura, para obter acesso total ao conteúdo do curso.</p>
                <router-link to="/courses">
                    <button>Cursos</button>
                </router-link>
            </div>    
        </div>
    </div>
</template>

<script>
export default {
    name: "LandingPageGetStarted"
}
</script>

<style>
    .get-started-wrapper > p {
        font-size: 32px;
        margin-bottom: 20px;
        color: var(--primary);
    }

    .get-started-wrapper > div {
        display: flex;
        justify-content: space-between;
        gap: 16px;
    }

    .get-started-wrapper > div > div {
        position: relative;
        background-color: var(--mobalytics-card);
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 0px;
        padding: 16px 24px;
        width: 32%;
    }

    .get-started-wrapper > div > div > div {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
    }

    .get-started-wrapper > div > div > div > p:first-child {
        background-color: var(--primary);
        border-radius: 8px;
        color: var(--light);
        text-align: center;
        padding: 4px 12px;
        margin-bottom: 0px;
    }

    .get-started-wrapper > div > div > div > p:last-child {
        color: var(--light);
        margin-bottom: 0px;
    }

    .get-started-wrapper > div > div p {
        color: var(--light);
        margin-bottom: 60px;
    }

    .get-started-wrapper button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 40px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
        margin: auto;
        position: absolute;
        bottom: 16px;
        left: 24px;
    }
</style>