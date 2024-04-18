<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userFreeTrialDaysRemain, isUserPremium } from '$lib/stripe/utils';
	const drawerStore = getDrawerStore();

	const outputMapData: Writable<OutputMapData> = getContext('outputMapData');

	let event: Event | undefined = $outputMapData.events.find(
		(event) => event.id === $drawerStore.meta.event_id
	);

	const isPremium = isUserPremium($page.data.customer);
	const remainFreeTrial = userFreeTrialDaysRemain($page.data.user);
</script>

{#if event != null}
	<div class="flex flex-col justify-between items-start gap-4 p-4 w-full">
		<!-- =============================== -->

		{#if $page.data.user == null}
			<aside class="alert flex justify-center items-center variant-filled-secondary">
				<div class="flex justify-between items-center w-full gap-4">
					<div class="alert-message">
						<h1 class="text-xl font-bold">Need an Account!</h1>
					</div>
					<!-- Actions -->
					<button
						type="button"
						class="btn variant-filled-tertiary"
						on:click={() => {
							goto('/auth/signup');
							drawerStore.close();
						}}>Sign Up</button
					>
				</div>
			</aside>

			<div class="leading-normal">
				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>

				{#each Object.keys(event.details) as k}
					<p>
						<b>{k}</b>: ###
					</p>
				{/each}
			</div>
		{:else if isPremium || remainFreeTrial > 0}
			{#if remainFreeTrial > 0 && !isPremium}
				<aside class="alert flex justify-center items-center variant-filled-secondary w-full gap-4">
					<div class="flex flex-col justify-center items-start w-full gap-4">
						<div class="alert-message">
							<h1 class="text-lg font-bold">
								Remaining Free Trial:
								{remainFreeTrial} Days
							</h1>
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
			{/if}

			<div class="leading-normal">
				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>

				{#each Object.keys(event.details) as k}
					<p><b>{k}</b>: {event.details[k]}</p>
				{/each}
			</div>
		{:else}
			<aside class="alert flex justify-center items-center variant-filled-secondary">
				<div class="flex justify-between items-center w-full gap-4">
					<div class="alert-message">
						<h1 class="text-xl font-bold">
							Only <b class="font-bold">Premium</b> members can see event details.
						</h1>
					</div>
					<!-- Actions -->
					<button
						type="button"
						class="btn variant-filled-tertiary"
						on:click={() => {
							goto('/payment/pricing');
							drawerStore.close();
						}}>Premium</button
					>
				</div>
			</aside>

			<br />

			<div class="leading-normal">
				<p>
					<b> Date: </b>
					{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
				</p>

				{#each Object.keys(event.details) as k}
					<p>
						<b>{k}</b>: ###
					</p>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<h1 class="text-xl font-bold">Error: Can't find the event.</h1>
{/if}

<br />
<br />
<br />
<br />
