<script>
	import './layout.css';
	import favicon from '/static/images/logo_only.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
