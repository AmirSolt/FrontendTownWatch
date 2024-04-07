<script lang="ts">
	import Marker from '$lib/components/map/Marker.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import Circle from '$lib/components/map/Circle.svelte';
	import { formatDateToLocale, stringToDate } from './utils';

	export let event: Event;
	export let censorEvents: boolean;
</script>

<Circle
	pos={[event.lat, event.long]}
	radius={150}
	colorHex={'#ff0000'}
	fillOpacity={0.2}
	strokeOpacity={0.7}
/>
<Marker pos={[event.lat, event.long]} width={40} height={40}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
		<!-- <circle cx="12" cy="12" r="10" stroke="#ff0000" stroke-width="2" /> -->
		<path d="M12 7V13M12 16.5V17" stroke="#ff0000" stroke-width="2" stroke-linecap="round" />
	</svg>

	<Popup>
		{#if !censorEvents}
			<p>
				Crime Type: {event.crime_type}
			</p>

			<p>
				Occurrence Date: {formatDateToLocale(stringToDate(event.occur_at))}
			</p>

			<p>
				Neighborhood: {event.neighborhood}
			</p>

			<p>
				Location Type: {event.location_type}
			</p>
		{:else}
			<p>
				<a href="/payment/pricing">Upgrade to premium to see event details</a>
			</p>

			<p>Crime Type: ******</p>

			<p>Occurrence Date: ******</p>

			<p>Neighborhood: ******</p>

			<p>Location Type: ******</p>
		{/if}
	</Popup>
</Marker>
