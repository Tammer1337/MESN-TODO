<script>
    import { onMount } from "svelte";
    import axios from "axios";

    import Header from "../components/header.svelte";

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

<Header />

<!-- TODO: Add a form to add a new todo -->
<!-- TODO: Style the Todo Component -->
{#each todos as todo }
    <h3>{todo.title}</h3>
    <p>{todo.description}</p>
{/each}
