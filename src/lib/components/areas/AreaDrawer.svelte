<script lang="ts">
	import { formatDateWithHourToLocale } from '$lib/utils';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { invalidateAll } from '$app/navigation';
	import { deleteUserArea } from '$lib/geo/client/areas';
	import { Trash2, History } from 'lucide-svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings } from '@skeletonlabs/skeleton';
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	const drawerStore = getDrawerStore();

	const outputMapData: Writable<OutputMapData> = getContext('outputMapData');

	let area: Area | undefined = $outputMapData.area;

	const modalStore = getModalStore();
	const modal: ModalSettings = {
		type: 'confirm',
		// Data
		title: 'Delete Area',
		body: 'This will permanently delete this area.',
		buttonTextConfirm: 'Delete',
		response: async (r: boolean) => {
			if (area == null) {
				return;
			}
			if (r) {
				await deleteUserArea({
					id: area.id
				});
				invalidateAll();
			}
		}
	};
</script>

{#if area != null}
	<div class="card flex flex-col justify-center items-start gap-2 p-4 w-full">
		<!-- =============================== -->
		<div class="w-full flex flex-row justify-end items-center">
			<a href="/reports/area/{area.id}" class="btn-icon variant-filled-primary w-8">
				<History />
			</a>
		</div>

		<h1><b>Address:</b> {area.address}</h1>
		<h1><b>Radius:</b> {area.radius / 1000}km</h1>

		<button
			type="button"
			class="btn variant-filled-error"
			on:click={() => {
				modalStore.trigger(modal);
				drawerStore.close();
			}}><Trash2 /> Delete Area</button
		>

		<!-- =============================== -->
	</div>
{:else}
	<h1 class="text-xl font-bold">Error: Can't find the area.</h1>
{/if}
