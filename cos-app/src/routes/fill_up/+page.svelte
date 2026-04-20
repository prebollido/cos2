<script>
    import { page } from '$app/stores';
    import { certStore } from '$lib/store.svelte.js';
    
    let sidebarOpen = $state(false); 

    // Safely gets the ID from the URL without crashing the server
    let activeId = $derived($page.url.searchParams.get('id'));

    const sidebarItems = [
        { label: 'Generate PDF', desc: 'Download as PDF', href: '#' }, 
        { label: 'Create New Certificate', desc: 'Fill-up a new certificate', href: '/dashboard' },
        { label: 'Export JSON file', desc: 'Save your progress', href: '/export_json' },
        { label: 'Import JSON file', desc: 'Upload JSON file to continue', href: '#' }
    ];
    
    function handleAutoExpand(e) {
        e.target.style.height = '1px'; 
        e.target.style.height = e.target.scrollHeight + 'px';
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

    :global(.font-signature) { font-family: 'Dancing Script', cursive !important; }

    .rectangle-textarea {
        resize: none;
        overflow: hidden;
        min-height: 44px;
        display: block;
        width: 100%;
        background: transparent;
    }

    .rectangle-textarea:focus { outline: none; }

    @media print {
        header, aside, button, .sidebar-link { display: none !important; }
        
        /* THE FIX: Change .grid to .main-wrapper so it doesn't break your activities! */
        .main-wrapper { display: block !important; } 
        
        main { padding: 0 !important; margin: 0 !important; width: 100% !important; }
        .italic { display: none !important; }
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
    }
</style>

<div class="flex flex-col min-h-screen font-Inter bg-white relative">
    
    <header class="flex justify-between items-center px-8 lg:px-12 xl:px-24 py-6 bg-white border-b border-gray-200 sticky top-0 z-30">
        <a href="/dashboard" class="hover:opacity-50 transition-opacity">
            <img src="/images/logo.svg" alt="Certificate of Service Logo" class="h-15 w-auto" />
        </a>
        <a href="/" class="text-base font-bold text-black hover:underline">Logout</a>
    </header>
    
    <div class="main-wrapper grid grid-cols-1 {sidebarOpen ? 'lg:grid-cols-[1fr_250px]' : ''} grow">

        {#if !sidebarOpen}
            <div class="fixed top-33 right-8 lg:right-12 xl:right-24 z-20 sidebar-link">
                <button onclick={() => sidebarOpen = true} class="cursor-pointer hover:opacity-80 p-0 border-none bg-transparent">
                    <img src="/images/bar.svg" alt="Open Menu" class="w-15 h-auto" />
                </button>
            </div>
        {/if}

        <main class="py-12 px-8 lg:px-24 xl:px-48 bg-white flex flex-col items-center">
            
            {#each certStore.certificates as cert}
                
                {#if cert.id === (activeId || certStore.certificates[0].id)}
                    
                    <div class="w-full max-w-3xl">
                        
                        <p class="text-sm font-bold mb-12">UP Form No. 65-A</p>
                        
                        <div class="text-center mb-12">
                            <h2 class="text-2xl font-bold uppercase tracking-wide border-b-2 border-black inline-block pb-1">University of the Philippines</h2>
                            <h1 class="text-4xl font-bold uppercase mt-4">Certificate of Service</h1>
                        </div>

                        <div class="space-y-8 mt-16">
                            <div class="flex items-start gap-4">
                                <label class="w-48 font-bold text-lg shrink-0 mt-2">For the Month of</label>
                                <textarea bind:value={cert.data.month} oninput={handleAutoExpand} rows="1" class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 focus:border-black transition-colors"></textarea>
                            </div>
                            <div class="flex items-start gap-4">
                                <label class="w-48 font-bold text-lg shrink-0 mt-2">Name:</label>
                                <textarea bind:value={cert.data.name} oninput={handleAutoExpand} rows="1" class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 focus:border-black transition-colors"></textarea>
                            </div>
                            <div class="flex items-start gap-4">
                                <label class="w-48 font-bold text-lg shrink-0 mt-2">Position:</label>
                                <textarea bind:value={cert.data.position} oninput={handleAutoExpand} rows="1" class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 focus:border-black transition-colors"></textarea>
                            </div>
                            <div class="flex items-start gap-4">
                                <label class="w-48 font-bold text-lg shrink-0 mt-2">College/ School of:</label>
                                <textarea bind:value={cert.data.college} oninput={handleAutoExpand} rows="1" class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 focus:border-black transition-colors"></textarea>
                            </div>
                        </div>

                        <div class="grid grid-cols-[2fr_1fr] gap-4 mt-16 text-center items-start">
                            <div class="font-bold text-sm leading-tight mb-2">Activities other than teaching such as research, extension, etc.</div>
                            <div class="font-bold text-sm leading-tight mb-2">Approximate number of hours per week</div>
                            
                            {#each cert.data.activities as activity}
                                <textarea bind:value={activity.desc} rows="1" oninput={handleAutoExpand} class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-4 py-2 focus:border-black transition-colors text-sm"></textarea>
                                <textarea bind:value={activity.hours} rows="1" oninput={handleAutoExpand} class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-4 py-2 focus:border-black transition-colors text-center"></textarea>
                            {/each}
                        </div>

                        <div class="flex justify-end mt-4">
                            <button onclick={() => cert.data.activities.push({ desc: '', hours: '' })} class="bg-gray-300 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-gray-400 transition-colors border-none cursor-pointer">
                                <span class="text-lg">+</span> Add more
                            </button>
                        </div>

                        <div class="mt-16 text-lg font-medium leading-relaxed">
                            I hereby certify upon my honor that I have rendered full service for the month of
                            <span class="px-2 border-b-2 border-black font-bold text-black inline-block min-w-[150px] text-center">
                                {cert.data.month}
                            </span>
                            
                            <div class="flex flex-col items-end mt-8 text-right w-full">
                                <div class="w-100 flex flex-col items-center">
                                    <textarea 
                                        bind:value={cert.data.signature}
                                        oninput={handleAutoExpand}
                                        rows="1"
                                        placeholder="**Digital Signature**" 
                                        class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 text-center transition-colors {cert.data.signature ? 'font-signature text-4xl text-blue-800 border-black' : 'font-sans text-base border-gray-400'}" 
                                        style="min-height: 44px;"
                                    ></textarea>
                                    <span class="text-[10px] mt-1 italic text-end w-full print:hidden">Tap to sign electronically.</span>
                    
                                    <span class="hidden print:block text-xs font-bold mt-2 text-center w-full uppercase text-black">Signature</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-20 space-y-12 pb-32">
                            <div class="flex flex-col w-80">
                                <span class="font-bold mb-2">Attested:</span>
                                <textarea bind:value={cert.data.attestedBy} oninput={handleAutoExpand} rows="1" class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 focus:border-black transition-colors text-center" style="min-height: 44px;"></textarea>
                                <span class="text-xs font-medium mt-2 text-center">Chairman, Department of Computer Science</span>
                            </div>
                            
                            <div class="flex flex-col w-80">
                                <span class="font-bold mb-2">Approved:</span>
                                <textarea bind:value={cert.data.approvedBy} oninput={handleAutoExpand} rows="1" class="rectangle-textarea border-2 border-gray-400 rounded-2xl px-6 py-2 focus:border-black transition-colors text-center" style="min-height: 44px;"></textarea>
                                <span class="text-xs font-medium mt-2 text-center">Dean, College of Engineering</span>
                            </div>
                        </div>

                    </div>
                {/if}
            {/each}
        </main>

        {#if sidebarOpen}
            <aside class="bg-[#d9d9d9] p-6 border-l border-gray-300 flex flex-col sticky top-[108px] h-[calc(100vh-108px)]">
                
                <div class="flex justify-end w-full mb-8">
                    <button onclick={() => sidebarOpen = false} class="cursor-pointer hover:opacity-80 p-0 border-none bg-transparent">
                        <img src="/images/bar.svg" alt="Close Menu" class="w-15 h-auto" />
                    </button>
                </div>

                <div class="space-y-4">
                    
                    <a href="/download_pdf?id={activeId}" class="block w-full bg-[#d9d9d9] p-2 text-left hover:bg-gray-200 transition-colors no-underline cursor-pointer">
                        <div class="flex items-center gap-1">
                            <span class="w-1.5 h-12 bg-gray-500"></span>
                            <div class="flex flex-col">
                                <h2 class="text-sm font-bold text-black m-0 leading-tight">Generate PDF</h2>
                                <p class="text-[10px] text-black m-0">Go to Download Page</p>
                            </div>
                        </div>
                    </a>

                    {#each sidebarItems.slice(1) as item}
                        <a href={item.href} class="block w-full bg-[#d9d9d9] p-2 text-left hover:bg-gray-200 transition-colors no-underline">
                            <div class="flex items-center gap-1">
                                <span class="w-1.5 h-12 bg-gray-500"></span>
                                <div class="flex flex-col">
                                    <h2 class="text-sm font-bold text-black m-0 leading-tight">{item.label}</h2>
                                    <p class="text-[10px] text-black m-0">{item.desc}</p>
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
                
                <div class="mt-auto ml-4 mb-4">
                    <h3 class="text-xl font-bold m-0 mb-1 text-black">Account<br/>expires in:</h3>
                    <div class="text-4xl font-bold text-[#ff0000] tracking-wide mt-2">00:00:00</div>
                </div>
            </aside>
        {/if}
    </div>
</div>