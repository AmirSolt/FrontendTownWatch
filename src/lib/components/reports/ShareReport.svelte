<script lang="ts">
	import { Share } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<button
	type="button"
	class="btn-icon variant-filled-secondary"
	on:click={() => {
		navigator.share({
			title: 'Civil Watch',
			text: 'Find Local Police Reports on Civil Watch!',
			url: $page.url.toString()
		});
	}}
>
	<Share size="24" />
</button>
