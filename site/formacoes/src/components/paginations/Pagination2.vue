<template>
    <div class="pagination-wrapper">
        <div class="pagination">
<<<<<<< HEAD
            <img v-on:click="decreasePage" src="../../assets/left_chevron.png">
            <p>{{ this.firstItem }} - {{ this.lastItem }} de {{ this.totalItems }}</p>
            <img v-on:click="increasePage" src="../../assets/right_chevron.png">    
=======
            <span class="material-icons" v-on:click="firstPage">first_page</span>
            <span class="material-icons" v-on:click="decreasePage">chevron_left</span>
            <p>{{ this.firstItem }} - {{ this.lastItem }} {{ $t("paginations.of") }} {{ this.totalItems }}</p>
            <span class="material-icons" v-on:click="increasePage">chevron_right</span> 
            <span class="material-icons" v-on:click="lastPage">last_page</span> 
>>>>>>> origin/development
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination2',
    props: {
<<<<<<< HEAD
        currentPage: {
            type: Number,
            required: true
        },
=======
>>>>>>> origin/development
        totalItems: {
            type: Number,
            required: true
        },
        itemsPerPage: {
            type: Number,
            required: true
        }
    },
<<<<<<< HEAD
    computed: {
        firstItem() {
            if(this.totalItems == 0) return 0;
            else return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        lastItem() {
            if(this.currentPage * this.itemsPerPage > this.totalItems) return this.totalItems;
            else return this.currentPage * this.itemsPerPage;
=======
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
>>>>>>> origin/development
        }
    },
    methods: {
        decreasePage() {
<<<<<<< HEAD
            if(this.currentPage > 1){
                this.$emit("changePage", this.currentPage - 1);
            }
        },
        increasePage() {
            if(this.currentPage * this.itemsPerPage < this.totalItems) {
                this.$emit("changePage", this.currentPage + 1);
            }
=======
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
>>>>>>> origin/development
        }
    }
}
</script>

<<<<<<< HEAD
<style lang="scss" scoped>
    .pagination-wrapper {
        display: flex;
        justify-content: space-around;
=======
<style scoped>
    .pagination-wrapper {
        display: flex;
        justify-content: space-around;
        padding-bottom: 12px;
>>>>>>> origin/development
    }

    .pagination {
        display: flex;
<<<<<<< HEAD
        gap: 8px;
=======
        gap: 16px;
>>>>>>> origin/development
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
<<<<<<< HEAD
=======
        color: var(--light);
    }

    .material-icons {
        color: var(--primary);
        cursor: pointer;
>>>>>>> origin/development
    }
</style>