<script lang="ts">
	import { fetchGeocode } from '$lib/here/geocoding';
	import { Search } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const explore: Writable<Explore> = getContext('explore');
	const exploreSubmission: Writable<ExploreSubmission> = getContext('exploreSubmission');
</script>

<div class="w-full">
	<label for="address">Postal code/ Zip code</label>
	<div class="input-group input-group-divider grid grid-cols-10">
		<input
			class="col-span-8 md:col-span-9"
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
			class="variant-filled-secondary col-span-2 md:col-span-1"
			on:click={async () => {
				$explore.point = await fetchGeocode($explore.address);
				$exploreSubmission.explores.push($explore);
			}}><Search /></button
		>
	</div>
</div>
