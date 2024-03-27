<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import { dictionarizeEvents } from '$lib/components/events/scan';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import EventMarker from './EventMarker.svelte';
	import HomeMarker from './HomeMarker.svelte';
	const explore: Writable<Explore> = getContext('explore');

	function getValues<Type>(dict: { [id: string]: Type }): Type[] {
		return Object.keys(dict).map(function (key) {
			return dict[key];
		});
	}

	let events: { [id: string]: Event } = {};
	let timerId: NodeJS.Timeout | null | undefined;
	const delayDefault = 500;

	onMount(() => {
		explore.subscribe(async (newExplore) => {
			let delay = delayDefault;
			if (timerId) {
				clearTimeout(timerId);
			} else {
				delay = 0;
			}
			timerId = setTimeout(async () => {
				console.log('==================');
				console.log(newExplore.point.lat);
				console.log(newExplore.point.long);
				console.log('==================');

				let newEvents = await scanEvents({
					lat: newExplore.point.lat,
					long: newExplore.point.long,
					radius: Math.floor(newExplore.radiuskm * 1000),
					address: newExplore.address
				});
				events = dictionarizeEvents(events, newEvents);
			}, delay);
		});
	});
</script>

{#key $explore.point.lat + $explore.point.long}
	<Map view={[$explore.point.lat, $explore.point.long]} zoom={13}>
		<HomeMarker />
		{#each getValues(events) as event}
			<EventMarker
				{event}
				showDetails={$page.data.customer != null && $page.data.customer?.tier > 0}
			/>
		{/each}
	</Map>
{/key}
