<script lang="ts">
	import { page } from '$app/stores';
	import { createUserArea } from '$lib/geo/client/areas';
	import type { Writable } from 'svelte/store';
	import { goto, invalidateAll } from '$app/navigation';
	import { BellRing } from 'lucide-svelte';
	import { getContext } from 'svelte';
	const explore: Writable<Explore> = getContext('explore');
	const exploreSubmission: Writable<ExploreSubmission> = getContext('exploreSubmission');

	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Need an Account',
		body: 'To create an Area, you need an account.',
		buttonTextConfirm: 'Register',
		response: (r: boolean) => {
			if (r) {
				goto('/auth/signup');
			}
		}
	};
</script>

<button
	type="button"
	class="btn variant-filled-secondary absolute top-2 right-2"
	style="z-index:500;"
	disabled={$exploreSubmission.explores.length < 2}
	on:click={async () => {
		if ($page.data.user == null) {
			modalStore.trigger(modal);
		} else {
			let _ = await createUserArea({
				address: $explore.address,
				radius: Math.floor($explore.radiuskm * 1000),
				lat: $explore.point.lat,
				long: $explore.point.long
			});
			invalidateAll();
		}
	}}
>
	<span class="pe-2"><BellRing /></span> Get Alerts</button
>
