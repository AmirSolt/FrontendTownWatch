<script lang="ts">
	import { fetchGeocode } from '$lib/here/geocoding';
	import { Search } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const inputMapData: Writable<InputMapData> = getContext('inputMapData');
	export let currentSubmission: InputMapDataSubmission;
</script>

<div class="w-full">
	<label for="address">Postal code/ Zip code</label>
	<div class="input-group input-group-divider grid grid-cols-10">
		<input
			class="input col-span-8 md:col-span-9"
			type="text"
			name="address"
			bind:value={currentSubmission.address}
			autocomplete="postal-code"
			minlength="1"
			maxlength="12"
			required
		/>
		<button
			type="button"
			class="variant-filled-primary col-span-2 md:col-span-1"
			on:click={async () => {
				currentSubmission.point = await fetchGeocode(currentSubmission.address);
				$inputMapData.submissions.push(currentSubmission);
				$inputMapData.submissions = $inputMapData.submissions;
			}}
		>
			<span class="m-auto"> <Search /></span></button
		>
	</div>
</div>
