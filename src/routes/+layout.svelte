<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	export let data;
	let { user, customer } = data;

	import { Modal } from '@skeletonlabs/skeleton';

	// Explore store
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	const explore = writable<Explore>({
		point: { lat: 43.64222, long: -79.38529 },
		address: 'M5V 3L9',
		radiuskm: 2
	} as Explore);
	const exploreSubmission = writable<ExploreSubmission>({
		explores: []
	} as ExploreSubmission);
	setContext('explore', explore);
	setContext('exploreSubmission', exploreSubmission);

	$exploreSubmission.explores.push($explore);
	// ========================

	// Error toast
	import { Toast, initializeStores, getToastStore } from '@skeletonlabs/skeleton';
	initializeStores();
	$: if ($page.error != null) {
		getToastStore().trigger({
			message: `Error: ${$page.error.message}`,
			background: 'variant-filled-error'
		});
	}

	// // Highlight JS
	// import hljs from 'highlight.js/lib/core';
	// import 'highlight.js/styles/github-dark.css';
	// import { storeHighlightJs } from '@skeletonlabs/skeleton';
	// import xml from 'highlight.js/lib/languages/xml'; // for HTML
	// import css from 'highlight.js/lib/languages/css';
	// import javascript from 'highlight.js/lib/languages/javascript';
	// import typescript from 'highlight.js/lib/languages/typescript';

	// hljs.registerLanguage('xml', xml); // for HTML
	// hljs.registerLanguage('css', css);
	// hljs.registerLanguage('javascript', javascript);
	// hljs.registerLanguage('typescript', typescript);
	// storeHighlightJs.set(hljs);

	// // Floating UI for Popups
	// import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// import { storePopup } from '@skeletonlabs/skeleton';
	// storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Toast position="t" />
<Modal />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="pageHeader">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/" class="flex justify-center items-center">
					<img src="/logo.png" alt="Logo" class="w-12" />
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if user}
					{#if customer != null && customer.tier > 0}
						<a class="btn btn-sm variant-ghost-surface" href="/payment/wallet" target="_blank">
							Wallet
						</a>
					{:else}
						<a class="btn btn-sm variant-filled-tertiary" href="/payment/pricing"> Premium </a>
					{/if}

					<form action="/auth/logout" method="post">
						<button type="submit" class="btn btn-sm variant-ghost-surface"> Logout </button>
					</form>
				{:else}
					<a class="btn btn-sm variant-filled-tertiary" href="/payment/pricing"> Premium </a>

					<a
						class="btn btn-sm variant-ghost-surface"
						href={`/auth/login?dest=${$page.url.searchParams.get('dest')}`}
					>
						Login
					</a>
					<a
						class="btn btn-sm variant-ghost-surface"
						href={`/auth/signup?dest=${$page.url.searchParams.get('dest')}`}
					>
						Signup
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Page Route Content -->
	<div class="flex justify-center items-center m-4">
		<div>
			<slot />
		</div>
	</div>
	<svelte:fragment slot="pageFooter">
		<br />
		<br />
		<br />

		<hr />
		<br />
		<div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
			<div class="sm:flex sm:items-center sm:justify-between">
				<a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
					<img src="/logo.png" alt="Logo" class="w-8" />
					<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
						>Civil Watch</span
					>
				</a>
				<ul
					class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
				>
					<li>
						<a href="/info/terms-of-service" class="hover:underline me-4 md:me-6">Term of Service</a
						>
					</li>
					<li>
						<a href="/info/privacy-policy" class="hover:underline me-4 md:me-6">Privacy Policy</a>
					</li>
					<li>
						<a href="mailto:support@civilwatch.net" class="hover:underline"
							>support@civilwatch.net</a
						>
					</li>
				</ul>
			</div>
			<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
				>© 2024 <a href="/" class="hover:underline">Civil Watch</a>. All Rights Reserved.</span
			>
		</div>
	</svelte:fragment>
</AppShell>
