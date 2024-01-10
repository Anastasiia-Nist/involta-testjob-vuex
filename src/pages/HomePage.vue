<template>
  <div class="wrapper-content">
    <section>
      <div class="container">
        <news-header></news-header>
        <news-main></news-main>
      </div>
    </section>
  </div>
</template>

<script>
import NewsHeader from '../components/Header/NewsHeader.vue';
import NewsMain from '../components/Main/NewsMain.vue';

export default {
  components: {
    NewsHeader,
    NewsMain,
  },
}
</script>
<style lang="scss">

</style>
