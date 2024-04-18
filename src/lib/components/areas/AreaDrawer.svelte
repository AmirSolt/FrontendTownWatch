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
	<div class="flex flex-col justify-center items-start gap-2 p-4 w-full">
		<h1 class="text-lg"><b>Address:</b> {area.address}</h1>
		<h1 class="text-lg"><b>Radius:</b> {area.radius / 1000}km</h1>

		<!-- =============================== -->
		<hr />
		<h1 class="text-lg">You will get notified of incidients reported within this area.</h1>
		<a class="btn variant-filled-primary" href="/reports/area/{area.id}"
			><span class="pe-2"><History /></span> Notification History</a
		>
		<hr />
		<br />
		<button
			type="button"
			class="btn variant-filled-error"
			on:click={() => {
				modalStore.trigger(modal);
				drawerStore.close();
			}}><span class="pe-2"><Trash2 /></span> Delete Area</button
		>

		<!-- =============================== -->
	</div>
{:else}
	<h1 class="text-xl font-bold">Error: Can't find the area.</h1>
{/if}
