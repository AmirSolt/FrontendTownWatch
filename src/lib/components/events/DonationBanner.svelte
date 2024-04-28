<script lang="ts">
	import { Smile } from 'lucide-svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { userFreeTrialDaysRemain, isUserPremium } from '$lib/stripe/utils';
	const drawerStore = getDrawerStore();

	const isPremium = isUserPremium($page.data.customer);
	const remainFreeTrial = userFreeTrialDaysRemain($page.data.user);
	let visitedDonatePage = false;

	onMount(async () => {
		visitedDonatePage = await JSON.parse(
			window.localStorage.getItem('visitedDonatePage') ?? 'false'
		);
	});
</script>

{#if !visitedDonatePage}
	<aside class="alert flex justify-center items-center variant-filled-secondary">
		<div class="flex justify-between items-center w-full gap-4">
			<div class="alert-message">
				<h1 class="text-xl font-bold">We need your support</h1>
			</div>
			<!-- Actions -->
			<button
				type="button"
				class="btn variant-filled-tertiary"
				on:click={() => {
					goto('/donate');
					drawerStore.close();
				}}>Donate <span></span> <Smile /></button
			>
		</div>
	</aside>
{/if}
