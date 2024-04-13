<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';

	export let event: Event;
	export let index: number;
	export let censorEvents: boolean = true;
</script>

<div class="card flex flex-col justify-between items-start gap-4 p-4 w-full">
	<!-- =============================== -->

	<div class="leading-normal">
		{#if !censorEvents}
			<p>
				<b> Date: </b>
				{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
			</p>

			{#each Object.keys(event.details) as k}
				<p><b>{k}</b>: {event.details[k]}</p>
			{/each}
		{:else}
			<p>
				<b> Date: </b>
				{event.occur_at ? formatDateWithHourToLocale(event.occur_at) : '<date null>'}
			</p>
			{#each Object.keys(event.details) as k}
				<p>
					<b>{k}</b>:
					<a href="/payment/pricing" class="underline text-secondary-500"
						>Only Premium members can see this</a
					>
				</p>
			{/each}
		{/if}
	</div>
</div>
