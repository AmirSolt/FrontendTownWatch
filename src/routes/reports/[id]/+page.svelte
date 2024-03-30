<script lang="ts">
	import EventCard from '$lib/components/events/EventCard.svelte';
	import ReportEventsMap from '$lib/components/events/ReportEventsMap.svelte';

	export let data;
	let { reportDetails, events, showEventDetails } = data;
</script>

<p>Note: Please, only share this page with people you trust.</p>

<h1>Report</h1>

<p>
	Date: {reportDetails.report.created_at}
</p>

<p>
	Found {events.length} events
</p>

<p>
	Address: {reportDetails.area.address}
</p>
<div class="w-full h-96 relative">
	<ReportEventsMap />
</div>

<h1>Events</h1>

{#each events as event, index}
	<EventCard {event} {index} showDetails={showEventDetails} />
{/each}
