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
    isLoading: false,
  },
  // setters
  mutations: {
    gotData(state, data) {
      state.newsList = data;
    },
  },
  actions: {
    setNewsList({ commit }) {
      this.state.isLoading = true;
      Promise.all([newsApi.getNewsMk(), newsApi.getNewsLenta()])
        .then(([mk, lenta]) => {
          commit('gotData', [...mk.items, ...lenta.items]);
        })
        .catch((err) => console.log(err))
        .finally(() => (this.state.isLoading = false));
    },
  },
  // getters
  getters: {
    getNewsList(state) {
      return state.newsList;
    },
  },
});
