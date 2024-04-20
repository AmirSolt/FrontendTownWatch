<script lang="ts">
	import MapHeader from '$lib/components/shell/MapHeader.svelte';
	import MapShell from '$lib/components/shell/MapShell.svelte';
	import { formatDateWithHourToLocale } from '$lib/utils';

	import ReportPageMap from '$lib/components/customMap/ReportPageMap.svelte';
	import ShareReport from '$lib/components/reports/ShareReport.svelte';
	export let data;
	let { reportDetails, events } = data;

	let area = reportDetails.area;
	let home = { lat: reportDetails.area.lat, long: reportDetails.area.long };
	let radius = reportDetails.area.radius;
</script>

<MapShell>
	<svelte:fragment slot="row1">
		<MapHeader />
	</svelte:fragment>
	<svelte:fragment slot="row2">
		<div class="flex flex-col justify-center items-center w-full gap-2 md:max-w-6xl">
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
		</div>
	</svelte:fragment>

	<svelte:fragment slot="map">
		<ReportPageMap {events} {area} {home} {radius} />
	</svelte:fragment>
</MapShell>
