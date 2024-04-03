<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { deleteUserArea } from '$lib/geo/client/areas';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const explore: Writable<Explore> = getContext('explore');
	export let area: Area;
</script>

<div class="card flex flex-wrap flex-row justify-between items-center gap-4 p-4 w-full">
	<!-- =============================== -->

	<button
		type="button"
		class="flex flex-row justify-between items-center gap-8"
		on:click={() => {
			$explore.address = area.address;
			$explore.point.lat = area.lat;
			$explore.point.long = area.long;
			$explore.radiuskm = area.radius / 1000;
		}}
	>
		<h1><b>Address:</b> {area.address}</h1>
		<h1><b>Radius:</b> {area.radius / 1000}km</h1>
	</button>

	<!-- =============================== -->
	<div class="flex items-center space-x-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="#3bc672"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-circle-dot"
			><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" fill="#3bc672" /></svg
		>
		<p class="text-green-500">{area.is_active ? 'online' : 'offline'}</p>
	</div>

	<!-- =============================== -->

	<a href="/reports/area/{area.id}" class="btn variant-ringed-primary">
		<h1>Report History</h1>
	</a>

	<!-- =============================== -->
	<div>
		<button
			type="button"
			class="btn variant-filled-error rounded-full"
			on:click={async () => {
				await deleteUserArea({
					id: area.id
				});
				invalidateAll();
			}}>X</button
		>
	</div>
</div>
