<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import type L from 'leaflet';

	export let width: number;
	export let height: number;
	export let pos: number[];

	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	setContext('layer', {
		// L.Marker inherits from L.Layer
		getLayer: () => marker
	});

	onMount(async () => {
		const leaf = await import('leaflet');
		console.log('marker');
		if (map) {
			let icon = leaf.divIcon({
				html: markerElement,
				className: 'map-marker',
				iconSize: leaf.point(width, height)
			});
			marker = leaf.marker(pos as L.LatLngExpression, { icon }).addTo(map);
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div id="marker" bind:this={markerElement}>
	{#if marker}
		<slot />
	{/if}
</div>
