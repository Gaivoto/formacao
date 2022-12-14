<template>
  <div id="add-filter">
    <form>
      <select
        v-on:click="getCategory(filter.category)"
        v-model="filter.category"
      >
        <option disabled value="">Category</option>
        <option v-for="category in categories" v-bind:key="category">
          {{ category }}
        </option>
      </select>

      <select v-on:click="getOrder(filter.order)" v-model="filter.order">
        <option disabled value="">Order By</option>
        <option v-for="order in orderby" v-bind:key="order">
          {{ order }}
        </option>
      </select>
    </form>
  </div>
</template>

<script>
export default {
  name: "FilterBar",
  data() {
    return {
      filter: {
        category: "",
        order: "",
      },
      categories: ["Name1", "Name2", "Name3"],
      orderby: ["Size", "Shape", "Thickness"],
    };
  },
  props: {
    getCategory: Function,
    getOrder: Function,
  },
};
</script>
  
<style lang="scss">
</style>