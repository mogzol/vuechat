<template>
  <div class="main">
    <div class="navbar">
      VueChat
    </div>
    <div class="content">
      <div class="rooms">
        Rooms (unimplemented)

        <!-- For now we'll put some info in this sidebar -->
        <br><br><br>
        Welcome to VueChat
        <br><br>
        This is a WIP. Some stuff doesn't work.
        <br><br>
        You can send a '/clear' message to clear the chat.
      </div>
      <div class="chat">
        <Chat />
      </div>
      <div class="users">Users (unimplemented)</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chat from './Chat.vue';

export default {
  name: 'Main',
  components: {
    Chat,
  },
  computed: mapState(['username']),
  watch: {
    // Until rooms are implemented, just connect to main room when we login
    username(newVal, oldVal) {
      if (oldVal === null && newVal !== null) {
        console.log('Joining main room...');
        this.$store.dispatch('joinRoom', 'main');
      }
    },
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
    display: flex;
    flex-grow: 1;
    min-height: 0;

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
