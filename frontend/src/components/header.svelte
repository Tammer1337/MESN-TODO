<script>
    import { user } from "../stores";
    // @ts-ignore
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

/* TODO: get rid of the LocalStorage  */

    onMount (async () => {
        if(localStorage.getItem("token")){
            user.set(true)
        } 
    })

    function handleLogout() {
        localStorage.removeItem("token")
        user.set(false)
        goto("/")
    }
</script>

<header class="bg-gray-200 h-auto">
    <div class="flex flex-row items-center justify-between">
        <div class="flex flex-row items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            <h1 class="text-4xl font-semibold"> Todist </h1>
        </div>
        <div class="">
                <button on:click={handleLogout} class="bg-red-600 hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 px-3 py-2 mx-2 my-2 rounded-md text-white">Log Out</button>
        </div>
    </div>
</header>