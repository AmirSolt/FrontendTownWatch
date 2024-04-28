<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import DonationBanner from './DonationBanner.svelte';
	const drawerStore = getDrawerStore();

	const seenEventIDs: Writable<number[]> = getContext('seenEventIDs');

	let events: Event[] = $drawerStore.meta.events;

	if (events.length > 0) {
		$seenEventIDs.push(...events.map((e) => e.id));
		$seenEventIDs = $seenEventIDs;
	}
</script>

{#if events.length > 0}
	<div class="flex flex-col justify-center items-start gap-4 p-4 w-full">
		<!-- =============================== -->
		<!-- Just loop this -->
		<h1 class="text-3xl font-bold">Events {events.length > 1 ? `(${events.length})` : ``}</h1>

		<DonationBanner />

		{#each events as event}
			<div class="card p-2 variant-form-material w-full">
				<div class="leading-normal">
					<p>
						<b> Date: </b>
						{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
					</p>

					{#each Object.keys(event.details) as k}
						<p><b>{k}</b>: {event.details[k]}</p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{:else}
	<h1 class="text-xl font-bold">Error: Can't find any events.</h1>
{/if}

<br />
<br />
<br />
<br />
