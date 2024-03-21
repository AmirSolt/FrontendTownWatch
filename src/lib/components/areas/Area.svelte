<script lang="ts">
	import { deleteUserArea } from './crud';

	export let area: Area;
</script>

<div class="card flex flex-row justify-between items-center gap-2 p-2">
	<div>
		<h1>Address: {area.address}</h1>
	</div>

	<div>
		<button
			type="button"
			class="btn variant-filled-error"
			on:click={async () => {
				deleteUserArea(area.id);
			}}>X</button
		>
	</div>
</div>
