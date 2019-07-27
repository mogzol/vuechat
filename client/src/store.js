import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [
      {
        id: 1,
        message: 'hello',
        username: 'Morg',
        timestamp: Date.now() - 560000,
      },
      {
        id: 2,
        message: 'hey',
        username: 'Bob',
        timestamp: Date.now() - 240000,
      },
      {
        id: 3,
        message: 'What is up?',
        username: 'bill',
        timestamp: Date.now(),
      },
    ],
    rooms: {},
    users: {},
    username: null,
    error: null,
  },
  mutations: {

  },
  actions: {

  },
});
