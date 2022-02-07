<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" @change="done" v-model="completed" />
      <div
        v-if="!editing"
        :class="{ completed: completed }"
        @dblclick="editTodo"
        class="todo-item-label"
      >
        {{ todo.title }}
      </div>
      <input
        v-else
        v-focus
        class="todo-item-edit"
        @blur="done"
        @keyup.enter="done"
        @keyup.esc="cancelEdit"
        type="text"
        v-model="title"
      />
    </div>
    <div class="remove-item" @click="remove(id)">&times;</div>
  </div>
</template>

<script>
export default {
  name: 'todo-item',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  computed: {
    checkAll() {
      return this.$store.getters.anyRemaining
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ''
    }
  },
  watch: {
    checkAll() {
      this.completed = this.checkAll ? true : this.todo.completed
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    remove(id) {
      this.$store.commit('deleteTodo', id)
    },
    editTodo() {
      this.editing = true
      this.beforeEditCache = this.title
    },
    cancelEdit() {
      this.title = this.beforeEditCache
      this.editing = false
    },
    done() {
      if (this.title.trim() == '') {
        this.title = this.beforeEditCache
      }
      this.editing = false
      this.$store.commit('doneEdit', {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      })


    }
  }
}
</script>