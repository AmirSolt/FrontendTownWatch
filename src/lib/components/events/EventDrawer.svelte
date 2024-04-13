<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	const outputMapData: Writable<OutputMapData> = getContext('outputMapData');

	let event: Event | undefined = $outputMapData.events.find(
		(event) => event.id === $drawerStore.meta.event_id
	);
	let censorEvents: boolean = $outputMapData.censorEvents;
</script>

{#if event != null}
	<div class="card flex flex-col justify-between items-start gap-4 p-4 w-full">
		<!-- =============================== -->

		<div class="leading-normal">
			{#if !censorEvents}
				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>

				{#each Object.keys(event.details) as k}
					<p><b>{k}</b>: {event.details[k]}</p>
				{/each}
			{:else}
				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>
				{#each Object.keys(event.details) as k}
					<p>
						<b>{k}</b>:
						<a href="/payment/pricing" class="underline text-secondary-500"
							>Only Premium members can see this</a
						>
					</p>
				{/each}
			{/if}
		</div>
	</div>
{:else}
	<h1 class="text-xl font-bold">Error: Can't find the event.</h1>
{/if}
