<script setup lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import pkg from 'maplibre-gl';
	const { Map, NavigationControl, Popup, Marker } = pkg;
	import { onMount } from 'svelte';

	export let lat: number = 0.0;
	export let long: number = 0.0;

	let markerDiv: HTMLElement | undefined;

	onMount(() => {
		const map = new Map({
			container: 'map',
			style: {
				version: 8,
				sources: {
					MIERUNEMAP: {
						type: 'raster',
						tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
						tileSize: 256,
						attribution:
							'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					}
				},
				layers: [
					{
						id: 'MIERUNEMAP',
						type: 'raster',
						source: 'MIERUNEMAP',
						minzoom: 0,
						maxzoom: 18
					}
				]
			},
			center: [lat, long],
			zoom: 9
		});

		const popup = new Popup({ offset: 25 }).setText(
			'Construction on the Washington Monument began in 1848.'
		);

		new Marker({ element: markerDiv })
			.setLngLat([lat, long])
			.setPopup(popup) // sets a popup on this marker
			.addTo(map);

		map.addControl(
			new NavigationControl({
				visualizePitch: true
			})
		);
	});
</script>

<div id="map" />

<div id="marker" bind:this={markerDiv}></div>

<style>
	#map {
		height: 100vh;
		width: 50vw;
	}
	#marker {
		background-image: url('https://maplibre.org/maplibre-gl-js/docs/assets/washington-monument.jpg');
		background-size: cover;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		cursor: pointer;
	}

	.maplibregl-popup {
		max-width: 200px;
	}
</style>
