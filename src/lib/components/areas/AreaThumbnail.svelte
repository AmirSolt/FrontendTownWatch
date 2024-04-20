<script lang="ts">
	import { Radio } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	export let area: Area;

	const queueMapData: Writable<QueueMapData> = getContext('queueMapData');
	const drawerStore = getDrawerStore();

	function openAreaDrawer() {
		if (area == null) {
			return;
		}
		const drawerSettings: DrawerSettings = {
			id: 'area',
			position: 'bottom',
			meta: { area: area }
		};
		drawerStore.open(drawerSettings);
	}
</script>

<button
	type="button"
	class="btn-icon variant-filled-primary"
	on:click={() => {
		$queueMapData.queue.push({
			home: { lat: area.lat, long: area.long },
			address: area.address,
			radius: area.radius,
			area: area,
			canBeAddedToAreas: false
		});
		$queueMapData.queue = $queueMapData.queue;

		openAreaDrawer();
	}}
>
	<Radio />
</button>
