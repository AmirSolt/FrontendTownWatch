<script lang="ts">
	import { page } from '$app/stores';
	import { createUserArea } from '$lib/geo/client/areas';
	import type { Writable } from 'svelte/store';
	import { invalidateAll } from '$app/navigation';
	import { getContext } from 'svelte';
	const explore: Writable<Explore> = getContext('explore');
	const exploreSubmission: Writable<ExploreSubmission> = getContext('exploreSubmission');
</script>

<button
	type="button"
	class="btn variant-filled-secondary absolute top-2 right-2"
	style="z-index:500;"
	disabled={$exploreSubmission.explores.length == 0}
	on:click={async () => {
		if ($page.data.user == null) {
			console.log('Please sign-up');
		} else {
			let _ = await createUserArea({
				address: $explore.address,
				radius: Math.floor($explore.radiuskm * 1000),
				lat: $explore.point.lat,
				long: $explore.point.long
			});
			invalidateAll();
		}
	}}>Add Area</button
>
