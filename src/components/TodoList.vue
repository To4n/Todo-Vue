<template>
  <div>
    <input 
        type="text" 
        class="todo-input" 
        placeholder="What needs to be done?"
        v-model="newTodo" 
        @keyup.enter="addTodo"
    >
    <div 
        v-for="(todo, index) in todosFiltered"
        :key="todo.id"
        class="todo-item"
    >
        <div class="todo-item-left">
            
            <div 
                class="todo-item-label"
                :class="{completed  : todo.completed}"
                v-if="!todo.editing"
                @dblclick="editTodo(todo)"
            >
                <input 
                type="checkbox"
                v-model="todo.completed"
                >
                {{todo.title}}  
            </div>
            <input
                v-else
                type="text"
                class="todo-item-edit"
                v-model="todo.title"
                @blur="doneTodo(todo)"
                @keyup.enter="doneTodo(todo)"
                @keyup.esc="cancelEdit(todo)"
                v-focus
            >    
        </div>
        
        <div class="remove-todo" @click="removeTodo(index)">
            &times;
        </div>

    </div>
    <div 
        class="extra-container">
        <div>
            <label>
                <input 
                    type="checkbox"
                    :checked="!anyRemaining"
                    @change="checkAllTodos"
                >
                    Check all
            </label>
        </div>
        <div>{{remaining}} item left</div>
    </div>
    <div class="extra-container">
        <div>
            <button 
            :class="{active: filter == 'all'}"
            @click="filter = 'all'"
            >All
            </button>
            <button 
            :class="{active: filter == 'active'}"
            @click="filter = 'active'"
            >Active
            </button>
            <button 
            :class="{active: filter == 'completed'}"
            @click="filter = 'completed'"
            >Completed
            </button>

        </div>
        <div>
            <button 
                v-if="showClearCompletedButton"
                @click="clearCompleted"
            >Clear completed
            </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo-list',
  data(){
      return{
          newTodo: '',
          idForTodo: 3,
          beforeEditCache : '',
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

      }
      
  },
  computed:{
      remaining(){
          return this.todos.filter(todo => !todo.completed).length
      },
      anyRemaining(){
          return this.remaining != 0 
      },
      todosFiltered(){
          if(this.filter == 'all'){
              return this.todos
          } else if (this.filter == 'active'){
              return this.todos.filter(todo => !todo.completed)
          } else if (this.filter == 'completed'){
              return this.todos.filter(todo => todo.completed)
          }
          return this.todos

      },
      showClearCompletedButton(){
          return this.todos.filter(todo => todo.completed).length > 0
      }
  },
  directives: {
    focus: {
        // directive definition
        inserted: function (el) {
        el.focus()
        }
    }
   },
  methods:{
      addTodo(){
          if(this.newTodo.trim().length == 0){
              return
          }
          this.todos.push({
              id: this.idForTodo,
              title: this.newTodo,
              completed: false,
              editing: false
          })

        this.newTodo =''
        this.idForTodo++
      },
      removeTodo(index){
          this.todos.splice(index,1)
      },
      editTodo(todo){
          this.beforeEditCache = todo.title
          todo.editing =true
      },
      doneTodo(todo){
          if(todo.title.trim() == ''){
              todo.title = this.beforeEditCache
          }
          todo.editing = false
      },
      cancelEdit(todo){
          todo.editing = false
          todo.title = this.beforeEditCache
      },
      checkAllTodos(){
          this.todos.forEach((todo) => todo.completed = event.target.checked)
      },
      clearCompleted(){
          this.todos = this.todos.filter(todo => !todo.completed)
      }
  }
}
</script>


<style> 
    .todo-item{
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .remove-todo{
        cursor: pointer;
        margin-left: 14px;
        
    }
    .remove-todo:hover{
            color: black;
    }
    .todo-item-edit{
        font-size: 24px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px bold #ccc;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    .todo-item-edit:hover{
        outline: none;
    }

    .completed{
        text-decoration: line-through;
        color: gray;
    }

    .extra-container{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgray;
        padding-top: 14px;
        margin-bottom: 14px;

    }

    button{
        font-size: 14px;
        background-color: white;
        appearance: none;
    }

    button:hover{
        background: lightgreen;
    }

    button:focus{
        outline: none;
    }  

    .active{
        background: lightgreen; 
    }
    
</style>
