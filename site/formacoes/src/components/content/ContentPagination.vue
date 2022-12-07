<template>
    <div class="pagination-wrapper">
        <div class="pagination">
            <img v-on:click="decreasePage" src="../../assets/left_chevron.png">
            <p>{{ this.firstCourse }} - {{ this.lastCourse }} de {{ this.totalCourses }}</p>
            <img v-on:click="increasePage" src="../../assets/right_chevron.png">    
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContentPagination',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalCourses: {
            type: Number,
            required: true
        },
        coursesPerPage: {
            type: Number,
            required: true
        }
    },
    computed: {
        firstCourse() {
            return (this.currentPage - 1) * this.coursesPerPage + 1;
        },
        lastCourse() {
            if(this.currentPage * this.coursesPerPage > this.totalCourses) return this.totalCourses;
            else return this.currentPage * this.coursesPerPage;
        }
    },
    methods: {
        decreasePage() {
            if(this.currentPage > 1){
                this.$emit("changePage", this.currentPage - 1);
            }
        },
        increasePage() {
            if(this.currentPage * this.coursesPerPage < this.totalCourses) {
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