
<script>
  import axios from "axios";

  let name, email, password, confirmPassword;

  async function registerUser() {
    if(password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:5000/api/users/",
        data: {
          name,
          email,
          password,
          confirmPassword
        }
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.user.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  }

</script>

<div class="flex justify-center h-screen shadow-inherit bg-gray-100 md:bg-[url('../../static/wave-haikei.svg')] bg-[url('../../static/wave-haikei_mobile.svg')] bg-cover">
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-100 p-8 rounded-lg shadow-md max-w-md w-full space-y-8">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-auto text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
          </div>
          <form class="mt-8 space-y-6" action="#" method="POST">
            <div class="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="name" class="sr-only">Your name</label>
                <input id="name" bind:value={name} name="name" type="text" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Your name">
              </div>
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" bind:value={email} name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Email address">
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input id="password" bind:value={password} name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Password">
              </div>
              <div>
                <label for="password2" class="sr-only">Confirm Password</label>
                <input id="password2" bind:value={confirmPassword} name="password2" type="password"  required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm" placeholder="Confirm password">
              </div>
            </div>
      
            <div class="flex items-center justify-end">
              <div class="text-sm">
                <a href="/" class="font-medium text-sky-600 hover:text-sky-500"> Already have an account? Log in.</a>
              </div>
            </div>
      
            <div>
              <button on:click|preventDefault={registerUser} type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Heroicon name: solid/lock-closed -->
                  <svg class="h-5 w-5 text-white-500 group-hover:text-sky-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
</div>