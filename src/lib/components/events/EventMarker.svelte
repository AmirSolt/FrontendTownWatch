<script lang="ts">
	import Marker from '$lib/components/map/Marker.svelte';
	import Circle from '$lib/components/map/Circle.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	export let event: Event;

	function openEventDrawer() {
		const drawerSettings: DrawerSettings = {
			id: 'event',
			position: 'bottom',
			meta: { event_id: event.id }
		};
		drawerStore.open(drawerSettings);
	}
</script>

<Circle
	pos={[event.lat, event.long]}
	radius={150}
	colorHex={'#ff0000'}
	fillOpacity={0.2}
	strokeOpacity={0.7}
/>
<Marker pos={[event.lat, event.long]} width={40} height={40}>
	<div slot="icon">
		<button type="button" class="btn-icon" on:click={openEventDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
				<!-- <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="2" /> -->
				<path d="M12 7V13M12 16.5V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>

	<div slot="selected-icon">
		<button type="button" class="btn-icon" on:click={openEventDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff0000">
				<circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" />
				<path d="M12 7V13M12 16.5V17" stroke="#fff" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>
</Marker>
