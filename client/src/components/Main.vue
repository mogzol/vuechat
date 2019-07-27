<template>
  <div class="main">
    <div class="navbar">
      VueChat
    </div>
    <div class="content">
      <div class="rooms">Rooms (unimplemented)</div>
      <div class="chat">
        <Chat />
      </div>
      <div class="users">Users (unimplemented)</div>
    </div>
  </div>
</template>

<script>
import Chat from './Chat.vue';

export default {
  name: 'Main',
  components: {
    Chat,
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

.main {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .navbar {
    background: $lighter;
    font-size: 1.6em;
    padding: 10px;
    text-align: center;
  }

  .content {
    flex-grow: 1;
    display: flex;

    .rooms, .users {
      background: $darker;
      width: 250px;
      padding: 10px;
    }

    .chat {
      flex-grow: 1;
      background: $dark;
    }
  }
}
</style>
