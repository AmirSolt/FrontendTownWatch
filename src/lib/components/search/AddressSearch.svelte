<script lang="ts">
	import { Search } from 'lucide-svelte';

	export let radius: number;
</script>

<label for="address">Postal code/ Zip code</label>
<form action="?/address" method="post">
	<div class="input-group input-group-divider grid grid-cols-10">
		<input
			class="col-span-8"
			type="search"
			name="address"
			value="M3A 1K9"
			autocomplete="postal-code"
			minlength="1"
			maxlength="12"
			required
		/>
		<input type="number" class="hidden" name="radius" bind:value={radius} required />
		<button type="submit" class="variant-filled-secondary col-span-2"><Search /></button>
	</div>
</form>
