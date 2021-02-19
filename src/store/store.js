import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        filter: 'all',
        todos: [
            {
                'id': 1,
                'title': 'Do laundry',
                'completed': false, 
                'editing': false  
            },
            {
                'id': 2,
                'title': 'Sleep',
                'completed': false,  
                'editing': false 
            }
        ]
    },
    getters:{
        remaining(state){
            return state.todos.filter(todo => !todo.completed).length
        },
        anyRemaining(state,getters){
            return getters.remaining != 0 
        },
        todosFiltered(state){
            if(state.filter == 'all'){
                return state.todos
            } else if (state.filter == 'active'){
                return state.todos.filter(todo => !todo.completed)
            } else if (state.filter == 'completed'){
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos
  
        },
        showClearCompletedButton(state){
            return state.todos.filter(todo => todo.completed).length > 0
        }
    },
    mutations:{
        addTodo(state, payload){
            state.todos.push({
                id: payload.id,
                title: payload.title,
                completed: false,
                editing: false

            })
        },
        updateTodo(state, todo) {
            const index = state.todos.findIndex(item => item.id == todo.id)
            state.todos.splice(index, 1, {
              'id': todo.id,
              'title': todo.title,
              'completed': todo.completed,
              'editing': todo.editing,
            })
        },
        clearCompleted(state){
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        removeTodo(state, payload){
            const index = state.todos.findIndex((item) => item.id == payload.id)
            state.todos.splice(index,1)
        },
        
        checkAllTodos(state, payload){
            state.todos.forEach((todo) => (todo.completed = payload))
        },
        updateFilter(state, filter) {
            state.filter = filter
        },

    },
    actions:{
        addTodo(context, payload){
            context.commit('addTodo', payload)
        },
        updateTodo(context, payload) {
              context.commit('updateTodo', payload)
        },
        clearCompleted(context){
            context.commit('clearCompleted')
        },
        removeTodo(context, payload){
            context.commit('removeTodo', payload)
        },
        
        checkAllTodos(context, payload){
            context.commit('checkAllTodos', payload)
        },
        updateFilter(context, filter) {
              context.commit('updateFilter', filter)
          },
    }
})