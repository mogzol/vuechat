import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, 'ws://localhost:3000/connect', { store, format: 'json' });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
