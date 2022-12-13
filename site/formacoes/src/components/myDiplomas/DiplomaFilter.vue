<template>
    <div class="courses-filter-wrapper">
        <input v-on:input="filter" type="text" placeholder="Pesquisar..." ref="search"/>
        <select v-on:change="filter" name="category" ref="category">
            <option v-for="(cat, i) in getUnique" :key="i" :value=cat>{{ cat }}</option>
        </select>
        <select v-on:change="filter" name="orderby" ref="order">
            <option value="date-new">Mais Recente</option>
            <option value="date-old">Mais Antigo</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        diplomas: {
            type: Object,
            required: true
        }
    },
    mounted(){
        let filter = {
            name: null,
            category: this.$refs.category.value,
            order: "date-new"
        }

        this.$emit("filter", filter);
    },
    computed: {
        getUnique() {
            let catArray = [];
            this.diplomas.forEach(dip => {
                let exists = false;
                catArray.forEach(cat => {
                    if (dip.category == cat) {
                        exists = true;
                    }
                })
                if (!exists) {
                    catArray.push(dip.category);
                }
            })
            return catArray;
        }
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