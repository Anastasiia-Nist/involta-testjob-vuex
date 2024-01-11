<template>
  <section>
    <p class="news__nothing-found" v-show="$store.state.isLoading">
      Загрузка...
    </p>
    <p class="news__nothing-found" v-show="newsList.length === 0 && !$store.state.isLoading">
      Ничего не найдено
    </p>
    <ul class="news__list" :class="grid">
      <slot></slot>
    </ul>
  </section>
</template>
<script>
export default {
  props: {
    newsList: {
      type: Array,
      requires: true,
    },
    grid: {
      type: String,
      requires: true,
    },
  },
};
</script>