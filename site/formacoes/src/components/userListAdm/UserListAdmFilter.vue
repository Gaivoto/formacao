<template>
    <div class="users-filter-wrapper">
<<<<<<< HEAD
        <div>
            <input v-on:input="filter" type="text" placeholder="Pesquisar" ref="search">
        </div>
        <div>
            <p>Tipo de Utilizador:</p>
            <select v-on:change="filter" name="type" ref="type">
                <option value="all">Todos</option>
                <option value="Admin">Administrador</option>
                <option value="Criador">Criador</option>
                <option value="Utilizador">Utilizador</option>
            </select>
            <p>Estado:</p>
            <select v-on:change="filter" name="state" ref="state">
                <option value="all">Todos</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
            </select>
=======
        <div class="users-filter-container">
            <div class="searchbar">
                <span class="material-icons search-icon">search</span>
                <input type="text" ref="search" v-on:input="filterSearchbar" v-on:keydown.enter="goToSearchItem" :placeholder="$t('myCourses.search')">
            </div>
            <div class="filter-div">
                <div>
                    <p>{{ $t("userListAdm.userType")}}</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: typeOpen }" v-on:click="typeOpen=!typeOpen; stateOpen=false">{{ this.type }}</div>
                        <div class="items" :class="{ selectHide: !typeOpen }">
                            <div v-on:click="selectType($t('userListAdm.all'))">{{ $t("userListAdm.all")}}</div>
                            <div v-on:click="selectType($t('userListAdm.admin'))">{{ $t("userListAdm.admin")}}</div>
                            <div v-on:click="selectType($t('userListAdm.creator'))">{{ $t("userListAdm.creator")}}</div>
                            <div v-on:click="selectType($t('userListAdm.user'))">{{ $t("userListAdm.user")}}</div>
                        </div>
                    </div>    
                </div>
                <div>
                    <p>{{ $t("userListAdm.state")}}</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen; typeOpen=false">{{ this.state }}</div>
                        <div class="items" :class="{ selectHide: !stateOpen }">
                            <div v-on:click="selectState($t('userListAdm.all'))">{{ $t("userListAdm.all")}}</div>
                            <div v-on:click="selectState($t('states.active'))">{{ $t("states.active")}}</div>
                            <div v-on:click="selectState($t('states.inactive'))">{{ $t("states.inactive")}}</div>
                        </div>
                    </div>    
                </div>
            </div>
            <div class="responsive-filter-btn">
                <button v-on:click="toggleRespFilter"><p>FILTRAR</p><span class="material-icons">filter_alt</span></button>
            </div>
        </div>
        <div class="responsive-filter" :class="{ 'hidden': !this.responsiveFilter }">
            <div class="responsive-filter-header">
                <p>Filtrar</p>
                <span v-on:click="toggleRespFilter" class="material-icons">close</span>
            </div>
            <hr>
            <div class="responsive-filter-filters">
                <div>
                    <p>{{ $t("userListAdm.userType")}}</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: typeOpen }" v-on:click="typeOpen=!typeOpen; stateOpen=false">{{ this.type }}</div>
                        <div class="items" :class="{ selectHide: !typeOpen }">
                            <div v-on:click="selectType($t('userListAdm.all'))">{{ $t("userListAdm.all")}}</div>
                            <div v-on:click="selectType($t('userListAdm.admin'))">{{ $t("userListAdm.admin")}}</div>
                            <div v-on:click="selectType($t('userListAdm.creator'))">{{ $t("userListAdm.creator")}}</div>
                            <div v-on:click="selectType($t('userListAdm.user'))">{{ $t("userListAdm.user")}}</div>
                        </div>
                    </div>   
                </div>
                <div>
                    <p>{{ $t("userListAdm.state")}}</p>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen; typeOpen=false">{{ this.state }}</div>
                        <div class="items" :class="{ selectHide: !stateOpen }">
                            <div v-on:click="selectState($t('userListAdm.all'))">{{ $t("userListAdm.all")}}</div>
                            <div v-on:click="selectState($t('states.active'))">{{ $t("states.active")}}</div>
                            <div v-on:click="selectState($t('states.inactive'))">{{ $t("states.inactive")}}</div>
                        </div>
                    </div>      
                </div>    
            </div>
