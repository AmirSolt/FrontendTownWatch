<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import { MaxRadiusKm } from '$lib/config.js';
	import EventsMap from './EventsMap.svelte';

	export let radiusKm: number;

	$: $outputMapData.radius = radiusKm * 1000;

	const inputMapData: Writable<InputMapData> = getContext('inputMapData');
	const outputMapData: Writable<OutputMapData> = getContext('outputMapData');

	onMount(() => {
		inputMapData.subscribe(async (newInputMapData) => {
			const newSubmission = newInputMapData.submissions.at(-1);
			if (newSubmission == null) {
				return;
			}

			$outputMapData.radius = newSubmission.radiuskm * 1000;
			$outputMapData.home = newSubmission.point;
			$outputMapData.area = newSubmission.area;
			$outputMapData.censorEvents = !($page.data.customer != null && $page.data.customer?.tier > 0);
			let events = await scanEvents({
				lat: newSubmission.point.lat,
				long: newSubmission.point.long,
				radius: Math.floor(MaxRadiusKm * 1000),
				address: newSubmission.address
			});

			$outputMapData.events = events;
		});
	});
</script>

<EventsMap
	events={$outputMapData.events}
	radius={$outputMapData.radius}
	home={$outputMapData.home}
	area={$outputMapData.area}
/>
