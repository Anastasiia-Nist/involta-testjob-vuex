<template>
  <article class="news-card">
    <div class="news-card__body">
      <img
        :src="news.enclosure.link"
        :alt="news.title"
        v-show="grid === 'line'"
      />
      <div class="news-card__body-text">
        <h2 class="news-card__title">{{ news.title }}</h2>
        <p class="news-card__description">
          {{ news.description }}
        </p>
      </div>
    </div>
    <b-link class="news-card__link" target="_blank" :href="news.link"
      >Подробнее</b-link
    >
    <div class="news-card__footer">
      <b-link target="_blank" :href="`https://${typeNews}`">{{
        typeNews
      }}</b-link>
      <p>{{ news.pubDate }}</p>
    </div>
  </article>
</template>
    <script>
export default {
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
  computed: {
    typeNews() {
      return this.news.link.includes("lenta") ? "www.lenta.ru" : "www.mk.ru";
    },
  },
};
</script>