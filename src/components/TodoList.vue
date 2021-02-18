<template>
  <div>
    <input 
        type="text" 
        class="todo-input" 
        placeholder="What needs to be done?"
        v-model="newTodo" 
        @keyup.enter="addTodo"
    >
    <todo-item 
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
        @removedTodo="removeTodo"
        @finishedTodo="finishedTodo"
        :checkAll="!anyRemaining"
    >
        

    </todo-item>
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
import TodoItem from './TodoItem'

export default {
  name: 'todo-list',
  components:{
      TodoItem
  },
  data(){
      return{
          newTodo: '',
          idForTodo: 3,
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
  
  methods:{
      addTodo(){
          if(this.newTodo.trim().length == 0){
              return
          }
          this.todos.push({
              id: this.idForTodo,
              title: this.newTodo,
              completed: false,
          })

        this.newTodo =''
        this.idForTodo++
      },
      removeTodo(id){
          const index = this.todos.findIndex((item) => item.id == id)
          this.todos.splice(index,1)
      },
      
      checkAllTodos(){
          this.todos.forEach((todo) => todo.completed = event.target.checked)
      },
      clearCompleted(){
          this.todos = this.todos.filter(todo => !todo.completed)
      },
      finishedTodo(data){
          const index = this.todos.findIndex((item) => item.id == data.id)
          this.todo.splice(index, 1, data.todo)
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
