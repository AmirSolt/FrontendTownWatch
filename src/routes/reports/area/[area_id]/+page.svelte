<script lang="ts">
	import ReportCard from '$lib/components/reports/ReportCard.svelte';

	export let data;
	let { reports } = data;
</script>

<h1 class="text-3xl font-bold">Reports</h1>

<div class="flex flex-col justify-center items-center gap-2 p-4">
	{#each reports as report, i}
		<ReportCard {report} index={i} />
	{/each}
</div>
