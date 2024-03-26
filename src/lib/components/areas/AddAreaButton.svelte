<script lang="ts">
	import { page } from '$app/stores';
	import { Region } from '$lib/enums';
	import { createUserArea } from '$lib/geo/client/areas';
	import type { Writable } from 'svelte/store';
	import { invalidateAll } from '$app/navigation';
	import { getContext } from 'svelte';
	const explore: Writable<Explore> = getContext('explore');
</script>

<button
	type="button"
	class="btn variant-filled-secondary absolute top-2 right-2"
	style="z-index:500;"
	disabled={!$explore.firstAddressSearchCompleted}
	on:click={async () => {
		if ($page.data.user == null) {
			console.log('Please sign-up');
		} else {
			let _ = await createUserArea({
				address: $explore.address,
				region: Region.TORONTO,
				radius: $explore.radiuskm * 1000,
				lat: $explore.point.lat,
				long: $explore.point.long
			});
			invalidateAll();
		}
	}}>Get Notified</button
>
