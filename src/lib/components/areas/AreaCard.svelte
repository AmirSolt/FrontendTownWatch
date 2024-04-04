<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { deleteUserArea } from '$lib/geo/client/areas';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { X, History, Radio } from 'lucide-svelte';
	const explore: Writable<Explore> = getContext('explore');
	export let area: Area;

	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Delete Area',
		body: 'This will permanently delete this area.',
		buttonTextConfirm: 'Delete',
		response: async (r: boolean) => {
			if (r) {
				await deleteUserArea({
					id: area.id
				});
				invalidateAll();
			}
		}
	};

	function focusOnThisArea() {
		$explore.address = area.address;
		$explore.point.lat = area.lat;
		$explore.point.long = area.long;
		$explore.radiuskm = area.radius / 1000;
	}
</script>

<div class="card flex flex-col justify-center items-start gap-2 p-4 w-full">
	<!-- =============================== -->
	<div class="w-full flex flex-row justify-between items-center">
		<button
			type="button"
			class="btn-icon rounded-full w-8"
			on:click={() => {
				modalStore.trigger(modal);
			}}><X color="#ff0000" /></button
		>
		<a href="/reports/area/{area.id}" class="btn-icon variant-filled-primary w-8">
			<History />
		</a>
	</div>

	<button
		type="button"
		class="w-full flex flex-col justify-center items-start gap-2 p-2"
		on:click={focusOnThisArea}
	>
		<h1><b>Address:</b> {area.address}</h1>
		<h1><b>Radius:</b> {area.radius / 1000}km</h1>
	</button>

	<!-- =============================== -->
</div>
