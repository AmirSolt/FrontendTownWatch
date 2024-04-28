<script lang="ts">
	import { onMount } from 'svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import { MaxRadiusKm } from '$lib/config.js';
	import CustomMap from './CustomMap.svelte';
	export let mapControls: MapControls;
	const queueMapData: Writable<QueueMapData> = getContext('queueMapData');

	let defaultMapData = {
		home: { lat: 43.64222, long: -79.38529 },
		radius: 2000
	};

	let events: Event[] | undefined;
	let home: Point = defaultMapData.home;

	$queueMapData.queue.push({
		home: defaultMapData.home,
		radius: defaultMapData.radius,
		address: '',
		canBeAddedToAreas: false
	});

	onMount(() => {
		queueMapData.subscribe(async (newQueueMapData) => {
			const newSubmission = newQueueMapData.queue.at(-1);
			if (newSubmission == null) {
				return;
			}

			mapControls.radiuskm = newSubmission.radius / 1000;
			mapControls.address = newSubmission.address;
			home = newSubmission.home;
			events = await scanEvents({
				lat: newSubmission.home.lat,
				long: newSubmission.home.long,
				radius: Math.floor(MaxRadiusKm * 1000),
				address: mapControls.address
			});
		});
	});
</script>

<CustomMap {events} {home} radius={mapControls.radiuskm * 1000} />
