import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loading: true,
        filter: 'all',
        todos: []
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
        retrieveTodos(state, payload){
            state.todos = payload
        },
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
        retrieveTodos(context){
            context.state.loading = true
            db.collection('tasks').orderBy("timestamp","desc").get()
            .then(querySnapshot =>{
                let tempTodos = []
                querySnapshot.forEach(doc => {
                    const data = {
                        id: doc.id,
                        title: doc.data().title,
                        completed: doc.data().completed,
                        timestamp: doc.data().timestamp
                    }
                    tempTodos.push(data)
                })
                context.state.loading = false
                context.commit('retrieveTodos', tempTodos)
            })
        },
        addTodo(context, payload){
            db.collection('tasks').add({
                title: payload.title,
                completed: false,
                timestamp: new Date()
            })
            .then(docRef => {
                context.commit('addTodo',{
                    id: docRef.id,
                    title: payload.title,
                    completed: false,
                    timestamp: new Date()
                })
            })
            
        },
        updateTodo(context, payload) {
              db.collection('tasks').doc(payload.id).update({
                  title: payload.title,
                  completed: payload.completed,
                  timestamp: new Date(),
              })
              .then(() =>{
                  context.commit('updateTodo',{
                      id: payload.id,
                      title: payload.title,
                      completed: payload.completed,
                      timestamp: new Date()
                  })
              })
        },
        clearCompleted(context){
            db.collection('tasks').where('completed', '==', true).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc =>{
                    doc.ref.delete()
                    .then(() => {
                        context.commit('clearCompleted')
                    })
                })
                
            })
        },
        removeTodo(context, payload){
            db.collection('tasks').doc(payload).delete()
            .then(() => {
                context.commit('removeTodo', payload)
            })
        },
        
        checkAllTodos(context, payload){
            db.collection('tasks').get()
            .then(querySnapshot => { 
                querySnapshot.forEach(doc =>{
                    doc.ref.update({
                        completed: payload
                    })
                })
                .then(() => {
                    context.commit('checkAllTodos', payload)
                })
            })
        },
        updateFilter(context, filter) {
              context.commit('updateFilter', filter)
          },
    }
})