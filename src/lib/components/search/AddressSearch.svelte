<script lang="ts">
	import { fetchGeocode } from '$lib/here/geocoding';
	import { Search } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const explore: Writable<Explore> = getContext('explore');
</script>

<div>
	<label for="address">Postal code/ Zip code</label>
	<div class="input-group input-group-divider grid grid-cols-10">
		<input
			class="col-span-9"
			type="search"
			name="address"
			bind:value={$explore.address}
			autocomplete="postal-code"
			minlength="1"
			maxlength="12"
			required
		/>
		<button
			type="button"
			class="variant-filled-secondary col-span-1"
			on:click={async () => {
				$explore.point = await fetchGeocode($explore.address);
				$explore.firstAddressSearchCompleted = true;
			}}><Search /></button
		>
	</div>
</div>
