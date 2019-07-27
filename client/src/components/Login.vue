<template>
  <div class="login">
    <label for="username">Please enter a username:</label>
    <input type="text" v-model="username" :enabled="loading" name="username" />
    <input type="button" v-on:click="login" value="Submit" />
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    username: '',
    loading: false,
  }),
  methods: {
    login() {
      this.loading = true;
      this.$store.dispatch('login', this.username);
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

.login {
  width: 90%;
  max-width: 500px;
  height: 200px;
  background: $dark;
  border-radius: 5px;
  border: 2px solid $darker;
  text-align: center;
  padding: 50px;
  box-sizing: border-box;

  label {
    display: block;
    font-size: 1.3em;
    margin-bottom: 20px;
  }

  input[type="text"] {
    margin-right: 10px;
  }
}
</style>
