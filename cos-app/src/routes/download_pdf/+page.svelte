<script>
    import { page } from '$app/stores';
    import { certStore } from '$lib/store.svelte.js';
    import { onMount } from 'svelte';

    let sidebarOpen = $state(false); 
    let isGenerated = $state(false);

    let certId = $derived($page.url.searchParams.get('id'));

    let cert = $derived(
        certStore.certificates.find(c => c.id === certId) || certStore.certificates[0]
    );

    onMount(() => {
        setTimeout(() => {
            isGenerated = true;
        }, 2000);
    });

    function triggerPrint() {
        window.print();
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
    :global(.font-signature) { font-family: 'Dancing Script', cursive !important; }

    /* 1. By default, hide the certificate from the computer screen */
    .certificate-template {
        display: none;
    }

    /* 2. THE MAGIC PRINT RULES */
    @media print {
        /* Hide the entire dashboard UI when printing */
        .screen-app-ui { 
            display: none !important; 
        }
        
        /* Show the certificate! */
        .certificate-template { 
            display: block !important; 
        }
        
        /* Force the browser to print exact colors and borders */
        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        /* Set a standard margin for the PDF page */
        @page {
            margin: 0.5in;
        }
    }
</style>

<div class="screen-app-ui flex flex-col min-h-screen font-Inter bg-white relative">
    
    <header class="flex justify-between items-center px-8 lg:px-12 xl:px-24 py-6 bg-white border-b border-gray-200">
        <a href="/dashboard" class="hover:opacity-50 transition-opacity">
            <img src="/images/logo.svg" alt="Certificate of Service Logo" class="h-15 w-auto" />
        </a>
        <a href="/" class="text-base font-bold text-black hover:underline">Logout</a>
    </header>
    
    <div class="grid grid-cols-1 {sidebarOpen ? 'lg:grid-cols-[1fr_250px]' : ''} grow relative">
        
        {#if !sidebarOpen}
            <div class="absolute top-8 right-8 lg:right-12 xl:right-24 z-20">
                <button onclick={() => sidebarOpen = true} class="cursor-pointer hover:opacity-80 transition-all p-0 border-none bg-transparent">
                    <img src="/images/bar.svg" alt="Open Menu" class="w-15 h-auto" />
                </button>
            </div>
        {/if}

        <main class="py-8 px-8 lg:px-12 xl:px-24 bg-white flex flex-col items-center justify-center text-center z-10">
            
            <h1 class="text-3xl font-bold mb-12 text-black">
                {isGenerated ? 'Certificate Generated!' : 'Generating Certificate PDF...'}
            </h1>
            
            <div class="relative mb-12">
                <img 
                    src="/images/pdf_design.svg" 
                    alt="PDF Design" 
                    class="w-80 h-auto mx-auto transition-all duration-500 {isGenerated ? 'opacity-100' : 'animate-pulse opacity-50'}" 
                />
            </div>
            
            <div class="min-h-[100px]">
                {#if isGenerated}
                    <button 
                        onclick={triggerPrint}
                        class="bg-[#ebe6e0] border border-gray-400 px-10 py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-sm cursor-pointer"
                    >
                        <p class="text-xs text-gray-600 m-0">This certificate has been generated</p>
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
            <aside class="bg-[#d9d9d9] p-6 border-l border-gray-300 flex flex-col min-h-full z-20 relative">
                <div class="flex justify-end w-full mb-8">
                    <button onclick={() => sidebarOpen = false} class="cursor-pointer hover:opacity-80 transition-all p-0 border-none bg-transparent">
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

<div class="certificate-template p-8 bg-white font-Inter w-full max-w-3xl mx-auto">
    
    <p class="text-sm font-bold mb-8 text-black">UP Form No. 65-A</p>
    
    <div class="text-center mb-10">
        <h2 class="text-2xl font-bold uppercase tracking-wide border-b-2 border-black inline-block pb-1 text-black">University of the Philippines</h2>
        <h1 class="text-4xl font-bold uppercase mt-4 text-black">Certificate of Service</h1>
    </div>

    <div class="space-y-4 mt-8 text-black">
        <div class="flex items-start gap-4">
            <label class="w-48 font-bold text-lg shrink-0 mt-2">For the Month of</label>
            <div class="border-2 border-gray-400 rounded-2xl px-6 py-2 w-full min-h-[44px] flex items-center">{cert.data.month}</div>
        </div>
        <div class="flex items-start gap-4">
            <label class="w-48 font-bold text-lg shrink-0 mt-2">Name:</label>
            <div class="border-2 border-gray-400 rounded-2xl px-6 py-2 w-full min-h-[44px] flex items-center">{cert.data.name}</div>
        </div>
        <div class="flex items-start gap-4">
            <label class="w-48 font-bold text-lg shrink-0 mt-2">Position:</label>
            <div class="border-2 border-gray-400 rounded-2xl px-6 py-2 w-full min-h-[44px] flex items-center">{cert.data.position}</div>
        </div>
        <div class="flex items-start gap-4">
            <label class="w-48 font-bold text-lg shrink-0 mt-2">College/ School of:</label>
            <div class="border-2 border-gray-400 rounded-2xl px-6 py-2 w-full min-h-[44px] flex items-center">{cert.data.college}</div>
        </div>
    </div>

    <div class="w-full mt-10 text-black">
        <div class="flex w-full gap-4 mb-2 text-center items-end">
            <div class="font-bold text-sm leading-tight w-[65%]">Activities other than teaching such as research, extension, etc.</div>
            <div class="font-bold text-sm leading-tight w-[35%]">Approximate number of hours per week</div>
        </div>
        
        {#each cert.data.activities as activity}
            <div class="flex w-full gap-4 mb-3">
                <div class="border-2 border-gray-400 rounded-2xl px-4 py-2 text-sm w-[65%] min-h-[40px] flex items-center">{activity.desc}</div>
                <div class="border-2 border-gray-400 rounded-2xl px-4 py-2 text-center w-[35%] min-h-[40px] flex items-center justify-center">{activity.hours}</div>
            </div>
        {/each}
    </div>

    <div class="mt-8 text-lg font-medium leading-relaxed text-black">
        I hereby certify upon my honor that I have rendered full service for the month of
        <span class="px-2 border-b-2 border-black font-bold text-black inline-block min-w-[150px] text-center">
            {cert.data.month}
        </span>
        
        <div class="flex flex-col items-end mt-6 text-right w-full">
            <div class="w-80 flex flex-col items-center">
                <div class="border-2 {cert.data.signature ? 'border-black' : 'border-gray-400'} rounded-2xl px-6 py-2 text-center min-h-[44px] w-full flex items-center justify-center">
                    {#if cert.data.signature}
                        <span class="font-signature text-4xl text-blue-800 leading-none">{cert.data.signature}</span>
                    {/if}
                </div>
                <span class="text-m font-bold mt-2 text-center w-full uppercase text-black">Signature</span>
            </div>
        </div>
    </div>

    <div class="mt-20 space-y-12 pb-16 text-black px-4 w-full">
        <div class="flex flex-col w-80">
            <span class="font-bold mb-2">Attested:</span>
            <div class="border-2 border-gray-400 rounded-2xl px-6 py-2 min-h-[44px] flex items-center justify-center font-bold text-center">
                {cert.data.attestedBy}
            </div>
            <span class="text-xs font-medium mt-2 text-center">Chairman, Department of Computer Science</span>
        </div>
        
        <div class="flex flex-col w-80">
            <span class="font-bold mb-2">Approved:</span>
            <div class="border-2 border-gray-400 rounded-2xl px-6 py-2 min-h-[44px] flex items-center justify-center font-bold text-center">
                {cert.data.approvedBy}
            </div>
            <span class="text-xs font-medium mt-2 text-center">Dean, College of Engineering</span>
        </div>
    </div>
</div>