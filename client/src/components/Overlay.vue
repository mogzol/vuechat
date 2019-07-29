<template>
  <div class="overlay" v-if="visible">
    <Error v-if="error" class="overlay-popup"/>
    <Login v-if="!error && !username" class="overlay-popup"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Error from './Error.vue';
import Login from './Login.vue';

export default {
  name: 'Overlay',
  components: {
    Error,
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

  .overlay-popup {
    width: 90%;
    max-width: 500px;
    height: 200px;
    background: $dark;
    border-radius: 3px;
    box-shadow: 0px 2px 10px 5px $darkest;
    text-align: center;
    padding: 50px;
    box-sizing: border-box;
  }
}
</style>
