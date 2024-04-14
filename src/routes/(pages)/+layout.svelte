<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import HeaderTailContent from '$lib/components/shell/HeaderTailContent.svelte';
</script>

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
				<HeaderTailContent />
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
