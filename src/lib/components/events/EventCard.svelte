<script lang="ts">
	export let event: Event;
	export let index: number;
</script>

<button type="button" class="card flex flex-row justify-between items-center gap-4 p-4 w-full">
	<!-- =============================== -->

	<h1>
		Event #{index + 1}
	</h1>

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
</button>
