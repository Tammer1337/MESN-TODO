<script>
    import { onMount } from "svelte";
    import axios from "axios";

    import Header from "../components/header.svelte";
    
    // Get all todos from the server if the user is logged in
    let todos = [];
    
    // Startup / onLoad function
    onMount(async () => {
      if(localStorage.getItem("token")) {
        getTodos()
      }
    })

    // API request to get all todos
    async function getTodos() {
      const response = await axios({
      method: "GET",
      url: "http://localhost:5000/api/todos/",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      todos = response.data
      todos = todos.filter(todo => todo.completed === false)
      todos = todos.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
    }

    // Add new todo to the list with form validation
    let fields = {title: "",description: ""}
    let errors = {title: "",description: ""}
    let valid = false
    const submitHandler = () => {
      valid = true
      // Title validation
      if(fields.title.trim().length < 3){
        valid = false
        errors.title = "Title must be at least 3 characters long"
      } else {
        errors.title = ""
      }

      // Description validation
      if(fields.description.trim().length < 3){
        valid = false
        errors.description = "Description must be at least 3 characters long"
      } else {
        errors.description = ""
      }

      // If valid, submit
      if(valid){
        axios({
          method: "POST",
          url: "http://localhost:5000/api/todos/",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          data: {title: fields.title, description: fields.description}
        })
        .then(res => {
          todos = [...todos, res.data]
          todos.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1)
          fields = {title: "",description: ""}
        })
        .catch(err => console.log(err))
      }
    }

    // Set Todo completed
    async function completeTodo(e){
      let todoItem = todos.filter(todo => todo._id === e.target.id)[0]
      if(!todoItem) return
      let newVal = todoItem.completed = !todoItem.completed
      todos = todos.map(todo => {
        if(todo._id === e.target.id){
          todo.completed = newVal
        }
        return todo
      })
      await axios({
        method: "PUT",
        url: `http://localhost:5000/api/todos/${e.target.id}`,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        data: {completed: newVal}
      })
      todos = todos.filter(todo => todo.completed === false)
    }
</script>

<Header />

<!-- TODO: Style the Todo Component -->
<div class="min-h-full flex flex-col items-left justify-center py-12 px-4 sm:px-6 lg:px-8">
  <form on:submit|preventDefault={submitHandler} class="w-full mt-0 mb-4 m-auto text-center">
    <div class="mt-5 text-left">
      <label for="title" class="mt-2 text-left">Todo Title</label>
      <input type="text" id="title" bind:value="{fields.title}" class="w-full rounded-md border border-gray-200 px-2">
      <div class="font-bold text-xs text-red-500">{errors.title}</div>
    </div>
    <div class="mt-5 mb-5 text-left">
      <label for="description" class="mt-2 text-left">Description</label>
      <textarea id="description" bind:value="{fields.description}" class="w-full rounded-md border border-gray-200 px-2"></textarea>
      <div class="font-bold text-xs text-red-500">{errors.description}</div>
    </div>
      <button class=" bg-green-500 hover:bg-green-400 w-full rounded-md h-7 shadow-sm text-white font-bold">Add +</button>
  </form>
  <hr class="pb-2">
  {#each todos as todo }
  <div class="flex flex-col pt-2 pl-2 pb-2 my-2 justify-between border border-gray-300 rounded-md hover:bg-gray-100">
      <h3 class="text-2xl font-bold pb-2">{todo.title}</h3>
      <div class="flex flex-row justify-between align-middle">
        <p class="w-auto">{todo.description}</p>
        <button class="cursor-pointer text-2xl text-rightrounded-md" id="{todo._id}" on:click|preventDefault={completeTodo}>✅</button>
      </div>

  </div>
  {/each}
</div>
