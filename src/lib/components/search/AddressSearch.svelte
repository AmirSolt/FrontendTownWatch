<script lang="ts">
	import { radiusSchema } from '$lib/geo/schema';
	import { fetchGeocode } from '$lib/here/geocoding';
	import { Search } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let mapControls: MapControls;
	const queueMapData: Writable<QueueMapData> = getContext('queueMapData');
</script>

<div class="w-full">
	<label for="address">Postal code/ Zip code</label>
	<div class="input-group input-group-divider grid grid-cols-10">
		<input
			class="input col-span-8 md:col-span-9"
			type="text"
			name="address"
			bind:value={mapControls.address}
			autocomplete="postal-code"
			minlength="1"
			maxlength="12"
			required
		/>
		<button
			type="button"
			class="variant-filled-primary col-span-2 md:col-span-1"
			on:click={async () => {
				if (mapControls.address == '') {
					return;
				}
				let point = await fetchGeocode(mapControls.address);
				let newSub = {
					home: point,
					address: mapControls.address,
					radius: mapControls.radiuskm * 1000,
					canBeAddedToAreas: true
				};

				$queueMapData.queue.push(newSub);
				$queueMapData.queue = $queueMapData.queue;
			}}
		>
			<span class="m-auto"> <Search /></span></button
		>
	</div>
</div>
