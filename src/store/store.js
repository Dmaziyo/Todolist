import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todos: [
            {
                id: 1,
                title: 'Finish Vue Screencast',
                completed: false,
                editing: false
            },
            {
                id: 2,
                title: 'Take over the world',
                completed: false,
                editing: false
            }
        ],
        filter: 'all',
        idForTodo: 3,
    },
    getters: {
        anyRemaining(state, getters) {
            return getters.remaining == 0
        },
        remaining(state) {
            return state.todos.filter((item) => {
                return !item.completed
            }).length
        },
        filter_todo(state) {
            switch (state.filter) {
                case 'all':
                    return state.todos

                case 'Active':
                    return state.todos.filter((item) => {
                        return !item.completed
                    })

                case 'Completed':
                    return state.todos.filter((item) => {
                        return item.completed
                    })
            }
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push(todo);
        },
        ClearCompleted(state) {
            state.todos = state.todos.filter((item) => {
                return !item.completed
            })
        },
        change(state, filter) {
            state.filter = filter
        },
        checkAllTodos(state, e) {
            state.todos.forEach((item) => {
                item.completed = e.target.checked
            })
        },
        deleteTodo(state, id) {
            const index = state.todos.findIndex((item) => item.id == id)
            state.todos.splice(index, 1)
            state.idForTodo--
        },
        doneEdit(state, todo) {
            let index = state.todos.findIndex(
                (item) => item.id == todo.id
            )
            state.todos.splice(index, 1, todo)
        }
    }
})