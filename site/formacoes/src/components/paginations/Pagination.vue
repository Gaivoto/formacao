<template>
    <div class="pagination-wrapper">
        <div class="pagination">
            <span class="material-icons" v-on:click="firstPage">first_page</span>
            <span class="material-icons" v-on:click="decreasePage">chevron_left</span>
            <div>
                <p :ref="'p' + n" v-for="n of pageRange" :key="n" v-on:click="changePage(n)" :class="{'selected-page': isSelected(n)}">
                    {{ n }}
                </p>
            </div>
            <span class="material-icons" v-on:click="increasePage">chevron_right</span> 
            <span class="material-icons" v-on:click="lastPage">last_page</span> 
        </div>
    </div>
</template>

<script>
export default {
    name: 'CoursesListCourseCard',
    props: {
        numberOfPages: {
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
        pageRange() {
            let range = [];

            if(this.page < 3) { 
                for(var i = 1; i < 6 && i <= this.numberOfPages; i++) {
                    range.push(i);
                }
            } else if(this.page > this.numberOfPages - 2) {
                for(var i = this.numberOfPages; i > 0 && i > this.numberOfPages - 5; i--){
                    range.push(i);
                }
                range = range.reverse();
            } else {
                for(var i = this.page - 2; i < this.page + 3; i++){
                    range.push(i);
                }
            }

            return range;
        }
    },
    methods: {
        isSelected(p) {
            if(p == this.page) return true;
            return false;
        },
        increasePage(){
            if(this.page < this.numberOfPages) {
                this.page++;
                this.$emit("changePage", this.page);
            }
        },
        firstPage() {
            while(this.page > 1) this.decreasePage();
        },
        decreasePage(){
            if(this.page > 1) {
                this.page--;
                this.$emit("changePage", this.page);
            }
        },
        lastPage() {
            while(this.page < this.numberOfPages) this.increasePage();
        },
        changePage(page){
            this.page = page;
            this.$emit("changePage", this.page);
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
        align-items: center;
        gap: 16px;
    }

    .pagination img {
        width: 20px;
        height: 20px;

        cursor: pointer;
    }

    .pagination > div {
        display: flex;
        gap: 16px;
    }

    .pagination-wrapper p {
        margin-bottom: 0px;
        font-size: 22px;
        padding: 4px 0px;
        width: 40px;
        text-align: center;
        color: white;

        cursor: pointer;

        background: rgba(200, 200, 200, 0.08);
        border-radius: 8px;
    }

    .selected-page {
        background: rgba(200, 200, 200, 0.3) !important;
        color: var(--primary) !important;
    }

    .material-icons {
        color: var(--primary);
        cursor: pointer;
    }
</style>