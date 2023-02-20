<template>
    <div class="courses-filter-wrapper">
        <div class="courses-filter-container">
            <div class="searchbar">
                <span class="material-icons search-icon">search</span>
                <input type="text" ref="search" v-on:input="filterSearchbar" v-on:keydown.enter="goToSearchItem" :placeholder='$t("courseListAdm.search")'>
            </div>
            <div class="filter-div">
                <div>
                    <p>{{ $t("courseListAdm.category") }}:</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: catOpen }" v-on:click="catOpen=!catOpen; stateOpen=false; orderOpen=false">{{ this.category }}</div>
                        <div class="items" :class="{ selectHide: !catOpen }">
                            <div v-on:click="selectCat($('courseListAdm.allF'))">{{ $t("courseListAdm.allF") }}</div>
                            <div v-for="category in this.categories" :key="category.id" v-on:click="selectCat(category.name)">{{ category.name }}</div>
                        </div>
                    </div>    
                </div>
                <div>
                    <p>{{ $t("courseListAdm.state") }}:</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen; catOpen=false; orderOpen=false">{{ this.state }}</div>
                        <div class="items" :class="{ selectHide: !stateOpen }">
                            <div v-on:click="selectState($t('courseListAdm.allM'))">{{ $t("courseListAdm.allM") }}</div>
                            <div v-on:click="selectState($t('states.active'))">{{ $t("states.active") }}</div>
                            <div v-on:click="selectState($t('states.inactive'))">{{ $t("states.inactive") }}</div>
                            <div v-on:click="selectState($t('states.pending'))">{{ $t("states.pending") }}</div>
                            <div v-on:click="selectState($t('states.rejected'))">{{ $t("states.rejected") }}</div>
                        </div>
                    </div>    
                </div>
                <div>
                    <p>{{ $t("courseListAdm.orderBy") }}:</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: orderOpen }" v-on:click="orderOpen=!orderOpen; catOpen=false; stateOpen=false">{{ this.order }}</div>
                        <div class="items" :class="{ selectHide: !orderOpen }">
                            <div v-on:click="selectOrder($t('order.newest'))">{{ $t("order.newest") }}</div>
                            <div v-on:click="selectOrder($t('order.oldest'))">{{ $t("order.oldest") }}</div>
                            <div v-on:click="selectOrder($t('order.mostExpensive'))">{{ $t("order.mostExpensive") }}</div>
                            <div v-on:click="selectOrder($t('order.cheapest'))">{{ $t("order.cheapest") }}</div>
                        </div>
                    </div>    
                </div>
            </div>
            <div class="responsive-filter-btn">
                <button v-on:click="toggleRespFilter"><p>{{ $t("courseListAdm.FILTER") }}</p><span class="material-icons">filter_alt</span></button>
            </div>
        </div>
        <div class="responsive-filter" :class="{ 'hidden': !this.responsiveFilter }">
            <div class="responsive-filter-header">
                <p>{{ $t("courseListAdm.filter") }}</p>
                <span v-on:click="toggleRespFilter" class="material-icons">close</span>
            </div>
            <hr>
            <div class="responsive-filter-filters">
                <div>
                    <p>{{ $t("courseListAdm.category") }}:</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: catOpen }" v-on:click="catOpen=!catOpen; stateOpen=false; orderOpen=false">{{ this.category }}</div>
                        <div class="items" :class="{ selectHide: !catOpen }">
                            <div v-on:click="selectCat($('courseListAdm.allF'))">{{ $t("courseListAdm.allF") }}</div>
                            <div v-for="category in this.categories" :key="category.id" v-on:click="selectCat(category.name)">{{ category.name }}</div>
                        </div>
                    </div>    
                </div>
                <div>
                    <p>{{ $t("courseListAdm.state") }}:</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen; catOpen=false; orderOpen=false">{{ this.state }}</div>
                        <div class="items" :class="{ selectHide: !stateOpen }">
                            <div v-on:click="selectState($t('courseListAdm.allM'))">{{ $t("courseListAdm.allM") }}</div>
                            <div v-on:click="selectState($t('states.active'))">{{ $t("states.active") }}</div>
                            <div v-on:click="selectState($t('states.inactive'))">{{ $t("states.inactive") }}</div>
                            <div v-on:click="selectState($t('states.pending'))">{{ $t("states.pending") }}</div>
                            <div v-on:click="selectState($t('states.rejected'))">{{ $t("states.rejected") }}</div>
                        </div>
                    </div>    
                </div>
                <div>
                    <p>{{ $t("courseListAdm.orderBy") }}:</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: orderOpen }" v-on:click="orderOpen=!orderOpen; catOpen=false; stateOpen=false">{{ this.order }}</div>
                        <div class="items" :class="{ selectHide: !orderOpen }">
                            <div v-on:click="selectOrder($t('order.newest'))">{{ $t("order.newest") }}</div>
                            <div v-on:click="selectOrder($t('order.oldest'))">{{ $t("order.oldest") }}</div>
                            <div v-on:click="selectOrder($t('order.mostExpensive'))">{{ $t("order.mostExpensive") }}</div>
                            <div v-on:click="selectOrder($t('order.cheapest'))">{{ $t("order.cheapest") }}</div>
                        </div>
                    </div>     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
    name: 'CourseListAdmFilter',
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            catOpen: false,
            orderOpen: false,
            stateOpen: false,
            category: "",
            state: "",
            order: "",
            responsiveFilter: false
        }
    },
    setup() {
        const { t } = useI18n();

        return { t };
    },
    mounted(){
        this.order = this.t("order.newest");
        this.category = this.t("courseListAdm.allF");
        this.state = this.t("courseListAdm.allM");

        let filter = {
            name: null,
            category: this.category,
            state: this.state,
            order: this.order
        }

        this.$emit("filter", filter);
    },
    watch: {
        order: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                category: this.category,
                order: this.order,
                state: this.state
            }

            this.$emit("filter", filter);
        },
        category: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                category: this.category,
                order: this.order,
                state: this.state
            }

            this.$emit("filter", filter);
        },
        state: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                category: this.category,
                order: this.order,
                state: this.state
            }

            this.$emit("filter", filter);
        }
    },
    methods: {
        filterSearchbar() {
            let filter = {
                name: this.$refs.search.value,
                category: this.category,
                state: this.state,
                order: this.order
            }
            
            this.$emit("filter", filter);
        },
        selectOrder(order) {
            this.order = order;
            this.orderOpen = false;
        },
        selectCat(cat) {
            this.category = cat;
            this.catOpen = false;
        },
        selectState(state) {
            this.state = state;
            this.stateOpen = false;
        },
        toggleRespFilter() {
            this.responsiveFilter = !this.responsiveFilter;
        }
    }
}
</script>

