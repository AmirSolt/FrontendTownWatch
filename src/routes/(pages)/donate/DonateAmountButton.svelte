<script lang="ts">
	export let amount: number;
	export let preset: number;
</script>

<button
	class="btn {amount == preset ? 'variant-filled-primary' : 'variant-outline-primary'} w-16"
	type="button"
	on:click={() => {
		amount = preset;
	}}>${preset}</button
>
