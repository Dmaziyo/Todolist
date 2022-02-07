<template>
  <div>
    <input
      type="text"
      class="todo-input"
      v-model="newTodo"
      @keyup.enter="addTodo"
      placeholder="What needs to be done"
    />
    <todo-item
      v-for="todo in filter_todo"
      @keyup.enter="addTodo"
      :key="todo.id"
      :todo="todo"
    >
    </todo-item>
    <div class="extra-container">
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>
    <div class="extra-container">
      <todo-filtered></todo-filtered>
      <todo-clear-completed></todo-clear-completed>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
  name: 'todo-list',
  components: {
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: '',
      beforeEditCache: '',
      filter: 'all'
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) return
      this.$store.commit('addTodo', {
        id: this.$store.state.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })
      this.newTodo = ''
      this.$store.state.idForTodo++
      console.log(this.$store.state.todos)
    }
  },
  computed: {

    filter_todo() {
      return this.$store.getters.filter_todo
    }
  }
}
</script>


<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;

  &:focus {
    outline: 0;
  }
}
.todo-item {
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  justify-content: space-between;
}
.remove-item {
  cursor: pointer;
  &:hover {
    color: black;
  }
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  &:focus {
    outline: none;
  }
}
.todo-item-left {
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.completed {
  text-decoration: line-through;
}
.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  margin-bottom: 14px;
  padding-top: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid gray;
}
.active {
  background-color: lightgreen;
}
</style>
