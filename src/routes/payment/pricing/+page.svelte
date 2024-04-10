<script lang="ts">
	import { HelpCircle } from 'lucide-svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import PriceCard from './PriceCard.svelte';
	import type Stripe from 'stripe';

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
				We Need <span class="underline">Your</span> Support
			</h2>
			<p class="text-lg">We strive to make the world a safer place. Help us get there.</p>
		</div>

		<div class="flex flex-wrap justify-center items-center gap-8">
			<PriceCard name="Monthly" {user} featureList={['Unlocks all events']} price={prices[0]} />

			<PriceCard
				name="Yearly"
				{user}
				price={prices[1]}
				featureList={['Unlocks all events']}
				specialText="Best Value"
				isSpecialColor={true}
			/>
		</div>
	</div>

	<div class="space-y-4">
		<h1 class="text-2xl font-bold">FAQ's</h1>
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
				<svelte:fragment slot="summary">What are the benefits of being a donor ?</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="p-2">Unlock access to more detailed event information.</div>
				</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
				<svelte:fragment slot="summary">What is your refund policy?</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="p-2">
						You can request a refund within 30 days of payment. Email our support: <span
							class="badge variant-ghost">support@civilwatch.net</span
						>
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
