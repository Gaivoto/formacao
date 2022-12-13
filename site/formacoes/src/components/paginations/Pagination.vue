<template>
    <div class="pagination-wrapper">
        <div class="pagination">
            <img src="../../assets/left_chevron.png" v-on:click="decreasePage"/>
            <div>
                <p :ref="'p' + n" v-for="n of pageRange" :key="n" v-on:click="changePage(n)" :class="{'selected-page': isSelected(n)}">
                    {{ n }}
                </p>
            </div>
            <img src="../../assets/right_chevron.png" v-on:click="increasePage"/>    
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
        decreasePage(){
            if(this.page > 1) {
                this.page--;
                this.$emit("changePage", this.page);
            }
        },
        changePage(page){
            this.page = page;
            this.$emit("changePage", this.page);
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
        align-items: center;
        gap: 8px;
    }

    .pagination img {
        width: 20px;
        height: 20px;

        cursor: pointer;
    }

    .pagination > div {
        display: flex;
        gap: 4px;
    }

    .pagination-wrapper p {
        background-color: white;
        margin-bottom: 0px;
        padding: 4px 0px;
        width: 32px;
        text-align: center;

        cursor: pointer;
    }

    .selected-page {
        background-color: black !important;
        color: white;
    }
</style>