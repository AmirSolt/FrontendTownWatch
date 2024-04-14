<script lang="ts">
	import { formatDateWithHourToLocale, orderByFieldDesc } from '$lib/utils';

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
			This page includes your approximate location. Please, only share it with people you trust.
		</p>
	</div>
</aside>

<div class="w-screen relative" style="height: 85vh;">
	<div class="absolute top-2 right-0 w-full widget-layer-map-z-1">
		<div class="flex justify-center items-center px-2 w-full">
			<div class="flex flex-col justify-center items-center w-full gap-2 md:max-w-6xl">
				<div class="card flex flex-col justify-center items-start gap-2 p-2 w-full">
					<h1 class="text-3xl font-bold">Report <ShareReport /></h1>
					<p>
						Date: {formatDateWithHourToLocale(reportDetails.report.created_at)}
					</p>

					<p>
						Found {events.length} events
					</p>

					<p>
						Address: {reportDetails.area.address}
					</p>
				</div>
			</div>
		</div>
	</div>

	<ReportEventsMap />
</div>
