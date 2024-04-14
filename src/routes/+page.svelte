<script lang="ts">
	import LandingEventsMap from '$lib/components/customMap/LandingEventsMap.svelte';
	import MapHeader from '$lib/components/shell/MapHeader.svelte';
	import MapControl from '$lib/components/shell/MapControl.svelte';
	import MapShell from '$lib/components/shell/MapShell.svelte';

	let mapControls: MapControls = {
		address: '',
		radiuskm: 2
	};
</script>

<MapShell>
	<svelte:fragment slot="header">
		<MapHeader />
	</svelte:fragment>
	<svelte:fragment slot="control">
		<MapControl bind:mapControls />
	</svelte:fragment>
	<svelte:fragment slot="map">
		<LandingEventsMap {mapControls} />
	</svelte:fragment>
</MapShell>
