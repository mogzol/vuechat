import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    messages: [],
    rooms: {},
    users: {},
    roomName: null,
    username: null,
    error: null,
    connected: false,
    loading: false,
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.connected = true;
    },
    SOCKET_ONCLOSE(state, event) {
      console.log('socket closed', event);
      state.connected = false;
      state.error = 'The socket was closed. Check the logs for details.';
    },
    SOCKET_ONERROR(state, event) {
      console.error('socket error', event);
      state.error = 'A websocket error occured. Check the logs for details.';
    },
    SOCKET_ONMESSAGE(state, message) {
      console.log(message);

      // Loading is set when we send a message, clear it when we receive one
      state.loading = false;

      switch (message.type) {
        case 'login':
          state.connected = true;
          state.username = message.username;
          break;
        case 'error':
          state.error = message.message;
          break;
        case 'room':
          if (message.data) {
            state.messages = message.data.messages || [];
            state.users = message.data.users || [];
            state.roomName = message.data.roomName || null;
          }
          break;
        default:
          break;
      }
    },
    error(state, message) {
      state.error = message;
    },
    clearError(state) {
      state.error = null;
    },
    loading(state) {
      state.loading = true;
    },
  },
  actions: {
    login(context, username) {
      const data = { type: 'init', username };
      context.dispatch('sendRaw', data);
    },
    sendMessage(context, message) {
      const data = { type: 'message', message };
      context.dispatch('sendRaw', data);
    },
    joinRoom(context, room) {
      const data = { type: 'join', room };
      context.dispatch('sendRaw', data);
    },
    sendRaw(context, data) {
      if (context.state.loading) {
        context.commit('error', 'Tried to send multiple messages at once');
        return;
      }

      context.commit('loading');
      Vue.prototype.$socket.sendObj(data);
    },
  },
});
