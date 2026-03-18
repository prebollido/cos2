<script>
  let code = "";
</script>

<section id="main" class="flex flex-col items-center justify-center mt-20">
    <img src="/images/logo.svg" alt="logo" class="w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto mt-25"/>
    <div class="flex flex-col items-center w-16 sm:w-25 md:w-50 lg:w-80 h-auto mx-auto">
        <div id="note" class="rounded-xl bg-[#F0ECE6] w-80 p-3 mt-5">
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-left pl-2 font-Inter">
                The two factor code has been sent.
            </p>
        </div>
        <div id="log-in" class="py-5 px-2 w-80">
            <h3 class="text-lg sm:text-base md:text-base lg:text-lg font-bold text-left pl-2 py-1 font-Inter">
                Enter six digit code:
            </h3>
            <p class="text-small sm:text-xs md:text-xs lg:text-sm text-left pl-2 font-Inter">
                We sent an email which contains the two factor log-in code.
            </p>
            <input
                type="text"
                bind:value={code}
                placeholder=""
                class="border rounded-3xl my-2 w-full"
                />
            <button class="rounded-3xl my-2 w-full bg-[#d9d9d9] text-lg sm:text-sm md:text-sm lg:text-base font-bold p-2 py-3 font-Inter">
                Next
            </button>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-right pl-2 font-Inter">
                Resend code in <b>60s</b>
            </p>
            <p class="text-xs sm:text-xs md:text-xs lg:text-xs text-center pl-2 font-Inter">
                <a href="/sign_up" class="underline">Return to sign up</a>
            </p>
        </div>
        
    </div>
</section>
