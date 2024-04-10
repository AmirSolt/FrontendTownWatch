<script lang="ts">
	import DataList from './DataList.svelte';
	import type { Stripe } from 'stripe';

	export let name: string;
	export let user: User | undefined | null;
	export let price: Stripe.Price | undefined;

	export let featureList: string[] = [];
	export let specialText: string | null = null;
	export let isSpecialColor: boolean = false;
	// let price: Stripe.Price | undefined =
	// 	typeof product?.default_price === 'string' || product?.default_price === null
	// 		? undefined
	// 		: product?.default_price;
	let currencySymbol: string = '$';
</script>

<div class="card text-center border-2 {isSpecialColor ? `border-primary-500` : 'border-slate-400'}">
	<div class="relative w-full h-full p-2">
		{#if specialText != null}
			<span
				class="badge absolute -top-4 right-3 z-10 text-md p-2 {isSpecialColor
					? `variant-filled-tertiary`
					: 'variant-filled'}"
			>
				{specialText}
			</span>
		{/if}

		<div class="flex flex-col justify-between items-start w-full h-full p-2">
			<div class="flex flex-col justify-start items-start w-full h-full gap-2 p-2">
				<div class="flex flex-col justify-center items-start p-2 gap-2">
					<h3 class="text-3xl font-semibold">
						{name}
					</h3>
					<p>
						{currencySymbol}{price?.unit_amount ? Math.floor(price.unit_amount / 100) : null}/{price
							?.recurring?.interval}
					</p>
				</div>

				<DataList list={featureList} />
			</div>

			<div class="flex justify-between items-center w-full">
				<div class="flex justify-center items-baseline" />

				{#if user == null}
					<a
						class="btn text-lg md:text-2x w-24 variant-filled"
						href={`/auth/signup?dest=${encodeURIComponent('/payment/pricing')}`}
					>
						Next
					</a>
				{:else}
					<a
						class="btn text-lg md:text-2x w-24 variant-filled"
						href={`/payment/pricing/${price?.id}`}
						target="_blank"
					>
						Next
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
