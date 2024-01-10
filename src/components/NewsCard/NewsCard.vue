<template>
  <article class="news-card">
    <div class="news-card__body">
      <img
        :src="news.enclosure.link"
        :alt="news.title"
        v-show="grid === 'line'"
      />
      <div class="news-card__body-text">
        <b-link class="news-card__title">{{ news.title }}</b-link>
        <p class="news-card__description">
          {{ news.description }}
        </p>
      </div>
    </div>
    <b-link class="news-card__link" :href="news.link"
      >Подробнее</b-link
    >
    <div class="news-card__footer">
      <b-link :href="`https://${getTypeNews()}`">{{ getTypeNews() }}</b-link>
      <p>{{ news.pubDate }}</p>
    </div>
  </article>
</template>
    <script>
export default {
  data() {
    return {
      typeNews: "",
    };
  },
  props: {
    news: {
      type: Object,
      requires: true,
    },
    grid: {
      type: String,
      requires: true,
    },
  },
  methods: {
    getTypeNews() {
      this.news.link.includes("lenta")
        ? (this.typeNews = "lenta.ru")
        : (this.typeNews = "mos.ru");
      return this.typeNews;
    },
  },
};
</script>