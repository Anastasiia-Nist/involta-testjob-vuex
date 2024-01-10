import Vue from 'vue';
import Vuex from 'vuex';
import newsApi from '../utils/newsApi';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    filterGrid: {
      grid: 'grid',
      line: 'line',
    },
    newsList: [],
  },
  pagination: {
    currentPage: 1,
    perPage: 4,
  },
  // setters
  mutations: {
    gotData(state, data) {
      state.newsList = data;
    },
  },
  actions: {
    setNewsList({ commit }) {
      Promise.all([newsApi.getNewsMos(), newsApi.getNewsLenta()]).then(
        ([mos, lenta]) => {
          commit('gotData', [...mos.items, ...lenta.items]);
        }
      );
    },
  },
  // getters
  getters: {
    getNewsList(state) {
      return state.newsList;
    },
  },
});
