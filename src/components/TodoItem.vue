<template>
    <div class="todo-item">
        <div class="todo-item-left">
            
            <div 
                class="todo-item-label"
                :class="{completed  : completed}"
                v-if="!editing"
                @dblclick="editTodo"
            >
                <input 
                type="checkbox"
                v-model="completed"
                >
                {{title}}  
            </div>
            <input
                v-else
                type="text"
                class="todo-item-edit"
                v-model="title"
                @blur="doneTodo"
                @keyup.enter="doneTodo"
                @keyup.esc="cancelEdit"
                v-focus
            >    
        </div>
        
        <div class="remove-todo" @click="removeTodo(index)">
            &times;
        </div>
    </div>
</template>

<script>
export default {
    name : "todo-item",
    props: {
        todo: {
            type: Object,
            required: true,

        },
        index: {
            type: Number,
            required: true,

        }
    },
    data(){
        return{
            'id' : this.todo.id,
            'title': this.todo.title,
            'completed': this.todo.completed,
            'editing': this.todo.editing,
            'beforeEditCache': '',
        }
    },
    method:{
        removeTodo(index) {
            this.$emit('removedTodo', index)
        },
        editTodo(){
          this.beforeEditCache = this.title
          this.editing =true
        },
        doneTodo(){
          if(this.title.trim() == ''){
              this.title = this.beforeEditCache
          }
          this.editing = false
          this.$emit('finishedEdit',{
              'index': this.index,
              'todo': {
                  'id': this.id,
                  'title': this.title,
                  'completed': this.completed,
                  'editing': this.editing,
              }

          })
        },
        cancelEdit(){
            this.editing = false
            this.title = this.beforeEditCache
        },
    }
}
</script>