<script lang="ts">
	import { page } from '$app/stores';
	import EventsMap from './EventsMap.svelte';
</script>

<EventsMap
	events={$page.data.events}
	radius={$page.data.reportDetails.area.radius}
	home={{
		lat: $page.data.reportDetails.area.lat,
		long: $page.data.reportDetails.area.long
	}}
	censorEvents={$page.data.censorEvents}
/>
