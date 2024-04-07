<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import { MaxRadiusKm } from '$lib/config.js';
	import EventsMap from './EventsMap.svelte';
	const explore: Writable<Explore> = getContext('explore');
	const exploreSubmission: Writable<ExploreSubmission> = getContext('exploreSubmission');

	let events: Event[] = [];
	onMount(() => {
		exploreSubmission.subscribe(async (newExploreSubmission) => {
			const newExplore = newExploreSubmission.explores.at(-1);
			if (newExplore == null) {
				return;
			}

			console.log('==================');
			console.log('new explore');
			console.log(newExplore.point.lat);
			console.log(newExplore.point.long);
			console.log('==================');

			events = await scanEvents({
				lat: newExplore.point.lat,
				long: newExplore.point.long,
				radius: Math.floor(MaxRadiusKm * 1000),
				address: newExplore.address
			});
		});
	});
</script>

<EventsMap
	{events}
	radius={$explore.radiuskm * 1000}
	home={$explore.point}
	censorEvents={!($page.data.customer != null && $page.data.customer?.tier > 0)}
/>
