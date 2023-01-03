<template>
    <div class="courses-filter-wrapper">
        <div class="courses-filter-container">
            <div class="searchbar">
                <span class="material-icons search-icon">search</span>
                <input type="text" ref="search" v-on:input="filterSearchbar" v-on:keydown.enter="goToSearchItem" placeholder="Pesquisar...">
            </div>
            <div class="filter-div">
                <p>Categoria:</p>
                <div class="custom-select">
                    <div class="selected" :class="{ open: catOpen }" v-on:click="catOpen=!catOpen">{{ this.category }}</div>
                    <div class="items" :class="{ selectHide: !catOpen }">
                        <div v-on:click="selectCat('Todas')">Todas</div>
                        <div v-on:click="selectCat('cat1')">cat1</div>
                        <div v-on:click="selectCat('cat10')">cat10</div>
                        <div v-on:click="selectCat('cat11')">cat11</div>
                        <div v-on:click="selectCat('cat12')">cat12</div>
                        <div v-on:click="selectCat('cat13')">cat13</div>
                    </div>
                </div>
                <p>Estado:</p>
                <div class="custom-select">
                    <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen">{{ this.state }}</div>
                    <div class="items" :class="{ selectHide: !stateOpen }">
                        <div v-on:click="selectState('Todos')">Todos</div>
                        <div v-on:click="selectState('Ativo')">Ativo</div>
                        <div v-on:click="selectState('Inativo')">Inativo</div>
                        <div v-on:click="selectState('Pendente')">Pendente</div>
                        <div v-on:click="selectState('Rejeitado')">Rejeitado</div>
                    </div>
                </div>
                <p>Ordernar por:</p>
                <div class="custom-select">
                    <div class="selected" :class="{ open: orderOpen }" v-on:click="orderOpen=!orderOpen">{{ this.order }}</div>
                    <div class="items" :class="{ selectHide: !orderOpen }">
                        <div v-on:click="selectOrder('Mais recente')">Mais recente</div>
                        <div v-on:click="selectOrder('Mais antigo')">Mais antigo</div>
                        <div v-on:click="selectOrder('Inscs. decrescente')">Inscs. decrescente</div>
                        <div v-on:click="selectOrder('Inscs. crescente')">Inscs. crescente</div>
                        <div v-on:click="selectOrder('Preço decrescente')">Preço decrescente</div>
                        <div v-on:click="selectOrder('Preço crescente')">Preço crescente</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseListAdmFilter',
    data() {
        return {
            catOpen: false,
            orderOpen: false,
            stateOpen: false,
            category: "Todas",
            state: "Todos",
            order: "Mais recente"
        }
    },
    mounted(){
        let filter = {
            name: null,
            category: this.category,
            state: this.state,
            order: this.order
        }

        this.$emit("filter", filter);
    },
    watch: {
        order: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                category: this.category,
                order: this.order,
                state: this.state
            }

            this.$emit("filter", filter);
        },
        category: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                category: this.category,
                order: this.order,
                state: this.state
            }

            this.$emit("filter", filter);
        },
        state: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                category: this.category,
                order: this.order,
                state: this.state
            }

            this.$emit("filter", filter);
        }
    },
    methods: {
        filterSearchbar() {
            let filter = {
                name: this.$refs.search.value,
                category: this.category,
                state: this.state,
                order: this.order
            }
            
            this.$emit("filter", filter);
        },
        selectOrder(order) {
            this.order = order;
            this.orderOpen = false;
        },
        selectCat(cat) {
            this.category = cat;
            this.catOpen = false;
        },
        selectState(state) {
            this.state = state;
            this.stateOpen = false;
        }
    }
}
</script>

<style scoped>
    .courses-filter-wrapper {
        padding: 0px 48px;
        margin-bottom: 36px;
    }

    .courses-filter-container {
        width: 100%;

        display: flex;
        justify-content: space-between;
        text-align: center;

        padding: 16px;

        background-color: var(--mobalytics-susge);

        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .courses-filter-container > .filter-div {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .searchbar {
        background-color: var(--mobalytics-card);
        padding: 6px 16px 6px 20px;
        align-items: center;
        display: flex;
        gap: 12px;
        border-radius: 20px;
        font-family: "Poppins";
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .searchbar input {
        background: none;
        border: none;
        color: var(--light) !important;
        font-family: "Poppins";
        min-width: 300px;
    }

    .searchbar input::placeholder {
        color: var(--light);
    }

    .searchbar input:focus {
        outline: none;
    }

    .search-icon {
        font-size: 28px;
        color: var(--light);
    }

    .courses-filter-container p {
        margin: 0px 16px 0px 32px;
        color: var(--light);
    }

    .courses-filter-container select {
        width: 160px;
    }

    /* 

        SELECT

    */

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