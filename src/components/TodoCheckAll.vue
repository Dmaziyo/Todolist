<template>
  <div>
    <input @change="checkAllTodos" type="checkbox" :checked="checkAll" /><label
      for="checkAll"
      >checkAll</label
    >
  </div>
</template>

<script>
export default {
  name: 'todo-check-all',
  computed: {
    checkAll() {
      return this.$store.getters.anyRemaining
    }
  },
  methods: {
    checkAllTodos(e) {
      this.$store.commit('checkAllTodos',e);
    }
  }
}
</script>