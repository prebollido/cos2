<script>
    let username = "";
    let password = "";
    import { goto } from '$app/navigation';

    function authenticate() {
        goto('/two_factor_auth');
    }
</script>

<section id="main" class="flex flex-col items-center justify-center mt-20">
    <img src="/images/logo.svg" alt="logo" class="w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto mt-25"/>
    <div class="flex flex-col items-center w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto">
        <div id="log-in" class="py-5 px-2 w-80">
            <h3 class="text-lg sm:text-base md:text-base lg:text-lg font-bold text-left pl-2 py-1 font-Inter">
                Create an account
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
             <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                Re-enter Password
            </p>
            <input
                type="password"
                bind:value={password}
                placeholder=""
                class="border rounded-3xl my-2 w-full"
                />
            <button on:click={authenticate}
                class="rounded-3xl my-2 w-full bg-[#d9d9d9] text-lg sm:text-sm md:text-sm lg:text-base font-bold p-2 py-3 font-Inter">
                Sign Up
            </button>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                Have an account? <a href="/" class="underline">Log in</a>
            </p>
        </div>
        <div id="notice" class="flex justify-center rounded-xl bg-[#d9d9d9] w-120 p-3 mt-5">
            <img src="/images/excla.svg" alt="logo" class="w-[0.5] sm:w-1 md:w-2 lg:w-2 h-auto"/>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                <b>Notice: </b> After sign-up, the account will remain active for five (5) days only.
            </p>
        </div>
        
    </div>
</section>
