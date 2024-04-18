<script lang="ts">
	import MapHeader from '$lib/components/shell/MapHeader.svelte';
	import MapShell from '$lib/components/shell/MapShell.svelte';
	import { formatDateWithHourToLocale } from '$lib/utils';

	import ReportEventsMap from '$lib/components/customMap/ReportEventsMap.svelte';
	import ShareReport from '$lib/components/reports/ShareReport.svelte';
	import TriangleAlert from 'lucide-svelte/icons/alert-triangle';
	export let data;
	let { reportDetails, events } = data;

	console.log(events);
</script>

<MapShell>
	<svelte:fragment slot="row1">
		<MapHeader />
	</svelte:fragment>
	<svelte:fragment slot="row2">
		<div class="card flex flex-col justify-center items-start gap-2 w-full p-2">
			<div class="flex justify-between items-center w-full">
				<h1 class="text-3xl font-bold">Report</h1>
				<ShareReport />
			</div>

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
	</svelte:fragment>

	<svelte:fragment slot="map">
		<ReportEventsMap />
	</svelte:fragment>
</MapShell>
