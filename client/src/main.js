import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const wsHostname = window.location.hostname;
const wsPort = process.env.NODE_ENV === 'development' ? 3000 : window.location.port;

Vue.use(VueNativeSock, `${wsProtocol}://${wsHostname}:${wsPort}/connect`, { store, format: 'json' });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
