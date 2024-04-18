<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userFreeTrialDaysRemain, isUserPremium } from '$lib/stripe/utils';
	import UserDrawerBanner from './UserDrawerBanner.svelte';
	const drawerStore = getDrawerStore();

	const seenEventIDs: Writable<number[]> = getContext('seenEventIDs');

	let events: Event[] = $drawerStore.meta.events;

	if (events.length > 0) {
		$seenEventIDs.push(...events.map((e) => e.id));
		$seenEventIDs = $seenEventIDs;
	}

	const isPremium = isUserPremium($page.data.customer);
	const remainFreeTrial = userFreeTrialDaysRemain($page.data.user);
</script>

{#if events.length > 0}
	<div class="flex flex-col justify-between items-start gap-4 p-4 w-full">
		<!-- =============================== -->
		<!-- Just loop this -->
		<h1 class="text-3xl font-bold">Events List ({events.length})</h1>

		<UserDrawerBanner />

		{#each events as event}
			<div class="card m-2 p-2 variant-form-material">
				<div class="leading-normal">
					<p>
						<b> Date: </b>
						{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
					</p>

					{#if isPremium || remainFreeTrial > 0}
						{#each Object.keys(event.details) as k}
							<p><b>{k}</b>: {event.details[k]}</p>
						{/each}
					{:else}
						{#each Object.keys(event.details) as k}
							<p>
								<b>{k}</b>: ###
							</p>
						{/each}
					{/if}
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
