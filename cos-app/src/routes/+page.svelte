<script>
  let username = "";
  let password = "";
</script>

<section id="main" class="flex items-center justify-center min-h-screen">
    <div class="flex flex-col items-center w-16 sm:w-25 md:w-50 lg:w-100 h-auto mx-auto">
        <img src="/images/logo.svg" alt="logo" class="w-16 sm:w-25 md:w-50 lg:w-100 h-auto mx-auto"/>
        <div id="log-in" class="py-5 px-2 w-100">
            <h3 class="text-lg sm:text-base md:text-base lg:text-lg font-bold text-left pl-2 py-1 font-Inter">
                Log in to your account
            </h3>
            <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                Username
            </p>
            <input
                type="text"
                bind:value={username}
                placeholder=""
                class="border rounded-3xl my-2 w-full"
                />
            <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                Password
            </p>
            <input
                type="password"
                bind:value={password}
                placeholder=""
                class="border rounded-3xl my-2 w-full"
                />
                <button class="rounded-3xl my-2 w-full bg-[#d9d9d9] text-lg sm:text-sm md:text-sm lg:text-base font-bold p-2 py-3 font-Inter">
                    Sign in to your account
                </button>
            <img src="/images/or_line.svg" alt="orl" class="w-16 sm:w-25 md:w-50 lg:w-100 h-auto mx-auto"/>
            <img src="/images/google_log.svg" alt="orl" class="w-16 sm:w-25 md:w-50 lg:w-100 h-auto mx-auto py-2"/>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                Don't have an account yet? <a href="/sign_up" class="underline">Create an account</a>
            </p>
        </div>
        
    </div>
</section>
