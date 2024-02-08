<template>
  <div>
        <div>
            <div class="form-header">
                <div class="first-form">
                    <div class="titulo">
                        <p>Titulo</p>
                        <input type="text" autocomplete="off" name="username" id="username">
                    </div>
                    <div class="preco_cat">
                        <div class="preco">
                            <p>Preço</p>
                            <div class="preco_input">
                                <input type="number" autocomplete="off" name="name" id="name">
                                <p>€</p>
                            </div>
                        </div>
                        <div class="categoria">
                            <p>Categoria</p>
                            <div class="cat_combo">
                                <div class="custom-select">
                                    <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen">{{ this.state }}</div>
                                    <div class="items" :class="{ selectHide: !stateOpen }">
                                        <div v-on:click="selectState('Todas')">Todas</div>
                                        <div v-on:click="selectState('Manicure')">Manicure</div>
                                        <div v-on:click="selectState('Cabelo')">Cabelo</div>
                                        <div v-on:click="selectState('Cara')">Cara</div>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <div class="desc">
                    <p>Descrição</p>
                    <textarea name="description" id="description" cols="80" rows="5"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'courseinfo',
    data() {
        return {
            stateOpen: false,
            state: "Todas",
        }
    },
    methods: {
        selectState(state) {
            this.state = state;
            this.stateOpen = false;
        },
    }
}
</script>

<style>
.form-header{
    display: flex;
    justify-content: center;
    gap: 40px;
}

.desc {
    margin-left: 20px;
    color: white;
}
.desc > textarea {
    border: none;
    padding: 4px 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    width: 500px;
    height: 150px;
    color: var(--light);
    background-color: var(--mobalytics-back);
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
    resize: none;
}

.preco_cat {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

.titulo > p {
color: white;
}
.preco > p {
color: white;
}
.categoria > p {
    color: white;
}

.titulo > input {
    width: 500px;
    border: none;
    padding: 4px 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    color: var(--light);
    background-color: var(--mobalytics-back);
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
}
.preco_input {
    display: flex;
}
.preco_input > input {
    width: 80px;
    border: none;
    padding: 4px 16px;
    margin-bottom: 4px;
    margin-top: 8px;
    margin-right: 10px;
    border-radius: 8px;
    color: var(--light);
    background-color: var(--mobalytics-back);
    box-shadow: rgb(20 14 49 / 60%) 0px 2px 10px 4px;
    height: 30px;
}

.preco_input > p {
    color: white;
    margin-top: 12px;
    margin-bottom: none;
}

*:focus {
    outline: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}

.responsive-filter-filters .custom-select {
    margin-bottom: 48px;
    width: 400px;
}
.custom-select {
    position: relative;
    width: 240px;
    text-align: left;
    height: 40px;
    line-height: 40px;
}

.custom-select .selected {
    background-color: var(--mobalytics-back);
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
    background-color: var(--mobalytics-back);
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
    background-color: var(--mobalytics-susge);
}

.selectHide {
        display: none;
}


textarea::-webkit-scrollbar {
    width: 8px;
    background: var(--mobalytics-card);
    border-radius: 8px;
}

textarea::-webkit-scrollbar-thumb {
    background: var(--mobalytics-back);
    border-radius: 8px;
}

</style>