<template>
  <div>
    <v-container id="terminal-window" @click="focusTerminal">
      <div
          v-for="(line, index) in lines"
          :key="index"
        >
        <span v-if="line.path" class="user">{{ user }}</span><span v-if="line.path">{{ ':' }}</span>
        <span
          v-if="line.path"
          class="path"
        >
          {{ `${line.path} $` }}
        </span>
        <span class="message">{{ line.message }}</span>
        <span width="100%" v-if="line.path && index === lines.length - 1 && isTerminalFocused && !isTerminalLoading" class="cursor">&nbsp;</span>
      </div>
    </v-container>
    <div>
      <input
        id="command-input"
        ref="command"
        v-model="command"
        :autofocus="true"
        v-on:focus="handleTerminalFocus"
        v-on:blur="handleTerminalBlur"
        type="text"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Terminal',

    created() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.isTerminalFocused && !this.isTerminalLoading) {
          this.isTerminalLoading = true;
          // manage this.command
          this.lines.push({});
          this.command = '';
          this.isTerminalLoading = false;
        }
      });
    },

    data: () => ({
      lines: [
        {
          message: 'cd /directory',
          path: '~',
        }, 
        {
          message: 'ls',
          path: '~/directory',
        },
        {
          message: 'file1\tfile2\tfile3',
        },
        {
          message: '',
          path: '~',
        },
      ],
      user: 'jonathan@github',
      command: '',
      isTerminalFocused: true,
      isTerminalLoading: false,
    }),

    watch: {
      command: function (newVal) {
        this.lines[this.lines.length - 1].message = newVal;
      },
    },

    methods: {
      focusTerminal() {
        this.$refs.command.focus();
        this.isTerminalFocused = true;
      },

      handleTerminalFocus() {
        this.isTerminalFocused = true;
      },

      handleTerminalBlur() {
        this.isTerminalFocused = false;
      },
    },
  }
</script>
<style>
  #terminal-window {
    background-color: rgb(43, 42, 42);
    color: rgb(240, 240, 240);
    font-family: 'Menlo';
  }

  .user {
    color: rgb(0, 255, 0);
  }

  .path {
    color: rgb(5, 134, 255);
  }

  .cursor {
    background-color: rgb(240, 240, 240);
    animation: blink 1s step-end infinite;
  }
  
  .message {
    white-space: break-spaces;
    overflow-wrap: anywhere;
    word-break: break-all;
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  #command-input {
    position: absolute;
    width: 0px;
    opacity: 0;
    cursor: default;
  }
</style>