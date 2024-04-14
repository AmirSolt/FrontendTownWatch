<script lang="ts">
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	import { MaxRadiusKm } from '$lib/config.js';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import LandingEventsMap from '$lib/components/events/LandingEventsMap.svelte';
	import AddAreaButton from '$lib/components/areas/AddAreaButton.svelte';
	import AreaThumbnail from '$lib/components/areas/AreaThumbnail.svelte';
	import { page } from '$app/stores';
	import { orderByFieldDesc } from '$lib/utils';

	const inputMapData: Writable<InputMapData> = getContext('inputMapData');
	const currentSubmission: InputMapDataSubmission = $inputMapData.submissions.at(-1)!;

	$: areas = $page.data.areas as Area[];
</script>

<div class="w-screen relative" style="height: 85vh;">
	<div class="absolute top-2 right-0 w-full widget-layer-map-z-1">
		<div class="flex justify-center items-center px-2 w-full">
			<div class="flex flex-col justify-center items-center w-full gap-2 md:max-w-6xl">
				<div class="card flex flex-col justify-center items-center p-2 w-full">
					<AddressSearch {currentSubmission} />

					<div class="grid grid-cols-5 w-full">
						<label class="col-span-1" for="radius"
							>Radius <p>{currentSubmission.radiuskm}/{MaxRadiusKm} km</p>
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
				<div class="flex flex-row justify-between items-center w-full">
					<div class="flex gap-2">
						{#each orderByFieldDesc(areas, 'created_at') as area, i (area.id)}
							<div class="relative">
								<span
									class="badge-icon variant-filled absolute -top-1 -right-1 widget-layer-map-z-3"
									>{i + 1}</span
								>
								<AreaThumbnail {area} />
							</div>
						{/each}
					</div>

					<AddAreaButton />
				</div>
			</div>
		</div>
	</div>

	<LandingEventsMap radiusKm={currentSubmission.radiuskm} />
</div>
