<script lang="ts">
	import Marker from '$lib/components/map/Marker.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import Circle from '$lib/components/map/Circle.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const explore: Writable<Explore> = getContext('explore');
</script>

{#key $explore.point.lat + $explore.point.long + $explore.radiuskm}
	<Circle pos={[$explore.point.lat, $explore.point.long]} radius={$explore.radiuskm * 1000} />
{/key}
<Marker pos={[$explore.point.lat, $explore.point.long]} width={40} height={40}>
	<svg xmlns="http://www.w3.org/2000/svg" fill="#4685af" viewBox="0 0 24 24">
		<path
			d="M2.168,10.555a1,1,0,0,1,.278-1.387l9-6a1,1,0,0,1,1.11,0l9,6A1,1,0,0,1,21,11H19v9a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V11H3l.019-.019A.981.981,0,0,1,2.168,10.555Z"
		/>
	</svg>

	<Popup>
		<p>
			Address: {$explore.address}
		</p>
		<p>
			Radius: {$explore.radiuskm}km
		</p>
	</Popup>
</Marker>
