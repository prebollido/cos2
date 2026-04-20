<script>
    // for local testing only
    let isGenerated = $state(false); 
    let sidebarOpen = $state(false); 

    // Simple function to simulate generation for testing
    function simulateGeneration() {
        setTimeout(() => {
            isGenerated = true;
        }, 3000);
    }
    
    // Run simulation on mount
    simulateGeneration();
</script>

<div class="flex flex-col min-h-screen font-Inter bg-white relative">
    
    <header class="flex justify-between items-center px-8 lg:px-12 xl:px-24 py-6 bg-white border-b border-gray-200">
        <a href="/dashboard" class="hover:opacity-50 transition-opacity">
            <img src="/images/logo.svg" alt="Certificate of Service Logo" class="h-15 w-auto" />
        </a>
        <a href="/" class="text-base font-bold text-black hover:underline">Logout</a>
    </header>
    
    <div class="grid grid-cols-1 {sidebarOpen ? 'lg:grid-cols-[1fr_250px]' : ''} grow relative">
        
        {#if !sidebarOpen}
            <div class="absolute top-8 right-8 lg:right-12 xl:right-24 z-20">
                <button onclick={() => sidebarOpen = true} class="cursor-pointer hover:opacity-80 transition-all p-0">
                    <img src="/images/bar.svg" alt="Open Menu" class="w-15 h-auto" />
                </button>
            </div>
        {/if}

        <main class="py-8 px-8 lg:px-12 xl:px-24 bg-white flex flex-col items-center justify-center text-center">
            
            <h1 class="text-3xl font-bold mb-12 text-black">
                {isGenerated ? 'JSON has been exported!' : 'Exporting Certificate in JSON file...'}
            </h1>
            
            <div class="relative mb-12">
                <img 
                    src="/images/json_design.svg" 
                    alt="JSON Design" 
                    class="w-80 h-auto mx-auto transition-all duration-500 {isGenerated ? 'opacity-100' : 'animate-pulse opacity-50 opacity-100 opacity-50'}" 
                />
            </div>
            
            <div class="min-h-[100px]">
                {#if isGenerated}
                    <button class="bg-[#ebe6e0] border border-gray-400 px-10 py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-sm">
                        <p class="text-xs text-gray-600 m-0">Progress has been saved</p>
                        <p class="text-xl font-bold text-black m-0">Click Here to Download</p>
                    </button>
                {/if}
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-end md:items-center mt-auto w-full pt-16">
                <div class="flex gap-2 mb-4 md:mb-8 -ml-4">
                    <img src="/images/dashdot_design.svg" alt="dashdot design" class="h-5 w-auto" />
                </div>
                <div class="text-[10px] sm:text-xs text-black border-t border-black pt-1 w-full md:w-[600px] text-right">
                    Certificate of Service Website for CS 173 Cloud Computing [Group COS 2]
                </div>
            </div>
        </main>
        
        {#if sidebarOpen}
            <aside class="bg-[#d9d9d9] p-6 border-l border-gray-300 flex flex-col min-h-full">
                
                <div class="flex justify-end w-full mb-8">
                    <button onclick={() => sidebarOpen = false} class="cursor-pointer hover:opacity-80 transition-all p-0">
                        <img src="/images/bar.svg" alt="Close Menu" class="w-15 h-auto" />
                    </button>
                </div>

                <a href="/dashboard" class="block bg-[#d9d9d9] p-2 hover:bg-gray-200 transition-colors text-left no-underline cursor-pointer">
                    <div class="flex items-center gap-1">
                        <span class="w-1.5 h-12 bg-gray-500"></span>
                        <div class="flex flex-col">
                            <h2 class="text-base font-bold text-black m-0 leading-tight">Create New Certificate</h2>
                            <p class="text-[10px] text-black m-0 leading-tight">Fill-up a new certificate</p>
                        </div>
                    </div>
                </a>

                <button class="bg-[#d9d9d9] p-2 text-left hover:bg-gray-200 transition-colors">
                    <div class="flex items-center gap-1">
                        <span class="w-1.5 h-12 bg-gray-500"></span>
                        <div class="flex flex-col">
                            <h2 class="text-base font-bold text-black m-0 leading-tight">Import JSON file</h2>
                            <p class="text-[10px] text-black m-0 leading-tight">Upload JSON file to continue progress</p>
                        </div>
                    </div>
                </button>
                
                <div class="mt-auto ml-4 mb-12">
                    <h3 class="text-xl font-bold m-0 mb-1 text-black">Account<br/>expires in:</h3>
                    <div class="text-4xl font-bold text-[#ff0000] tracking-wide mt-2">00:00:00</div>
                </div>
            </aside>
        {/if}
    </div>
</div>