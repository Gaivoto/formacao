<template>
    <div class="users-filter-wrapper">
        <div>
            <input v-on:input="filter" type="text" placeholder="Pesquisar" ref="search">
        </div>
        <div>
            <p>Tipo de Utilizador:</p>
            <select v-on:change="filter" name="type" ref="type">
                <option value="all">Todos</option>
                <option value="Admin">Administrador</option>
                <option value="Criador">Criador</option>
                <option value="Utilizador">Utilizador</option>
            </select>
            <p>Estado:</p>
            <select v-on:change="filter" name="state" ref="state">
                <option value="all">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserListAdmFilter',
    mounted(){
        let filter = {
            name: null,
            type: this.$refs.type.value,
            state: this.$refs.state.value
        }

        this.$emit("filter", filter);
    },
    methods: {
        filter() {
            let filter = {
                name: this.$refs.search.value,
                type: this.$refs.type.value,
                state: this.$refs.state.value
            }
            
            this.$emit("filter", filter);
        }
    }
}
</script>

<style lang="scss" scoped>
    .users-filter-wrapper {
        width: 100%;

        display: flex;
        justify-content: space-between;
        text-align: center;

        padding: 16px;

        background-color: grey;
    }

    .users-filter-wrapper > div {
        display: flex;
    }

    .users-filter-wrapper p {
        margin: 0px 16px 0px 32px;
    }

    .users-filter-wrapper select {
        width: 160px;
    }
</style>