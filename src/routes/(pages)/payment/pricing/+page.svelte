<script lang="ts">
	import { HelpCircle } from 'lucide-svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import PriceCard from './PriceCard.svelte';
	import type Stripe from 'stripe';
	import { PUBLIC_DOMAIN } from '$env/static/public';

	export let data;
	let { user, prices } = data;

	function orderPricesByTier(prices: Stripe.Price[]) {
		return prices.sort((a: Stripe.Price, b: Stripe.Price) => {
			const tierA = parseInt(a.metadata['tier']);
			const tierB = parseInt(b.metadata['tier']);
			return tierA - tierB;
		});
	}
	orderPricesByTier(prices);
</script>

<div class="space-y-24">
	<div class="flex flex-col justify-center gap-8">
		<div class="flex flex-col justify-center text-center gap-4">
			<h2 class="text-4xl font-bold">
				Upgrade to <span class="underline">Premium</span>
			</h2>
			<p class="text-lg">We strive to make the world a safer place. Help us get there.</p>
		</div>

		<div class="flex flex-wrap justify-center items-center gap-8">
			<PriceCard name="Monthly" {user} featureList={['Unlocks event details']} price={prices[0]} />
		</div>
	</div>

	<div class="space-y-4">
		<h1 class="text-2xl font-bold">FAQ's</h1>
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
				<svelte:fragment slot="summary">Where do the donations go to?</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="p-2">
						Please visit <a class="underline" href="/info/our-data">Our Data</a> for more information
					</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
				<svelte:fragment slot="summary">Is your data reliable?</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="p-2">
						Please visit <a class="underline" href="/info/our-data">Our Data</a> for more information
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>
