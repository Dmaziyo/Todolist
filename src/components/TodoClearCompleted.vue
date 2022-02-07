<template>
  <div><button @click="ClearCompleted">Clear Completed</button></div>
</template>

<script>
export default {
  name: 'todo-clear-completed',
  methods: {
    ClearCompleted() {
      this.$store.commit('ClearCompleted');
    }
  }
}
</script>