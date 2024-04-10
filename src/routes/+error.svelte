<script lang="ts">
	import CircleAlert from 'lucide-svelte/icons/alert-circle';
	import { page } from '$app/stores';
</script>

<br />
<br />

<div class="flex flex-row justify-center items-center gap-4">
	<CircleAlert color="#fc3441" size="60" />
	<div class="flex flex-col justify-center items-start gap-2">
		<h1 class="text-3xl font-bold">Error</h1>
		<p class="text-xl">
			{$page.error?.message}
		</p>
	</div>
</div>
