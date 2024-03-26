<script lang="ts">
	import Area from '$lib/components/areas/Area.svelte';
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import LandingEventsMap from '$lib/components/events/LandingEventsMap.svelte';
	import AddAreaButton from '$lib/components/areas/AddAreaButton.svelte';
	const explore: Writable<Explore> = getContext('explore');

	export let data;
	let { user } = data;
	$: areas = data.areas;
	// let areaActivated = false;
	// let addressLat = 43.8394267;
	// let addressLong = -79.511324;
	// let address = '';
	// let explore: Explore = {
	// 	point: {
	// 		lat: 43.8394267,
	// 		long: -79.511324
	// 	},
	// 	events: [],
	// 	address: ''
	// };
	// let radius = 1000;
	// let events: { [id: string]: Event } = {};
	('error: error: Internal Server Error | error_id: 2fcfbc50f98043e9aa19bc11eeeccf92 | error_id: undefined');
	// console.log('page data:', $page.data);
	// console.log('page form:', $page.form);
	// console.log('page events:', getValues(events).length);
	// if ($page.form?.explore != null) {
	// 	explore = $page.form.explore;
	// 	events = dictionarizeEvents(events, $page.form.explore.events);
	// 	console.log('page events:', getValues(events).length);
	// }

	// events = dictionarizeEvents(events, newEvents);
</script>

<br />
<!-- <div class="max-w-6xl flex flex-col gap-4">
	<div class="flex flex-col justify-center items-center text-center gap-3">
		<h1>
			<strong
				class="text-6xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90%"
			>
				BASEDPOCKET
			</strong>
		</h1>
		<h1 class="text-4xl">(Early Access)</h1>
		<p class="text-2xl">Translate Your Videos for Worldwide Audience using AI.</p>
		<p>Translate audio, subtitles, description, metadata</p>
		<a href="/auth/signup" class="btn variant-filled-primary"> Action Button </a>
	</div>
</div> -->
<br />

<h1 class="text-3xl font-bold">Events</h1>
<div class="flex flex-col justify-center items-center gap-4 w-full p-4">
	<AddressSearch />
	<div class="flex justify-center items-center gap-2 w-full">
		<label for="radius"
			>Radius(km): <h1>{$explore.radiuskm}/5</h1>
		</label>
		<input name="radiuskm" type="range" step="0.5" max="5" bind:value={$explore.radiuskm} />
	</div>

	<div class="w-full h-96 relative">
		<AddAreaButton />
		<LandingEventsMap />
	</div>
</div>

<br />
<br />

<h1 class="text-3xl font-bold">Areas</h1>
<div class="flex flex-col justify-center items-center gap-4 w-full p-4">
	{#if areas.length == 0}
		<div class="card gap-2 p-4 w-full">
			<p>Try adding an area</p>
		</div>
	{:else}
		{#each areas as area}
			<Area {area} />
		{/each}
	{/if}
</div>

<br />
<br />
<br />
<br />
