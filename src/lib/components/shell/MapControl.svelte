<script lang="ts">
	import AddressSearch from '$lib/components/search/AddressSearch.svelte';
	import { MaxRadiusKm } from '$lib/config.js';
	export let mapControls: MapControls;
</script>

<div class="flex flex-col justify-center items-center w-full gap-2 md:max-w-6xl">
	<div class="card flex flex-col justify-center items-center p-2 w-full gap-1">
		<AddressSearch bind:mapControls />

		<div class="grid grid-cols-5 w-full">
			<label class="col-span-1" for="radius"
				>Radius <p>{mapControls.radiuskm}/{MaxRadiusKm} km</p>
			</label>
			<input
				name="radiuskm"
				type="range"
				step="0.3"
				class="col-span-4"
				max={MaxRadiusKm}
				bind:value={mapControls.radiuskm}
			/>
		</div>
	</div>
</div>
