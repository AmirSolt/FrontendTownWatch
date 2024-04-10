<script lang="ts">
	import { formatDateWithTimeToLocale, orderByFieldDesc } from '$lib/utils';

	import EventCard from '$lib/components/events/EventCard.svelte';
	import ReportEventsMap from '$lib/components/events/ReportEventsMap.svelte';
	import ShareReport from '$lib/components/reports/ShareReport.svelte';
	import TriangleAlert from 'lucide-svelte/icons/alert-triangle';
	export let data;
	let { reportDetails, events, censorEvents } = data;
</script>

<aside class=" alert variant-glass-warning">
	<TriangleAlert color="#ecbc55" size="36" />
	<div class="alert-message">
		<p>
			This page includes your approximate location. Please, share it only with people you trust.
		</p>
	</div>
</aside>

<br />

<h1 class="text-3xl font-bold">Report <ShareReport /></h1>

<br />

<div class="card flex flex-col justify-center items-start gap-2 p-2">
	<p>
		Date: {formatDateWithTimeToLocale(reportDetails.report.created_at)}
	</p>

	<p>
		Found {events.length} events
	</p>

	<p>
		Address: {reportDetails.area.address}
	</p>
</div>
<br />

<div class="w-full h-96 relative">
	<ReportEventsMap />
</div>

<br />

<h1 class="text-3xl font-bold">Events</h1>

<div class="flex flex-col justify-center items-center gap-2 p-4">
	{#if censorEvents}
		{#each events as event, index}
			<EventCard {event} {index} {censorEvents} />
		{/each}
	{:else}
		{#each orderByFieldDesc(events, 'occur_at') as event, index}
			<EventCard {event} {index} {censorEvents} />
		{/each}
	{/if}
</div>
