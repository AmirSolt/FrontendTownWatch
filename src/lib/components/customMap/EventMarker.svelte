<script lang="ts">
	import Marker from '$lib/components/leafletMap/Marker.svelte';
	import Circle from '$lib/components/leafletMap/Circle.svelte';
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

<Marker pos={[event.lat, event.long]} width={40} height={40}>
	<div slot="icon">
		<Circle
			pos={[event.lat, event.long]}
			radius={200}
			colorHex={'#d41919'}
			fillOpacity={0.2}
			strokeOpacity={0.7}
		/>
		<button type="button" class="btn-icon" on:click={openEventDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
				<!-- <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="2" /> -->
				<path d="M12 7V13M12 16.5V17" stroke="#d41919" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>

	<div slot="selected-icon">
		<Circle
			pos={[event.lat, event.long]}
			radius={200}
			colorHex={'#dbb807'}
			fillOpacity={0.2}
			strokeOpacity={0.7}
		/>
		<button type="button" class="btn-icon" on:click={openEventDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
				<!-- <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="2" /> -->
				<path d="M12 7V13M12 16.5V17" stroke="#dbb807" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>

	<div slot="seen-icon">
		<Circle
			pos={[event.lat, event.long]}
			radius={200}
			colorHex={'#495a8f'}
			fillOpacity={0.1}
			strokeOpacity={0.4}
		/>
		<button type="button" class="btn-icon" on:click={openEventDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
				<!-- <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="2" /> -->
				<path d="M12 7V13M12 16.5V17" stroke="#495a8f" stroke-width="2" stroke-linecap="round" />
			</svg>
		</button>
	</div>
</Marker>
