<script lang="ts">
	import { Share } from 'lucide-svelte';
</script>

<button
	type="button"
	class="btn-icon variant-filled-secondary"
	on:click={() => {
		navigator.share({
			title: 'MDN',
			text: 'Learn web development on MDN!',
			url: 'https://developer.mozilla.org'
		});
	}}
>
	<Share size="24" />
</button>
