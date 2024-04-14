<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isCustomerFreeTrial, isCustomerPremium } from '$lib/stripe/utils';
	const drawerStore = getDrawerStore();

	const outputMapData: Writable<OutputMapData> = getContext('outputMapData');

	let event: Event | undefined = $outputMapData.events.find(
		(event) => event.id === $drawerStore.meta.event_id
	);
</script>

{#if event != null}
	<div class="card flex flex-col justify-between items-start gap-4 p-4 w-full">
		<!-- =============================== -->

		<div class="leading-normal">
			{#if isCustomerPremium($page.data.customer)}
				{#if isCustomerFreeTrial($page.data.customer)}
					<aside class="alert flex justify-center items-center variant-filled-secondary">
						<div class="flex justify-between items-center w-full">
							<div class="alert-message">
								<h1 class="text-xl font-bold">Free Trial</h1>
							</div>
							<!-- Actions -->
							<button
								type="button"
								class="btn variant-filled-tertiary"
								on:click={() => {
									goto('/payment/pricing');
									drawerStore.close();
								}}>Upgrade</button
							>
						</div>
					</aside>
					<br />
				{/if}

				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>

				{#each Object.keys(event.details) as k}
					<p><b>{k}</b>: {event.details[k]}</p>
				{/each}
			{:else}
				<aside class="alert flex justify-center items-center variant-filled-secondary">
					<div class="alert-message">
						<p>Only <b class="font-bold">Premium</b> members can see event details.</p>
					</div>
					<!-- Actions -->
					<div class="flex justify-end items-center w-full">
						<div class="flex justify-center items-center gap-4">
							<button
								type="button"
								class="btn bg-surface-200 text-surface-900"
								on:click={() => drawerStore.close()}>No</button
							>
							<button
								type="button"
								class="btn variant-filled-tertiary"
								on:click={() => {
									goto('/payment/pricing');
									drawerStore.close();
								}}>Premium</button
							>
							<!-- <a href="/payment/pricing" class="btn variant-filled-tertiary">Premium</a> -->
						</div>
					</div>
				</aside>
				<br />
				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>

				{#each Object.keys(event.details) as k}
					<p>
						<b>{k}</b>: ###
					</p>
				{/each}
			{/if}
		</div>
	</div>
{:else}
	<h1 class="text-xl font-bold">Error: Can't find the event.</h1>
{/if}
