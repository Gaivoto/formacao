<template>
    <div class="courses-filter-wrapper">
        <div>
            <input v-on:input="filter" type="text" placeholder="Pesquisar" ref="search">
        </div>
        <div>
            <p>Categoria:</p>
            <select v-on:change="filter" name="category" ref="category">
                <option value="cat1">Categoria 1</option>
                <option value="cat2">Categoria 2</option>
                <option value="cat3">Categoria 3</option>
            </select>
            <p>Ordenar por:</p>
            <select v-on:change="filter" name="orderby" ref="order">
                <option value="date-new">Mais recente</option>
                <option value="date-old">Mais antigo</option>
                <option value="price-desc">Preço decrescente</option>
                <option value="price-asc">Preço crescente</option>
                <option value="prog-desc">Progresso decrescente</option>
                <option value="prog-asc">Progresso crescente</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoursesListFilter',
    mounted(){
        let filter = {
            name: null,
            category: this.$refs.category.value,
            order: "date-new"
        }

        this.$emit("filter", filter);
    },
    methods: {
        filter() {
            let filter = {
                name: this.$refs.search.value,
                category: this.$refs.category.value,
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