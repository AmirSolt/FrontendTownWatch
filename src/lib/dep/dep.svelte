<script lang="ts">
	import Area from '$lib/components/areas/Area.svelte';
	import { createUserArea } from '$lib/components/areas/crud.js';
	import Map from '$lib/components/map/Map.svelte';
	import Marker from '$lib/components/map/Marker.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import { dictionarizeEvents, fetchEvents } from '$lib/components/scan/scan';
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	export let data;
	let { user, areas } = data;
	let areaActivated = false;
	let addressLat = 43.8394267;
	let addressLong = -79.511324;
	let address = '';
	let radius = 10.0;
	let events: { [id: string]: Event } = {};

	function getValues<Type>(dict: { [id: string]: Type }): Type[] {
		return Object.keys(dict).map(function (key) {
			return dict[key];
		});
	}
</script>

<br />
<!-- <div class="max-w-6xl flex flex-col gap-4">
	<div class="flex flex-col justify-center items-center text-center gap-3">
		<h1>
			<strong
				class="text-6xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90%"
			>
				BASEDPOCKET
			</strong>
		</h1>
		<h1 class="text-4xl">(Early Access)</h1>
		<p class="text-2xl">Translate Your Videos for Worldwide Audience using AI.</p>
		<p>Translate audio, subtitles, description, metadata</p>
		<a href="/auth/signup" class="btn variant-filled-primary"> Action Button </a>
	</div>
</div> -->
<br />

<AddressSearch
	bind:address
	bind:addressLat
	bind:addressLong
	on:click={async () => {
		areaActivated = true;
		let newEvents = await scanEvents(addressLat, addressLong, radius);
		events = dictionarizeEvents(events, newEvents);
		console.log('events:', events);
	}}
/>
<div class="flex justify-center items-center gap-2">
	<label for="radius">Radius:</label>
	<input name="radius" type="range" max="100" bind:value={radius} />
</div>
<p>
	{addressLat}, {addressLong}
</p>
<p>
	{getValues(events).length}
</p>
<div class="w-96 h-96">
	<Map view={[addressLat, addressLong]} zoom={12}>
		<button
			class="btn variant-filled-secondary absolute top-2 right-2"
			style="z-index:500;"
			disabled={!areaActivated}
			on:click={async () => {
				if (user == null) {
					// popup
				} else {
					let newArea = await createUserArea({
						address
					});
					if (newArea) areas.push(newArea);
				}
			}}>Get Notified</button
		>

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

<br />
<br />

{#each areas as area}
	<Area {area} />
{/each}

<br />
<br />
<br />
