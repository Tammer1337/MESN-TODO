<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let fields = {email: "",password: ""}
  let errors = {email: "",password: "",general: ""}
  let valid = false

  onMount(async () => {
    if(localStorage.getItem("token")) {
      window.location.href = "/dashboard"
    }
  })



  async function loginUser() {
    valid = true
    // Email validation
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fields.email)){
      errors.email = ""
    } else {
      valid = false
      errors.email = "Please enter a valid email"
      return
    }

    try {
      const response = await axios({
      method: "POST",
      url: "http://localhost:5000/api/users/login",
      data: {
        email: fields.email,
        password: fields.password
      }
    });
    if(response.status === 201){
      localStorage.setItem('token', response.data.user.token)
      window.location.href = '/dashboard'
    } 
    } catch (error) {
      errors.general = error.response.data.message
    }
  }
</script>
<div class="flex justify-center h-screen shadow-inherit bg-gray-100 md:bg-[url('../../static/wave-haikei.svg')] bg-[url('../../static/wave-haikei_mobile.svg')] bg-cover">
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-100 p-8 rounded-lg shadow-md h-[459px] space-y-8">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-auto text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form class="mt-8 space-y-6">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" bind:value={fields.email} name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address">
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" bind:value={fields.password} name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Password">
              </div>
            </div>    
              <div class="flex flex-col items-end">
                <div class="text-sm">
                  <a href="/register" class="font-medium text-sky-600 hover:text-sky-500"> No account? Register here!</a>
                </div>
              </div>
              <div class="flex flex-col font-bold text-s text-red-500">
                <p>{errors.email}</p>
                <p>{errors.general}</p>
              </div>    
              <div>
                <button type="submit" on:click|preventDefault={loginUser} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg class="h-5 w-5 text-white-500 group-hover:text-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                  Sign in
                </button>
              </div>
          </form>
        </div>
      </div>
</div>