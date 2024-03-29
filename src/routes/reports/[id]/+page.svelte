<script lang="ts">
	import EventCard from '$lib/components/events/EventCard.svelte';
	import ReportEventsMap from '$lib/components/events/ReportEventsMap.svelte';

	export let data;
	let { reportDetails, events } = data;
</script>

<p>Note: Please, only share this page with people you trust.</p>

<h1>Report</h1>

<p>
	Date: {reportDetails.report.createdAt}
</p>

<p>
	Found {events.length} events
</p>

<p>
	Address: {reportDetails.area.address}
</p>

<ReportEventsMap />

{#each events as event, index}
	<EventCard {event} {index} />
{/each}
