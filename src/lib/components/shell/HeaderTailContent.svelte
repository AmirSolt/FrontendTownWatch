<script lang="ts">
	import { page } from '$app/stores';
	import { isCustomerPremium } from '$lib/stripe/utils.js';
</script>

{#if $page.data.user}
	<a class="btn btn-sm bg-surface-200 border border-surface-500" href="/payment/pricing">
		Premium
	</a>
	{#if isCustomerPremium($page.data.customer)}
		<a class="btn btn-sm bg-surface-200" href="/payment/wallet" target="_blank"> Wallet </a>
	{/if}

	<form action="/auth/logout" method="post">
		<button type="submit" class="btn btn-sm bg-surface-200"> Logout </button>
	</form>
{:else}
	<a class="btn btn-sm bg-surface-200 border border-surface-500" href="/payment/pricing">
		Premium
	</a>

	<a
		class="btn btn-sm bg-surface-200"
		href={`/auth/login?dest=${$page.url.searchParams.get('dest')}`}
	>
		Login
	</a>
	<a
		class="btn btn-sm bg-surface-200"
		href={`/auth/signup?dest=${$page.url.searchParams.get('dest')}`}
	>
		Signup
	</a>
{/if}
