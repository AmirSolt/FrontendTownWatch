<script lang="ts">
	import ReportCard from '$lib/components/reports/ReportCard.svelte';

	export let data;
	let { reports } = data;
</script>

<h1>Reports</h1>

{#each reports as report, i}
	<ReportCard {report} index={i} />
{/each}
