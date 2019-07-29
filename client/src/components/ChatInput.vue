<template>
  <div class="chat-input">
    <div class="combined-holder">
      <input v-model="message" v-on:keyup.enter="send" type="text" />
      <input type="button" value="Send" v-on:click="send"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatInput',
  data: () => ({
    message: '',
  }),
  methods: {
    send() {
      if (this.message.length > 0) {
        this.$store.dispatch('sendMessage', this.message);
        this.message = '';
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

.chat-input {
  padding: 15px 16px;
  height: 100%;
  border-top: 1px solid $lighter;
  box-sizing: border-box;

  .combined-holder {
    display: flex;
    height: 100%;

    input[type="text"] {
      border-radius: 10px 0 0 10px;
      border: 2px solid $lighter;
      border-right-width: 0;
      background: $darker;
      flex-grow: 1;
      color: $foreground;
      padding: 0 10px;

      &:focus {
        outline: none;
        border-color: $lightest;
        box-shadow: 0 0 5px 0px darken($dark, 3%);
      }
    }

    input[type="button"] {
      border-radius: 0 10px 10px 0;
      color: $foreground;
      padding: 0 30px;
      border: 0;
      background: $lighter;
      flex-grow: 0;
      flex-shrink: 0;

      &:hover {
        background: $lightest;
      }

      &:focus {
        outline: none;
      }

      &:active {
        background: $lighter;
      }
    }
  }
}
</style>
