<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import type L from 'leaflet';

	export let width: number;
	export let height: number;
	export let pos: number[];

	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;
	let isSelected: boolean = false;

	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	setContext('layer', {
		// L.Marker inherits from L.Layer
		getLayer: () => marker
	});

	onMount(async () => {
		const leaf = await import('leaflet');

		if (map) {
			let icon = leaf.divIcon({
				html: markerElement,
				className: 'map-marker',
				iconSize: leaf.point(width, height)
			});

			marker = leaf.marker(pos as L.LatLngTuple, { icon }).addTo(map);

			// Setting icon-selected by using tooltip event system
			let popup = leaf.popup();
			marker.bindPopup(popup);
			marker
				.on('popupopen', () => {
					isSelected = true;
				})
				.on('popupclose', () => {
					isSelected = false;
				});
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div id="marker" bind:this={markerElement}>
	{#if marker}
		{#if isSelected}
			<slot name="selected-icon" />
		{:else}
			<slot name="icon" />
		{/if}
	{/if}
</div>
