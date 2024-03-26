<script lang="ts">
	import Area from '$lib/components/areas/Area.svelte';
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	import { page } from '$app/stores';
	import { Region } from '$lib/enums';
	import { createUserArea } from '$lib/geo/client/areas';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import LandingEventsMap from '$lib/components/events/LandingEventsMap.svelte';
	import { invalidateAll } from '$app/navigation';
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

<h1>Events</h1>

<AddressSearch />

<div class="flex justify-center items-center gap-2">
	<label for="radius">Radius(km):</label>
	<input name="radiuskm" type="range" max="10" bind:value={$explore.radiuskm} />
</div>

<div class="w-96 h-96 relative">
	<button
		type="button"
		class="btn variant-filled-secondary absolute top-2 right-2"
		style="z-index:500;"
		disabled={$explore.address == ''}
		on:click={async () => {
			if ($page.data.user == null) {
				console.log('Please sign-up');
			} else {
				let area = await createUserArea({
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
	<LandingEventsMap />
</div>

<br />
<br />

<h1>Areas</h1>
<div class="flex flex-col justify-center items-center gap-2 w-full">
	{#each areas as area}
		<Area {area} />
	{/each}
</div>

<h1>
	{JSON.stringify($explore)}
</h1>

<br />
<br />
<br />
