<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { userFreeTrialDaysRemain, isUserPremium } from '$lib/stripe/utils';
	const drawerStore = getDrawerStore();

	const isPremium = isUserPremium($page.data.customer);
	const remainFreeTrial = userFreeTrialDaysRemain($page.data.user);
</script>

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
	<br />
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
		<br />
	{/if}
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
{/if}
