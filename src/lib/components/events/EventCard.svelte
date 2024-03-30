<script lang="ts">
	export let event: Event;
	export let index: number;
	export let showDetails: boolean = false;
</script>

<button type="button" class="card flex flex-row justify-between items-center gap-4 p-4 w-full">
	<!-- =============================== -->

	<h1>
		Event #{index + 1}
	</h1>

	{#if showDetails}
		<p>
			Crime Type: {event.crime_type}
		</p>

		<p>
			Occurrence Date: {event.occur_at}
		</p>

		<p>
			Neighborhood: {event.neighborhood}
		</p>

		<p>
			Location Type: {event.location_type}
		</p>
	{:else}
		<p>
			<a href="/payment/pricing">Subscribe to see event details</a>
		</p>
	{/if}
</button>
