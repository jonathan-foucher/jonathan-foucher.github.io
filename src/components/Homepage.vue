<template>
  <v-container>
    <p>
      Actually building the website. Please come back later :)
    </p>
    <Terminal/>
  </v-container>
</template>

<script>
import Terminal from './Terminal';

  export default {
    name: 'Homepage',

    components: {
      Terminal,
    },

    data: () => ({}),
  }
</script>
