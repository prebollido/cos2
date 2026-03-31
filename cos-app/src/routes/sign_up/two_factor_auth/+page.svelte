<script>
    import { goto } from '$app/navigation';

    let code = $state('');
    let tempUserId = $state('');
    let qrCode = $state('');
    let codeMatch = $state('');
    let noCode = $state('');
    let noUser = $state('');
    let notVerified = $state('');


    const params = new URL(window.location.href).searchParams;
    tempUserId = params.get('tempUserId') || '';
    qrCode = params.get('qrCode') || '';

    async function verify2FA() {
        if (!tempUserId) {
            noUser = true;
            return;
        }
        else{
            noUser = false;
        }

        if (!code || code.length !== 6) {
            noCode = true;
            return;
        }
        else{
            noCode = false;
        }

        try {
            const verifyRes = await fetch('/sign_up/finalize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tempUserId, code })
            });

            const verifyResult = await verifyRes.json();

            if (!verifyResult.success) {
                notVerified = true;
                return;
            }
            else{
                notVerified = false;
            }

            goto('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Server error during 2FA');
        }
    }
</script>


<section id="main" class="flex flex-col items-center justify-center mt-20">
    <img src="/images/logo.svg" alt="logo" class="w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto mt-25"/>
    <div class="flex flex-col items-center w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto">
        {#if qrCode}
            <div class="my-4 p-3 border rounded-lg">
                <img src={qrCode} alt="2FA QR code" class="mx-auto" />
            </div>
            <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                Scan the QR code with your authenticator app of choice.
            </p>
        {/if}
        <div id="log-in" class=" px-2 w-80">
            <h3 class="text-lg sm:text-base md:text-base lg:text-lg font-bold text-left pl-2 py-1 font-Inter">
                Enter six digit code:
            </h3>
            <input
                type="text"
                bind:value={code}
                placeholder=""
                class="border rounded-3xl my-2 w-full"
            />
            {#if noCode}
                <p class="text-xs sm:text-[10px] md:text-[10px] lg:text-xs text-left pl-2 font-Inter text-[#ff0000]">
                        Please enter a six-digit code.
                </p>
            {:else if noUser}
                <p class="text-xs sm:text-[10px] md:text-[10px] lg:text-xs text-left pl-2 font-Inter text-[#ff0000]">
                        Invalid Sign up. Please return to sign up page.
                </p>
            {:else if notVerified}
                <p class="text-xs sm:text-[10px] md:text-[10px] lg:text-xs text-left pl-2 font-Inter text-[#ff0000]">
                        Verification error or code does not match.
                </p>
            {/if}
            <button onclick={verify2FA} class="rounded-3xl my-2 w-full bg-[#d9d9d9] text-lg sm:text-sm md:text-sm lg:text-base font-bold p-2 py-3 font-Inter">
                Next
            </button>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                <a href="/sign_up" class="underline">Return to sign up</a>
            </p>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                Have an account? <a href="/" class="underline">Log in</a>
            </p>
        </div>
        
    </div>
</section>