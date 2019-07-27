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
    connected: false,
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.connected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      console.log('socket closed', event);
      state.connected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    SOCKET_ONMESSAGE(state, message) {
      console.log(message);

      switch (message.type) {
        case 'login':
          state.connected = true;
          state.username = message.username;
          break;
        default:
          break;
      }
    },
  },
  actions: {
    login(context, username) {
      const message = { type: 'init', username };
      Vue.prototype.$socket.sendObj(message);
    },
  },
});
