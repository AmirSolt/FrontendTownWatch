<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import { dictionarizeEvents } from '$lib/components/events/scan';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import { MaxRadiusKm } from '$lib/config.js';
	import EventMarker from './EventMarker.svelte';
	import HomeMarker from './HomeMarker.svelte';
	import { calculateDistance } from '$lib/utils';
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

	function updateVisibleEvents(events: Event[], radius: number): Event[] {
		let newEvents: Event[] = [];
		events.forEach((event) => {
			const eventPoint = {
				lat: event.lat,
				long: event.long
			};

			if (calculateDistance(eventPoint, $explore.point) <= radius) {
				newEvents.push(event);
			}
		});

		return newEvents;
	}
</script>

{#key $explore.point.lat + $explore.point.long}
	<Map view={[$explore.point.lat, $explore.point.long]} zoom={13}>
		<HomeMarker />
		{#each updateVisibleEvents(events, $explore.radiuskm * 1000) as event (event.id)}
			<EventMarker
				{event}
				showDetails={$page.data.customer != null && $page.data.customer?.tier > 0}
			/>
		{/each}
	</Map>
{/key}
