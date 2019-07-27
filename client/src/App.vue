<template>
  <div>
    <Overlay />
    <Main />
  </div>
</template>

<script>
import Main from './components/Main.vue';
import Overlay from './components/Overlay.vue';
import './scss/base.scss';

export default {
  name: 'app',
  components: {
    Main,
    Overlay,
  },
};
</script>
