<script lang="ts">
	import Map from '$lib/components/leafletMap/Map.svelte';
	import EventMarker from './EventMarker.svelte';
	import HomeMarker from './HomeMarker.svelte';
	import { calculateDistance } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let events: Event[] = [];
	export let home: Point;
	export let radius: number;
	export let area: Area | undefined;

	const seenEventIDs: Writable<number[]> = getContext('seenEventIDs');

	function getInRangeEvents(events: Event[], home: Point, radius: number): Event[] {
		let newEvents: Event[] = [];
		events.forEach((event) => {
			const eventPoint = {
				lat: event.lat,
				long: event.long
			};

			if (calculateDistance(eventPoint, home) <= radius) {
				newEvents.push(event);
			}
		});

		return newEvents;
	}
</script>

{#key home.lat + home.long}
	<Map view={[home.lat, home.long]} zoom={13}>
		<HomeMarker {area} />
		{#each getInRangeEvents(events, home, radius) as event (event.id)}
			<EventMarker {event} isSeen={$seenEventIDs.find((id) => id == event.id) != null} />
		{/each}
	</Map>
{/key}
