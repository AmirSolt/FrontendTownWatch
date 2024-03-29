<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import EventMarker from './EventMarker.svelte';
	import HomeMarker from './HomeMarker.svelte';
	import { calculateDistance } from '$lib/utils';

	export let events: Event[] = [];
	export let showEventDetails: boolean = false;
	export let home: Point;
	export let radius: number;

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
		<HomeMarker />
		{#each getInRangeEvents(events, home, radius) as event (event.id)}
			<EventMarker {event} showDetails={showEventDetails} />
		{/each}
	</Map>
{/key}
