<template>
    <div class="users-filter-wrapper">
        <div class="users-filter-container">
            <div class="searchbar">
                <span class="material-icons search-icon">search</span>
                <input type="text" ref="search" v-on:input="filterSearchbar" v-on:keydown.enter="goToSearchItem" placeholder="Pesquisar...">
            </div>
            <div class="filter-div">
                <p>Tipo de Utilizador:</p>
                <div class="custom-select">
                    <div class="selected" :class="{ open: typeOpen }" v-on:click="typeOpen=!typeOpen">{{ this.type }}</div>
                    <div class="items" :class="{ selectHide: !typeOpen }">
                        <div v-on:click="selectType('Todos')">Todos</div>
                        <div v-on:click="selectType('Admin')">Admin</div>
                        <div v-on:click="selectType('Criador')">Criador</div>
                        <div v-on:click="selectType('Utilizador')">Utilizador</div>
                    </div>
                </div>
                <p>Estado:</p>
                <div class="custom-select">
                    <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen">{{ this.state }}</div>
                    <div class="items" :class="{ selectHide: !stateOpen }">
                        <div v-on:click="selectState('Todos')">Todos</div>
                        <div v-on:click="selectState('Ativo')">Ativo</div>
                        <div v-on:click="selectState('Inativo')">Inativo</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserListAdmFilter',
    data() {
        return {
            stateOpen: false,
            typeOpen: false,
            type: "Todos",
            state: "Todos"
        }
    },
    mounted(){
        let filter = {
            name: null,
            type: this.type,
            state: this.state
        }

        this.$emit("filter", filter);
    },
    watch: {
        state: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                state: this.state,
                type: this.type
            }

            this.$emit("filter", filter);
        },
        type: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                state: this.state,
                type: this.type
            }

            this.$emit("filter", filter);
        }
    },
    methods: {
        filterSearchbar() {
            let filter = {
                name: this.$refs.search.value,
                type: this.type,
                state: this.state
            }
            
            this.$emit("filter", filter);
        },
        selectType(type) {
            this.type = type;
            this.typeOpen = false;
        },
        selectState(state) {
            this.state = state;
            this.stateOpen = false;
        }
    }
}
</script>

<style scoped>
    .users-filter-wrapper {
        padding: 0px 48px;
        margin-bottom: 36px;
    }

    .users-filter-container {
        width: 100%;

        display: flex;
        justify-content: space-between;
        text-align: center;

        padding: 16px;

        background-color: var(--mobalytics-susge);

        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .users-filter-container > .filter-div {
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

    .users-filter-container p {
        margin: 0px 16px 0px 32px;
        color: var(--light);
    }

    .users-filter-container select {
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