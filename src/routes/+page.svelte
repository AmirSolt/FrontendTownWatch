<script lang="ts">
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	import { MaxRadiusKm } from '$lib/config.js';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import LandingEventsMap from '$lib/components/events/LandingEventsMap.svelte';
	import AddAreaButton from '$lib/components/areas/AddAreaButton.svelte';

	export let data;
	let { areas } = data;

	const inputMapData: Writable<InputMapData> = getContext('inputMapData');
	const currentSubmission: InputMapDataSubmission = $inputMapData.submissions.at(-1)!;
</script>

<div class="w-screen relative" style="height: 85vh;">
	<div class="absolute top-2 right-0 w-full widget-layer-map-z-1">
		<div class="flex flex-col justify-center items-end w-full gap-2 px-2">
			<div class="card flex flex-col justify-center items-center p-2 w-full">
				<AddressSearch {currentSubmission} />

				<div class="grid grid-cols-5 w-full">
					<label class="col-span-1" for="radius"
						>Radius <p>2/{MaxRadiusKm} km</p>
					</label>
					<input
						name="radiuskm"
						type="range"
						step="0.3"
						class="col-span-4"
						max={MaxRadiusKm}
						bind:value={currentSubmission.radiuskm}
					/>
				</div>
			</div>

			<AddAreaButton />
		</div>
	</div>

	<LandingEventsMap />
</div>
