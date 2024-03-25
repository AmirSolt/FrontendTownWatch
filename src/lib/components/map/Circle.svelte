<script lang="ts">
	import { onMount, onDestroy, getContext, setContext } from 'svelte';
	import type L from 'leaflet';

	export let radius: number;
	export let pos: number[];
	export let colorHex: string = '#4685af';
	export let fillOpacity: number = 0.08;
	export let strokeOpacity: number = 0.5;

	let circle: L.Circle | undefined;
	let circleElement: HTMLElement;

	const { getMap }: { getMap: () => L.Map | undefined } = getContext('map');
	const map = getMap();

	onMount(async () => {
		const leaf = await import('leaflet');
		console.log('circle');
		if (map) {
			circle = leaf
				.circle(pos as L.LatLngTuple, {
					radius,
					fillOpacity,
					opacity: strokeOpacity,
					color: colorHex
				})
				.addTo(map);
		}
	});

	onDestroy(() => {
		circle?.remove();
		circle = undefined;
	});
</script>

<div id="circle" bind:this={circleElement}>
	{#if circle}
		<slot />
	{/if}
</div>
