<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { deleteUserArea } from '$lib/geo/client/areas';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const explore: Writable<Explore> = getContext('explore');
	export let area: Area;
</script>

<div class="card flex flex-row justify-between items-center gap-2 p-2 w-full">
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
		<h1>Address: {area.address}</h1>
		<h1>Radius: {area.radius / 1000}km</h1>
		<h1>Active: {area.radius / 1000}km</h1>
	</button>

	<div>
		<button
			type="button"
			class="btn variant-filled-error"
			on:click={async () => {
				await deleteUserArea({
					id: area.id
				});
				invalidateAll();
			}}>X</button
		>
	</div>
</div>
