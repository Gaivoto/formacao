<template>
    <div class="row">
        <DiplomaCard v-for="diploma in this.diplomas" :key="diploma.id" v-bind:diploma="diploma"  class="col-xl-6 col-md-6"/>
    </div>
    
</template>


<script>
import DiplomaCard from "../components/myDiplomas/DiplomaCard.vue";
export default {
    data: () => { 
        return {
            diplomas: []
        }
    },
    created() {
        this.diplomas = [
            {
                id: 1,
                image: 'tomasGostosa',
                name: 'text',
                desc: 'description'
            },
            {
                id: 2,
                image: 'tomasGostosa',
                name: 'text',
                desc: 'description'
            },
            {
                id: 3,
                image: 'tomasGostosa',
                name: 'text',
                desc: 'description'
            },
            {
                id: 4,
                image: 'tomasGostosa',
                name: 'text',
                desc: 'description'
            }
        ]
    },
    
    components: {
        DiplomaCard
    }

}

</script>

<style scoped>
</style>
