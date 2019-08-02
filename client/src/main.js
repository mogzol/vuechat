import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const wsProtocol = location.protocol === 'https:' ? 'wss' : 'ws';
const wsHost = location.host;

Vue.use(VueNativeSock, `${wsProtocol}://${wsHost}/connect`, { store, format: 'json' });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
