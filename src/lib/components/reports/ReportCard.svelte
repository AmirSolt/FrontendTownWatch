<script lang="ts">
	import { formatDateWithTimeToLocale } from '$lib/utils';
	import { Book } from 'lucide-svelte';
	export let report: Report;
</script>

<a
	href="/reports/{report.id}"
	class="card flex flex-row flex-wrap justify-between items-center gap-4 p-4 w-full"
>
	<!-- =============================== -->

	<span class="badge variant-filled-secondary">
		<Book />
	</span>

	<p>
		Date: {formatDateWithTimeToLocale(report.created_at)}
	</p>
</a>
