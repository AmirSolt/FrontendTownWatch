<script lang="ts">
	import { page } from '$app/stores';
	import { createUserArea } from '$lib/geo/client/areas';
	import type { Writable } from 'svelte/store';
	import { invalidateAll, goto } from '$app/navigation';
	import { BellRing, Hourglass } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const queueMapData: Writable<QueueMapData> = getContext('queueMapData');

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

	let isButtonBusy = false;
</script>

<button
	type="button"
	class="btn variant-filled-secondary"
	disabled={$queueMapData.queue.at(-1)?.canBeAddedToAreas == false}
	on:click={async () => {
		isButtonBusy = true;
		if ($page.data.user == null) {
			modalStore.trigger(modal);
		} else {
			if ($queueMapData.queue.length > 0) {
				let submission = $queueMapData.queue.at(-1);
				if (submission == null || submission.canBeAddedToAreas == false) {
					return;
				}
				let _ = await createUserArea({
					address: submission.address,
					radius: Math.floor(submission.radius),
					lat: submission.home.lat,
					long: submission.home.long
				});
				invalidateAll();
			}
		}
		isButtonBusy = false;
	}}
>
	{#if !isButtonBusy}
		<span class="pe-2"><BellRing /></span> Get Alerts
	{:else}
		<span class="pe-2"> <Hourglass /></span>
	{/if}
</button>
