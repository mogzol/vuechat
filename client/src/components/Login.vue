<template>
  <div>
    <label for="username">Please enter a username:</label>

    <input type="text" v-on:keyup.enter="login" v-model="username" name="username"
           :disabled="!connected || loading" />

    <input type="button" value="Submit" v-on:click="login" :disabled="!connected || loading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data: () => ({
    username: '',
  }),
  computed: mapState(['connected', 'loading']),
  methods: {
    login() {
      this.$store.dispatch('login', this.username);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

label {
  display: block;
  font-size: 1.3em;
  margin-bottom: 20px;
  margin-top: 10px;
}

input[type="text"] {
  margin-right: 10px;
}
</style>
