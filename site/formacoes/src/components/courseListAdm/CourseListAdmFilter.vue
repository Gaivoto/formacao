<template>
    <div class="courses-filter-wrapper">
        <div>
            <input v-on:input="filter" type="text" placeholder="Pesquisar" ref="search">
        </div>
        <div>
            <p>Categoria:</p>
            <select v-on:change="filter" name="category" ref="category">
                <option value="all">Todas</option>
                <option value="cat1">cat1</option>
                <option value="cat10">cat10</option>
                <option value="cat11">cat11</option>
                <option value="cat12">cat12</option>
                <option value="cat13">cat13</option>
            </select>
            <p>Estado:</p>
            <select v-on:change="filter" name="state" ref="state">
                <option value="all">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Pendente">Pendente</option>
                <option value="Rejeitado">Rejeitado</option>
            </select>
            <p>Ordenar por:</p>
            <select v-on:change="filter" name="orderby" ref="order">
                <option value="subs-desc">Inscs. decrescente</option>
                <option value="subs-asc">Inscs. crescente</option>
                <option value="price-desc">Preço decrescente</option>
                <option value="price-asc">Preço crescente</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CourseListAdmFilter',
    mounted(){
        let filter = {
            name: null,
            category: this.$refs.category.value,
            state: this.$refs.state.value,
            order: this.$refs.order.value
        }

        this.$emit("filter", filter);
    },
    methods: {
        filter() {
            let filter = {
                name: this.$refs.search.value,
                category: this.$refs.category.value,
                state: this.$refs.state.value,
                order: this.$refs.order.value
            }
            
            this.$emit("filter", filter);
        }
    }
}
</script>

<style lang="scss" scoped>
    .courses-filter-wrapper {
        width: 100%;

        display: flex;
        justify-content: space-between;
        text-align: center;

        padding: 16px;

        background-color: grey;
    }

    .courses-filter-wrapper > div {
        display: flex;
    }

    .courses-filter-wrapper p {
        margin: 0px 16px 0px 32px;
    }

    .courses-filter-wrapper select {
        width: 160px;
    }
</style>