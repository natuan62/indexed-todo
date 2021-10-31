<template>
  <Todo />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Todo from './components/Todo.vue';

export default defineComponent({
  components: {
    Todo,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