>>>>>>> origin/development
        </div>
    </div>
</template>

<script>
<<<<<<< HEAD
export default {
    name: 'UserListAdmFilter',
    mounted(){
        let filter = {
            name: null,
            type: this.$refs.type.value,
            state: this.$refs.state.value
=======
import Tr from '@/i18n/translation.js'
import { useI18n } from 'vue-i18n'

export default {
    name: 'UserListAdmFilter',
    data() {
        return {
            stateOpen: false,
            typeOpen: false,
            type: "",
            state: "",
            responsiveFilter: false
        }
    },
    setup() {
        const { t } = useI18n()

        return { Tr, t };
    },
    mounted(){
        this.type = this.t("userListAdm.all");
        this.state = this.t("userListAdm.all");

        let filter = {
            name: null,
            type: this.type,
            state: this.state
>>>>>>> origin/development
        }

        this.$emit("filter", filter);
    },
<<<<<<< HEAD
    methods: {
        filter() {
            let filter = {
                name: this.$refs.search.value,
                type: this.$refs.type.value,
                state: this.$refs.state.value
            }
            
            this.$emit("filter", filter);
=======
    watch: {
        state: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                state: this.state,
                type: this.type
            }

            this.$emit("filter", filter);
        },
        type: function() {
            let filter = {
                name: this.$refs.search.value.toLowerCase(),
                state: this.state,
                type: this.type
            }

            this.$emit("filter", filter);
        }
    },
    methods: {
        filterSearchbar() {
            let filter = {
                name: this.$refs.search.value,
                type: this.type,
                state: this.state
            }
            
            this.$emit("filter", filter);
        },
        selectType(type) {
            this.type = type;
            this.typeOpen = false;
        },
        selectState(state) {
            this.state = state;
            this.stateOpen = false;
        },
        toggleRespFilter() {
            this.responsiveFilter = !this.responsiveFilter;
>>>>>>> origin/development
        }
    }
}
</script>

<<<<<<< HEAD
<style lang="scss" scoped>
    .users-filter-wrapper {
=======
<style scoped>
    .users-filter-wrapper {
        padding: 0px 48px;
        margin-bottom: 36px;
    }

    .users-filter-container {
>>>>>>> origin/development
        width: 100%;

        display: flex;
        justify-content: space-between;
<<<<<<< HEAD
        text-align: center;

        padding: 16px;

        background-color: grey;
    }

    .users-filter-wrapper > div {
        display: flex;
    }

    .users-filter-wrapper p {
        margin: 0px 16px 0px 32px;
    }

    .users-filter-wrapper select {
        width: 160px;
    }
=======
        align-items: center;

        padding: 16px;

        background-color: var(--mobalytics-susge);

        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 0px 2px 10px 4px;
    }

    .users-filter-container > .filter-div {
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

    .users-filter-container p {
        margin: 0px 16px 0px 32px;
        color: var(--light);
    }

    .users-filter-container select {
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

    @media (max-width: 1600px) {
        .searchbar input {
            width: 200px;
        }

        .custom-select {
            width: 180px;
        }
	}
    
    @media (max-width: 1450px) {
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

    @media (max-width: 1200px) {
        .searchbar input {
            width: 160px;
        }

        .filter-div {
            display: none !important;
        }

        .responsive-filter-btn {
            display: block;
        }
	}

    @media (max-width: 900px) {
        .users-filter-wrapper {
            padding: 0px;
        }
	}

    @media (max-width: 600px) {
        .responsive-filter-btn button {
            width: 55px;
            padding-left: 16px;
        }

        .responsive-filter-btn p {
            display: none;
        }
	}

    @media (max-width: 500px) {
        .searchbar input {
            width: 120px;
        }
	}

    @media (max-width: 480px) {
        .responsive-filter {
            width: 100%;
        }

        .responsive-filter-filters .custom-select {
            width: 100%;
        }
	}
>>>>>>> origin/development
</style>