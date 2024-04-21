<script lang="ts">
	import AddAreaButton from '$lib/components/areas/AddAreaButton.svelte';
	import AreaThumbnail from '$lib/components/areas/AreaThumbnail.svelte';
	import { orderByFieldAsc } from '$lib/utils';

	import { page } from '$app/stores';
	$: areas = $page.data.areas as Area[];
</script>

<div class="flex flex-row justify-between items-center w-full">
	<div class="flex gap-2">
		{#each orderByFieldAsc(areas, 'created_at') as area, i (area.id)}
			<div class="relative">
				<span class="badge-icon variant-filled absolute -top-1 -right-1 widget-layer-map-z-3"
					>{i + 1}</span
				>
				<AreaThumbnail {area} />
			</div>
		{/each}
	</div>

	<AddAreaButton />
</div>
