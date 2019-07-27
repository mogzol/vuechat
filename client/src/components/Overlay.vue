<template>
  <div class="overlay" v-if="visible">
    <Login v-if="!username" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Login from './Login.vue';

export default {
  name: 'Overlay',
  components: {
    Login,
  },
  computed: {
    visible() {
      return !this.connected || !this.username || this.error;
    },
    ...mapState(['username', 'connected', 'error']),
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
