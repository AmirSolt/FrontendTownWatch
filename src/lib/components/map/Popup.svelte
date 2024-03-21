<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import type L from 'leaflet';

	let popup: L.Popup | undefined;
	let popupElement: HTMLElement;

	let open = false;

	const { getLayer }: { getLayer: () => L.Layer | undefined } = getContext('layer');
	const layer = getLayer();

	onMount(async () => {
		const leaf = await import('leaflet');

		popup = leaf.popup().setContent(popupElement);

		if (layer) {
			layer.bindPopup(popup);
			layer.on('popupopen', () => (open = true));
			layer.on('popupclose', () => (open = false));
		}
	});

	onDestroy(() => {
		layer?.unbindPopup();
		popup?.remove();
		popup = undefined;
	});
</script>

<div id="popup" bind:this={popupElement}>
	{#if open}
		<slot />
	{/if}
</div>
