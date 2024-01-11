<template>
  <main class="news">
    <section class="news__type">
      <div class="news__link-list">
        <b-link
          href="#"
          id="all"
          class="news__link"
          @click="handleLinkType($event)"
          :active="$route.query.type === 'all'"
        >
          Все
        </b-link>

        <b-link
          href="#"
          id="lenta"
          class="news__link"
          @click="handleLinkType($event)"
          :active="$route.query.type === 'lenta'"
        >
          Lenta.ru
        </b-link>

        <b-link
          href="#"
          id="mk"
          class="news__link"
          @click="handleLinkType($event)"
          :active="$route.query.type === 'mk'"
        >
          Mos.ru
        </b-link>
      </div>
      <div class="news__grid-list">
        <button
          class="news__grid-btn"
          @click="handleGridNews($store.state.filterGrid.line)"
          :class="{ active: grid === 'line' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <rect width="18" height="8" fill="#C4C4C4" />
            <rect y="10" width="18" height="8" fill="#C4C4C4" />
          </svg>
        </button>
        <button
          class="news__grid-btn"
          @click="handleGridNews($store.state.filterGrid.grid)"
          :class="{ active: grid === 'grid' }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <rect width="8" height="8" fill="#C4C4C4" />
            <rect y="10" width="8" height="8" fill="#C4C4C4" />
            <rect x="10" width="8" height="8" fill="#C4C4C4" />
            <rect x="10" y="10" width="8" height="8" fill="#C4C4C4" />
          </svg>
        </button>
      </div>
    </section>
    <news-list :newsList="newsList" :grid="grid">
      <li
        v-for="(news, index) in newsList.slice(
          indexOfFirstNews,
          indexOfLastNews
        )"
        :key="index"
      >
        <news-card :news="news" :grid="grid"></news-card>
      </li>
    </news-list>
    <news-pagination
      :totalPages="Math.ceil(newsList.length / 4)"
      class="news-pagination"
    ></news-pagination>
  </main>
</template>
  <script>
import NewsCard from "../NewsCard/NewsCard.vue";
import NewsPagination from "../UI/Pagination/Pagination.vue";
import NewsList from "../NewsList/NewsList.vue";

export default {
  components: {
    NewsCard,
    NewsPagination,
    NewsList,
  },
  data() {
    return {
      grid: localStorage.getItem("filterGrid") || "grid",
      currentPage: 1,
      newsPerPage: 4,
      totalPages: 1,
    };
  },
  watch: {
    $route(to) {
      to.params.page
        ? (this.currentPage = to.params.page)
        : (this.currentPage = 1);
    },
  },
  computed: {
    indexOfFirstNews() {
      console.log(this.currentPage);
      const indexOfFirstNews =
        this.currentPage * this.newsPerPage - this.newsPerPage;
      return indexOfFirstNews;
    },
    indexOfLastNews() {
      const indexOfLastNews = this.currentPage * this.newsPerPage;
      return indexOfLastNews;
    },
    newsList() {
      const query = this.$route.query;
      const allNews = this.$store.getters.getNewsList;
      if (query.type === "all") {
        return query.search
          ? allNews.filter(
          ({ title, description }) =>
            title.toLowerCase().includes(query.search.toLowerCase()) ||
            description.toLowerCase().includes(query.search.toLowerCase())
        )
          : allNews;
      }
      if (query.type) {
        return query.search
          ? allNews.filter(
              ({ title, description, link }) =>
                (title.toLowerCase().includes(query.search.toLowerCase()) ||
                  description
                    .toLowerCase()
                    .includes(query.search.toLowerCase())) &&
                link.toLowerCase().includes(query.type)
            )
          : allNews.filter(({ link }) =>
              link.toLowerCase().includes(query.type)
            );
      }
      return allNews;
    },
  },
  mounted() {
    this.$store.dispatch("setNewsList");
    const param = this.$route.params.page;
    param ? (this.currentPage = this.$route.params.page) : false;
  },
  methods: {
    handleGridNews(value) {
      localStorage.setItem("filterGrid", value);
      this.grid = value;
    },
    handleLinkType(e) {
      const query = this.$route.query;
      if (query.type != e.target.id) {
        this.$router.push({
          query: { ...query, type: e.target.id },
          params: { page: 1 },
        });
      }
    },
  },
};
</script>