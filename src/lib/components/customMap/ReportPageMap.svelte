<script lang="ts">
	import CustomMap from './CustomMap.svelte';

	export let events: Event[];
	export let area: Area;
	export let home: Point;
	export let radius: number;
</script>

<CustomMap {events} {area} {home} {radius} />
