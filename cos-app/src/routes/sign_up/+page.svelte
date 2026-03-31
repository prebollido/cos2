<script>
    import { goto } from '$app/navigation';

    let email = $state('');
    let username = $state('');
    let password = $state('');
    let verify_password = $state('');
    let usernameTaken = $state(false);
    let emailTaken = $state(false);
    let notPasswordMatch = $state(false);
    let notFilled = $state(false)

    async function submitForm() {
        if (!username || !password || !verify_password) {
            notFilled = true;
            return;
        }
        else{
            notFilled = false;
        }

        if (password !== verify_password) {
            notPasswordMatch = true;
            return;
        }
        else{
            notPasswordMatch = false;
        }

        try {
            usernameTaken = false;
            emailTaken = false;
            const res = await fetch('/sign_up/temp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, password })
            });

            const result = await res.json();

            if (!result.success) {
                if(result.error === 'Username already taken'){
                    usernameTaken = true;
                }
                if(result.error === 'Email already taken'){
                    emailTaken = true;
                }
                return;
            }

            goto(`/sign_up/two_factor_auth?tempUserId=${result.tempUserId}&qrCode=${encodeURIComponent(result.qrCode)}`);
        } catch (err) {
            console.error(err);
            alert('Server error saving temp user');
        }
    }
</script>

<section id="main" class="flex flex-col items-center justify-center mt-20">
    <img src="/images/logo.svg" alt="logo" class="w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto mt-25"/>
    <div class="flex flex-col items-center w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto">
        {#if usernameTaken}
            <div id="username_taken" class= "rounded-3xl bg-[#FF9595] w-80 p-3 mt-5">
                <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center font-bold font-Inter">
                    Username is already taken
                </p>
            
            </div>
        {:else if emailTaken}
            <div id="username_taken" class= "rounded-3xl bg-[#FF9595] w-80 p-3 mt-5">
                <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center font-bold font-Inter">
                    Email is already taken
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
                Create an account
            </h3>
                <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                    Email
                </p>
                <input
                    type="text"
                    bind:value={email}
                    placeholder=""
                    class="border rounded-3xl my-2 w-full"
                    />
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
                {#if notPasswordMatch}
                    <input
                        type="password"
                        bind:value={verify_password}
                        placeholder=""
                        class="border rounded-3xl my-2 w-full border-[#ff0000]"
                        />
                    <p class="text-xs sm:text-[10px] md:text-[10px] lg:text-xs text-left pl-2 font-Inter text-[#ff0000]">
                        Password does not match!
                    </p>
                {:else}
                    <input
                        type="password"
                        bind:value={verify_password}
                        placeholder=""
                        class="border rounded-3xl my-2 w-full"
                        />
                {/if}
                <button onclick={submitForm}
                    type="submit"
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
