<script lang="ts">
	import HeaderTailContent from './HeaderTailContent.svelte';
</script>

<div class="flex flex-col justify-center items-center w-full gap-2 md:max-w-6xl">
	<div class="card flex justify-between items-center p-2 w-full">
		<a href="/" class="flex justify-center items-center">
			<img src="/logo.png" alt="Logo" class="w-12" />
		</a>

		<div class="flex justify-end items-center w-full gap-2">
			<HeaderTailContent />
		</div>
	</div>
</div>