<style scoped>
    .courses-filter-wrapper {
        padding: 0px 48px;
        margin-bottom: 36px;
    }

    .courses-filter-container {
        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 16px;

        background-color: var(--mobalytics-susge);

        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .courses-filter-container > .filter-div {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .filter-div > div {
        display: flex;
        align-items: center;
    }

    .searchbar {
        background-color: var(--mobalytics-card);
        padding: 6px 16px 6px 20px;
        align-items: center;
        display: flex;
        gap: 12px;
        border-radius: 20px;
        font-family: "Poppins";
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .searchbar input {
        background: none;
        border: none;
        color: var(--light) !important;
        font-family: "Poppins";
        width: 300px;
    }

    .searchbar input::placeholder {
        color: var(--light);
    }

    .searchbar input:focus {
        outline: none;
    }

    .search-icon {
        font-size: 28px;
        color: var(--light);
    }

    .courses-filter-container p {
        margin: 0px 16px 0px 32px;
        color: var(--light);
    }

    .courses-filter-container select {
        width: 160px;
    }

    .responsive-filter-btn {
        display: none;
    }

    .responsive-filter-btn button {
        background: var(--mobalytics-card);
        color: var(--light);
        height: 50px;
        width: 180px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 0px;

        display: flex;
        align-items: center;
        gap: 12px;
        padding-left: 48px;
    }

    .responsive-filter-btn p {
        margin: 0px;
    }

    .hidden {
        display: none !important;
    }

    .responsive-filter {
        position: fixed;
        top: 0px;
        left: 0px;
        height: 100%;
        width: fit-content;
        z-index: 5;
        padding: 32px;

        background-color: var(--mobalytics-back);
    }

    .responsive-filter-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }    

    .responsive-filter-header p {
        margin: 0px;
        color: var(--primary);
        font-size: 28px;
    }

    .responsive-filter-header span {
        margin: 0px;
        color: var(--light);
        font-size: 28px;
        cursor: pointer;
    }

    .responsive-filter hr {
        border: 1px solid var(--light);
        margin-bottom: 48px;
    }

    .responsive-filter-filters p {
        color: var(--light);
        margin-bottom: 16px;
        font-size: 18px;
    }

    .responsive-filter-filters .custom-select {
        margin-bottom: 48px;
        width: 400px;
    }


    /* 

        SELECT

    */

    .custom-select {
        position: relative;
        width: 240px;
        text-align: left;
        height: 48px;
        line-height: 48px;
    }

    .custom-select .selected {
        background-color: var(--mobalytics-card);
        border-radius: 8px;
        color: var(--light);
        padding-left: 1em;
        cursor: pointer;
        margin-bottom: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .custom-select .selected:after {
        position: absolute;
        content: "";
        top: 22px;
        right: 1em;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-color: var(--light) transparent transparent transparent;
    }

    .custom-select .items {
        color: var(--light);
        border-radius: 8px;
        overflow: hidden;
        position: absolute;
        background-color: var(--mobalytics-card);
        left: 0;
        right: 0;
        z-index: 1;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
        max-height: 300px;
    }

    .custom-select .items::-webkit-scrollbar {
        width: 10px;
        background: var(--mobalytics-card);
        border-radius: 8px;
    }

    .custom-select .items::-webkit-scrollbar-thumb {
        background: var(--mobalytics-back);
        border-radius: 8px;
    }

    .custom-select .items div {
        padding-left: 1em;
        cursor: pointer;
    }

    .custom-select .items div:hover {
        background-color: var(--mobalytics-back);
    }

    .selectHide {
        display: none;
    }

    @media (max-width: 1950px) {
        .searchbar input {
            width: 200px;
        }

        .custom-select {
            width: 180px;
        }
    }

    @media (max-width: 1800px) {
        .filter-div > div {
            display: block;
            margin-left: 16px;
            text-align: left;
        }

        .filter-div > div > p {
            margin: 0px 0px 8px 16px;
        }

        .searchbar {
            height: 48px;
        }
    }

    @media (max-width: 1400px) {
        .filter-div {
            display: none !important;
        }

        .responsive-filter-btn {
            display: block;
        }
    }

    @media (max-width: 1050px) {
        .courses-filter-wrapper {
            padding: 0px;
        }
    }
</style>