<script lang="ts">
	import Marker from '$lib/components/leafletMap/Marker.svelte';
	import Circle from '$lib/components/leafletMap/Circle.svelte';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	export let area: Area | undefined;
	export let home: Point;
	export let radius: number;

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

{#key home.lat + home.long + radius}
	<Circle pos={[home.lat, home.long]} {radius} />
{/key}
<Marker pos={[home.lat, home.long]} width={40} height={40}>
	<div slot="icon">
		<button type="button" class="btn-icon" on:click={openAreaDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#4685af" viewBox="0 0 24 24">
				<path
					d="M2.168,10.555a1,1,0,0,1,.278-1.387l9-6a1,1,0,0,1,1.11,0l9,6A1,1,0,0,1,21,11H19v9a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V11H3l.019-.019A.981.981,0,0,1,2.168,10.555Z"
				/>
			</svg>
		</button>
	</div>

	<div slot="selected-icon">
		<button type="button" class="btn-icon" on:click={openAreaDrawer}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#4685af" viewBox="0 0 24 24">
				<path
					d="M2.168,10.555a1,1,0,0,1,.278-1.387l9-6a1,1,0,0,1,1.11,0l9,6A1,1,0,0,1,21,11H19v9a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V11H3l.019-.019A.981.981,0,0,1,2.168,10.555Z"
				/>
			</svg>
		</button>
	</div>
</Marker>
