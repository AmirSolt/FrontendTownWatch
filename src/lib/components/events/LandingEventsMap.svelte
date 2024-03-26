<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import Marker from '$lib/components/map/Marker.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import { dictionarizeEvents } from '$lib/components/events/scan';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Region } from '$lib/enums';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import Circle from '../map/Circle.svelte';
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
					radius: newExplore.radiuskm * 1000,
					region: Region.TORONTO,
					address: newExplore.address
				});
				events = dictionarizeEvents(events, newEvents);
			}, delay);
		});
	});
</script>

{#key $explore.point.lat + $explore.point.long}
	<Map view={[$explore.point.lat, $explore.point.long]} zoom={14}>
		{#key $explore.point.lat + $explore.point.long + $explore.radiuskm}
			<Circle pos={[$explore.point.lat, $explore.point.long]} radius={$explore.radiuskm * 1000} />
		{/key}
		<Marker pos={[$explore.point.lat, $explore.point.long]} width={40} height={40}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="#4685af" viewBox="0 0 24 24">
				<path
					d="M2.168,10.555a1,1,0,0,1,.278-1.387l9-6a1,1,0,0,1,1.11,0l9,6A1,1,0,0,1,21,11H19v9a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V11H3l.019-.019A.981.981,0,0,1,2.168,10.555Z"
				/>
			</svg>
		</Marker>

		{#each getValues(events) as event}
			<Circle
				pos={[event.lat, event.long]}
				radius={100}
				colorHex={'#ff0000'}
				fillOpacity={0.2}
				strokeOpacity={1}
			/>
			<Marker pos={[event.lat, event.long]} width={40} height={40}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
					<!-- <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="2" /> -->
					<path d="M12 7V13M12 16.5V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" />
				</svg>

				<Popup>
					{#if $page.data.customer != null && $page.data.customer?.tier > 0}
						show details
					{:else}
						<p>
							<a href="/pricing">Subscribe to see event details</a>
						</p>
					{/if}
				</Popup>
			</Marker>
		{/each}
	</Map>
{/key}
