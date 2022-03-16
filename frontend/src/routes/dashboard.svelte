<script>
    import { onMount } from "svelte";
    import axios from "axios";

    let todos = [];
    onMount(async () => {
    if(localStorage.getItem("token")) {
      getTodos()
    }
  })

    async function getTodos() {
      const response = await axios({
      method: "GET",
      url: "http://localhost:5000/api/todos/",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    todos = response.data
    console.log(todos)
    }
  

</script>

<h1>Dashboard</h1>
{#each todos as todo }
    <h3>{todo.title}</h3>
    <p>{todo.description}</p>
{/each}
