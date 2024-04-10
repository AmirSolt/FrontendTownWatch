<script lang="ts">
	import { formatDateToLocale } from '$lib/utils';

	export let event: Event;
	export let index: number;
	export let censorEvents: boolean = true;
</script>

<div class="card flex flex-col justify-between items-start gap-4 p-4 w-full">
	<!-- =============================== -->

	<div class="leading-normal">
		{#if !censorEvents}
			<p>
				<b> Crime Type: </b>
				{event.crime_type}
			</p>

			<p>
				<b> Occurrence Date: </b>
				{event.occur_at ? formatDateToLocale(event.occur_at) : '<date null>'}
			</p>

			<p>
				<b> Neighborhood: </b>{event.neighborhood}
			</p>

			<p>
				<b> Location Type: </b>
				{event.location_type}
			</p>
		{:else}
			<p>
				<a href="/payment/pricing" class="underline text-secondary-500"
					>Become a donor to see event details</a
				>
			</p>
			<div class="leading-tight">
				<p>Crime Type: ******</p>

				<p>Occurrence Date: ******</p>

				<p>Neighborhood: ******</p>

				<p>Location Type: ******</p>
			</div>
		{/if}
	</div>
</div>
