<script lang="ts">
	import { page } from '$app/stores';
	import { createUserArea } from '$lib/geo/client/areas';
	import type { Writable } from 'svelte/store';
	import { invalidateAll, goto } from '$app/navigation';
	import { BellRing } from 'lucide-svelte';
	import { getContext } from 'svelte';
	// const explore: Writable<Explore> = getContext('explore');
	// const exploreSubmission: Writable<ExploreSubmission> = getContext('exploreSubmission');
	const inputMapData: Writable<InputMapData> = getContext('inputMapData');

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
	class="btn variant-filled-secondary"
	disabled={$inputMapData.submissions.length < 2}
	on:click={async () => {
		if ($page.data.user == null) {
			modalStore.trigger(modal);
		} else {
			if ($inputMapData.submissions.length > 1) {
				let submission = $inputMapData.submissions.at(-1);
				if (submission == null) {
					return;
				}
				let _ = await createUserArea({
					address: submission.address,
					radius: Math.floor(submission.radiuskm * 1000),
					lat: submission.point.lat,
					long: submission.point.long
				});
				invalidateAll();
			}
		}
	}}
>
	<span class="pe-2"><BellRing /></span> Get Alerts</button
>
