<script lang="ts">
	import LandingPageMap from '$lib/components/customMap/LandingPageMap.svelte';
	import MapHeader from '$lib/components/shell/MapHeader.svelte';
	import MapControl from '$lib/components/shell/MapControl.svelte';
	import MapShell from '$lib/components/shell/MapShell.svelte';

	let mapControls: MapControls = {
		address: '',
		radiuskm: 2
	};
</script>

<MapShell>
	<svelte:fragment slot="row1">
		<MapHeader />
	</svelte:fragment>
	<svelte:fragment slot="row2">
		<MapControl bind:mapControls />
	</svelte:fragment>
	<svelte:fragment slot="map">
		<LandingPageMap {mapControls} />
	</svelte:fragment>
</MapShell>
