<script lang="ts">
	import { formatDateToLocale, stringToDate } from './utils';

	export let event: Event;
	export let index: number;
	export let censorEvents: boolean = true;
</script>

<div class="card flex flex-col justify-between items-start gap-4 p-4 w-full">
	<!-- =============================== -->

	<h1>
		Event #{index + 1}
	</h1>

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
</div>
