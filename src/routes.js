// default
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// Pages
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';

// Routering
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/:page?',
      name: 'home',
      component: HomePage,
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFoundPage,
    },
  ],
});
