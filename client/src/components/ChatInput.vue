<template>
  <div class="chat-input">
    <div class="combined-holder">
      <input type="text" />
      <input type="button" value="Send" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatInput',
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
      border-right: none;
      background: $darker;
      flex-grow: 1;
      color: $foreground;
      padding: 0 10px;

      &:focus {
        outline: none;
        border-color: $lightest;
        box-shadow: 0 0 5pt 0pt darken($dark, 3%);
      }
    }

    input[type="button"] {
      border-radius: 0 10px 10px 0;
      color: $foreground;
      padding: 0 10px;
      border: 0;
      background: $lighter;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }
}
</style>
