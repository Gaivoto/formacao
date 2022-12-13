<template>
    <div class="pagination-wrapper">
        <div class="pagination">
            <img v-on:click="decreasePage" src="../../assets/left_chevron.png">
            <p>{{ this.firstItem }} - {{ this.lastItem }} de {{ this.totalItems }}</p>
            <img v-on:click="increasePage" src="../../assets/right_chevron.png">    
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination2',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalItems: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        firstItem() {
            if(this.totalItems == 0) return 0;
            else return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        lastItem() {
            if(this.currentPage * this.itemsPerPage > this.totalItems) return this.totalItems;
            else return this.currentPage * this.itemsPerPage;
        }
    },
    methods: {
        decreasePage() {
            if(this.currentPage > 1){
                this.$emit("changePage", this.currentPage - 1);
            }
        },
        increasePage() {
            if(this.currentPage * this.itemsPerPage < this.totalItems) {
                this.$emit("changePage", this.currentPage + 1);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .pagination-wrapper {
        display: flex;
        justify-content: space-around;
    }

    .pagination {
        display: flex;
        gap: 8px;
        text-align: center;
        margin: auto;
    }

    .pagination img {
        height: 20px;
        width: 20px;

        cursor: pointer;
    }

    .pagination p {
        margin: 0px;
    }
</style>