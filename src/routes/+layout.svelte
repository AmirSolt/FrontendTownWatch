<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { Modal } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import EventDrawer from '$lib/components/events/EventDrawer.svelte';
	import AreaDrawer from '$lib/components/areas/AreaDrawer.svelte';
	// Explore store
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	const inputMapData = writable<InputMapData>({
		submissions: []
	});
	const outputMapData = writable<OutputMapData>({
		events: [],
		area: undefined,
		home: { lat: 0.0, long: 0.0 },
		radius: 0,
		censorEvents: true
	});

	setContext('inputMapData', inputMapData);
	setContext('outputMapData', outputMapData);

	// initial address
	if ($page.data.areas && $page.data.areas.length > 0) {
		let area = $page.data.areas[0];
		$inputMapData.submissions.push({
			point: { lat: area.lat, long: area.long },
			address: area.address,
			area: area,
			radiuskm: area.radius / 1000
		} as InputMapDataSubmission);
	} else {
		$inputMapData.submissions.push({
			point: { lat: 43.64222, long: -79.38529 },
			address: '',
			area: undefined,
			radiuskm: 2
		} as InputMapDataSubmission);
	}

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
</script>

<Toast position="t" />
<Modal />
<Drawer zIndex="widget-layer-map-z-2">
	{#if $drawerStore.id === 'event'}
		<EventDrawer />
	{:else if $drawerStore.id === 'area'}
		<AreaDrawer />
	{/if}
</Drawer>
<slot />
