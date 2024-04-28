<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { Modal } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import EventsDrawer from '$lib/components/events/EventsDrawer.svelte';
	// Explore store
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	const queueMapData = writable<QueueMapData>({
		queue: []
	});
	setContext('queueMapData', queueMapData);

	// ========================

	// Error toast
	import { Toast, initializeStores, getToastStore } from '@skeletonlabs/skeleton';
	initializeStores();
	$: if ($page.form?.errorMessage != null) {
		getToastStore().trigger({
			message: `Error: ${$page.form.errorMessage}`,
			background: 'variant-filled-error'
		});
	}
	// ========================
	const drawerStore = getDrawerStore();

	// ========================

	const seenEventIDs = writable<number[]>([]);
	setContext('seenEventIDs', seenEventIDs);

	onMount(async () => {
		const storedSeenEventIds = await JSON.parse(
			window.localStorage.getItem('seenEventIDs') ?? '[]'
		);
		seenEventIDs.set(storedSeenEventIds);

		seenEventIDs.subscribe((newSeenEventIDs) => {
			let toStoreEventIDs = [];
			if (newSeenEventIDs.length > 40) {
				toStoreEventIDs = newSeenEventIDs.slice(-40);
			} else {
				toStoreEventIDs = newSeenEventIDs;
			}
			window.localStorage.setItem('seenEventIDs', JSON.stringify(toStoreEventIDs));
		});
	});
</script>

<Toast position="t" />
<Modal />
<Drawer zIndex="widget-layer-map-z-2">
	{#if $drawerStore.id === 'event'}
		<EventsDrawer />
	{/if}
</Drawer>
<slot />
