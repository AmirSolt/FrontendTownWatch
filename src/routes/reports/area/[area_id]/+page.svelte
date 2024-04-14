<script lang="ts">
	import ReportCard from '$lib/components/reports/ReportCard.svelte';
	import { orderByFieldDesc } from '$lib/utils';
	export let data;
	let { reports } = data;
</script>

<h1 class="text-3xl font-bold">Reports</h1>

<div class="flex flex-col justify-center items-center gap-2 p-4">
	{#if reports.length > 0}
		{#each orderByFieldDesc(reports, 'created_at') as report}
			<ReportCard {report} />
		{/each}
	{:else}
		<div class="card p-4">
			<h1 class="text-md">You do not have any reports</h1>
		</div>
	{/if}
</div>
