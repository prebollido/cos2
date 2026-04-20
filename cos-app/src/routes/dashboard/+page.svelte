<script>
    // Using $state for future reactivity, matching your login setup
    let certificates = $state([
        { title: 'Certificate 1' }
    ]);
</script>

<div class="flex flex-col min-h-screen font-Inter bg-white">
    
    <header class="flex justify-between items-center px-12 py-4 bg-white border-b border-gray-200">
        
        <img src="/images/logo.svg" alt="Certificate of Service Logo" class="h-10 w-auto" />

        <a href="/" class="text-base font-bold text-black hover:underline">Logout</a>
    </header>
    
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] grow">
        
        <main class="p-8 md:p-12 bg-white flex flex-col">
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
                <div class="flex gap-2 mb-4 md:mb-0">
                    <span class="w-3 h-3 rounded-full bg-gray-400"></span>
                    <span class="w-3 h-3 rounded-full bg-gray-400"></span>
                    <span class="w-3 h-3 rounded-full bg-gray-400"></span>
                    <span class="w-3 h-3 rounded-full bg-gray-400"></span>
                    <span class="w-3 h-3 rounded-full bg-gray-400"></span>
                </div>
                <div class="text-[10px] sm:text-xs text-black border-t border-black pt-1 w-full md:w-auto text-right md:text-left">
                    All rights reserved kemerut di ko alam ilalagay
                </div>
            </div>
        </main>
        
        <aside class="bg-[#d9d9d9] p-8 border-l border-gray-300 flex flex-col gap-12">
            
            <div class="flex flex-col gap-2 items-end pt-4">
                <span class="block h-2.5 w-[50px] bg-gray-500 rounded-full"></span>
                <span class="block h-2.5 w-[50px] bg-gray-500 rounded-full"></span>
                <span class="block h-2.5 w-[25px] bg-gray-500 rounded-full"></span>
            </div>
            
            <div class="bg-[#e8e8e8] p-4 border border-gray-400 mt-8">
                <div class="flex items-center gap-3 mb-1">
                    <span class="w-1.5 h-8 bg-gray-500"></span>
                    <h2 class="text-base font-bold text-black m-0">Import JSON file</h2>
                </div>
                <p class="text-xs text-black m-0 ml-5">Quick Description</p>
            </div>
            
            <div class="mt-auto mb-16 pt-12">
                <h3 class="text-xl font-bold m-0 mb-1 text-black">Account<br/>expires in:</h3>
                <div class="text-[32px] font-bold text-[#ff0000] tracking-wide mt-2">00:00:00</div>
            </div>
        </aside>
        
    </div>
</div>