<template>
  <div>
    <input 
        type="text" 
        class="todo-input" 
        placeholder="What needs to be done?"
        v-model="newTodo" 
        @keyup.enter="addTodo"
    >
    <div v-if="$store.state.loading" class="lds-ripple"><div></div><div></div></div>
    <todo-item 
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
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
            @click="changeFilter('all')"
            >All
            </button>
            <button 
            :class="{active: filter == 'active'}"
            @click="changeFilter('active')"
            >Active
            </button>
            <button 
            :class="{active: filter == 'completed'}"
            @click="changeFilter('completed')"
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
  created(){
      this.$store.dispatch('retrieveTodos')
  },
  data(){
      return{
          newTodo: '',
          idForTodo: 3,
      }
      
  },
  computed:{
      remaining(){
          return this.$store.getters.remaining
      },
      filter(){
          return this.$store.state.filter
      },
      anyRemaining(){
          return this.$store.getters.anyRemaining
      },
      todosFiltered(){
          return this.$store.getters.todosFiltered

      },
      showClearCompletedButton(){
          return this.$store.getters.showClearCompletedButton
      }
  },
  
  methods:{
      addTodo(){
          if(this.newTodo.trim().length == 0){
              return
          }
          this.$store.dispatch('addTodo',{
              id: this.idForTodo,
              title: this.newTodo
          })

        this.newTodo =''
        this.idForTodo++
      },
      
      checkAllTodos(){
          this.$store.dispatch('checkAllTodos', event.target.checked)
      },
      clearCompleted(){
          this.$store.dispatch('clearCompleted')
      },
      changeFilter(filter){
          this.$store.dispatch('updateFilter', filter)
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
    /* Css loader  */
    .lds-ripple {
        display: block;
        position: relative;
        width: 80px;
        height: 80px;
        margin: auto;
    }
    .lds-ripple div {
        position: absolute;
        border: 4px solid green;
        opacity: 1;
        border-radius: 50%;
        animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
        animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
    0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
}

    
</style>
