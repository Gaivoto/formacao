<template>
    <div class="pagination-wrapper">
        <div class="pagination">
            <span class="material-icons" v-on:click="firstPage">first_page</span>
            <span class="material-icons" v-on:click="decreasePage">chevron_left</span>
            <p>{{ this.firstItem }} - {{ this.lastItem }} de {{ this.totalItems }}</p>
            <span class="material-icons" v-on:click="increasePage">chevron_right</span> 
            <span class="material-icons" v-on:click="lastPage">last_page</span> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination2',
    props: {
        totalItems: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        }
    },
    data(){
        return {
            page: -1
        }
    },
    mounted() {
        this.page = 1
    },
    computed: {
        firstItem() {
            if(this.totalItems == 0) return 0;
            else return (this.page - 1) * this.itemsPerPage + 1;
        },
        lastItem() {
            if(this.page * this.itemsPerPage > this.totalItems) return this.totalItems;
            else return this.page * this.itemsPerPage;
        }
    },
    methods: {
        decreasePage() {
            if(this.page > 1){
                this.page--;
                this.$emit("changePage", this.page);
            }
        },
        firstPage() {
            while(this.page > 1) this.decreasePage();
        },
        increasePage() {
            if(this.page * this.itemsPerPage < this.totalItems) {
                this.page++;
                this.$emit("changePage", this.page);
            }
        },
        lastPage() {
            while(this.page * this.itemsPerPage < this.totalItems) this.increasePage();
        }
    }
}
</script>

<style scoped>
    .pagination-wrapper {
        display: flex;
        justify-content: space-around;
        padding-bottom: 12px;
    }

    .pagination {
        display: flex;
        gap: 16px;
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
        color: var(--light);
    }

    .material-icons {
        color: var(--primary);
        cursor: pointer;
    }
</style>