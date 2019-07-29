<template>
  <div>
    <h1>An error occurred!</h1>
    <p>{{ error }}</p>
    <button v-on:click="clearError">Continue</button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Error',
  computed: mapState(['error']),
  methods: {
    clearError() {
      this.$store.commit('clearError', this.username);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

h1 {
  margin-top: 5px;
  font-size: 1.5em;
}

button {
  margin-top: 10px;
}
</style>
