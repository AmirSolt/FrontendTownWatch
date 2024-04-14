<script lang="ts">
	import { page } from '$app/stores';
	import EventsMap from './EventsMap.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const outputMapData: Writable<OutputMapData> = getContext('outputMapData');
	$outputMapData.events = $page.data.events;
	$outputMapData.censorEvents = $page.data.censorEvents;
</script>

<EventsMap
	events={$page.data.events}
	radius={$page.data.reportDetails.area.radius}
	home={{
		lat: $page.data.reportDetails.area.lat,
		long: $page.data.reportDetails.area.long
	}}
	area={$page.data.reportDetails.area}
/>
