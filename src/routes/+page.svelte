<script lang="ts">
	import AreaCard from '$lib/components/areas/AreaCard.svelte';
	import { HelpCircle } from 'lucide-svelte';
	import { orderByFieldDesc } from '$lib/utils';
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	import { MaxRadiusKm } from '$lib/config.js';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import LandingEventsMap from '$lib/components/events/LandingEventsMap.svelte';
	import AddAreaButton from '$lib/components/areas/AddAreaButton.svelte';
	const explore: Writable<Explore> = getContext('explore');
	const exploreSubmission: Writable<ExploreSubmission> = getContext('exploreSubmission');

	export let data;
	let { user } = data;
	$: areas = data.areas;
</script>

<aside class=" alert bg-surface-100">
	<HelpCircle color="#414d75" size="36" />
	<div class="alert-message">
		<p>
			Click the "Get Alerts" button to receive notifications if/when a police report is detected
			near you.
		</p>
	</div>
</aside>

<br />

<h1 class="text-3xl font-bold">Events</h1>
<div class="flex flex-col justify-center items-center gap-4 w-full p-2">
	<AddressSearch />
	<div class="grid grid-cols-5 w-full">
		<label class="col-span-1" for="radius"
			>Radius <p>{$explore.radiuskm}/{MaxRadiusKm} km</p>
		</label>
		<input
			name="radiuskm"
			type="range"
			step="0.3"
			class="col-span-4"
			max={MaxRadiusKm}
			bind:value={$explore.radiuskm}
		/>
	</div>

	<div class="w-full h-96 relative">
		<AddAreaButton />
		<LandingEventsMap />
	</div>
</div>

<br />
<br />

<h1 class="text-3xl font-bold">Areas</h1>
<div class="flex flex-col justify-center items-center gap-4 w-full p-2">
	{#if areas.length == 0}
		<div class="card gap-2 p-4 w-full">
			<p>(Empty)</p>
			<p>Add an area to get automatic notifications</p>
		</div>
	{:else}
		{#each orderByFieldDesc(areas, 'created_at') as area}
			<AreaCard {area} />
		{/each}
	{/if}
</div>

<br />
<br />

<h1 class="text-3xl font-bold">Our Data</h1>
<div class="p-2">
	<p>Please visit <a class="underline" href="/info/our-data">Our Data</a> for more information</p>
</div>
