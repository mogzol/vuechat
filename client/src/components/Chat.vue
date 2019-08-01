<template>
  <div class="chat-box">
    <div class="messages" ref="messages">
      <div v-for="message in messages" v-bind:key="message.id" class="message"
           v-bind:class="{ 'status': message.username === null }">
        <div class="username">{{ message.username }}</div>
        <div class="timestamp">{{ formatDate(message.timestamp) }}</div>
        <div class="message-text">{{ message.message }}</div>
      </div>
    </div>
    <div class="input-area">
      <ChatInput />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatInput from './ChatInput.vue';

export default {
  name: 'Chat',
  components: {
    ChatInput,
  },
  computed: mapState(['messages']),
  methods: {
    formatDate: (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleString();
    },
  },
  updated() {
    this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
  },
};
</script>

<style scoped lang="scss">
@import '../scss/base.scss';

.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;

  .messages {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    overflow-y: auto;
    padding-bottom: 10px;

    .message {
      &:first-child {
        padding-top: 40px;
        margin-top: auto;
      }

      .username, .timestamp {
        display: inline-block;
      }

      .username {
        font-weight: 600;
        padding: 0 10px 0 15px;
      }

      .timestamp {
        font-size: 0.9em;
        font-style: italic;
        color: $secondary;
      }

      .message-text {
        padding: 10px 15px 18px;
      }
    }

    .message.status {
      .username {
        padding-right: 0;
      }

      .message-text {
        font-style: italic;
        color: $secondary;
      }
    }
  }

  .input-area {
    height: 75px;
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
