<script>
    let certificates = $state([
        { title: 'Certificate 1' }
    ]);
    
    let sidebarOpen = $state(false); 
</script>

<div class="flex flex-col min-h-screen font-Inter bg-white relative">
    
    <header class="flex justify-between items-center px-8 lg:px-12 xl:px-24 py-6 bg-white border-b border-gray-200">
        <img src="/images/logo.svg" alt="Certificate of Service Logo" class="h-15 w-auto" />
        
        <a href="/" class="text-base font-bold text-black hover:underline">Logout</a>
    </header>
    
    <div class="grid grid-cols-1 {sidebarOpen ? 'lg:grid-cols-[1fr_250px]' : ''} grow relative">
        
        {#if !sidebarOpen}
            <div class="absolute top-8 right-8 lg:right-12 xl:right-24 z-20">
                <button 
                    onclick={() => sidebarOpen = true} 
                    class="cursor-pointer hover:opacity-80 transition-all bg-transparent border-none p-0"
                    aria-label="Open Sidebar"
                >
                    <img src="/images/bar.svg" alt="Open Menu" class="w-15 h-auto" />
                </button>
            </div>
        {/if}

        <main class="py-8 px-8 lg:px-12 xl:px-24 bg-white flex flex-col">
            <h1 class="text-4xl font-bold mb-8 text-black">Dashboard</h1>
            
            <div class="flex flex-wrap gap-6 mb-auto">
                {#each certificates as cert}
                    <button class="flex flex-col w-[150px] text-center cursor-pointer hover:opacity-80 transition-opacity">
                        <div class="h-[150px] w-full bg-gray-500 mb-2"></div>
                        <p class="m-0 text-sm font-medium text-black mx-auto">{cert.title}</p>
                    </button>
                {/each}
                
                <button class="flex flex-col w-[150px] text-center cursor-pointer hover:opacity-80 transition-opacity">
                    <div class="h-[150px] w-full bg-[#d9d9d9] flex items-center justify-center">
                        <span class="text-7xl text-gray-500 font-light leading-none pb-2">+</span>
                    </div>
                </button>
            </div>
            
            <div class="flex flex-col md:flex-row justify-between items-end md:items-center mt-16">
                <div class="flex gap-2 mb-4 md:mb-8">
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
                    <button 
                        onclick={() => sidebarOpen = false} 
                        class="cursor-pointer hover:opacity-80 transition-all bg-transparent border-none p-0"
                        aria-label="Close Sidebar"
                    >
                        <img src="/images/bar.svg" alt="Close Menu" class="w-15 h-auto" />
                    </button>
                </div>

                <div class="bg-[#d9d9d9] p-4">
                    <div class="flex items-center gap-3 mb-1">
                        <span class="w-1.5 h-15 bg-gray-500"></span>
                        <div class="flex flex-col">
                            <h2 class="text-base font-bold text-black mb-1 leading-tight">Import JSON file</h2>
                            <p class="text-xs text-black m-0 leading-tight">Upload JSON file to continue progress</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-auto ml-4 mb-12 pt-12">
                    <h3 class="text-xl font-bold m-0 mb-1 text-black">Account<br/>expires in:</h3>
                    <div class="text-4xl font-bold text-[#ff0000] tracking-wide mt-2">00:00:00</div>
                </div>
            </aside>
        {/if}
        
    </div>
</div>