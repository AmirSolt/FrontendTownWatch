<script lang="ts">
	import Map from '$lib/components/leafletMap/Map.svelte';
	import EventMarkers from './EventsMarker.svelte';
	import AreaMarker from './AreaMarker.svelte';
	import { calculateDistance } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	export let events: Event[] = [];
	export let home: Point;
	export let radius: number;
	export let area: Area | undefined;

	const seenEventIDs: Writable<number[]> = getContext('seenEventIDs');

	function cleanEventsForMap(events: Event[]): Event[][] {
		let newEvents: Event[] = getInRangeEvents(events);
		return aggregateEventsByPos(newEvents);
	}

	function getInRangeEvents(events: Event[]): Event[] {
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

	function aggregateEventsByPos(events: Event[]): Event[][] {
		const eventsObject: { [key: string]: Event[] } = {};

		events.forEach((event) => {
			const key = `${event.lat},${event.long}`;
			const eventsWithSameCoordinates = eventsObject[key] || [];
			eventsWithSameCoordinates.push(event);
			eventsObject[key] = eventsWithSameCoordinates;
		});
		const eventsArray: Event[][] = Object.values(eventsObject);
		return eventsArray;
	}
</script>

{#key home.lat + home.long}
	<Map view={[home.lat, home.long]} zoom={13}>
		<AreaMarker {area} />
		{#each cleanEventsForMap(events) as groupEvents}
			<EventMarkers
				{groupEvents}
				isSeen={$seenEventIDs.find((id) => id == groupEvents[0].id) != null}
			/>
		{/each}
	</Map>
{/key}
