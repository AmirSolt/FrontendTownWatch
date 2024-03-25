<script lang="ts">
	import Map from '$lib/components/map/Map.svelte';
	import Marker from '$lib/components/map/Marker.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import { dictionarizeEvents } from '$lib/components/events/scan';
	import { onMount } from 'svelte';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { scanEvents } from '$lib/geo/client/events';
	import { Region } from '$lib/enums';
	const explore: Writable<Explore> = getContext('explore');

	function getValues<Type>(dict: { [id: string]: Type }): Type[] {
		return Object.keys(dict).map(function (key) {
			return dict[key];
		});
	}

	let events: { [id: string]: Event } = {};
	let timerId: NodeJS.Timeout | null | undefined;
	onMount(() => {
		explore.subscribe(async (newExplore) => {
			if (timerId) {
				clearTimeout(timerId);
			}
			timerId = setTimeout(async () => {
				let newEvents = await scanEvents({
					lat: newExplore.point.lat,
					long: newExplore.point.long,
					radius: newExplore.radiuskm * 1000,
					region: Region.TORONTO,
					address: newExplore.address
				});
				events = dictionarizeEvents(events, newEvents);
			}, 500);
		});
	});
</script>

<div class="w-96 h-96">
	<Map view={[$explore.point.lat, $explore.point.long]} zoom={12}>
		<!-- {#if user}
			<form action="?/create_area" method="post">
				<button
					type="submit"
					class="btn variant-filled-secondary absolute top-2 right-2"
					style="z-index:500;"
					disabled={explore.address == ''}>Get Notified</button
				>
			</form>
		{:else}
			<button
				type="button"
				class="btn variant-filled-secondary absolute top-2 right-2"
				style="z-index:500;"
				disabled={explore.address == ''}
				on:click={async () => {
					// notify to signup
				}}>Get Notified</button
			>
		{/if} -->

		{#each getValues(events) as event}
			<Marker pos={[event.lat, event.long]} width={40} height={40}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
					viewBox="0 0 45 40"
				>
					<path
						d="m23.046 25.449 9.601 16.885H13.253l9.793-16.885ZM45 23.965H25.702l9.575 16.84L45 23.965ZM44.963 20.923 35.339 4.254l-9.668 16.669h19.292ZM32.771 2.618h-4.17L8.522 37.237l2.08 3.603L32.771 2.618ZM25.084 2.618H11.465L0 22.476l6.768 11.722 18.316-31.58Z"
						style="fill:#e9204f;fill-rule:nonzero"
						transform="translate(0 -2.618)"
					/>
				</svg>

				<Popup
					>Like & Subscribe! This is a very loooooooooooong title and it has many characters.</Popup
				>
			</Marker>
		{/each}
	</Map>
</div>
