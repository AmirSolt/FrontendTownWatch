<script lang="ts">
	import { Smile } from 'lucide-svelte';
	import type Stripe from 'stripe';
	import { onMount } from 'svelte';
	import DonateAmountButton from './DonateAmountButton.svelte';

	export let data;
	let { prices } = data;

	let amount = 5;

	function orderPricesByTier(prices: Stripe.Price[]) {
		return prices.sort((a: Stripe.Price, b: Stripe.Price) => {
			const tierA = parseInt(a.metadata['tier']);
			const tierB = parseInt(b.metadata['tier']);
			return tierA - tierB;
		});
	}
	orderPricesByTier(prices);

	onMount(() => {
		window.localStorage.setItem('visitedDonatePage', JSON.stringify('true'));
	});
</script>

<div class="space-y-24">
	<div class="flex flex-col justify-center gap-8">
		<div class="flex flex-col justify-center items-center text-center gap-4">
			<h2 class="text-4xl font-bold">
				Thank <span class="underline">You</span> For Even Considering
			</h2>
			<p class="text-lg">
				This website is run by a solo developer. So, your help makes a <b>BIG</b> difference.
			</p>
			<Smile size={60} />
		</div>

		<form method="POST" class="flex flex-col justify-center items-center gap-6">
			<div class="flex flex-wrap justify-center items-center gap-6">
				<DonateAmountButton preset={5} bind:amount />
				<DonateAmountButton preset={10} bind:amount />
				<DonateAmountButton preset={25} bind:amount />
				<DonateAmountButton preset={50} bind:amount />
			</div>

			<input type="hidden" name="amount" value={amount} />

			<button class="btn variant-filled-secondary w-36" type="submit">Donate</button>
		</form>
	</div>
</div>
