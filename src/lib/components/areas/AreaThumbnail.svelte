<script lang="ts">
	import { Radio } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const inputMapData: Writable<InputMapData> = getContext('inputMapData');
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function openAreaDrawer() {
		if (area == null) {
			return;
		}
		const drawerSettings: DrawerSettings = {
			id: 'area',
			position: 'bottom',
			meta: { area_id: area.id }
		};
		drawerStore.open(drawerSettings);
	}
	export let area: Area;
</script>

<button
	type="button"
	class="btn-icon variant-filled-primary"
	on:click={() => {
		$inputMapData.submissions.push({
			point: { lat: area.lat, long: area.long },
			address: area.address,
			radiuskm: area.radius / 1000,
			area: area
		});
		$inputMapData.submissions = $inputMapData.submissions;

		openAreaDrawer();
	}}
>
	<Radio />
</button>
