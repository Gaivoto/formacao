<template>
    <div v-on:click="close" class="modal-wrapper" id="modalWrapper">
        <div>
            <p>{{ $t(`errors.${this.msg}`) }}</p>
            <button id="closeWrapper">{{ $t("errors.close") }}</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageModal',
    props: {
        msg: {
            type: String,
            required: true
        }
    },
    computed: {
        getTranslatedMessage() {
            switch(this.msg) {

            }
        }
    },
    methods: {
        close(e){
            if(e.target.id == "modalWrapper" || e.target.id == "closeWrapper"){
                this.$emit('close-modal');
            }
        }
    }
}
</script>

<style scoped>
    .modal-wrapper {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(60, 60, 60, 0.8);
        z-index: 10;
    }

    .modal-wrapper > div {
        background-color: var(--mobalytics-card);
        width: 380px;
        padding: 40px;
        margin: auto;
        margin-top: 100px;
        border-radius: 8px;
        align-content: center;
        text-align: center;
    }

    .modal-wrapper p {
        color: var(--light);
        font-size: 22px;
        margin-bottom: 32px;
    }

    .modal-wrapper button {
        background: var(--mobalytics-back);
        color: var(--light);
        height: 50px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
    }
</style>