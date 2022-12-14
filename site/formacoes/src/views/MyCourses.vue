<template>
  <div class="search-holder">
    <div class="searcn-holder__banner">
      <div class="hero-header-container">
        <h1 class="hero-header">Meus cursos e nome do maninho</h1>
        <SearchBar :getText="getText" />
        <FilterBar :getOrder="getOrder" :getCategory="getCategory" />

        <div id="preview">
          <h3>Filtro</h3>
          <p>Texto: {{ text }}</p>
          <p>Categorias: {{ category }}</p>
          <p>Ordenar por: {{ order }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import SearchBar from "../components/SearchBar.vue";
import FilterBar from "../components/FilterBar.vue";

export default {
  name: "MyCourses",
  data() {
    return {
      text: "",
      category: "",
      order: "",
    };
  },
  components: {
    SearchBar,
    FilterBar,
  },
  computed: {},
  methods: {
    getText(text) {
      this.text = text;
    },
    getOrder(order) {
      this.order = order;
    },
    getCategory(category) {
      this.category = category;
    },
  },
};
</script>

<style lang="scss">
button {
  background: #009435;
  border: 1px solid #009435;
}
.container {
  margin-top: 100px;
  max-width: 680px;
}

.search-holder {
  margin-top: 60px;
  &__banner {
    margin: 0 auto;
    width: 80%;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  &__fullbanner {
    margin: 0 auto;
    width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;
  }
  .hero-header {
    margin: 0 0 25px;
    line-height: 1;
    font-size: 34px;
  }
}
</style>
