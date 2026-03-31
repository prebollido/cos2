<script>
    import { goto } from '$app/navigation';

    let username = $state('');
    let password = $state('');
    let wrongPassword = $state('');
    let noUser = $state('');
    let notFilled = $state('');

    async function log_in() {
        if (!username || !password) {
            notFilled = true;
            return;
        }
        else{
            notFilled = false;
        }
        const res = await fetch('/log_in/temp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username, password})
        });

        const result = await res.json();
        wrongPassword = false;
        noUser = false;
        if (result.success){
            if (result.requires2FA) {
                await goto(`/log_in/two_factor_auth?userID=${result.userID}`);
            }
            else{
                alert('enable 2fa!');
                return;
            }
        }
        else{
            if (result.error === 'no user'){
                noUser = true;
            }
            else if (result.error === 'wrong password'){
                wrongPassword = true;
            }
            return;
        }
    }
</script>
<section id="main" class="flex flex-col items-center justify-center mt-45">
    <img src="/images/logo.svg" alt="logo" class="w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto"/>
    <div class="flex flex-col items-center w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto">
        {#if noUser}
            <div id="username_taken" class= "rounded-3xl bg-[#FF9595] w-80 p-3 mt-5">
                <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center font-bold font-Inter">
                    Account does not exist or account expired.
                </p>
            </div>
        {:else if notFilled}
            <div id="not_filled" class= "rounded-3xl bg-[#FF9595] w-80 p-3 mt-5">
                <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center font-bold pl-2 font-Inter">
                    Please fill all fields.
                </p>
            </div>
        {/if}
        <div id="log-in" class="py-5 px-2 w-80">
            <h3 class="text-lg sm:text-base md:text-base lg:text-lg font-bold text-left pl-2 py-1 font-Inter">
                Log in to your account
            </h3>
            <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                Username or Email
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
            {#if wrongPassword}
                <input
                    type="password"
                    bind:value={password}
                    placeholder=""
                    class="border rounded-3xl my-2 w-full border-[#ff0000]"
                />
                <p class="text-xs sm:text-[10px] md:text-[10px] lg:text-xs text-left pl-2 font-Inter text-[#ff0000]">
                    Incorrect password!
                </p>
            {:else}
                <input
                    type="password"
                    bind:value={password}
                    placeholder=""
                    class="border rounded-3xl my-2 w-full"
                />
            {/if}
                <button onclick={log_in} class="rounded-3xl my-2 w-full bg-[#d9d9d9] text-lg sm:text-sm md:text-sm lg:text-base font-bold p-2 py-3 font-Inter">
                    Sign in to your account
                </button>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                Don't have an account yet? <a href="/sign_up" class="underline">Create an account</a>
            </p>
        </div>
    </div>
</section>
