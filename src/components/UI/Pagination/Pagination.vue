<template>
  <nav>
    <p class="news__nothing-found" v-if="$route.params.page > totalPages && totalPages !== 0">Такой страницы нет</p>
    <ul v-else class="news-pagination__list">
      <li v-for="page in totalPages" :key="page">
        <router-link :to="paginateObject((currentPage = page))">
          {{ page }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "vue-pagination",
  data() {
    return {
      currentPage: null,
      pageParameter: "page",
    };
  },
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    paginateObject(pageTo) {
      return {
        params: { [this.pageParameter]: pageTo },
        query: {
          ...this.$route.query,
        },
      };
    },
  },
  mounted() {
    this.currentPage =
      parseInt(this.$route.params[this.pageParameter], 10) ?? 1;
  },
  watch: {
    $route(to) {
      this.currentPage = parseInt(to.params[this.pageParameter], 10) ?? 1;
    },
  },
};
</script>

